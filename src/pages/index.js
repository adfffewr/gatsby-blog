import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import { palette } from '../components/common/GlobalStyles';

const Container = styled.div`
  display: block;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

const List = styled.li`
  & + li {
    margin-top: 1.5rem;
  }
  a {
    color: ${palette.white};
  }
  a:hover {
    color: ${palette.green};
  }
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

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `);
  console.log(data);

  return (
    <Layout>
      <Container>
        <h1>Home</h1>
        <ol>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <List key={edge.node.id}>
                <Link to={`/post/${edge.node.fields.slug}`}>
                  <Date datetime={edge.node.frontmatter.date}>
                    {edge.node.frontmatter.date}
                  </Date>
                  <Title>{edge.node.frontmatter.title}</Title>
                </Link>
              </List>
            );
          })}
        </ol>
      </Container>
    </Layout>
  );
};

export default IndexPage;
