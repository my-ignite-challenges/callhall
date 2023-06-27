import { Box, Text, styled } from "@ignite-ui/react";

export const ProfileBox = styled(Box, {
  display: "flex",
  flexDirection: "column",
  marginTop: "$6",
  gap: "$4",

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "$4",
  },
});

export const FormDescription = styled(Text, {
  color: "$gray200",
});
