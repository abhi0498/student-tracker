import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type NoDataProps = {
  height?: string;
};
const NoData = ({ height }: NoDataProps) => {
  return (
    <Container
      sx={{
        width: "100%",
        marginTop: "2rem",
        height: height || "100%",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        direction={"column"}
        sx={{
          height: "100%",
        }}
      >
        <Image
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          src="/no-data-1.svg"
          alt="No data found"
          width={200}
          height={200}
        />
        <Typography variant="h6" color="textSecondary" mt={6}>
          No data found
        </Typography>
      </Stack>
    </Container>
  );
};

export default NoData;
