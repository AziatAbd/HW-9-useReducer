import { useReducer } from "react";
import { v4 } from "uuid";
import TodoList from "../TodoList/TodoList";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";

const initialState = {
  todos: [],
  currentTodo: "",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { text: action.payload, completed: false, id: v4() },
        ],
      };
    case "SET_CURRENT_TODO":
      return { ...state, currentTodo: action.payload };
    case "CLEAR_TODOS":
      return { ...state, todos: [] };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.index) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}

function TodoForm() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, currentTodo } = state;

  console.log(todos);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: currentTodo });
    dispatch({ type: "SET_CURRENT_TODO", payload: "" });
  }

  function handleChange(e) {
    dispatch({ type: "SET_CURRENT_TODO", payload: e.target.value });
  }

  function handleDelete(id) {
    dispatch({ type: "DELETE_TODO", payload: id });
  }

  function handleEdit(id, text) {
    dispatch({ type: "EDIT_TODO", payload: { id, text } });
  }

  function handleCompleted(id) {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }

  return (
    <>
      <h1>ToDo List</h1>
      <Form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Add Task"
          type="text"
          value={currentTodo}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={!currentTodo}
        >
          Add
        </Button>
      </Form>
      <Button
        variant="contained"
        color="error"
        onClick={() => dispatch({ type: "CLEAR_TODOS" })}
      >
        Clear Todos
      </Button>
      <hr />
      {state.todos.length === 0 ? (
        <h3>No Todo Found</h3>
      ) : (
        <List>
          {state.todos.map((todo) => (
            <TodoList
              key={todo.id}
              text={todo.text}
              id={todo.id}
              completed={todo.completed}
              onDelete={handleDelete}
              onCompleted={handleCompleted}
              onEdit={handleEdit}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default TodoForm;

const Form = styled.form`
  display: flex;
  width: 450px;
  margin: 0 auto;
  padding: 15px;
  gap: 30px;
  background-color: lightgray;
  margin-bottom: 20px;
  box-shadow: 0px 0px 33px 14px rgba(34, 60, 80, 0.2);
`;

const List = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 15px;
  background-color: lightgray;
  width: 450px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;
