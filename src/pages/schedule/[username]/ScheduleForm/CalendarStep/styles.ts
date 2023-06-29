import { Box, styled } from "@ignite-ui/react";

export const Container = styled(Box, {
  maxWidth: "100%",
  position: "relative",
  display: "grid",
  margin: "$6 auto 0",
  padding: 0,

  width: 540,
  gridTemplateColumns: "1fr",
});
