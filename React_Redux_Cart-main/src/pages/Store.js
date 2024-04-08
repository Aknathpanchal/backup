import {
  Badge,
  Box,
  Image,
  Icon,
  Container,
  Button,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { formatCurrency } from "../utilities/formatCurrency";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchAllProducts,
  increaseCartQuantity,
} from "../Redux/action";

const Shop = () => {
  const dispatch = useDispatch();
  const { loading, storeData, cartData, error } = useSelector(
    (store) => store?.data
  );
  let cartItems = useSelector((store) => store.data.cartData);

  const handleCart = (item) => {
    const { id } = item;
    let newItem = { ...item };

    let find = cartItems.find((item) => item.id === id);
    if (!find) {
      newItem.quantity = 1;
      dispatch(addToCart(newItem));
    } else {
      dispatch(increaseCartQuantity(id));
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Container maxW="container.xl">
      <Text fontSize={"6xl"}>Store </Text>

      {!loading ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" pt="10">
          {storeData &&
            storeData?.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={item.image}
                  alt={item.category}
                  h="200px"
                  w="full"
                  p="2"
                  objectFit="contain"
                />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      Category
                    </Badge>

                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {item.category}
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {item.title}
                  </Box>

                  <Box as="h1" color="gray.600" fontWeight="bold">
                    {formatCurrency(item.price * 7)}
                  </Box>

                  <Box
                    display="flex"
                    mt="2"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Icon
                          as={AiFillStar}
                          key={i}
                          color={i < item.rating.rate ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {item.rating.count} reviews
                    </Box>
                  </Box>

                  <Box
                    w="full"
                    as="div"
                    mt={10}
                    onClick={() => handleCart(item)}
                  >
                    <Button
                      w="full"
                      bg="blue.600"
                      color="white"
                      _hover={{
                        color: "blue.500",
                        bg: "white",
                        border: "1px solid skyblue",
                      }}
                    >
                      +ADD TO CART
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      ) : (
        <LoadingScreen />
      )}
    </Container>
  );
};

export default Shop;
