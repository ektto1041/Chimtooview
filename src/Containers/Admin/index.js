import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import AdminPresentation from './Presentation';

import {serverApis, youtubeApis} from '../../Api';

let tmp = [];

const AdminContainer = (props) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  const onClickGetDataBtn = async () => {
    setIsSpin(true);

    let channelId = null;

    await youtubeApis.getChannel()
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
      await youtubeApis.getPlaylists(channelId, nextPageToken)
      // eslint-disable-next-line no-loop-func
      .then(async r => {
        nextPageToken = r.data.nextPageToken;

        const items = r.data.items;

        // 가져온 플레이리스트 하나마다 작업함
        for(const pItem of items) {
          console.log('현재 플레이리스트' + pItem.id);

          if(pItem.id !== 'PLif_jr7pPZADUopMnmaZ1Yq84pSTrE0Dc') {
            const videoIds = [];

            // 플레이리스트의 아이템에서 VideoId 를 가져옴 (NOT Video)
            let nextPageToken_;
            do {
              await youtubeApis.getPlaylistItems(pItem.id, nextPageToken_)
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
            
            // 가져온 VideoID 를 통해 Video 를 가져와 플레이리스트 의 값으로 넣어줌
            const newVideos = [];
            for(let i=0; i<videoIds.length; i++) {
              youtubeApis.getVideos(videoIds[i])
              // eslint-disable-next-line no-loop-func
              .then(r => {
                console.log(r.data);

                for(const item of r.data.items) {
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
                    duration: item.contentDetails.duration,
                  };

                  newVideos.push(newVideo);

                  if(i === videoIds.length - 1) {
                    const newPlaylistItem = {
                      id: pItem.id,
                      // description: item.snippet.description,
                      description: '',
                      publishedAt: pItem.snippet.publishedAt,
                      thumbnails: {
                        defaultSize: (pItem.snippet.thumbnails.default?.url || ''),
                        highSize: (pItem.snippet.thumbnails.high?.url || ''),
                        maxresSize: (pItem.snippet.thumbnails.maxres?.url || ''),
                        mediumSize: (pItem.snippet.thumbnails.medium?.url || ''),
                        standardSize: (pItem.snippet.thumbnails.standard?.url || ''),
                      },
                      title: pItem.snippet.title,
                      videoList: newVideos
                    };

                    tmp.push(newPlaylistItem);
                  }
                }
              })
              .catch(e => {
                console.error(e);
              })
            }
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
    } while(nextPageToken)

    setIsSpin(false);
  };

  // DB에 데이터를 저장하는 버튼
  const onClickSaveDataBtn = async () => {
    // 서버에 보내서 DB에 저장
    setIsSpin(true);

    await serverApis.postPlaylistAll(tmp)
    .then(r => {
      console.log(r.data);
    })
    .catch(e => {
      console.error(e);
    });

    setIsSpin(false);
  };

  return (
    <>
      <AdminPresentation
        isSpin={isSpin}
        onClickGetDataBtn={onClickGetDataBtn}
        onClickSaveDataBtn={onClickSaveDataBtn}
      />
    </>
  );
};

export default AdminContainer;