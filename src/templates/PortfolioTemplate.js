import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import { palette } from '../components/common/GlobalStyles';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Helmet from 'react-helmet';
import Utterances from '../components/post/Utterances';

hljs.configure({
  languages: ['javascript', 'css', 'html', 'xml ', 'typescript'],
});

const Container = styled.section`
  display: block;
`;
const PostTitle = styled.h1`
  color: ${palette.white};
  font-size: 32px;
  font-weight: bold;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;
const PostContent = styled.div`
  display: block;
  margin: 1.5rem 0;
  h1,
  h2,
  h3,
  h4 {
    color: ${palette.white};
    font-weight: bold;
  }
  h1,
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  p {
    margin: 1.5em 0px;
    color: ${palette.white};
    font-size: 0.9rem;
  }
  p a {
    color: ${palette.green};
  }
  p a:hover {
    text-decoration: underline;
  }
  strong {
    background: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border-radius: 3px;
    font-size: 85%;
    padding: 0.2em 0.4em;
    letter-spacing: 2px;
  }
  img {
    display: block;
    max-width: 100%;
    margin: 0px auto 1.5em;
  }
  ul {
    list-style-type: disc;
    list-style-position: inside;
    margin: 0px 0px 1.5em 2em;
  }
  ul li {
    color: ${palette.white};
    font-size: 0.9rem;
  }
  pre code {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4em;
    overflow-x: auto;
    white-space: pre;
    margin: 0px 0px 1.5em;
    padding: 1.5em;
    background: rgb(1, 22, 39);
    border-radius: 4px;
  }
  @media screen and (min-width: 768px) {
    code,
    pre {
      font-size: 16px;
    }
  }
`;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        description
      }
      html
    }
  }
`;

const PortfolioTemplate = React.memo(props => {
  // console.log(props);
  const updataPre = () => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  };
  useEffect(() => {
    updataPre();
    return () => {
      updataPre();
    };
  }, []);

  return (
    <Layout>
      <Helmet
        title={props.data.markdownRemark.frontmatter.title}
        meta={[
          {
            name: `description`,
            content: props.data.markdownRemark.frontmatter.description,
          },
          {
            property: `og:title`,
            content: props.data.markdownRemark.frontmatter.title,
          },
          {
            property: `og:description`,
            content: props.data.markdownRemark.frontmatter.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },

          {
            name: `twitter:title`,
            content: props.data.markdownRemark.frontmatter.title,
          },
          {
            name: `twitter:description`,
            content: props.data.markdownRemark.frontmatter.description,
          },
        ]}
      />
      <Container>
        <PostTitle>{props.data.markdownRemark.frontmatter.title}</PostTitle>
        {/* <p>{props.data.markdownRemark.frontmatter.date}</p> */}
        <PostContent
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />

        {/* <code>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </code> */}
      </Container>
      <Utterances repo="codingpalette/gatsby-blog" />
    </Layout>
  );
});

export default PortfolioTemplate;
