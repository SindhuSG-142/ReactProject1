
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Heading,
  Link,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { PhoneIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ImLocation2 } from "react-icons/im";
import { AiOutlineUser,AiOutlineClose } from "react-icons/ai";
import { BsBasket3 } from "react-icons/bs";
import "./navbar.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartLength } from "../CartLength";
import { LogedIn } from "../Login/Logedin";
import { useState } from "react";
import axios from "axios";
import { ProductComponent } from "../Product/ProductComponent";
import Signin from "../Login/Signin";
import Sign from "../SignUp/Sign";

// import {Link as RouterLink} from "react-router-dom"

export const Topnavbar = () => {
  const [inputvalue, setInputValue] = useState("");
  const [loggedIn,setLoggedIn]=useState(false);
  const [show,setShow]=useState(false)
  const navigate = useNavigate();
  const cart = useSelector((state) => state.products.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSearch = () => {
    if (inputvalue !== "") {
      axios
        .get(`https://web-production-ae8c.up.railway.app/vegetables?search=${inputvalue}`)
        .then((res) => {
          console.log(res.data.vegetables[0]._id);
          // getSearchProduct(res.data.vegetables[0].)
          // <ProductComponent />;
          navigate(`/products/${res.data.vegetables[0]._id}`);
          // navigate("/payment");
          // <Link to={`/products/${res.data.vegetables[0]._id}`}></Link>
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Box width={"75%"} margin="auto">
      <Box>
        <Box
          display={"flex"}
          borderWidth="1px"
          overflow="hidden"
          paddingBottom={"3px"}
        >
          <Box width="20%">
            <Link as={RouterLink} to="/">
              <img
                src="data:image/png;base64,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"
                alt="logo"
              />
            </Link>
          </Box>
          <Box width="78%" ml={"2rem"}>
            <Box width="100%" float={"right"}>
              <Flex
                float={"right"}
                width="100%"
                padding={"0.25rem 0 0 0"}
                fontWeight="400"
                fontSize="14px"
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Box mr={"1rem"}>
                  <Flex alignItems={"center"}>
                    <PhoneIcon mr={"0.5rem"} />
                    <Text>1860 123 1000</Text>
                  </Flex>
                </Box>
                <Box mr={"1rem"}>
                  <Flex alignItems={"center"}>
                    <Box mr={"0.5rem"}>
                      <ImLocation2 size="16px" />
                    </Box>
                    {/* <Text>56004 Bangalore</Text> */}
                    <Button colorScheme='gray' variant='outline'>Select Location</Button>
                  </Flex>
                </Box>
                <Box mr={"1rem"}>
                  <Flex alignItems={"center"}>
                    <Box mr={"0.5rem"}>
                      <AiOutlineUser size="16px" />
                    </Box>
                 
                     <Box >
                     <Box color='gray.500' onClick={()=>setShow(true)}>Signup</Box>
 
                     <Modal isOpen={show } onClose={onClose}>
                     <ModalOverlay />
                     <ModalContent className="model">
                     <Box onClick={()=>setShow(false)} display="flex" margin={2} padding={"5px"} flexFlow={"row-reverse"} ><AiOutlineClose size={30} /></Box>
                        {show ?<div className="block">
                        <Box w="100%" bg="white" p="4" borderRadius={"lg"} borderWidth="1px">
                        <Tabs variant="soft-rounded"  colorScheme={"green"}>
                          <TabList mb="1em">
                            <Tab w="50%">Login</Tab>
                            <Tab w="50%">Sign Up</Tab>
                          </TabList>
                          <TabPanels>
                            <TabPanel>
                              <Signin  setshow={setShow}/>
                            </TabPanel>
                            <TabPanel>
                              <Sign/>
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                      </div> :<div className="none"></div>}
                      </ModalContent>
                     </Modal>
                      </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box mt={"2rem"}>
              <Flex width={"100%"} justifyContent={"space-between"}>
                <Flex width={"65%"} alignItems="center">
                  <Input
                    height={"1.5rem"}
                    type="text"
                    colorScheme="white"
                    variant="outline"
                    placeholder="Search for Products..."
                    _hover={{ bg: "white" }}
                    _expanded={{ bg: "white" }}
                    _focus={{ boxShadow: "#84c225" }}
                    focusBorderColor="#84c225"
                    // isInvalid
                    errorBorderColor="#84c225"
                    borderRadius="0"
                    borderWidth="0.025px"
                    value={inputvalue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button
                    _hover={{ bg: "white" }}
                    _expanded={{ bg: "white" }}
                    // _focus={{ boxShadow: "#84c225" }}
                    variant="outline"
                    focusBorderColor="#84c225"
                    // isInvalid
                    errorBorderColor="#84c225"
                    borderRadius="0"
                    borderWidth="1px"
                    height={"1.6rem"}
                    bg="#84c225"
                    color="white"
                    padding={"2.5px"}
                    ml="-1px"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </Button>
                </Flex>
                <Flex
                  width="16%"
                  // justifyContent={"space-between"}
                  bg={" #e8e8e8"}
                  height={"60px"}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <Flex
                    ml={"20px"}
                    mr="1rem"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <BsBasket3 size={"20px"} />
                  </Flex>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                  >
                    <Text fontSize={"12px"}>My Basket</Text>
                    <Flex>
                      <CartLength /> <Text ml={2}>Items</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box borderWidth="1px" overflow="hidden">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              <Menu border={"1px solid green"} width={"100%"} isOpen={isOpen}>
                <Box>
                  <MenuButton
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    as={Button}
                    transition="all 0.2s"
                    borderRadius="0"
                    variant="ghost"
                    borderWidth="1px"
                    borderColor="white"
                    focusBorderColor="white"
                    colorScheme=""
                    bg="#84c225"
                    _hover={{ bg: "#84c225" }}
                    _expanded={{ bg: "#84c225" }}
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<ChevronDownIcon />}
                    fontSize="12px"
                    fontWeight={500}
                  >
                    SHOP BY CATEGORY
                  </MenuButton>
                  <Flex>
                    <MenuList
                      bg={"white"}
                      width={"1080px"}
                      fontSize="14px"
                      fontWeight={"300"}
                      borderRadius={0}
                      onMouseEnter={onOpen}
                      onMouseLeave={onClose}
                    >
                      <Flex>
                        <div className="borderright">
                          <Link as={RouterLink} to="/product">
                            <MenuItem borderBottom={"1px solid #e8e8e8"}>
                              Fruits & Vegetables
                            </MenuItem>
                          </Link>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Foodgrains, Oil & Masala
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Bakery, Cakes & Dairy
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Beverages
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Snakes & Branded Foods
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Beauty & Hygiene
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Cleaning & Household
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Kitchen, Garden & Pets
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Eggs, Meat & Fish
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Gourmet & World Food
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            Baby Cary
                          </MenuItem>
                          <MenuItem borderBottom={"1px solid #e8e8e8"}>
                            View All
                          </MenuItem>
                        </div>
                        <div className="bg_grey">
                          <MenuItem>Fresh Vegitables</MenuItem>
                          <MenuItem>Herbs & Seasonings</MenuItem>
                          <MenuItem>Fresh Fruits</MenuItem>
                          <MenuItem>Organic Fruits & Vegetables</MenuItem>
                          <MenuItem>Cuts & Sprouts</MenuItem>
                          <MenuItem>Exotic Fruits & Veggies</MenuItem>
                          <MenuItem>Flower Bouquets, Bunches</MenuItem>
                        </div>
                        <div className="borderright">
                          <MenuItem>Potato, Onion & Tomato</MenuItem>
                          <MenuItem>Cucumber & Capsicum</MenuItem>
                          <MenuItem>Leafy Vegetables</MenuItem>
                          <MenuItem>Root Vegetables</MenuItem>
                          <MenuItem>Beans, Brinjals & Okra</MenuItem>
                          <MenuItem>Cabbage & Cauliflower</MenuItem>
                          <MenuItem>Gourd, Pumpkin, Drumstic</MenuItem>
                          <MenuItem>Specialty</MenuItem>
                        </div>
                        <div className="fs12">
                          <MenuItem
                            fontSize={"16"}
                            fontWeight={300}
                            color={"#84c225"}
                          >
                            Popular Searches
                          </MenuItem>
                          <MenuItem>Vegetables</MenuItem>
                          <MenuItem>Tomato</MenuItem>
                          <MenuItem>Onion</MenuItem>
                          <MenuItem>Potato</MenuItem>
                          <MenuItem>Vegitable</MenuItem>
                          <MenuItem>Carrat</MenuItem>
                        </div>
                      </Flex>
                    </MenuList>
                  </Flex>
                </Box>
              </Menu>
              </Box>
              <Box>
              <button className="outlinebutton">TEA</button>
            </Box>
            <Box>
              <button className="outlinebutton">GHEE</button>
            </Box>
            <Box>
              <button className="outlinebutton">NANDINI</button>
            </Box>
            <Box>
              <button className="outlinebutton">OFFErS</button>
            </Box>
            <Box>
              <button className="outlinebutton">BB SPLECIALITY</button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};