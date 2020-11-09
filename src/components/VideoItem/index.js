import React from 'react';
import styled from 'styled-components';

import {COLOR} from '../../constants';
import {EyeOutlined, LikeOutlined, DislikeOutlined, CalendarOutlined, HistoryOutlined} from '@ant-design/icons';

const Item = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 120px;
  font-size: 1rem;

  &:nth-of-type(even) {
    background: #ececec;
  }
`;

const Thumbnail = styled.img`
  width: 28%;
  max-width: 160px;
  height: 120px;
`;

const Data = styled.div`
  width: 72%;
  height: 115px;

  overflow: hidden;
`;

const PlaylistTitle = styled.div`
  padding-left: 10px;

  height: 25px;

  line-height: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const VideoTitle = styled.div`
  padding-left: 5px;

  height: 25px;

  line-height: 25px;
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  display: flex;
  align-items: center;

  padding-left: 5px;

  height: 20px;

  line-height: 20px;
  font-size: .8rem;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;

  line-height: 20px;
  color: ${COLOR.CHIM_MAIN};
`;

const VideoItem = ({
  item,
}) => {
  return (
    <Item>
      <Thumbnail src={item.thumbnails.defaultSize} alt='blank' />
      <Data>
        <PlaylistTitle onClick={() => {window.open(`https://www.youtube.com/playlist?list=${item.playlistId}`)}}>{item.playlistTitle}</PlaylistTitle>
        <VideoTitle onClick={() => {window.open(`https://www.youtube.com/watch?v=${item.id}`)}} >
          {/* {item.title.length > 32 ?
          item.title.substring(0, 31) + '...' :
          item.title
          } */}
          {item.title}
        </VideoTitle>
        <Description>
          <Icon><EyeOutlined /></Icon>
          {item.viewCount}
          <Icon style={{ marginLeft: '10px' }}><LikeOutlined /></Icon>
          {item.likeCount}
          <Icon style={{ marginLeft: '10px' }}><DislikeOutlined /></Icon>
          {item.dislikeCount}
          <Icon style={{ marginLeft: '10px' }}><CalendarOutlined /></Icon>
          {item.publishedAt.substring(0,10)}
          <Icon style={{ marginLeft: '10px' }}><HistoryOutlined /></Icon>
          {(parseInt(item.duration / 3600) < 10 ? '0' : '') + parseInt(item.duration / 3600) + ':' +
          (parseInt((item.duration % 3600) / 60) < 10 ? '0' : '') + parseInt((item.duration % 3600) / 60) + ':' +
          ((item.duration % 60) < 10 ? '0' : '') + (item.duration % 60)}
        </Description>
        <Description>
          좋싫비 : {item.likeDislikeRate.toFixed(3)} / 좋싫차 : {item.likeDislikeGap} / 조좋비 : {item.viewLikeRate.toFixed(3)} / 조좋차 : {item.viewLikeGap}
        </Description>
        <Description>
          좋길비 : {item.likeDurationRate.toFixed(3)}
        </Description>
      </Data>
    </Item> 
  );
};

export default VideoItem;