/**
 * Query all images in content dir then find the matching path.
 *
 * Modified from https://github.com/wesbos/Gatsby-Workshop/blob/master/notes/04%20-%20Images.md
 */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

export default function CustomImg({ src, alt }) {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: { extension: { ne: "mdx" }, relativeDirectory: { ne: "" } }
      ) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 720) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
              originalName
            }
          }
          relativePath
          relativeDirectory
        }
      }
    }
  `);
  const image = allFile.nodes.find((node) => node.relativePath === src);
  if (!image) {
    return null;
  }
  return <Img fluid={image.childImageSharp.fluid} alt={alt} />;
}
