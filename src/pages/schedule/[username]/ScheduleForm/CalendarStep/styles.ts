import { Box, Text, styled } from "@ignite-ui/react";

export const Container = styled(Box, {
  maxWidth: "100%",
  position: "relative",
  display: "grid",
  margin: "$6 auto 0",
  padding: 0,

  variants: {
    showTimePicker: {
      true: {
        gridTemplateColumns: "1fr 280px",

        "@media(max-width: 900px)": {
          gridTemplateColumns: "1fr",
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const TimePicker = styled("div", {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  borderLeft: "1px solid $gray600",
  padding: "$6 $6 0",
  overflowY: "scroll",
  width: 280,
});

export const TimePickerHeader = styled(Text, {
  fontWeight: "$medium",

  span: {
    color: "$gray200",
  },
});

export const TimePickerList = styled("div", {
  marginTop: "$3",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$2",

  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

export const TimePickerOption = styled("button", {
  border: 0,
  backgroundColor: "$gray600",
  padding: "$2 0",
  cursor: "pointer",
  color: "$gray100",
  borderRadius: "$sm",
  fontSize: "$sm",
  lineHeight: "$base",

  "&:last-child": {
    marginBottom: "$6",
  },

  "&:disabled": {
    background: "none",
    cursor: "default",
    opacity: 0.4,
  },

  "&:not(:disabled):hover": {
    background: "$gray500",
  },

  "&:focus": {
    boxShadow: "0 0 0 2px $colors$gray100",
  },
});
