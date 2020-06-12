import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Photo from "./photo";

const components = {
  Photo,
};

const MyMdxProvider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MyMdxProvider;
