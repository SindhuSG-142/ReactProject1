import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Checkbox,
  CheckboxGroup,
  VStack,
} from "@chakra-ui/react";
import { ProductSlider } from "./Slider";
import { ProductComponent } from "./ProductComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/Product/action";
import { useSearchParams } from "react-router-dom";
import { Topnavbar } from "../Navbar/Topnavbar";
import LoadingComp from "./LoadingComponent";

export const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderValue, setOrderValue] = useState(searchParams.get("order"));
  const [brandValue, setBrandValue] = useState(searchParams.getAll("brand"));
  const [sizeValue, setSizeValue] = useState(searchParams.getAll("quantity"));
  const [priceValue, setPriceValue] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      brand: brandValue,
      order: orderValue,
      quantity: sizeValue,
    };

    // Start loading if filters are applied
    if (brandValue.length > 0 || orderValue || sizeValue.length > 0) {
      setLoading(true);
      dispatch(fetchData(params)).finally(() => {
        setLoading(false); // Stop loading after fetching
      });
    } else {
      setLoading(false); // Stop loading if no filters
    }
  }, [brandValue, orderValue, sizeValue, dispatch]);

  return (
    <Box width={"100%"}>
      <Topnavbar />
      {loading ? (
        <Box width="98%">
          <LoadingComp />
        </Box>
      ) : (
        <Box width={"75%"} margin="auto" mt="1rem">
          <ProductSlider />
          <Box mt={"20px"} mb={"20px"}>
            <img
              src="https://www.bigbasket.com/media/uploads/flatpages/test-1/Fruits%20&%20vegetables.jpg"
              alt="..."
            />
          </Box>
          <Box border={"1px solid #e8e8e8"}>
            <Flex>
              <Box width={"15%"} textAlign={"left"} m={"1rem"} fontWeight={300}>
                <Text fontSize={"14px"} fontWeight={500} borderBottom={"1px solid #e8e8e8"}>
                  Category
                </Text>
                <Text color={" #84c225"} fontSize={"12px"} fontWeight={500}>
                  Fruits & Vegetables
                </Text>
                <Flex>
                  <Box width={"100%"} mt={"1.5rem"}>
                    <Box mb="1rem" borderBottom="1px solid #e8e8e8" pb={"1rem"}>
                      <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
                        Filter by Price
                      </Text>
                      <CheckboxGroup
                        colorScheme="green"
                        value={orderValue}
                        onChange={setOrderValue}
                      >
                        <VStack direction={["column", "row"]} alignItems={"baseline"} fontSize={"12px"} fontWeight={"375"}>
                          <Checkbox value="asc">Low to high</Checkbox>
                          <Checkbox value="desc">High to Low</Checkbox>
                        </VStack>
                      </CheckboxGroup>

                      <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
                        Brand
                      </Text>
                      <CheckboxGroup
                        colorScheme="green"
                        value={brandValue}
                        onChange={setBrandValue}
                      >
                        <VStack direction={["column", "row"]} alignItems={"baseline"} fontSize={"12px"} fontWeight={"375"}>
                          <Checkbox value="Organic">Organic</Checkbox>
                          <Checkbox value="Hoovu Fresh">Hoovu Fresh</Checkbox>
                          <Checkbox value="Brotos">Brotos</Checkbox>
                          <Checkbox value="Fresho">Fresho</Checkbox>
                        </VStack>
                      </CheckboxGroup>
                    </Box>
                    <Box pb={"1rem"} mb="1rem" borderBottom="1px solid #e8e8e8">
                      <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
                        Pack Size
                      </Text>
                      <CheckboxGroup
                        colorScheme="green"
                        value={sizeValue}
                        onChange={setSizeValue}
                      >
                        <VStack direction={["column", "row"]} alignItems={"baseline"} fontSize={"12px"} fontWeight={"375"}>
                          <Checkbox value="1">1 kg</Checkbox>
                          <Checkbox value="2">2 pcs</Checkbox>
                          <Checkbox value="40">40cm</Checkbox>
                          <Checkbox value="100">100 g</Checkbox>
                          <Checkbox value="250">250 g</Checkbox>
                        </VStack>
                      </CheckboxGroup>
                    </Box>
                    <Box pb={"1rem"} mb="1rem" borderBottom="1px solid #e8e8e8">
                      <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
                        Price
                      </Text>
                      <CheckboxGroup
                        colorScheme="green"
                        value={priceValue}
                        onChange={setPriceValue}
                      >
                        <VStack direction={["column", "row"]} alignItems={"baseline"} fontSize={"12px"} fontWeight={"375"}>
                          <Checkbox value="0-50">0-50</Checkbox>
                          <Checkbox value="51-100">51-100</Checkbox>
                          <Checkbox value="101-150">101-150</Checkbox>
                        </VStack>
                      </CheckboxGroup>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box width="85%" borderLeft={"1px solid #e8e8e8"}>
                <Stack width={"97%"} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                  <Text textAlign={"left"} m={"1rem"} fontSize={"20px"} fontWeight={400}>
                    Fruits & Vegetables ({product.length})
                  </Text>
                </Stack>
                <Flex flexWrap={"wrap"} borderTop={"1px solid #e8e8e8"}>
                  {product.map((e) => (
                    <ProductComponent key={e._id} props={e} />
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};
