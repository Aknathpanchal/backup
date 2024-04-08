import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Text,
  Button,
  isLoading,
  Select,
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
  Stack
} from "@chakra-ui/react";
import { useState } from "react";

export const Form = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(otp);
  return (
    <Box justifyContent="left" textAlign="left" marginLeft="20px">
      <Box>
        <Heading>Form</Heading>
      </Box>
      <Stack gap="0.5rem">
        <Box width="500px">
          <Input placeholder="Add Email..." />{" "}
        </Box>
        <Box width="500px">
          <Input placeholder="Add Password..." />
        </Box>
        <Box>
          <PinInput value={otp} onChange={(value) => setOtp(value)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </Box>
        <Box>
          <Text>{otp}</Text>
        </Box>
        <Box>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box>
          <Button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
            isLoading={loading}
            colorScheme="red"
          >
            Sign up
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
