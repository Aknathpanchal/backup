import { Heading, Box, Button } from "@chakra-ui/react";

export const Paginataion = ({ page, setPage, totalPages }) => {
  return (
    <Box className="btn-groups">
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </Button>
      <Button>{page}</Button>
      <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next
      </Button>
    </Box>
  );
};
