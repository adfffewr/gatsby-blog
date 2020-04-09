<!-- ---
title: 리액트 To Do List 만들기(3)
date: '2020-04-05'
description: 'src 폴더에 reducers 라는 폴더를 생성하고 그 안에 TodoContext.js 파일을 생성하고, 그 안에 useReducer 를 사용하여 생태관리하는 TodoProvider 라는 컴포넌트를 만들겠습니다.'
--- -->

## 리듀서 만들기

src 폴더에 reducers 라는 폴더를 생성하고 그 안에 TodoContext.js 파일을 생성하고, 그 안에 useReducer 를 사용하여 생태관리하는 TodoProvider 라는 컴포넌트를 만들겠습니다.

### TodoContext.js

```
// TodoContext.js
import React, { useReducer, createContext } from 'react';

const initialTodos = [
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
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

```

### 커스텀 Hook 만들기

다음으로 컴포넌트에서 useContext 를 직접 사용하는 대신에, useContext 를 사용하는 커스텀 Hook 을 만들어서 내보내주겠습니다.

```
// TodoContext.js
import React, { useReducer, createContext, useContext } from 'react';

const initialTodos = [
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
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

```

이렇개 사용하면 조금 더 사용성이 편합니다. 하지만, 취향에 따라 useContext 를 컴포넌트에서 바로 사용해도 상관은 없습니다.

### nextId 값 관리하기

여기서 추가적으로 nextId 값을 위한 Context 를 만들어주겠습니다. 여기서 nextId 가 의미하는 값은 새로운 항목을 추가 할 때 사용 할 고유 ID 입니다. 이 값은, useRef 를 사용하여 관리해주도록 하겠습니다.

```
// TodoContext.js
import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
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
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}

```

### 커스텀 Hook 에서 에러 처리

우리가 만든 useTodoState, useTodoDispatch, useTodoNextId Hook 을 사용하려면, 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 합니다 (예: App 컴포넌트에서 모든 내용을 TodoProvider 로 감싸기). 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook 을 수정해보겠습니다.

```
// TodoContext.js
import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
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
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

```

꼭 이렇게 해줄 필요는 없지만, Context 사용을 위한 커스텀 Hook 을 만들 때 이렇게 에러 처리를 해준다면, 나중에 실수를 하게 됐을 때 문제점을 빨리 발견 할 수 있습니다.

### 컴포넌트 TodoProvider 로 감싸기

우리 프로젝트 모든 곳에서 Todo 관련 Context 들을 사용 할 수 있도록, App 컴포넌트에서 TodoProvider 를 불러와서 모든 내용을 TodoProvider 로 감싸주겠습니다.

```
// App.js
import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import TodoTemplate from './TodoTemplate';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { TodoProvider } from '../reducers/TodoContext';

function App() {
  return (
    <TodoProvider>
      <GlobalStyles />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;

```

이제 한번 TodoHead 컴포넌트에서 useTodoState 를 사용해보겠습니다.

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
  console.log(todos);
  return (
    <>
      <TodoHeadContainer>
        <Title>2020년 4월 1일</Title>
        <DateBox>수요일</DateBox>
        <TasksList>할 일 2개 남음</TasksList>
      </TodoHeadContainer>
    </>
  );
};

export default TodoHead;

```

이제 콘솔창을 확인해 보시면 Context 가 지니고 있는 state 가 나오고 있는것을 확인 할 수 있습니다.
