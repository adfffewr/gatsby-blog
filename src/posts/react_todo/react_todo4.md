<!-- ---
title: 리액트 To Do List 만들기(4)
date: '2020-04-09'
description: 'Context 를 만들었으니 이제 Context 와 연동하여 기능을 구현 하도록 하겠습니다. Context 에 있는 state 를 받아와서 렌더링을 하고, 필요한 상황에는 특정 액션을 dispatch 하면 됩니다.'
--- -->

## 기능 구현하기

Context 를 만들었으니 이제 Context 와 연동하여 기능을 구현 하도록 하겠습니다. Context 에 있는 state 를 받아와서 렌더링을 하고, 필요한 상황에는 특정 액션을 dispatch 하면 됩니다.

### TodoHead 완성하기

**TodoHead** 에서는 done 값이 false 인 한목들의 개수를 화면에 보여줍니다.

```
// TodoHead
import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../reducers/TodoContext';

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
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);
  console.log(todos);
  return (
    <>
      <TodoHeadContainer>
        <Title>2020년 4월 1일</Title>
        <DateBox>수요일</DateBox>
        <TasksList>할 일 {undoneTasks.length}개 남음</TasksList>
      </TodoHeadContainer>
    </>
  );
};

export default TodoHead;

```

코드 저장 후, 화면에서 **할 일 1개 남음** 이 보여주고 있는지 확인해 주세요.
그 다음으로 날짜가 보여지는 부분을 Date 의 [toLocaleString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) 이라는 함수를 사용하여 작업을 하도록 하겠습니다.

```
// TodoHead
import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../reducers/TodoContext';

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
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);
  console.log(todos);
  const today = new Date();
  console.log(today);
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  return (
    <>
      <TodoHeadContainer>
        <Title>{dateString}</Title>
        <DateBox>{dayName}</DateBox>
        <TasksList>할 일 {undoneTasks.length}개 남음</TasksList>
      </TodoHeadContainer>
    </>
  );
};

export default TodoHead;

```

화면을 확인해서 날짜가 정상적으로 나오면 다음으로 넘아가도록 하겠습니다.

### TodoList 완성하기

TodoList 에서는 state 를 조회하고 이를 렌더링해주어야 합니다. 그리고, onToggle, onRemove 와 같이 항목에 변화를 주는 작업은 이 컴포넌트에서 신경 쓸 필요 없습니다. 이 작업은 우리가 각 TodoItem 에서 해줄 것입니다.

```
// TodoList.js
import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../reducers/TodoContext';

const TodoListContainer = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = () => {
  const todos = useTodoState();
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} done={todo.done} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

```

map 을 이용하여 간단하게 리스트를 반복하여 렌더링 해주었습니다.

### TodoItem 완성하기
