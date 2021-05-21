module.exports = {
  siteMetadata: {
    title: `Third-Party Web`,
    description: `Analysis and reports on the impact of third party entities on the web as a whole.`,
    author: `Patrick Hulce (@patrickhulce)`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {trackingId: 'UA-20833280-8', respectDNT: true},
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout.js'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/../lib/markdown`,
        include: /\.partial\.md$/,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Third Party Web`,
        short_name: `3P Web`,
        start_url: `/`,
        background_color: `#282828`,
        theme_color: `#2eb9aa`,
        display: `minimal-ui`,
        icon: `src/images/3p-web-logo.png`, // This path is relative to the root of the site.
      },
    },
    // it's currently broken
    // `gatsby-plugin-offline`,
  ],
}
