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
  const postViewTemplate = path.resolve('./src/templates/PostViewTemplate.js');
  const postListTemplate = path.resolve('./src/templates/PostListTemplate.js');

  const portfolioListTeamplate = path.resolve(
    './src/templates/PortfolioListTeamplate.js',
  );
  const portfolioTeamplate = path.resolve(
    './src/templates/PortfolioTemplate.js',
  );

  const res = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "post" } } }
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

  const posts = res.data.allMarkdownRemark.edges;

  const portfolios = res2.data.allMarkdownRemark.edges;

  // console.log(posts);

  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/', // Creates pages like `/blog`, `/blog/2`, etc
    component: postListTemplate, // Just like `createPage()`
  });

  paginate({
    createPage, // The Gatsby `createPage` function
    items: portfolios, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/portfolio', // Creates pages like `/blog`, `/blog/2`, etc
    component: portfolioListTeamplate, // Just like `createPage()`
  });

  posts.map(edge => {
    createPage({
      component: postViewTemplate,
      path: `/post/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  portfolios.map(edge => {
    createPage({
      component: portfolioTeamplate,
      path: `/portfolio/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
