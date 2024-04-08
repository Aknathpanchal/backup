import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { Info } from "./Info";

export const Dashboard = () => {
  return (
    <Box>
      <Flex
        justifyContent="space-between"
        width="98%"
        margin="auto"
        borderBottom="1px solid black"
        padding="10px"
      >
        <Box>
          <Box>
            <Button
              fontSize="25px"
              padding="0px"
              color="white"
              bg="rgb(107,70,193)"
            >
              4d
            </Button>
          </Box>
        </Box>
        <Flex gap="10px">
          <Box>
            <Button color="blue">Sign In</Button>
          </Box>
          <Box>
            <Button color="blue" border="1px solid blue" colorScheme="none">
              Sign Up
            </Button>
          </Box>
          <Box>
            <Button color="white" bg="rgb(107,70,193)">
              Post a Job 🚀
            </Button>
          </Box>
        </Flex>
      </Flex>
      <br />
      <br />
      <Box>
        <Heading>Find The Right</Heading>
        <Heading>Four-Day Week Job</Heading>
      </Box>
      <br />
      <Flex justifyContent="center" gap="15px">
        <Input
          padding="22px"
          width="400px"
          placeholder="Type job title or keyword"
        />
        <Button height="46px">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              fill="none"
              stroke="#000"
              stroke-width="2"
              points="3 6 10 13 10 21 14 21 14 13 21 6 21 3 3 3"
            />
          </svg>
        </Button>
      </Flex>
      <br />
      <Flex justifyContent="center" gap="10px">
        <Box>
          <Button color="white" bg="rgb(107,70,193)">
            Remote
          </Button>
        </Box>
        <Box>
          <Button color="white" bg="rgb(107,70,193)">
            <ChevronLeftIcon />
            <ChevronRightIcon /> Tech
          </Button>
        </Box>
        <Box>
          <Button color="white" bg="rgb(107,70,193)">
            Marketing
          </Button>
        </Box>
      </Flex>
      <br />
      <br />
      <Box bg="rgb(237,242,247)">
        <br />
        <br />
        <Flex w="650px" margin="auto">
          <Heading textAlign="left" color="rgb(107,70,193)" marginRight="12px">
            {" "}
            Recent{" "}
          </Heading>
          <Heading textAlign="left"> Jobs</Heading>
        </Flex>
        <br />

        {/* <Flex
          h="99px"
          w="650px"
          border="1px solid black"
          m="auto"
          borderRadius="15px"
          padding="8px"
        >
          <Box w="7%" border="1px solid black" padding="6px">
            <Img
              w="32px"
              src="https://www.wework4days.com/_next/image?url=https%3A%2F%2Fapi.wework4days.com%2Fassets%2F1f61d027-d061-4780-9198-fb8c716d6e0a&w=1920&q=75"
            />
          </Box>
          <Box
            w="65%"
            border="1px solid black"
            textAlign="left"
            paddingLeft="5px"
            marginTop="2px"
          >
            <p>Talewind</p>
            <Heading fontSize="19px" marginBottom="2px" marginTop="1px">
              Lead Producer
            </Heading>
            <p>£50 - £60</p>
          </Box>
          <Box
            w="28%"
            border="1px solid black"
            justifyContent="right"
            textAlign="right"
            padding="5px"
          >
            <Img src="./img.PNG" />
            <br />
            <p fontSize="14">Full Time</p>
          </Box>
        </Flex> */}
        <Info />
        <br />
      </Box>
      <br />
      <Flex justifyContent="center" gap="100px">
        <a>Contact us</a>
        <a>Legal</a>
      </Flex>
      <br />
    </Box>
  );
};
