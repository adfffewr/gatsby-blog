import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import { palette } from '../components/common/GlobalStyles';
import SEO from '../components/seo';
import Pagination from '../components/post/Pagination';
import Img from 'gatsby-image';

const Container = styled.div`
  display: block;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

const ListBox = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.li`
  border-radius:3px;
  overflow:hidden;
  width:300px;
  height:300px;
  margin-bottom:28px;
  transition:0.2s;
  &:hover{
    transform:translateY(-5px);
  }
  a{
    display:block;
    width:100%;
    height:100%;
    /* padding:1.25rem; */
    background: rgb(63, 68, 71);
    box-sizing:border-box;
    color:${palette.white};
    
  }
  
  /* & + li {
    margin-top: 1.5rem;
  }
  a {
    color: ${palette.white};
  }
  a:hover {
    color: ${palette.green};
  } */
`;
const Date = styled.time`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${palette.green};
`;
const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 5px 0;
`;
// const TextContent = styled.div`
//   p {
//     font-size: 0.9rem;
//     font-weight: bold;
//   }
// `;

const PortfolioListTeamplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Portfolio" />
      <Container>
        <h1>Portfolio</h1>
        <ListBox>
          {posts.map(edge => {
            return (
              <List key={edge.node.id}>
                <Link to={`/portfolio/${edge.node.fields.slug}`}>
                  <Img
                    fluid={
                      edge.node.frontmatter.featuredImage.childImageSharp.fluid
                    }
                  />
                  <Title>{edge.node.frontmatter.title}</Title>
                </Link>
              </List>
            );
          })}
        </ListBox>
        <Pagination data={pageContext} />
      </Container>
    </Layout>
  );
};

export default PortfolioListTeamplate;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "portfolio" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
