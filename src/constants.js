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
  MAIN: `/`,
  VIDEO_LIST: `/videoList`,
  PLAYLIST_LIST: '/playlistList',
  BOARD: '/board',
  POST_BOARD: '/postBoard',
  BOARD_ITEM_F: (str) => (`/boardItem/${str}`),
  NOTICE: '/notice',
  POST_NOTICE: '/postNotice',
  ADMIN: '/rughj2v9uiefj2q9eifjowefj',
}

// COLOR
const COLOR = {
  CHIM_MAIN: '#c50066',
  CHIM_SUB: '#fea600',
  OK_MAIN: '#e2a17f',
  OK_SUB: '#cd5948',
  CHEOL_MAIN: '#56b3d5',
  CHEOL_SUB: '#2e5ea5',
  MAGIC_MAIN: '#5d6bae',
  MAGIC_SUB: '#d8e0e8',
  DAN_MAIN: '#62534c',
  DAN_SUB: '#c4ada4',
  TEUK_MAIN: '#584e77',
  TEUK_SUB: '#bdafc0',
  PEARL_MAIN: '#facd89',
  PEARL_SUB: '#ffe7c2',
  POONG_MAIN: '#c7ad98',
  POONG_SUB: '#fcf8d3',
  TONG_MAIN: '#e88e35',
  TONG_SUB: '#fbe8d4',
  GOD_MAIN: '#c8ab95',
  GOD_SUB: '#eee4dd',
}

// Owners
const OWNER = [
  // 침착맨 0
  {
    id: 0,
    mainColor: COLOR.CHIM_MAIN,
    subColor: COLOR.CHIM_SUB,
  },
  // 옥냥이 1
  {
    id: 1,
    mainColor: COLOR.OK_MAIN,
    subColor: COLOR.OK_SUB,
  },
  // 철면수심 2
  {
    id: 2,
    mainColor: COLOR.CHEOL_MAIN,
    subColor: COLOR.CHEOL_SUB,
  },
  // 매직박 3
  {
    id: 3,
    mainColor: COLOR.MAGIC_MAIN,
    subColor: COLOR.MAGIC_SUB,
  },
  // 단군 4
  {
    id: 4,
    mainColor: COLOR.DAN_MAIN,
    subColor: COLOR.DAN_SUB,
  },
  // 김기열 5
  {
    id: 5,
    mainColor: COLOR.TEUK_MAIN,
    subColor: COLOR.TEUK_SUB,
  },
  // 주호민 6
  {
    id: 6,
    mainColor: COLOR.PEARL_MAIN,
    subColor: COLOR.PEARL_SUB,
  },
  // 풍월량 7
  {
    id: 7,
    mainColor: COLOR.POONG_MAIN,
    subColor: COLOR.POONG_SUB,
  },
  // 통닭천사 8
  {
    id: 8,
    mainColor: COLOR.TONG_MAIN,
    subColor: COLOR.TONG_SUB,
  },
  // 갓보기 9
  {
    id: 9,
    mainColor: COLOR.GOD_MAIN,
    subColor: COLOR.GOD_SUB,
  },
]

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
  COLOR,
  OWNER,
  SORT_CATEGORY,
  SORT_ORDER,
}