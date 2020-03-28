import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import { palette } from '../components/common/GlobalStyles';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

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
  h3 {
    color: ${palette.white};
    font-weight: bold;
  }
  h1 {
    font-size: 28px;
  }
  h2 {
    font-size: 1.4rem;
  }
  h3 {
    font-size: 18px;
  }
  p {
    margin: 1.5em 0px;
    color: ${palette.white};
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
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 28px;
    }
    h3 {
      font-size: 22px;
    }
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
      }
      html
    }
  }
`;

const PostTemplate = props => {
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
    </Layout>
  );
};

export default PostTemplate;
