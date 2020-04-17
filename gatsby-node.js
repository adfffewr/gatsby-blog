/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

module.exports.onCreateNode = ({ node, actions }) => {
  // md 확장자를 찾아 slug를 만든다
  const { createNodeField } = actions;
  // console.log(node);
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    // console.log(JSON.stringify(node, undefined, 4))
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

module.exports.createPages = async ({ actions, graphql }) => {
  // onCreateNode 로 만든 slug를 통해 페이즈를 만든다
  const { createPage } = actions;
  const postViewTemplate = path.resolve('./src/templates/PostViewTemplate.js');
  const postListTemplate = path.resolve('./src/templates/PostListTemplate.js');
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  // console.log(res);

  const posts = res.data.allMarkdownRemark.edges;

  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/', // Creates pages like `/blog`, `/blog/2`, etc
    component: postListTemplate, // Just like `createPage()`
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
};
