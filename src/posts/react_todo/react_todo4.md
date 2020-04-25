---
title: 리액트 To Do List 만들기(4)
date: '2020-04-09'
description: 'Context 를 만들었으니 이제 Context 와 연동하여 기능을 구현 하도록 하겠습니다. Context 에 있는 state 를 받아와서 렌더링을 하고, 필요한 상황에는 특정 액션을 dispatch 하면 됩니다.'
---

## 기능 구현하기

mobx-react 를 이용해서 store를 구성 했으므로 **create toggle remove** 기능들을 구현 하도록 하겠습니다.

### TodoHead 완성하기

**TodoHead** 에서는 done 값이 false 인 한목들의 개수를 화면에 보여줍니다. 그와 동시에 다음으로 날짜가 보여지는 부분을 Date 의 [toLocaleString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) 이라는 함수를 사용하여 작업을 하도록 하겠습니다.

```
// TodoHead
import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { todoStore } from '../store';

const TodoHeadContainer = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  color: #343a40;
`;

const DateBox = styled.div`
  margin-top: 4px;
  color: #868e96;
  font-size: 21px;
`;

const TasksList = styled.div`
  color: #20c997;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const TodoHead = () => {
  const state = useLocalStore(() => ({
    undoneTasks: todoStore.todos.filter((todo) => !todo.done),
  }));
  // console.log(todos);
  const today = new Date();
  // console.log(today);
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  return useObserver(() => (
    <>
      <TodoHeadContainer>
        <Title>{dateString}</Title>
        <DateBox>{dayName}</DateBox>
        <TasksList>할 일 {state.undoneTasks.length}개 남음</TasksList>
      </TodoHeadContainer>
    </>
  ));
};

export default TodoHead;


```

위 코드에서 **useLocalStore** 를 보면 state 값을 React 의 useState 를 사용하지 않고 만들어내는 것을 확인 할 수 있습니다.
mobx-react 를 쓴다면 작성한 것 처럼 **useLocalStore** 를 이용하여 state를 생성해 주면 됩니다.

### TodoItem 완성하기

이번에는 토글과 삭제 기능을 구현해 보도록 하겠습니다.

```
// TodoItem.js
import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useObserver } from 'mobx-react';
import { todoStore } from '../store';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const TodoItem = ({ id, done, text }) => {
  const onToggle = () => {
    todoStore.toggle({ id });
  };
  const onRemove = () => {
    todoStore.remove({ id });
  };
  return useObserver(() => (
    <>
      <TodoItemContainer>
        <CheckCircle done={done} onClick={onToggle}>
          {done && <MdDone />}
        </CheckCircle>
        <Text done={done}>{text}</Text>
        <Remove onClick={onRemove}>
          <MdDelete />
        </Remove>
      </TodoItemContainer>
    </>
  ));
};

export default TodoItem;

```

이제 기능이 잘 작동되는지 확인해 보고 다음으로 넘어가 보도록 하겠습니다.

### TodoCreate 완성하기

이번에는 TodoCreate 의 기능을 완성해줄 차례입니다. 이 컴포넌트에서는 자체적으로 관리해야 할 input 상태도 있지만 그것도 mobx-react 의 **useObserver, useLocalStore** 것들을 활용해서 쉽게 만들 수 있습니다.

```
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useObserver, useLocalStore } from 'mobx-react';
import { todoStore } from '../store';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const TodoCreate = () => {
  const state = useLocalStore(() => ({
    value: '',
    onchangeValue(e) {
      this.value = e.target.value;
    },
  }));

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    todoStore.create({
      id: todoStore.nextId,
      text: state.value,
      done: false,
    });
    state.value = '';
  };

  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);
  return useObserver(() => (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input value={state.value} onChange={state.onchangeValue} autoFocus placeholder="할 일을 입력 후, Enter 를 누르세요" />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  ));
};

export default TodoCreate;

```

onSubmit 을 하게 되면 todoStore.create 함수가 작동이 되고 todoStore 에서 todos 데이터를 추가 해 줍니다. 그리고 데이터가 변화가 되면 useObserver 이 감지를 하고 컴포넌트를 자동으로 업데이트 해줍니다.

이것으로 이번 프로젝트의 모든 기능을 구현해 봤습니다.  
완성된 프로젝트는 [바로가기](https://codingpalette.github.io/react-mobx-todo/) 에서 확인 하실 수 있습니다.
