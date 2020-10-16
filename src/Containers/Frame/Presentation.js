import React from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';

import Main from '../Main';
import VideoList from '../VideoList';
import PlList from '../PlList';
import Admin from '../Admin';

import logo from '../../img/icon.png';

const Container = styled.div`
  margin: 0 auto;

  width: 1200px;

  @media only all and (max-width: 1200px) {
    margin: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  
  background-color: #c50066;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;

  cursor: pointer;

  transition: .5s all ease;

  &:hover {
    transform: scale(1.25);
  }
`;

const NavBar = styled.div`
  display: flex;

  width: 100%;
  height: 50px;

  box-sizing: border-box;
  border-bottom: 2px solid #c50066;
`;

const NavItem = styled.div`
  width: 100px;
  height: 50px;

  line-height: 50px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  color: #c50066;

  box-sizing: border-box;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    background-color: #c50066;
    color: white;
  }
`;

const Body = styled.div`
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;

  background-color: #fea600;
`;

const FramePresentation = ({
  history,

  allPlaylist,
  allVideo,

  setAllPlaylist,
  setAllVideo,
}) => {
  return (
    <Container>
      <Header>
        <Logo src={logo} alt='' onClick={() => {history.push('/');}} />
      </Header>
      <NavBar>
        <NavItem onClick={() => {history.push('/');}}>요약</NavItem>
        <NavItem onClick={() => {history.push('/videoList');}}>영상</NavItem>
        <NavItem onClick={() => {history.push('/playlistList');}}>재생목록</NavItem>
      </NavBar>
      <Body>
        <Route path='/' exact render={() =>
        <Main
          history={history}

          allPlaylist={allPlaylist}
          allVideo={allVideo}

          setAllPlaylist={setAllPlaylist}
          setAllVideo={setAllVideo}
        />}/>
        <Route path='/videoList' component={() =>
        <VideoList
          allPlaylist={allPlaylist}
          allVideo={allVideo}
        />} />
        <Route path='/playlistList' component={() =>
        <PlList
          allPlaylist={allPlaylist}
          allVideo={allVideo}
        />} />
        <Route path='/rughj2v9uiefj2q9eifjowefj' component={Admin}/>
      </Body>
      <Footer>
        데이터 제공 : Youtube<br />
        제작자 : 영통구대족장 (트위치에서 가끔 방송함)<br />
        이메일 : dhkdwk1041@gamil.com
      </Footer>
    </Container>
  );
};

export default FramePresentation;