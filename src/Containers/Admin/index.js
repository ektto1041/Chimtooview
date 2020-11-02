import React, {useState} from 'react';

import AdminPresentation from './Presentation';

import {serverApis, youtubeApis} from '../../Api';

let tmp = [];

const AdminContainer = (props) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // Input
  const [inputValue, setInputValue] = useState('');
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onClickTest = async () => {
    let nextPageToken;
    do {
      await youtubeApis.test(inputValue, nextPageToken)
      // eslint-disable-next-line no-loop-func
      .then(r => {
        nextPageToken = r.data.nextPageToken;

        console.log(r.data);
      })
    } while(nextPageToken)
  }

  const onClickGetDataBtn = async () => {
    setIsSpin(true);

    let channelId = null;

    await youtubeApis.getChannel(inputValue)
    .then(r => {
        channelId = r.data.items[0].id;

        console.log(r.data);
    })
    .catch(e => {
        console.error(e);
    });

    /**
     *  모든 플레이리스트를 가져옴
     */
    let nextPageToken;
    do {
      await youtubeApis.getPlaylists(inputValue, channelId, nextPageToken)
      // eslint-disable-next-line no-loop-func
      .then(async r => {
        nextPageToken = r.data.nextPageToken;

        const playlists = r.data.items;

        // 가져온 플레이리스트 하나마다 작업함
        for(let i=0; i<playlists.length; i++) {
          console.log('현재 플레이리스트' + playlists[i].id);

          if(playlists[i].id !== 'PLif_jr7pPZADUopMnmaZ1Yq84pSTrE0Dc') {
            const videoIds = [];

            // 플레이리스트의 아이템에서 VideoId 를 가져옴 (NOT Video)
            let nextPageToken_;
            do {
              await youtubeApis.getPlaylistItems(inputValue, playlists[i].id, nextPageToken_)
              // eslint-disable-next-line no-loop-func
              .then(r => {
                nextPageToken_ = r.data.nextPageToken;

                for(let i=0; i<r.data.items.length; i++) {
                  videoIds.push(r.data.items[i].snippet.resourceId.videoId);
                }
              })
              .catch(e => {
                console.error(e);
              });
            } while(nextPageToken_)

            const newVideos = [];
            for(let j=0; j < videoIds.length; j += 50) {
              /**
               * 50개씩 비디오아이디 묶기
               */
              const slicedVideoIds = videoIds.slice(j, j + 50);

              await youtubeApis.getMultiVideos(inputValue, slicedVideoIds.join(','))
              .then(r => {
                console.log(r.data);

                for(const item of r.data.items) {
                  // duration 을 초 단위로 변환하는 로직
                  let durationStr = item.contentDetails.duration.substring(2, item.contentDetails.duration.length);

                  const durationArr = [];
                  if(durationStr.includes('H')) {
                    const splitedStr = durationStr.split('H');

                    durationArr.push(parseInt(splitedStr[0]));
                    durationStr = splitedStr[1];
                  } else {
                    durationArr.push(0);
                  }
                  if(durationStr.includes('M')) {
                    const splitedStr = durationStr.split('M');

                    durationArr.push(parseInt(splitedStr[0]));
                    durationStr = splitedStr[1];
                  } else {
                    durationArr.push(0);
                  }
                  if(durationStr.includes('S')) {
                    const splitedStr = durationStr.split('S');

                    durationArr.push(parseInt(splitedStr[0]));
                  } else {
                    durationArr.push(0);
                  }

                  const durationInt = durationArr[2] + (durationArr[1] * 60) + (durationArr[0] * 60 * 60);

                  const newVideo = {
                    id: item.id,
                    publishedAt: item.snippet.publishedAt,
                    thumbnails: {
                      defaultSize: (item.snippet.thumbnails.default?.url || ''),
                      highSize: (item.snippet.thumbnails.high?.url || ''),
                      maxresSize: (item.snippet.thumbnails.maxres?.url || ''),
                      mediumSize: (item.snippet.thumbnails.medium?.url || ''),
                      standardSize: (item.snippet.thumbnails.standard?.url || ''),
                    },
                    title: item.snippet.title,
                    commentCount: item.statistics.commentCount,
                    dislikeCount: item.statistics.dislikeCount,
                    likeCount: item.statistics.likeCount,
                    viewCount: item.statistics.viewCount,
                    duration: durationInt,
                  };

                  newVideos.push(newVideo);
                }
              })
              .catch(e => {
                console.error(e);
              })
            }
            const newPlaylistItem = {
              id: playlists[i].id,
              // description: item.snippet.description,
              description: '',
              publishedAt: playlists[i].snippet.publishedAt,
              thumbnails: {
                defaultSize: (playlists[i].snippet.thumbnails.default?.url || ''),
                highSize: (playlists[i].snippet.thumbnails.high?.url || ''),
                maxresSize: (playlists[i].snippet.thumbnails.maxres?.url || ''),
                mediumSize: (playlists[i].snippet.thumbnails.medium?.url || ''),
                standardSize: (playlists[i].snippet.thumbnails.standard?.url || ''),
              },
              title: playlists[i].snippet.title,
              videoList: newVideos
            };

            console.log(tmp);

            tmp.push(newPlaylistItem);
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
    } while(nextPageToken)

    console.log('END');
    console.log(tmp);

    setIsSpin(false);
  };

  // DB에 데이터를 저장하는 버튼
  const onClickSaveDataBtn = async () => {
    // 서버에 보내서 DB에 저장
    setIsSpin(true);

    await serverApis.deletePlaylistAll();
    
    for(let i=0; i<tmp.length; i++) {
      await serverApis.postPlaylist(tmp[i])
      .then(r => {
        console.log(r.data);
      })
      .catch(e => {
        console.error(e);
      });
    }

    setIsSpin(false);
  };

  return (
    <>
      <AdminPresentation
        isSpin={isSpin}
        inputValue={inputValue}
        onClickGetDataBtn={onClickGetDataBtn}
        onClickSaveDataBtn={onClickSaveDataBtn}
        onChangeInput={onChangeInput}
        onClickTest={onClickTest}
      />
    </>
  );
};

export default AdminContainer;