/** @jsx jsx */
import { Fragment } from "react";
import { jsx, Card, Text, Box } from "theme-ui";
import { WebMonetizedPaywall } from "gatsby-theme-web-monetization";
import { IfWebMonetized } from "react-web-monetization";

import ButtonDownload from "./button-download";
import Cta from "./cta";
import CustomImg from "./custom-img";

const cardStyle = {
  maxWidth: 720,
  mx: `auto`,
  mt: 5,
  mb: 3,
  padding: 2,
  pb: 4,
  borderRadius: 4,
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
  lineHeight: 1.375,
  background: `white`,
  ".dl-container": {
    minHeight: `3.5rem`,
  },
  figcaption: {
    mt: 2,
  },
  img: {
    width: `100%`,
  },
};

const Photo = ({ src, alt, caption, isFree, downloadUrl }) => {
  if (!src) return false;
  return (
    <Fragment>
      <Card as="figure" sx={cardStyle}>
        <CustomImg src={src} alt={alt || ""} />
        {caption && <Text as="figcaption">{caption}</Text>}
      </Card>
      {downloadUrl && (
        <Box className="dl-container">
          {isFree ? (
            <ButtonDownload href={downloadUrl} />
          ) : (
            <Fragment>
              <IfWebMonetized>
                <ButtonDownload href={downloadUrl} />
              </IfWebMonetized>
              <WebMonetizedPaywall>
                <Cta />
              </WebMonetizedPaywall>
            </Fragment>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Photo;
