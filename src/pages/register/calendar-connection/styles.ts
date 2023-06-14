import { Box, styled } from "@ignite-ui/react";

export const ConnectionBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
});

export const ConnectionItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid $gray600",
  borderRadius: "md",
  padding: "$4 $6",
  marginBottom: "$2",
});
