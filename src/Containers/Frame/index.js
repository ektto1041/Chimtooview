import React from 'react';

import FramePresentation from './Presentation';

const FrameContainer = ({
  history,
}) => {
  return (
    <>
      <FramePresentation
        history={history}
      />
    </>
  );
};

export default FrameContainer;