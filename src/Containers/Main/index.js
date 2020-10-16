import React, { useEffect, useState } from 'react';

import {serverApis} from '../../Api';

import Presentation from './Presentation';

const MainContainer = ({
  history,

  allPlaylist,
  allVideo,

  setAllPlaylist,
  setAllVideo,
}) => {
  const [topFive, setTopFive] = useState({
    publishedAt: [],
    viewCount: [],
    likeCount: [],
    dislikeCount: [],
    likeRate: [],
    likeGap: [],
    viewLikeRate: [],
    viewLikeGap: [],
  })

  const [isSpin, setIsSpin] = useState(false);

  // USE EFFECT
  useEffect(() => {
    const initFunc = async () => {
      setIsSpin(true);

      // 모든 Playlist 가져오기
      await serverApis.getPlaylistAll()
      .then(r => {
        const newAllPlaylist = r.data;

        setAllPlaylist(newAllPlaylist);

        const newAllVideo = [];
        for(let i=0; i<newAllPlaylist.length; i++) {
          const {videoList} = newAllPlaylist[i];

          for(let j=0; j<videoList.length; j++) {
            newAllVideo.push(videoList[j]);
          }
        }
        setAllVideo(newAllVideo);

        const topFiveList = Object.keys(topFive);
        
        const newTopFive = {...topFive};
        for(let i=0; i<topFiveList.length; i++) {
          // 데이터가 제대로 가져와졌으면 TopFive Sorting 작업
          if(newAllVideo.length !== 0) {
            const sortedItems = (i === 0 ? newAllVideo.sort((a, b) => {
              if(a.publishedAt > b.publishedAt) { return -1; }
              else if(b.publishedAt > a.publishedAt) { return 1; }
              else { return 0; }
            }) : newAllVideo.sort((a, b) => b[topFiveList[i]] - a[topFiveList[i]]));

            const newTopFiveItems = [];
            for(let j=0; j<5; j++) {
              newTopFiveItems.push(sortedItems[j]);
            }

            newTopFive[topFiveList[i]] = newTopFiveItems;
          }
        }

        setTopFive(newTopFive);

        setIsSpin(false);
      })
      .catch(e =>{
        console.error(e);

        setIsSpin(false);
      })
    };

    initFunc();
  }, []);

  return (
    <>
      <Presentation
        history={history}
        topFive={topFive}
        isSpin={isSpin}
      />
    </>
  );
};
export default MainContainer;