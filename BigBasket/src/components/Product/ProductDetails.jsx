import {
    Box,
    Stack,
    Text,
    Image,
    Flex,
    useColorModeValue,
    Link,
    ListItem,
    UnorderedList,
    Button,
  } from "@chakra-ui/react";
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router";
  import {
    addtoCart,
    addtocartaction,
    getSingleProduct,
  } from "../../Redux/Product/action";
  import { MdLocalShipping } from "react-icons/md";
  import { Link as RouterLink } from "react-router-dom";
  import { Topnavbar } from "../Navbar/Topnavbar";
  
  export const ProductDetails = () => {
    const dispatch = useDispatch();
    const currentProduct = useSelector((state) => state.products.currentProduct);
    // console.log("curr", currentProduct);
    const { id } = useParams();
    // console.log("DDD",id)
    useEffect(() => {
      dispatch(getSingleProduct(id));
    }, [dispatch,id]);
    const handleAddproduct = (currentProduct) => {
      dispatch(addtoCart(currentProduct));
    };
  
    return (
      <Box width={"100%"}>
      <Topnavbar/>
        <Box
          width={"75%"}
          margin={"auto"}
          border="1px solid #e8e8e8"
          mt={"3rem"}
          mb={"3rem"}
          p={"1rem 1rem 2rem 0rem "}
        >
          <Flex justifyContent={"space-between"}>
            <Box
              borderRight={"1px solid #e8e8e8"}
              width="25%"
              textAlign={"left"}
              p="2rem 0 1rem 1rem"
            >
              <Text
                fontSize={"14px"}
                fontWeight={"500"}
                mb={"1rem"}
                borderBottom={"1px solid #e8e8e8"}
              >
                Category
              </Text>
              <Text
                fontSize={"12px"}
                fontWeight={"500"}
                mb={"0.5rem"}
                // borderBottom={"1px solid #e8e8e8"}
              >
                Fruits & Vegetables
              </Text>
              <Text fontSize={"12px"} fontWeight={"500"} ml={"1rem"} mb="0.5rem">
                Fresh Vegetables
              </Text>
              <UnorderedList
                listStyleType={"none"}
                fontSize={"12px"}
                fontWeight={"380"}
                ml={"1.5rem"}
                mb={"1rem"}
              >
                <ListItem _hover={{ color: "#84c225" }} mb={"0.25rem"}>
                  Beans,Bringles & Okra
                </ListItem>
                <ListItem _hover={{ color: "#84c225" }} mb={"0.25rem"}>
                  Cabbage & Cauliflower
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Cucumber & Capsicum
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Gourd, Pumpkin, DrumStick
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Leafy Vegetables
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Potato, Onion & Tomato
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Root Vegetables
                </ListItem>
                <ListItem mb={"0.25rem"} _hover={{ color: "#84c225" }}>
                  Specialty
                </ListItem>
              </UnorderedList>
              <Text
                fontSize={"14px"}
                fontWeight={"500"}
                mb={"1rem"}
                borderBottom={"1px solid #e8e8e8"}
              >
                Brands
              </Text>
              <Text
                fontSize={"12px"}
                fontWeight={"380"}
                mb={"0.25rem"}
                ml={"1rem"}
              >
                Fresho
              </Text>
              <Text
                fontSize={"12px"}
                fontWeight={"380"}
                mb={"0.25rem"}
                ml={"1rem"}
              >
                Fresho Potato, Onion & Tomato
              </Text>
            </Box>
            <Box width="35%">
              <Flex justifyContent={"center"}>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={currentProduct.imgUrl}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  // border="1px solid #e8e8e8"
                  mt={"18%"}
                />
              </Flex>
            </Box>
            <Box border={"1px solid #e8e8e8"} width="35%" padding={"1rem"}>
              <Stack spacing={{ base: 6, md: 4 }} textAlign={"left"}>
                <Box as={"header"}>
                  <Text
                    mt={"20%"}
                    lineHeight={1.1}
                    fontWeight={400}
                    fontSize={"16px"}
                    pb="0.25rem"
                  >
                    {currentProduct.brand}
                  </Text>
                  <Text
                    lineHeight={1.1}
                    fontWeight={400}
                    fontSize={"16px"}
                    pb="0.25rem"
                  >
                    {currentProduct.brand} {"  "} {currentProduct.title}
                  </Text>
                  <Text fontWeight={400} fontSize={"16px"}>
                    MRP : {""}{" "}
                    <span className="linethrough">Rs{currentProduct.price}</span>
                  </Text>
                  <Text fontWeight={400} fontSize={"18px"}>
                    Price :{" "}
                    {Math.floor(
                      currentProduct.price - (10 * currentProduct.price) / 100
                    )}
                  </Text>
                </Box>
                <Box margin={"auto"}>
                  <Button
                    mr={"5px"}
                    bg={useColorModeValue("white")}
                    color={useColorModeValue("gray.900")}
                    rounded="0"
                    border="1px solid #84c225"
                  >
                    1
                  </Button>
                  <Link as={RouterLink} to={"/cart"}>
                    <Button
                      rounded={"none"}
                      w={"50%"}
                      margin="auto"
                      p={"5px"}
                      mr={"5px"}
                      border="1px solid #84c225"
                      bg={useColorModeValue("#84c225")}
                      color={useColorModeValue("white", "gray.900")}
                      onClick={() => handleAddproduct(currentProduct)}
                    >
                      Add to cart
                    </Button>
                  </Link>
                  <Button
                    ml="5px"
                    bg={useColorModeValue("white")}
                    color={useColorModeValue("gray.900")}
                    rounded="0"
                    border="1px solid #84c225"
                  >
                    SAVE
                  </Button>
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  //  border="1px"
                  //  marginTop={"-20px"}
                >
                  <MdLocalShipping />
                  <Text>2-3 business days delivery</Text>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  };