require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: `Gatsby Web Monetization Theme Example`,
    siteDescription: `Example site using Gatsby Web Monetization Theme by @ekafyi`,
    siteTitleAlt: `Gatsby Web Monetization Theme Example — Photography Site`,
    author: `@ekafyi`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-web-monetization`,
      options: {
        // Replace with your wallet's payment pointer
        paymentPointer: "$wallet.example.com/eka",
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-emilia`,
      // See the theme's README for all available options
      options: {
        name: `Eka’s Photography`,
        location: ``,
        socialMedia: [
          {
            title: `Github`,
            href: `gatsby-starter-web-monetization-theme-portfolio`,
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_ID,
    //   },
    // },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eka’s Photography`,
        short_name: `Eka’s Photography`,
        description: `Example photography site using Gatsby Web Monetization Theme by @ekafyi`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3182ce`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
};
