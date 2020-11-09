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

import chimLogo from '../../img/chim_logo.png';
import okLogo from '../../img/ok_logo.png';
import cheolLogo from '../../img/cheol_logo.png';
import magicLogo from '../../img/magic_logo.jpg';
import danLogo from '../../img/dan_logo.jpeg';
import teukLogo from '../../img/teuk_logo.png';
import pearlLogo from '../../img/pearl_logo.png';
import poongLogo from '../../img/poong_logo.jpeg';
import tongLogo from '../../img/tong_logo.jpeg';
import godLogo from '../../img/god_logo.png';
import {STRING, JSX, PATH, COLOR} from '../../constants';

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
  
  background-color: ${p => p.owner?.mainColor};

  transition: all .5s ease;

`;

const Logo = styled.img`
  width: 80px;
  height: 80px;

  box-sizing: border-box;
  border-radius: 40px;
  border: 2px solid black;

  cursor: pointer;

  transition: .5s all ease;

  &:hover {
    transform: scale(1.25);
  }
`;

const OwnerMenu = styled.div`
  display: flex;

  width: 100%;
  height: 50px;
`;

const OwnerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 10%;

  height: 50px;
`;

const SubLogo = styled.img`
  width: 40px;
  height: 40px;

  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid black;

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
  border-bottom: 2px solid ${p => p.owner?.mainColor};
`;

const NavItem = styled.div`
  width: 100px;
  height: 50px;

  line-height: 50px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  color: ${p => p.owner?.mainColor};
  user-select: none;

  box-sizing: border-box;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    background-color: ${p => p.owner?.mainColor};
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

  background-color: ${p => p.owner?.subColor};
`;

const FramePresentation = ({
  history,
  owner,

  onClickLogo,
  onClickSubLogo,
}) => {
  // 로고 OWNER의 ID 순서대로 배치 - Header의 메인 로고를 위해 만듦
  const logos = [
    chimLogo,
    okLogo,
    cheolLogo,
    magicLogo,
    danLogo,
    teukLogo,
    pearlLogo,
    poongLogo,
    tongLogo,
    godLogo,
  ];
  return (
    <Container>
      <OwnerMenu>
        <OwnerItem style={{ backgroundColor: COLOR.CHIM_MAIN }}>
          <SubLogo src={chimLogo} alt='' onClick={() => onClickSubLogo(0)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.OK_MAIN }}>
          <SubLogo src={okLogo} alt='' onClick={() => onClickSubLogo(1)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.CHEOL_MAIN }}>
          <SubLogo src={cheolLogo} alt='' onClick={() => onClickSubLogo(2)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.MAGIC_MAIN }}>
          <SubLogo src={magicLogo} alt='' onClick={() => onClickSubLogo(3)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.DAN_MAIN }}>
          <SubLogo src={danLogo} alt='' onClick={() => onClickSubLogo(4)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.TEUK_MAIN }}>
          <SubLogo src={teukLogo} alt='' onClick={() => onClickSubLogo(5)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.PEARL_MAIN }}>
          <SubLogo src={pearlLogo} alt='' onClick={() => onClickSubLogo(6)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.POONG_MAIN }}>
          <SubLogo src={poongLogo} alt='' onClick={() => onClickSubLogo(7)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.TONG_MAIN }}>
          <SubLogo src={tongLogo} alt='' onClick={() => onClickSubLogo(8)} />
        </OwnerItem>
        <OwnerItem style={{ backgroundColor: COLOR.GOD_MAIN }}>
          <SubLogo src={godLogo} alt='' />
        </OwnerItem>
      </OwnerMenu>
      <Header owner={owner}>
        <Logo src={logos[owner.id]} alt='' onClick={onClickLogo} />
      </Header>
      <NavBar owner={owner}>
        <NavItem owner={owner} onClick={() => {history.push(PATH.MAIN)}}>{STRING.NAV_ITEM_1}</NavItem>
        <NavItem owner={owner} onClick={() => {history.push(PATH.VIDEO_LIST)}}>{STRING.NAV_ITEM_2}</NavItem>
        <NavItem owner={owner} onClick={() => {history.push(PATH.PLAYLIST_LIST);}}>{STRING.NAV_ITEM_3}</NavItem>
        <NavItem owner={owner} onClick={() => {history.push(PATH.BOARD);}}>{STRING.NAV_ITEM_4}</NavItem>
        <NavItem owner={owner} onClick={() => {history.push(PATH.NOTICE);}}>{STRING.NAV_ITEM_5}</NavItem>
      </NavBar>
      <Body>
        <Route path={PATH.MAIN} exact component={() => <Main history={history} ownerId={owner.id} />}/>
        <Route path={PATH.VIDEO_LIST} component={() => <VideoList ownerId={owner.id} />} />
        <Route path={PATH.PLAYLIST_LIST} component={() => <PlList ownerId={owner.id} />} />
        <Route path={PATH.BOARD} component={Board} />
        <Route path={PATH.POST_BOARD} component={PostBoard} />
        <Route path={PATH.BOARD_ITEM_F(':boardItemId')} component={BoardItem} />
        <Route path={PATH.NOTICE} component={() => <Notice />} />
        <Route path={PATH.POST_NOTICE} component={() => <PostNotice />} />
        <Route path={PATH.ADMIN} component={Admin}/>
      </Body>
      <Footer owner={owner}>
        {JSX.FOOTER_TEXT}
      </Footer>
    </Container>
  );
};

export default FramePresentation;