import React from 'react';
import styled from 'styled-components';

import {EyeOutlined, LikeOutlined, DislikeOutlined, CalendarOutlined} from '@ant-design/icons';

const Item = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 90px;
  font-size: 1rem;

  &:nth-of-type(even) {
    background: #ececec;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
`;

const Data = styled.div`
  height: 80px;
`;

const PlaylistTitle = styled.div`
  padding-left: 10px;

  height: 30px;

  line-height: 30px;
  font-size: 1.1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  display: flex;
  align-items: center;

  padding-left: 5px;

  height: 25px;

  line-height: 25px;
  font-size: .8rem;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;

  line-height: 20px;
  color: #c50066;
`;

const PlaylistItem = ({
  item,
}) => {
  return (
    <Item>
      <Thumbnail src={item.thumbnails.defaultSize} alt='blank' />
      <Data>
        <PlaylistTitle onClick={() => {window.open(`https://www.youtube.com/playlist?list=${item.id}`)}}>{item.title}</PlaylistTitle>
        <Description>
          <Icon><EyeOutlined /></Icon>
          {item.viewCountSum}
          <Icon style={{ marginLeft: '10px' }}><LikeOutlined /></Icon>
          {item.likeCountSum}
          <Icon style={{ marginLeft: '10px' }}><DislikeOutlined /></Icon>
          {item.dislikeCountSum}
          <Icon style={{ marginLeft: '10px' }}><CalendarOutlined /></Icon>
          {item.publishedAt.substring(0,10)}
        </Description>
        <Description>
          <Icon><EyeOutlined /></Icon>
          {item.viewCountAvg.toFixed(3)}
          <Icon style={{ marginLeft: '10px' }}><LikeOutlined /></Icon>
          {item.likeCountAvg.toFixed(3)}
          <Icon style={{ marginLeft: '10px' }}><DislikeOutlined /></Icon>
          {item.dislikeCountAvg.toFixed(3)}
        </Description>
      </Data>
    </Item> 
  );
};

export default PlaylistItem;