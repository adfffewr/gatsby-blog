/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  // md 확장자를 찾아 slug를 만든다
  // const { createNodeField } = actions;
  const { createNodeField } = actions;

  // console.log(node.internal);
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');

    createNodeField({
      node,
      value: slug,
      name: 'slug',
    });
  }
};

module.exports.createPages = async ({ actions, graphql }) => {
  // onCreateNode 로 만든 slug를 통해 페이즈를 만든다
  const { createPage } = actions;
  const blogViewTemplate = path.resolve('./src/templates/BlogViewTemplate.js');
  const blogListTemplate = path.resolve('./src/templates/BlogListTemplate.js');

  const portfolioListTeamplate = path.resolve(
    './src/templates/PortfolioListTeamplate.js',
  );
  const portfolioViewTeamplate = path.resolve(
    './src/templates/PortfolioViewTemplate.js',
  );

  const res = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "blog" } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
        }
      }
    }
  `);

  const res2 = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "portfolio" } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
        }
      }
    }
  `);
  // console.log(res);

  const blogs = res.data.allMarkdownRemark.edges;

  const portfolios = res2.data.allMarkdownRemark.edges;

  // console.log(blogs);

  paginate({
    createPage, // The Gatsby `createPage` function
    items: blogs, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/', // Creates pages like `/blog`, `/blog/2`, etc
    component: blogListTemplate, // Just like `createPage()`
  });

  paginate({
    createPage, // The Gatsby `createPage` function
    items: portfolios, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/portfolio', // Creates pages like `/blog`, `/blog/2`, etc
    component: portfolioListTeamplate, // Just like `createPage()`
  });

  blogs.map(edge => {
    createPage({
      component: blogViewTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  portfolios.map(edge => {
    createPage({
      component: portfolioViewTeamplate,
      path: `/portfolio/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
