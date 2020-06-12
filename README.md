# Gatsby Theme Web Monetization — Portfolio Site Example

_Usage example of [gatsby-theme-web-monetization](https://github.com/ekafyi/gatsby-theme-web-monetization/) for a photography site, which includes importing and modifying components._

[🔗 Demo](http://gtwm-example-portfolio.netlify.app)

[🛠 Step-by-step post on how I add the theme to this site](https://gist.github.com/ekafyi/ab7b6b50518d78ffa0b657cb6300a4f9)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ekafyi/gatsby-starter-web-monetization-theme-portfolio)

---

## ❓ How to use


1. Clone this repository to make a new site from this example
	* …or use the Gatsby CLI, `gatsby new my-monetized-site https://github.com/ekafyi/gatsby-starter-web-monetization-theme-portfolio`
	* …or use the Netlify deploy button above
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
