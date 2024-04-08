import { Box, SimpleGrid } from "@chakra-ui/react";

export const ResponsiveStyle = () => {
  const item = new Array(12).fill(0).map((a, i) => i + 1);
  console.log(item);

  return (
    <Box>
      <SimpleGrid
        columns={{
          base: "1",
          sm: "2",
          md: "3",
          lg: "4",
          xl: "5"
        }}
        spacing={10}
      >
        {item.map((el) => (
          <Box bg="tomato" height="80px" key={el}>
            {el}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
