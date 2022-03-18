import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  TOGGLE_TODO_EDIT_STATUS,
} from './todoActions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

const todoReducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: state.todos,
      };
    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      return {
        ...state,
        todos: tempTodos,
      };
    case TOGGLE_TODO_EDIT_STATUS:
      const tempTodos2 = state.todos.map((e) => {
        return {
          ...e,
          canEdit: action.payload.canEdit,
        };
      });
      return {
        ...state,
        todos: tempTodos2,
      };

    case DELETE_TODO:
      const data = state.todos;
      const index = data.findIndex((item) => item.id === action.payload);
      if (index === -1)
        return {
          ...state,
        };
      data.splice(index, 1);
      return {
        ...state,
        todos: [...data],
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
};

export default todoReducer;
