import { Box, Flex, Heading, Img } from "@chakra-ui/react";
import img22 from "../img.PNG"

export const Info = () => {
  const imgData = {
    info1: [
      {
        na: "Lead Producer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F1f61d027-d061-4780-9198-fb8c716d6e0a&w=1920&q=75"
      },
      {
        na: "Lead Game Developer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F1f61d027-d061-4780-9198-fb8c716d6e0a&w=1920&q=75"
      },
      {
        na: "Full-Stack JavaScript Developer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2Fd74e52d1-6529-4ab1-98b2-a27b1b9947ed&w=1920&q=75"
      },
      {
        na: "Director of Marketing",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2Fd4f13259-d651-4b8a-8115-48bdfabd24aa&w=1920&q=75"
      },
      {
        na: "Senior Softeare Engineer(.NET)",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F0ecc5576-0a1c-4787-880b-6e23c379550e&w=1920&q=75"
      },
      {
        na: "Account Executive",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F0ecc5576-0a1c-4787-880b-6e23c379550e&w=1920&q=75"
      },
      {
        na: "Software Engineer(.NET)",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F0ecc5576-0a1c-4787-880b-6e23c379550e&w=1920&q=75"
      },
      {
        na: "Full Stack Javascript Developer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F5588c68a-7beb-4004-96ac-11b2ba547e5c&w=1920&q=75"
      },
      {
        na: "UX/UI Engineering",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F5588c68a-7beb-4004-96ac-11b2ba547e5c&w=1920&q=75"
      },
      {
        na: "Head Od Marketing",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F5588c68a-7beb-4004-96ac-11b2ba547e5c&w=1920&q=75"
      },
      {
        na: "Content Specialist",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F4f63e19b-106b-4094-8888-71e1d275320f&w=1920&q=75"
      },
      {
        na: "Customer Acqisition Manager",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F4f63e19b-106b-4094-8888-71e1d275320f&w=1920&q=75"
      },
      {
        na: "Engineering Manager",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F4f63e19b-106b-4094-8888-71e1d275320f&w=1920&q=75"
      },
      {
        na: "Solution Engineer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F9fcb1732-3ac2-478d-881b-60cc3a1dc093&w=1920&q=75"
      },
      {
        na: "Senior QA Engineer",
        im:
          "https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F9fcb1732-3ac2-478d-881b-60cc3a1dc093&w=1920&q=75"
      }
    ]
  };
  console.log(imgData);
  return (
    <Box gap="10px">
      {imgData.info1.map((el) => (
        <Flex
          h="99px"
          w="650px"
          border="1px solid rgb(107,70,193)"
          m="auto"
          borderRadius="15px"
          padding="8px"
          marginBottom="16px"
          bg="white"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        >
          <Box
            w="7%"
            // border="1px solid black"
            padding="6px"
          >
            <Img w="32px" src={el.im} />
          </Box>
          <Box
            w="81%"
            // border="1px solid black"
            textAlign="left"
            paddingLeft="5px"
            marginTop="2px"
          >
            <p>Talewind</p>
            <Heading fontSize="19px" marginBottom="2px" marginTop="1px">
              {el.na}
            </Heading>
            <p>£50 - £60</p>
          </Box>
          <Box
            w="19%"
            // border="1px solid black"
            justifyContent="right"
            textAlign="right"
            padding="5px"
            
          >
            <Img  w="110px" src={img22} />
            <br />
            <p fontSize="14">Full Time</p>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};
