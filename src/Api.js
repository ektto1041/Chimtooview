import axios from 'axios';

const chId = 'UCUj6rrhMTR9pipbAWBAMvUQ';
const addr = (true) ? 'http://52.78.220.84:8080' : ''

const serverApis = {
  getPlaylistAllCountByFilter: (searchWord) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getPlaylistAllCountByFilter/${searchWord}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylistAllOrderByPaging: (category, order, searchWord, pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getPlaylistAllOrderByPaging/${category}/${order}/${searchWord}/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllForTopFive: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllForTopFive`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllCountByFilter:
  (startDate, endDate,
    startViewCount, endViewCount,
    startLikeCount, endLikeCount,
    startDislikeCount, endDislikeCount,
    searchWord, searchWordPlaylist) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllCountByFilter/${startDate}/${endDate}/${startViewCount}/${endViewCount}/${startLikeCount}/${endLikeCount}/${startDislikeCount}/${endDislikeCount}/${searchWord}/${searchWordPlaylist}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllOrderByPaging:
  (category, order,
    startDate, endDate,
    startViewCount, endViewCount,
    startLikeCount, endLikeCount,
    startDislikeCount, endDislikeCount,
    searchWord, searchWordPlaylist,
    pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllOrderByPaging/${category}/${order}/${startDate}/${endDate}/${startViewCount}/${endViewCount}/${startLikeCount}/${endLikeCount}/${startDislikeCount}/${endDislikeCount}/${searchWord}/${searchWordPlaylist}/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getBoardItemAllCountByFilter: (searchWord) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getBoardItemAllCountByFilter/${searchWord}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getBoardItemAllOrderByPaging: (searchWord, pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getBoardItemAllOrderByPaging/${searchWord}/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getBoardItemById: (boardItemId) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getBoardItemById/${boardItemId}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getCommentItemAllOrderByPaging: (boardItemId, pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getCommentItemAllOrderByPaging/${boardItemId}/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getNoticeAllCount: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getNoticeAllCount`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getNoticeAllOrderByPaging: (pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getNoticeAllOrderByPaging/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getNoticeItemNew: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getNoticeItemNew`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getReloadTime: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getReloadTime`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),

  postPlaylist: (playlist) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postPlaylist`, playlist)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  postBoardItem: (boardItem) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postBoardItem`, boardItem)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  postCommentItem: (commentItem) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postCommentItem`, commentItem)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  postNoticeItem: (noticeItem) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postNoticeItem`, noticeItem)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  postReports: (reports) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postReports`, reports)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),

  deletePlaylistAll: () => new Promise((resolve, reject) => {
    axios.delete(`${addr}/deletePlaylistAll`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  deleteBoardItemById: (boardItemId) => new Promise((resolve, reject) => {
    axios.delete(`${addr}/deleteBoardItemById/${boardItemId}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  deleteCommentItemById: (commentId) => new Promise((resolve, reject) => {
    axios.delete(`${addr}/deleteCommentItemById/${commentId}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
}

// 침착맨 채널 정보를 가져오는 api
const youtubeApis = {
  getChannel: (key) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/channels/?key=${key}&part=snippet&forUsername=zilioner83`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylists: (key, channelId, nextPageToken) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlists/?key=${key}&part=snippet&channelId=${channelId}&maxResults=50${nextPageToken ? ('&pageToken=' + nextPageToken) : '' }`)
    // eslint-disable-next-line no-loop-func
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylistItems: (key, playlistId, nextPageToken) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems/?key=${key}&part=snippet&playlistId=${playlistId}&maxResults=50${nextPageToken ? ('&pageToken=' + nextPageToken) : '' }`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideos: (key, videoId) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos/?key=${key}&part=statistics,snippet,contentDetails&id=${videoId}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getMultiVideos: (key, videoIds) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos/?key=${key}&part=statistics,snippet,contentDetails&id=${videoIds}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  // TEST
  test: (key, nextPageToken) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos/?key=${key}&part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=KR&maxResults=50${nextPageToken ? ('&pageToken=' + nextPageToken) : '' }`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
}

export {
  serverApis,
  youtubeApis,
};