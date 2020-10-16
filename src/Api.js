import axios from 'axios';

import {key} from './Private';

const chId = 'UCUj6rrhMTR9pipbAWBAMvUQ';

const serverApis = {
  postPlaylistAll: (playlists) => new Promise((resolve, reject) => {
    axios.post(`/postPlaylistAll`, playlists)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylistAll: () => new Promise((resolve, reject) => {
    axios.get(`/getPlaylistAll`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAll: () => new Promise((resolve, reject) => {
    axios.get(`/getVideoAll`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoAllOrderByPaging: (category, order) => new Promise((resolve, reject) => {
    axios.get(`/getVideoAllOrderByPaging/${category}/${order}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  // 밑으로는 안씀
  getVideoOrderByViewCountLimit10: () => new Promise((resolve, reject) => {
    axios.get(`/getVideoOrderByViewCountLimit10`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoOrderByLikeCountLimit10: () => new Promise((resolve, reject) => {
    axios.get(`/getVideoOrderByLikeCountLimit10`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideoOrderByDislikeCountLimit10: () => new Promise((resolve, reject) => {
    axios.get(`/getVideoOrderByDislikeCountLimit10`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
}

// 침착맨 채널 정보를 가져오는 api
const youtubeApis = {
  getChannel: () => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/channels/?key=${key}&part=snippet&forUsername=zilioner83`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylists: (channelId, nextPageToken) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlists/?key=${key}&part=snippet&channelId=${channelId}&maxResults=50${nextPageToken ? ('&pageToken=' + nextPageToken) : '' }`)
    // eslint-disable-next-line no-loop-func
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getPlaylistItems: (playlistId, nextPageToken) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems/?key=${key}&part=snippet&playlistId=${playlistId}&maxResults=50${nextPageToken ? ('&pageToken=' + nextPageToken) : '' }`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
  getVideos: (videoId) => new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos/?key=${key}&part=statistics,snippet,contentDetails&id=${videoId}`)
    .then(r => resolve(r))
    .catch(e => reject(e));
  }),
}

export {
  serverApis,
  youtubeApis,
};