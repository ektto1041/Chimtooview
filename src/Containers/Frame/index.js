import React, {useState} from 'react';

import FramePresentation from './Presentation';

const FrameContainer = ({
  history,
}) => {
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [allVideo, setAllVideo] = useState([]);

  return (
    <>
      <FramePresentation
        history={history}

        allPlaylist={allPlaylist}
        allVideo={allVideo}

        setAllPlaylist={setAllPlaylist}
        setAllVideo={setAllVideo}
      />
    </>
  );
};

export default FrameContainer;