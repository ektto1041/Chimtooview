import React from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';

import Main from '../Main';
import VideoList from '../VideoList';
import PlList from '../PlList';
import Board from '../Board';
import PostBoard from '../PostBoard';
import BoardItem from '../BoardItem';
import Notice from '../Notice';
import PostNotice from '../PostNotice';
import Admin from '../Admin';

import logo from '../../img/icon.png';
import {STRING, JSX, PATH} from '../../constants';

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
  user-select: none;

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
}) => {
  return (
    <Container>
      <Header>
        <Logo src={logo} alt='' onClick={() => {history.push(PATH.MAIN);}} />
      </Header>
      <NavBar>
        <NavItem onClick={() => {history.push(PATH.MAIN);}}>{STRING.NAV_ITEM_1}</NavItem>
        <NavItem onClick={() => {history.push(PATH.VIDEO_LIST);}}>{STRING.NAV_ITEM_2}</NavItem>
        <NavItem onClick={() => {history.push(PATH.PLAYLIST_LIST);}}>{STRING.NAV_ITEM_3}</NavItem>
        <NavItem onClick={() => {history.push(PATH.BOARD);}}>{STRING.NAV_ITEM_4}</NavItem>
        <NavItem onClick={() => {history.push(PATH.NOTICE);}}>{STRING.NAV_ITEM_5}</NavItem>
      </NavBar>
      <Body>
        <Route path={PATH.MAIN} exact render={() =>
        <Main
          history={history}
        />}/>
        <Route path={PATH.VIDEO_LIST} component={() => <VideoList />} />
        <Route path={PATH.PLAYLIST_LIST} component={() => <PlList />} />
        <Route path={PATH.BOARD} component={Board} />
        <Route path={PATH.POST_BOARD} component={PostBoard} />
        <Route path={PATH.BOARD_ITEM_F(':boardItemId')} component={BoardItem} />
        <Route path={PATH.NOTICE} component={() => <Notice />} />
        <Route path={PATH.POST_NOTICE} component={() => <PostNotice />} />
        <Route path={PATH.ADMIN} component={Admin}/>
      </Body>
      <Footer>
        {JSX.FOOTER_TEXT}
      </Footer>
    </Container>
  );
};

export default FramePresentation;