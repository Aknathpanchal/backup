const fs = require('fs');
const forge = require('node-forge');

// import signpdf from '@signpdf/signpdf';
// import { P12Signer } from '@signpdf/signer-p12';
const signpdf = require('@signpdf/signpdf').default;
const { P12Signer } = require('@signpdf/signer-p12');
const PDFArrayCustom = require('./PDFArrayCustom');
const { PDFDocument, PDFName, PDFNumber, PDFHexString, PDFString } = require('pdf-lib');

// Correct path for pdfjs-dist import
const pdfjsDist = require('pdfjs-dist');

console.log(Object.keys(signpdf),"hghgg");



class SignPDF {
  constructor(pdfFile, certFile, password) {
    this.pdfFile = pdfFile;
    this.certFile = certFile;
    this.password = password;
  }

  async signPDF() {
    const positions = await this._findTextPositions('Dev');
    let newPDF = await this._addPlaceholders(positions);
    const cert = this._extractCertificate();
    if (!cert) {
      throw new Error('No certificate found in PFX file');
    }

    const signer = new P12Signer( fs.readFileSync(this.certFile), { passphrase: this.password });
    // console.log(signer,"signer")
    // newPDF = await signpdf.sign(newPDF, signer);
    newPDF = await signpdf.sign(newPDF, signer);

    return newPDF;
  }

  constructLabel(signatureText) {
    return `Signed by: ${signatureText.name}\nDate: ${new Date().toISOString()}`;
  }

//   async _findTextPositions(textToFind) {
//     const pdfBytes = fs.readFileSync(this.pdfFile);
//     const loadingTask = pdfjsDist.getDocument({ data: pdfBytes });
//     const pdf = await loadingTask.promise;
//     const numPages = pdf.numPages;
//     const positions = [];

//     for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//       const page = await pdf.getPage(pageNum);
//       const content = await page.getTextContent();
//       const textItems = content.items;
// console.log(textItems,"textItems")
//       textItems.forEach(item => {
//         if (item.str.includes(textToFind)) {
//           console.log({ page: pageNum, x: item.transform[4], y: item.transform[5] })
//           positions.push({ page: pageNum, x: item.transform[4], y: item.transform[5] });
//         }
//       });
//     }

//     return positions;
//   }


async _findTextPositions(textToFind) {
  const pdfBytes = fs.readFileSync(this.pdfFile);
  const loadingTask = pdfjsDist.getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const positions = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const textItems = content.items;

    // Group text items into words
    let currentWord = '';
    let currentWordTransform = null;

    for (let i = 0; i < textItems.length; i++) {
      const item = textItems[i];
      
      if (item.str.trim() === '') continue; // Skip empty items

      // Start a new word if we are not continuing the previous one
      if (currentWordTransform && (item.transform[4] - currentWordTransform[4] > item.width)) {
        // Store the previous word if it contains the text to find
        if (currentWord.includes(textToFind)) {
          positions.push({
            page: pageNum,
            x: currentWordTransform[4],
            y: currentWordTransform[5]
          });
        }
        currentWord = ''; // Reset for the next word
        currentWordTransform = null;
      }

      // Continue the current word or start a new one
      if (!currentWordTransform) {
        currentWordTransform = item.transform;
      }

      currentWord += item.str;

      // Check if the next item is from a different line (new line usually has a large gap)
      if (i < textItems.length - 1) {
        const nextItem = textItems[i + 1];
        if (nextItem.transform[5] !== item.transform[5]) {
          // If the next item is on a different line, check the current word
          if (currentWord.includes(textToFind)) {
            positions.push({
              page: pageNum,
              x: currentWordTransform[4],
              y: currentWordTransform[5]
            });
          }
          currentWord = ''; // Reset for the next word
          currentWordTransform = null;
        }
      }
    }

    // Check the last word
    if (currentWord.includes(textToFind)) {
      positions.push({
        page: pageNum,
        x: currentWordTransform[4],
        y: currentWordTransform[5]
      });
    }
  }

  return positions;
}



  async _addPlaceholders(positions) {
    const loadedPdf = await PDFDocument.load(fs.readFileSync(this.pdfFile));
    const ByteRange = PDFArrayCustom.withContext(loadedPdf.context);
    const DEFAULT_BYTE_RANGE_PLACEHOLDER = '**********';
    const SIGNATURE_LENGTH = 16000;
    const pages = loadedPdf.getPages();

    ByteRange.push(PDFNumber.of(0));
    ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
    ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
    ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));

    // Extract certificate details for the label
    const cert = this._extractCertificate();
    if (!cert) {
      throw new Error('No certificate found in PFX file');
    }

    const certDetails = cert.subject.attributes.reduce((acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {});

    const signatureText = {
      name: certDetails.commonName || 'Unknown Name',
      contactInfo: certDetails.emailAddress || 'N/A',
    };

    // for (const position of positions) {
      const { page: pageNum, x, y } = positions[0];
      const page = pages[pageNum - 1];

      const signatureDict = loadedPdf.context.obj({
        Type: 'Sig',
        Filter: 'Adobe.PPKLite',
        SubFilter: 'adbe.pkcs7.detached',
        ByteRange,
        Contents: PDFHexString.of('A'.repeat(SIGNATURE_LENGTH)),
        Reason: PDFString.of('We need your signature for reasons...'),
        M: PDFString.fromDate(new Date()),
      });

      const signatureDictRef = loadedPdf.context.register(signatureDict);

      const widgetDict = loadedPdf.context.obj({
        Type: 'Annot',
        Subtype: 'Widget',
        FT: 'Sig',
        Rect: [x, y - 20, x + 150, y], // Adjust size and position as needed
        V: signatureDictRef,
        T: PDFString.of('test signature'),
        F: 4,
        P: page.ref,
      });

      const widgetDictRef = loadedPdf.context.register(widgetDict);

      const labelText = this.constructLabel(signatureText);
      const textDict = loadedPdf.context.obj({
        Type: 'Annot',
        Subtype: 'FreeText',
        Rect: [x, y - 40, x + 150, y - 20], // Adjust size and position as needed
        Contents: PDFString.of(labelText),
        F: 4,
        P: page.ref,
        DA: PDFString.of('/Helvetica 12 Tf 0 g'), // Font and color
      });

      const textDictRef = loadedPdf.context.register(textDict);

      // Add annotations to the page
      page.node.set(PDFName.of('Annots'), loadedPdf.context.obj([widgetDictRef, textDictRef]));
    // }

    // Allows signatures on newer PDFs
    const pdfBytes = await loadedPdf.save({ useObjectStreams: false });

    return SignPDF.unit8ToBuffer(pdfBytes);
  }




  // async _addPlaceholders(positions) {
  //   const loadedPdf = await PDFDocument.load(fs.readFileSync(this.pdfFile));
  //   const pages = loadedPdf.getPages();
  
  //   // Extract certificate details for the label
  //   const cert = this._extractCertificate();
  //   if (!cert) {
  //     throw new Error('No certificate found in PFX file');
  //   }
  
  //   const certDetails = cert.subject.attributes.reduce((acc, attr) => {
  //     acc[attr.name] = attr.value;
  //     return acc;
  //   }, {});
  
  //   const signatureText = {
  //     name: certDetails.commonName || 'Unknown Name',
  //     contactInfo: certDetails.emailAddress || 'N/A',
  //   };
  
  //   // Ensure the ByteRange is managed properly
  //   let byteRange = [
  //     PDFNumber.of(0),
  //     PDFName.of('**********'),
  //     PDFName.of('**********'),
  //     PDFName.of('**********')
  //   ];
  
  //   const pdfBytes = await loadedPdf.save({ useObjectStreams: false });
  //   const updatedPdf = await PDFDocument.load(pdfBytes);
  
  //   // Get existing ByteRange if available
  //   const existingByteRange = updatedPdf.context.lookup(updatedPdf.context.getRoot().get(PDFName.of('ByteRange')), 'ByteRange');
    
  //   if (existingByteRange) {
  //     // Convert existing ByteRange to an array
  //     const existingByteRangeArray = existingByteRange.array;
  
  //     // Here, you will need to adjust the ByteRange array based on your signature's byte range
  //     // For simplicity, we're just demonstrating how to update it with placeholders
  //     // Update the byte range values accordingly
  //     byteRange = existingByteRangeArray.map(item => {
  //       if (item instanceof PDFName) {
  //         // Replace placeholder with actual byte offset, if needed
  //         return PDFName.of('UpdatedPlaceholder');
  //       }
  //       return item;
  //     });
  
  //     // Set updated ByteRange
  //     updatedPdf.context.getRoot().set(PDFName.of('ByteRange'), updatedPdf.context.obj(byteRange));
  //   } else {
  //     // Add new ByteRange placeholder if not present
  //     updatedPdf.context.getRoot().set(PDFName.of('ByteRange'), updatedPdf.context.obj(byteRange));
  //   }
  
  //   // Process all positions to add signature and label
  //   for (const position of positions) {
  //     const { page: pageNum, x, y } = position;
  //     const page = pages[pageNum - 1];
  
  //     const signatureDict = updatedPdf.context.obj({
  //       Type: 'Sig',
  //       Filter: 'Adobe.PPKLite',
  //       SubFilter: 'adbe.pkcs7.detached',
  //       ByteRange: byteRange,
  //       Contents: PDFHexString.of('A'.repeat(16000)),
  //       Reason: PDFString.of('We need your signature for reasons...'),
  //       M: PDFString.fromDate(new Date()),
  //     });
  
  //     const signatureDictRef = updatedPdf.context.register(signatureDict);
  
  //     const widgetDict = updatedPdf.context.obj({
  //       Type: 'Annot',
  //       Subtype: 'Widget',
  //       FT: 'Sig',
  //       Rect: [x, y - 20, x + 150, y],
  //       V: signatureDictRef,
  //       T: PDFString.of('test signature'),
  //       F: 4,
  //       P: page.ref,
  //     });
  
  //     const widgetDictRef = updatedPdf.context.register(widgetDict);
  
  //     const labelText = this.constructLabel(signatureText);
  //     const textDict = updatedPdf.context.obj({
  //       Type: 'Annot',
  //       Subtype: 'FreeText',
  //       Rect: [x, y - 40, x + 150, y - 20],
  //       Contents: PDFString.of(labelText),
  //       F: 4,
  //       P: page.ref,
  //       DA: PDFString.of('/Helvetica 12 Tf 0 g'),
  //     });
  
  //     const textDictRef = updatedPdf.context.register(textDict);
  
  //     // Add annotations to the page
  //     page.node.set(PDFName.of('Annots'), updatedPdf.context.obj([widgetDictRef, textDictRef]));
  //   }
  
  //   // Save the updated PDF
  //   const finalPdfBytes = await updatedPdf.save({ useObjectStreams: false });
  //   return SignPDF.unit8ToBuffer(finalPdfBytes);
  // }
  

  

  _extractCertificate() {
    const pfxData = fs.readFileSync(this.certFile, 'binary'); // Read file data as binary
    const pfxAsn1 = forge.asn1.fromDer(pfxData);
    const pfx = forge.pkcs12.pkcs12FromAsn1(pfxAsn1, this.password);

    for (const safeContent of pfx.safeContents) {
      for (const safeBag of safeContent.safeBags) {
        if (safeBag.cert) {
          return safeBag.cert;
        }
      }
    }
    return null;
  }

  static unit8ToBuffer(unit8) {
    return Buffer.from(unit8);
  }
}

module.exports = SignPDF;
