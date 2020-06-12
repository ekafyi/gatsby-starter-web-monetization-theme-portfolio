/** @jsx jsx */
import { jsx, Text } from "theme-ui";

const text =
  "Want this photo? Hi-res image download is available for web monetized users. ";

const textStyle = {
  py: 2,
  fontSize: "0.875rem",
  lineHeight: 1.5,
  a: { fontWeight: 700, color: `primary` },
  "*[role=img]": { mr: ".5rem" },
};

const Cta = () => {
  return (
    <Text sx={textStyle}>
      <span role="img" aria-label="waving hand">
        👋🏼
      </span>
      {text}
      <a href="https://coil.com/" rel="external">
        Learn more.
      </a>
    </Text>
  );
};

export default Cta;
