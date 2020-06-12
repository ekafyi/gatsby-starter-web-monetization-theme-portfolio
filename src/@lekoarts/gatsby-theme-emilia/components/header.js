/** @jsx jsx */
import { jsx, Heading, Flex, Container, Message, Styled } from "theme-ui";
import { animated, useSpring, config } from "react-spring";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import useEmiliaConfig from "@lekoarts/gatsby-theme-emilia/src/hooks/use-emilia-config";
import HeaderBackground from "@lekoarts/gatsby-theme-emilia/src/components/header-background";
import { WebMonetizedStatus } from "gatsby-theme-web-monetization";

const linkStyle = {
  color: `primary`,
  textDecoration: `underline`,
  "&:hover": {
    color: `text`,
  },
};
const statusStyle = {
  mt: 3,
  fontSize: `0.875rem`,
  borderRadius: 4,
  lineHeight: 1.5,
};

const customInactive = (
  <Message sx={{ background: `hsla(0, 0%, 0%, 0.05)`, borderColor: `red.5` }}>
    <strong>Web Monetization is not active.</strong>
    {` `}
    <Styled.a href="https://help.coil.com/" rel="external" sx={linkStyle}>
      Consider supporting
    </Styled.a>{" "}
    and get hi-res download of these photos! 😉
  </Message>
);

const customActive = (
  <Message>
    <strong>Web Monetization is active.</strong> Thank you for your support! 🙌🏽
  </Message>
);

const Header = () => {
  const { name } = useEmiliaConfig();
  const avatar = useStaticQuery(graphql`
    query {
      file(name: { eq: "avatar" }) {
        childImageSharp {
          fixed(width: 140, height: 140, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const fadeUpProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  });
  const fadeUpPropsDelay = useSpring({
    config: config.slow,
    delay: 250,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  });
  const fadeProps = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Flex as="header" variant="layout.projectHead">
      <HeaderBackground />
      <div sx={{ textAlign: `center`, mt: 5, mb: `10rem`, zIndex: 10 }}>
        <animated.div style={fadeProps}>
          <div
            sx={{
              overflow: `hidden`,
              borderRadius: `full`,
              height: [`100px`, `140px`],
              width: [`100px`, `140px`],
              display: `inline-block`,
              boxShadow: `lg`,
              "> div:not([data-placeholder='true'])": {
                height: [`100px !important`, `140px !important`],
                width: [`100px !important`, `140px !important`],
              },
            }}
          >
            {avatar?.file?.childImageSharp?.fixed ? (
              <Img fixed={avatar.file.childImageSharp.fixed} />
            ) : (
              false
            )}
          </div>
        </animated.div>
        <animated.div style={fadeUpProps}>
          <Heading as="h1" variant="styles.h1">
            {name}
          </Heading>
          <Container>
            Example photography site with the{" "}
            <Styled.a
              href="https://github.com/ekafyi/gatsby-theme-web-monetization"
              rel="external"
              sx={linkStyle}
            >
              Gatsby Web Monetization Theme
            </Styled.a>
          </Container>
        </animated.div>
        <animated.div style={fadeUpPropsDelay}>
          {/* Customized WebMonetizedStatus component */}
          <WebMonetizedStatus
            active={customActive}
            inactive={customInactive}
            sx={statusStyle}
          />
          {/* /end WebMonetizedStatus */}
        </animated.div>
      </div>
    </Flex>
  );
};

export default Header;
