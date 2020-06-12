# Gatsby Theme Web Monetization — Portfolio Site Example

Usage example of [gatsby-theme-web-monetization](https://github.com/ekafyi/gatsby-theme-web-monetization/) for a photography site, which contains more advanced customization than the [basic example](https://github.com/ekafyi/gatsby-theme-web-monetization/tree/master/example).

[🔗 Demo](http://gtwm-example-portfolio.netlify.app)

---

## ❓ How to use


1. Clone [the starter site](https://github.com/ekafyi/gatsby-starter-web-monetization-theme-portfolio) to make a new site from this example
	* …or use the Gatsby CLI, `gatsby new my-monetized-site https://github.com/ekafyi/gatsby-starter-web-monetization-theme-portfolio`
	* …or use the [Netlify one-click deploy](https://app.netlify.com/start/deploy?repository=https://github.com/ekafyi/gatsby-starter-web-monetization-theme-portfolio)
2. Add your payment pointer in `gatsby-config.js`
3. Add your content in `content`
4. ??
5. Profit

Head to the themes’ documentation for more information about their usage:
- [gatsby-theme-web-monetization](https://github.com/ekafyi/gatsby-theme-web-monetization)
- [gatsby-theme-emilia](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emilia)

## ⚠️ Warning

This example serves as an MVP which aims to demonstrates how the Web Monetization API works.

Wrapping your “exclusive” (monetized-only) content in the `IfWebMonetized` component _is not secure_. The content still gets sent, just not rendered; it will be easy for tech-savvy visitors to find it. Don’t use it for sensitive data, and consider using serverless/cloud functions for better security.

Also, make sure your source code (eg. Github repository) is set to private. 😬

## 🛠 How I made this example site

In this site, I combine gatsby-theme-web-monetization with the excellent [Emilia Theme by LekoArts](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emilia) using its starter site. Then I continue with the steps below.

0) Install the theme.

```bash
yarn add gatsby-theme-web-monetization
# or npm install --save gatsby-theme-web-monetization
```

1) Add theme to gatsby-config. The order does not matter with the plugins used in this repo. If you use this with other plugins and encounter issues, you may have to do some trial and error regarding the plugins order.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-web-monetization`,
      options: {
        // Replace with your wallet's payment pointer
        paymentPointer: "$wallet.example.com/eka",
      },
    },
    // ... other themes
  ]
}
```

2) As shown in the [basic example](https://github.com/ekafyi/gatsby-theme-web-monetization/tree/master/example), we can use the theme’s components in MDX pages without importing anything. Additionally, we can also use them in our components outside of MDX by importing them. 

In this example, I import the `WebMonetizedStatus` component and add it to the header.

```js
// src/@lekoarts/gatsby-theme-emilia/components/header.js

// ... other imports
import { WebMonetizedStatus } from "gatsby-theme-web-monetization";

// Pass your message/content as props to the WebMonetizedStatus component
const customActive = "String or component to render if Web Monetization is active";
const customInactive = "String or component to render if Web Monetization is not active";

const Header = () => {
  return (
    <>
      {/* ... header component code */}
      <WebMonetizedStatus
        active={customActive}
        inactive={customInactive}
      />
      {/* ... more header component code */}
    </>
  );
};

export default Header;
```

- See [theme documentation](https://github.com/ekafyi/gatsby-theme-web-monetization/#usage) for the list of components you can use.
- In the full code, I use the `sx` props for styling with Theme UI. You can use any other styling methods (Styled Components, CSS Modules, add Tailwind CSS class names, etc).
- This file structure comes from [“shadowing”](https://www.gatsbyjs.org/docs/themes/shadowing) the Emilia theme, ie. overriding the theme’s `Header` component with my modified one. You _can_ use the gatsby-theme-web-monetization components anywhere, regardless of the theme shadowing concept.

Now for each photograph, I want to do these:
- Display hi-res image download link _only_ to web monetized users
- Display call to action/message to non-web monetized users

I _can_ achieve it this way in an MDX page. (This is a barebones simplified example which has not addressed CSS styling.)

```mdx
---
title: My test post
date: 2020-06-03
---

![Description of the photo](./images/some-source.jpg)

<figcaption>Some image caption here</figcaption>

<IfWebMonetized>

[Download hi-res image](https://dropbox.com/some-download-link)

</IfWebMonetized>

<WebMonetizedPaywall>

👋🏼 Want this photo? Hi-res image download is available for web monetized users. [Learn more.](https://coil.com)

</WebMonetizedPaywall>
```

But it’s tedious, messy, and impractical to repeat these lines for _every photograph and every series page_. We can abstract these away into a reusable component, as shown in the next step.

3) Create a `Photo` component that renders an image from the specified source, a download link for monetized users, and a message for non-monetized users.


```js
// src/components/photo.js (truncated to relevant parts)

// ... other imports
import { WebMonetizedPaywall } from "gatsby-theme-web-monetization";
import { IfWebMonetized } from "react-web-monetization";

import ButtonDownload from "./button-download";
import Cta from "./cta";
import CustomImg from "./custom-img";

const Photo = ({ src, alt, caption, isFree, downloadUrl }) => {
  return (
    <>
      <CustomImg src={src} alt={alt || ""} />
      {caption && <figcaption>{caption}</figcaption>}
      {downloadUrl &&
        (isFree ? (
          <ButtonDownload href={downloadUrl} />
        ) : (
          <>
            <IfWebMonetized>
              <ButtonDownload href={downloadUrl} />
            </IfWebMonetized>
            <WebMonetizedPaywall>
              <Cta />
            </WebMonetizedPaywall>
          </>
        ))}
    </>
  );
};

export default Photo;
```

- We import `WebMonetizedPaywall` and `IfWebMonetized` (the latter from [react-web-monetization](https://github.com/sharafian/react-web-monetization), which is a dependency of this theme; you don’t need to install it yourself to import the components).
- We create and import UI components `ButtonDownload` (the “Download” button) and `Cta` (the call-to-action message). We also have utility component `CustomImg` to query for image and process it through Gatsby’s Sharp image library (which has neat capabilities like lazy loading, auto resizing, `srcset` attribute, etc).  These are just an example; you can use any approach, styling decisions, and add or remove any functionalities.
- We add `ButtonDownload` inside `IfWebMonetized` to display to web monetized users, and add `Cta` inside `WebMonetizedPaywall` for non web monetized users.
- In case I want to make some of my photos downloadable by _all_ users, I also have an `isFree` prop.

This `Photo` component is not yet available for use in MDX pages. We can either import it (which will also be tedious as we have to do it on every page), or we can create our own MDX Provider and pass the `Photo` component there, which will allow us to use `Photo` in our MDX pages without importing.

4. Create a custom MDXProvider component and pass our `Photo` component there. I’m calling it `MyMdxProvider`.

```js
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Photo from "./photo";

const components = { Photo };

const MyMdxProvider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MyMdxProvider;
```

If you build your Gatsby site without a theme, add the `Photo` component to your existing MDXProvider instead, and skip the next step. [Learn more about MDX Provider.](https://mdxjs.com/getting-started#mdxprovider)


5. We need to wrap our project content with our new `MyMdxProvider` so we can use the `Photo` component without importing. We can do so by shadowing the Emilia theme’s project page layout.

```js
// src/@lekoarts/gatsby-theme-emilia/components/project.js

// ...other imports
import MyMdxProvider from "../../../components/my-mdx-provider";

const Project = ({ data: { project } }) => {
  return (
    <Layout>
      <SEO // ... props
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
```

6. Finally, we use the `Photo` component in MDX pages.

```mdx
---
title: Sleeping Cats
date: 2020-06-03
---

<Photo
  src="sleeping-cats/images/sc1.jpg"
  caption="This is not an apple"
  alt="Gray tabby kitten sleeping in a wooden storage box that said 'Apples' atop of a pile of newspapers. The handle is full of scratches."
  downloadUrl="https://www.dropbox.com/s/nu0xrsje9npbdlx/full_sc1.jpg?dl=0"
/>
```

- (Nothing to do with gatsby-theme-web-monetization, just how this `Photo` component works.) Due to how the GraphQL file query works, the photo `src` value is relative to the `projects` path, NOT the MDX file. For instance, for image file located in `content/projects/sleeping-cats/images/sc1.jpg`, we write `src="sleeping-cats/images/sc1.jpg"`.
