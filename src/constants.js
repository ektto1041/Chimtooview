import React from 'react';

// String
const STRING = {
  /**
   *  NAV_ITEM
   */
  NAV_ITEM_1: '요약',
  NAV_ITEM_2: '영상',
  NAV_ITEM_3: '재생목록',
  NAV_ITEM_4: '게시판',  
  NAV_ITEM_5: '공지사항',
}

// JSX
const JSX = {
  FOOTER_TEXT: (
    <>
      데이터 제공 : Youtube<br />
      제작자 : 영통구대족장 (트위치에서 가끔 방송함)<br />
      이메일 : dhkdwk1041@gmail.com
    </>
  ),
  // 용어 설명
  TERM: (
    <>
      좋싫비 : 좋아요 / 싫어요<br />
      좋싫차 : 좋아요 - 싫어요<br />
      조좋비 : 좋아요 / 조회수<br />
      조좋차 : 조회수 - 좋아요<br />
      좋길비 : 좋아요 / 길이 (초당 조회수)
    </>
  ),
}

// PATH
const PATH = {
  MAIN: '/',
  VIDEO_LIST: '/videoList',
  PLAYLIST_LIST: '/playlistList',
  BOARD: '/board',
  POST_BOARD: '/postBoard',
  BOARD_ITEM_F: (str) => (`/boardItem/${str}`),
  NOTICE: '/notice',
  POST_NOTICE: '/postNotice',
  ADMIN: '/rughj2v9uiefj2q9eifjowefj',
}

// Sort Category
const SORT_CATEGORY = {
  DATE: 0,
  VIEW_COUNT: 1,
  LIKE_COUNT: 2,
  DISLIKE_COUNT: 3,
  DURATION: 4,
  LIKE_DISLIKE_RATE: 5,
  LIKE_DISLIKE_GAP: 6,
  VIEW_LIKE_RATE: 7,
  VIEW_LIKE_GAP: 8,
  LIKE_DURATION_RATE: 9,

  VIEW_COUNT_SUM: 100,
  VIEW_COUNT_AVG: 101,
  LIKE_COUNT_SUM: 102,
  LIKE_COUNT_AVG: 103,
  DISLIKE_COUNT_SUM: 104,
  DISLIKE_COUNT_AVG: 105,
};

// Sort Order
const SORT_ORDER = {
  ASC: 0,
  DSC: 1,
};

export {
  STRING,
  JSX,
  PATH,
  SORT_CATEGORY,
  SORT_ORDER,
}