import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Tooltip,
} from "@chakra-ui/react";

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  let cartItems = useSelector((store) => store.data.cartData);
  const navigate = useNavigate();

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <Container
      maxW="full"
      pos="sticky"
      top={0}
      zIndex={2}
      boxShadow="md"
      rounded="md"
      bg="white"
    >
      <Flex justify="space-between" p="3" w="96%" m="auto">
        <HStack spacing="24px">
          <Box>
            <Link
              to="/"
              _activeLink={{
                color: "blue.600",
                fontSize: "1.2rem",
                letterSpacing: "1px",
              }}
              as={NavLink}
            >
              Home
            </Link>
          </Box>

          <Box>
            <Link
              to="/about"
              _activeLink={{
                color: "blue.600",
                fontSize: "1.2rem",
                letterSpacing: "1px",
              }}
              as={NavLink}
            >
              About
            </Link>
          </Box>

          <Box>
            <Link
              to="/store"
              _activeLink={{
                color: "blue.600",
                fontSize: "1.2rem",
                letterSpacing: "1px",
              }}
              as={NavLink}
            >
              Store
            </Link>
          </Box>
        </HStack>

        <HStack>
          <Tooltip label="Cart" placement="bottom" bg="blue.500">
            <Button
              onClick={() => navigate("/cart")}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              colorScheme="blue"
              borderRadius="full"
            >
              <Icon boxSize={6} as={AiOutlineShoppingCart} />

              <Flex
                borderRadius="full"
                justify="center"
                align="center"
                bg="red"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </Flex>
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
