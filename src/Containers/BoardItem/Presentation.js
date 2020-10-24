import React from 'react';
import styled from 'styled-components';
import {Spin, Modal, Pagination} from 'antd';
import ReactHtmlParser from 'react-html-parser';
import {CloseCircleOutlined, WarningOutlined} from '@ant-design/icons';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;

  padding: 20px;
`;

const Head = styled.div`
  width: 1160px;
  height: 80px;

  padding-left: 20px;

  box-sizing: border-box;
  border-top: 3px solid gray;

  background: #ffbbd3;
`;

const Title = styled.div`
  width: 1160px;
  height: 40px;

  font-size: 1.3rem;
  font-weight: 600;
  line-height: 40px;
`;

const SubTitle = styled.div`
  display: flex;

  width: 1160px;
  height: 40px;
`;

const UserId = styled.div`
  width: 810px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const PublishedAt = styled.div`
  width: 200px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const ViewCount = styled.div`
  width: 150px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const Content = styled.div`
  width: 1160px;

  padding: 20px;

  box-sizing: border-box;
  border-top: 2px solid gray;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 1160px;
  height: 80px;

  box-sizing: border-box;
  border-bottom: 2px solid gray;
`;

const Button = styled.div`
  width: 70px;
  height: 70px;

  margin: 5px;

  line-height: 70px;
  text-align: center;
  color: #c50066;
  font-size: 2rem;

  cursor: pointer;

  transition: all .5s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const CommentItemBox = styled.div`
  width: 1160px;

  padding: 20px;

  box-sizing: border-box;
  border-bottom: 3px solid gray;
`;

const CommentItem = styled.div`
  display: flex;

  width: 1120px;
  min-height: 35px;

  & + & {
    margin-top: 10px;
  }
`;

const CommentItemUserId = styled.div`
  display: flex;
  align-items: center;

  width: 100px;
  min-height: 35px;

  padding-left: 10px;

  font-size: .85rem;
  font-weight: 600;
`;

const CommentItemContent = styled.div`
  display: flex;
  align-items: center;

  width: 870px;
  min-height: 35px;

  padding-left: 10px;
  padding-right: 10px;

  font-size: .85rem;

  box-sizing: border-box;
  border-left: .5px solid gray;
  border-right: .5px solid gray;
`;

const CommentItemDate = styled.div`
  display: flex;
  align-items: center;

  width: 100px;
  min-height: 35px;

  padding-left: 10px;

  font-size: .85rem;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  min-height: 35px;

  color: #c50066;
  font-size: 1rem;

  cursor: pointer;
`;

const CommentItemInputBox = styled.div`
  width: 100px;
  height: 75px;

  padding-top: 5px;
  padding-bottom: 5px;
`;

const CommentItemInput = styled.input`
  width: 100px;
  height: 30px;

  font-size: .9rem;

  & + & {
    margin-top: 5px;
  }
`;

const CommentItemInputContent = styled.textarea`
  width: 850px;
  height: 65px;

  margin: 5px 10px;

  resize: none;
`;

const CommentItemPost = styled.div`
  width: 140px;
  height: 65px;

  margin: 5px;

  line-height: 65px;
  color: #c50066;
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
  text-align: center;

  box-sizing: border-box;
  border: 2px solid #c50066;
  border-radius: 15px;
  outline: none;

  background: white;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    background: #c50066;
    color: white;
  }
`;

const PaginationBox = styled.div`
  display:flex;
  justify-content: center;

  margin-bottom: 10px;
`;

const ModalWrapper = styled.div`
  width: 500px;

  padding-top: 20px;
`;

const ModalButton = styled.button`
  width: 60px;
  height: 30px;

  color: red;

  box-sizing: border-box;
  outline: none;
  border: .5px solid gray;

  background: white;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    color: white;
    background: red;
  }
`;

const BoardItemPresentation = ({
  isSpin,
  isModalSpin,
  boardItem,
  contentValue,
  userIdValue,
  userPwValue,
  totalPage,
  pageCurrent,
  deleteBoardItemModalVisible,
  deleteCommentItemModalVisible,
  reportBoardItemModalVisible,
  reportCommentItemModalVisible,
  modalInputValue,
  
  onCancelDeleteBoardItemModal,
  onCancelDeleteCommentItemModal,
  onCancelReportBoardItemModal,
  onCancelReportCommentItemModal,
  onChangeModalInputValue,
  onClickDeleteBoardItem,
  onClickDeleteCommentItem,
  onClickReportBoardItem,
  onClickReportCommentItem,
  onChangeContent,
  onChangeUserId,
  onChangeUserPw,
  onClickCommentItemPost,
  onChangePageCurrent,
  onClickDeleteBoardItemInModal,
  onClickDeleteCommentItemInModal,
  onClickReportBoardItemInModal,
  onClickReportCommentItemInModal,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin}>
        <Wrapper>
          <Head>
            <Title>{boardItem.title}</Title>
            <SubTitle>
              <UserId>{boardItem.userId}</UserId>
              <PublishedAt>{boardItem?.publishedAt?.substring(0, 10) + ' ' + boardItem?.publishedAt?.substring(11,13) + ':' + boardItem?.publishedAt?.substring(14,16)}</PublishedAt>
              <ViewCount>조회수: {boardItem.viewCount}</ViewCount>
            </SubTitle>
          </Head>
          <Content>{ReactHtmlParser(boardItem.content)}</Content>
          <ButtonBox>
            <Button onClick={onClickDeleteBoardItem} ><CloseCircleOutlined /></Button>
            <Button onClick={onClickReportBoardItem}><WarningOutlined /></Button>
          </ButtonBox>
          <CommentItemBox>
            {boardItem.commentItemList?.map((commentItem, idx) => (
              <CommentItem key={idx}>
                <CommentItemUserId>{commentItem.userId}</CommentItemUserId>
                <CommentItemContent>{commentItem.content}</CommentItemContent>
                <CommentItemDate>{commentItem.publishedAt.substring(0, 10) + ' ' + commentItem.publishedAt.substring(11,13) + ':' + commentItem.publishedAt.substring(14,16)}</CommentItemDate>
                <Icon onClick={() => onClickDeleteCommentItem(idx)}><CloseCircleOutlined /></Icon>
                <Icon onClick={() => onClickReportCommentItem(idx)}><WarningOutlined /></Icon>
              </CommentItem>
            ))}
            <PaginationBox>
              <Pagination defaultCurrent={1} current={pageCurrent} onChange={onChangePageCurrent} total={totalPage} pageSize={30}/>
            </PaginationBox>
            <CommentItem>
              <CommentItemInputBox>
                <CommentItemInput maxLength='12' value={userIdValue} onChange={onChangeUserId} placeholder=" 댓글쓴이" />
                <CommentItemInput maxLength='8' value={userPwValue} onChange={onChangeUserPw} type='password' placeholder=" 비밀번호"/>
              </CommentItemInputBox>
              <CommentItemInputContent maxLength='600' value={contentValue} onChange={onChangeContent} placeholder=" 내용을 입력해주세요" />
              <CommentItemPost onClick={onClickCommentItemPost} >댓글쓰기</CommentItemPost>
            </CommentItem>
          </CommentItemBox>
        </Wrapper>
      </Spin>

      <Modal
        visible={deleteBoardItemModalVisible}
        centered
        footer={null}
        onCancel={onCancelDeleteBoardItemModal}
      >
        <ModalWrapper>
          <Spin spinning={isModalSpin}>
            <h2 style={{ fontWeight: 600 }} >정말 글을 삭제하시겠습니까?</h2>
            <p>삭제된 글을 복원할 수 없습니다.</p>
            <br />
            <CommentItemInput maxLength='8' type='password' style={{ width: 200 }} value={modalInputValue} onChange={onChangeModalInputValue} placeholder=' 비밀번호를 입력해주세요.' />
            <ModalButton onClick={onClickDeleteBoardItemInModal} style={{ marginLeft: 10 }}>삭제</ModalButton>
          </Spin>
        </ModalWrapper>
      </Modal>

      <Modal
        visible={deleteCommentItemModalVisible}
        centered
        footer={null}
        onCancel={onCancelDeleteCommentItemModal}
      >
        <ModalWrapper>
          <Spin spinning={isModalSpin}>
            <h2 style={{ fontWeight: 600 }} >정말 댓글을 삭제하시겠습니까?</h2>
            <p>삭제된 댓글을 복원할 수 없습니다.</p>
            <br />
            <CommentItemInput maxLength='8' type='password' style={{ width: 200 }} value={modalInputValue} onChange={onChangeModalInputValue} placeholder=' 비밀번호를 입력해주세요.' />
            <ModalButton onClick={onClickDeleteCommentItemInModal} style={{ marginLeft: 10 }}>삭제</ModalButton>
          </Spin>
        </ModalWrapper>
      </Modal>

      <Modal
        visible={reportBoardItemModalVisible}
        centered
        footer={null}
        onCancel={onCancelReportBoardItemModal}
      >
        <ModalWrapper>
          <Spin spinning={isModalSpin}>
            <h2 style={{ fontWeight: 600 }} >정말 글을 신고하시겠습니까?</h2>
            <p>신고된 글은 제 판단 하에 삭제될 수 있습니다.</p>
            <br />
            <CommentItemInput maxLength='50' style={{ width: 300 }} value={modalInputValue} onChange={onChangeModalInputValue} placeholder=' 이유를 간단히 입력해주세요.' />
            <ModalButton onClick={onClickReportBoardItemInModal} style={{ marginLeft: 10 }}>신고</ModalButton>
          </Spin>
        </ModalWrapper>
      </Modal>

      <Modal
        visible={reportCommentItemModalVisible}
        centered
        footer={null}
        onCancel={onCancelReportCommentItemModal}
      >
        <ModalWrapper>
          <Spin spinning={isModalSpin}>
            <h2 style={{ fontWeight: 600 }} >정말 댓글을 신고하시겠습니까?</h2>
            <p>신고된 댓글은 제 판단 하에 삭제될 수 있습니다.</p>
            <br />
            <CommentItemInput maxLength='50' style={{ width: 300 }} value={modalInputValue} onChange={onChangeModalInputValue} placeholder=' 이유를 간단히 입력해주세요.' />
            <ModalButton onClick={onClickReportCommentItemInModal} style={{ marginLeft: 10 }}>신고</ModalButton>
          </Spin>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default BoardItemPresentation;