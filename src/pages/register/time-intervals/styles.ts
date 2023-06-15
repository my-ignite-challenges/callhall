import { Box, styled } from "@ignite-ui/react";

export const IntervalBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
});

export const IntervalsWrapper = styled("div", {
  border: "1px solid $gray600",
  borderRadius: "$md",
  marginBottom: "$4",
});

export const Interval = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $gray600",
  },
});

export const Day = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const InputsWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(40%)",
  },
});
