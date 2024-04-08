import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.css'
import axios from 'axios'

const FileUpload = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles(file)

        // upload file
        const formData = new FormData();
        formData.append(
            file,
            file.name
        )
        axios.post('https://3a03-2409-40d0-1039-b8a-a035-2b7f-b319-b98c.in.ngrok.io/csv/upload/1', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles(file)
            })
            .catch((err) => {
                // inform the user
                console.error(err)
                removeFile(file.name)
            });
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <button>
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">.CSV</p>

            </div>
        </>
    )
}

export default FileUpload
