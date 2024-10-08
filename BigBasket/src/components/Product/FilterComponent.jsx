import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, VStack, Text, Box, Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const FilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables for filters
  const [categoryValue, setCategoryValue] = useState(
    searchParams.getAll("category") || []
  );
  const [priceValue, setPriceValue] = useState(
    searchParams.getAll("price") || []
  );
  const [orderValue, setOrderValue] = useState(
    searchParams.get("_order") || ""
  );

  // State variables for data
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setOriginalData(data);
        setFilteredData(data); // Initialize filteredData with all products
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Handler for sorting
  const handleSortChange = (e) => {
    const value = e.target.value;
    setOrderValue(value);
  };

  // Handler for category filter
  const handleCategoryChange = (value) => {
    setCategoryValue(value);
  };

  // Handler for price filter
  const handlePriceChange = (value) => {
    setPriceValue(value);
  };

  // Update search parameters and apply filters
  useEffect(() => {
    // Update the URL search parameters
    setSearchParams(
      {
        category: categoryValue,
        price: priceValue,
        _order: orderValue,
      },
      { replace: true }
    );

    // Apply filters to the original data
    let data = [...originalData];

    // Filter by category
    if (categoryValue.length > 0) {
      data = data.filter((item) => categoryValue.includes(item.category));
    }

    // Filter by price range
    if (priceValue.length > 0) {
      data = data.filter((item) => {
        return priceValue.some((range) => {
          if (range === "0-50" && item.price >= 0 && item.price <= 50)
            return true;
          if (range === "51-100" && item.price > 50 && item.price <= 100)
            return true;
          if (range === "101-150" && item.price > 100 && item.price <= 150)
            return true;
          if (range === "151+" && item.price > 150) return true;
          return false;
        });
      });
    }

    // Sort the data
    if (orderValue) {
      if (orderValue === "low") {
        data.sort((a, b) => a.price - b.price);
      } else if (orderValue === "high") {
        data.sort((a, b) => b.price - a.price);
      }
    }

    // Update the filtered data state
    setFilteredData(data);
  }, [categoryValue, priceValue, orderValue, setSearchParams, originalData]);

  return (
    <Box width={"100%"} mt={"1.5rem"}>
      {/* Sorting */}
      <Box mb="1rem" pb={"1rem"}>
        <Text fontSize={"14px"} fontWeight={"500"} mb={"0.5rem"}>
          Sort by Price
        </Text>
        <Select placeholder="Select option" onChange={handleSortChange} value={orderValue}>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </Select>
      </Box>

      {/* Category Filter */}
      <Box mb="1rem" borderBottom="1px solid #e8e8e8" pb={"1rem"}>
        <CheckboxGroup
          colorScheme="green"
          value={categoryValue}
          onChange={handleCategoryChange}
        >
          <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
            Category
          </Text>
          <VStack
            alignItems={"start"}
            fontSize={"12px"}
            fontWeight={"375"}
          >
            <Checkbox value="electronics">Electronics</Checkbox>
            <Checkbox value="jewelery">Jewelery</Checkbox>
            <Checkbox value="men's clothing">Men's Clothing</Checkbox>
            <Checkbox value="women's clothing">Women's Clothing</Checkbox>
          </VStack>
        </CheckboxGroup>
      </Box>

      {/* Price Filter */}
      <Box pb={"1rem"} mb="1rem" borderBottom="1px solid #e8e8e8">
        <CheckboxGroup
          colorScheme="green"
          value={priceValue}
          onChange={handlePriceChange}
        >
          <Text fontSize={"14px"} fontWeight={"500"} mb={"1rem"}>
            Price
          </Text>
          <VStack
            alignItems={"start"}
            fontSize={"12px"}
            fontWeight={"375"}
          >
            <Checkbox value="0-50">$0 - $50</Checkbox>
            <Checkbox value="51-100">$51 - $100</Checkbox>
            <Checkbox value="101-150">$101 - $150</Checkbox>
            <Checkbox value="151+">$151 and above</Checkbox>
          </VStack>
        </CheckboxGroup>
      </Box>

      {/* Display Filtered Products */}
      <Box mt={"2rem"}>
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <Box key={product.id} mb={"1rem"}>
              <Text fontWeight={"bold"}>{product.title}</Text>
              <Text>Price: ${product.price}</Text>
              <Text>Category: {product.category}</Text>
            </Box>
          ))
        ) : (
          <Text>No products found.</Text>
        )}
      </Box>
    </Box>
  );
};
