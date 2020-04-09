---
title: 리액트 To Do List 만들기(3)
date: '2020-04-05'
description: 'src 폴더에 store 라는 폴더를 생성하고 그 안에 todoStore.js 파일을 생성하고, 그 안에 react-mobx 를 사용하여 생태관리를 하는 컴포넌트를 만들겠습니다.'
---

## 스토어 만들기

src 폴더에 store 라는 폴더를 생성하고 그 안에 todoStore.js 파일을 생성하고, 그 안에 react-mobx 를 사용하여 생태관리를 하는 컴포넌트를 만들겠습니다.
**todoStore** 를 생성 하셨다면 아래와 같이 입력해주세요.

### TodoContext.js

```
// todoStore.js
const { observable } = require('mobx');

const todoStore = observable({
  todos: [
    {
      id: 1,
      text: 'React 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'Gatsby 배우기',
      done: true,
    },
    {
      id: 3,
      text: 'node 백엔드 구현',
      done: false,
    },
  ],
  nextId: 4,
  create(data) {
    this.todos.push(data);
    this.nextId = this.nextId + 1;
  },
  toggle(data) {
    this.todos = this.todos.map((todo) => (todo.id === data.id ? { ...todo, done: !todo.done } : todo));
  },
  remove(data) {
    this.todos = this.todos.filter((todo) => todo.id !== data.id);
  },
});

export default todoStore;


```

위 코드를 작성하셨다면
**store** 폴더 안에 index.js 파일을 만들고 아래와 같이 입려해 주세요.

```
export { default as todoStore } from './todoStore';
```

지금은 todoStore 하나뿐이지만 나중에 가면 여러가지 store 를 작성해야 하므로 불러올때 {} 를 이용하기 위해 작업을 한 것입니다.

### 실제 TodoList 나타내기

**todoStore.js** 에서 작성한 todos 를 불어와 보도록 하겠습니다. TodoList.js 를 아래와 같이 입력해 주세요.

```
// TodoList.js
import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useObserver } from 'mobx-react';
import { todoStore } from '../store';

const TodoListContainer = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = () => {
  return useObserver(() => (
    <TodoListContainer>
      {todoStore.todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} done={todo.done} />
      ))}
    </TodoListContainer>
  ));
};

export default TodoList;

```

위에서 주의해서 봐야 할 것은 **useObserver** 입니다. return 안에 태그들을 감싸고 있으면 나중에 userStore 에서 데이터 값이 변경 될 시 useObserver 가 자동으로 컴포넌트를 업데이트 해줍니다.
