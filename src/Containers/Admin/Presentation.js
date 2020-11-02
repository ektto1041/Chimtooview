import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

const Container = styled.div`
  width: 100%;
`;

const Message = styled.div`
  margin: 0 auto;

  height: 200px;

  line-height: 200px;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
`;

const DataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KeyInput = styled.input`
  width: 200px;
  height: 30px;

  line-height: 30px;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;

  border: 0.5px solid gray;

  background: pink;
`;

const AdminPresentation = ({
  isSpin,
  inputValue,
  onClickGetDataBtn,
  onClickSaveDataBtn,
  onChangeInput,
  onClickTest,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin}>
        <Message>
          이 페이지에 접근하셨다면 제발 나가주세요~!~!
        </Message>
        <DataBox>
          <KeyInput value={inputValue} onChange={onChangeInput} />
          <Button onClick={onClickGetDataBtn}>getData</Button>
          <Button onClick={onClickSaveDataBtn}>saveData</Button>
          <Button onClick={onClickTest}>test</Button>
        </DataBox>
      </Spin>
    </Container>
  );
};

export default AdminPresentation;