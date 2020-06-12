/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "@lekoarts/gatsby-theme-emilia/src/components/layout";
import HeaderProject from "@lekoarts/gatsby-theme-emilia/src/components/header-project";
import SEO from "@lekoarts/gatsby-theme-emilia/src/components/seo";
import MyMdxProvider from "../../../components/my-mdx-provider";

const Project = ({ data: { project } }) => {
  return (
    <Layout>
      <SEO
        title={project.title}
        description={project.excerpt}
        pathname={project.slug}
        image={project.cover.childImageSharp.resize.src}
      />
      <MyMdxProvider>
        <HeaderProject
          title={project.title}
          description={project.body}
          areas={[]}
          date={project.date}
        />
      </MyMdxProvider>
    </Layout>
  );
};

export default Project;
