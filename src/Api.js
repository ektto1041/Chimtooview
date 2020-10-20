import axios from 'axios';

const chId = 'UCUj6rrhMTR9pipbAWBAMvUQ';
const addr = (false) ? 'http://18.216.143.187:8080' : ''

const serverApis = {
  postPlaylist: (playlist) => new Promise((resolve, reject) => {
    axios.post(`${addr}/postPlaylist`, playlist)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylistAll: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getPlaylistAll`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
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
  getVideoAll: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAll`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllForTopFive: () => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllForTopFive`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllCountByFilter: (searchWord, searchWordPlaylist) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllCountByFilter/${searchWord}/${searchWordPlaylist}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllOrderByPaging: (category, order, searchWord, searchWordPlaylist, pageCurrent) => new Promise((resolve, reject) => {
    axios.get(`${addr}/getVideoAllOrderByPaging/${category}/${order}/${searchWord}/${searchWordPlaylist}/${pageCurrent}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  deletePlaylistAll: () => new Promise((resolve, reject) => {
    axios.delete(`${addr}/deletePlaylistAll`)
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
  test: (key) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search/?key=${key}&part=snippet&channelId=${chId}&maxResults=50`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
}

export {
  serverApis,
  youtubeApis,
};