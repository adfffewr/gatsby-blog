import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { palette } from '../common/GlobalStyles';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  border-radius: 5px;
  background: linear-gradient(145deg, #2a2f32, #32383b);
  box-shadow: 3px 3px 6px #282c2f, -3px -3px 6px #363c3f;
  a {
    color: ${palette.white};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`;

const Pagination = props => {
  const { nextPagePath, previousPagePath } = props.data;
  return (
    <>
      <Container>
        {previousPagePath && (
          <IconBox>
            <Link to={previousPagePath}>
              <FaAngleLeft />
            </Link>
          </IconBox>
        )}

        {nextPagePath && (
          <IconBox>
            <Link to={nextPagePath}>
              <FaAngleRight />
            </Link>
          </IconBox>
        )}
      </Container>
    </>
  );
};

export default Pagination;
