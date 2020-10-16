import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 600px;

  font-size: 5rem;
  font-weight: bold;
`;

const PlListPresentation = () => {
  return (
    <Container>
      <Box>
        개발 중...
      </Box>
    </Container>
  );
};

export default PlListPresentation;