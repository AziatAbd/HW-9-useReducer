import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const TodoList = ({ text, id, completed, onCompleted, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, todoText);
    setIsEditing(false);
  };

  return (
    <Items>
      {isEditing ? (
        <>
          <TextField
            size="small"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Title bg={completed === true ? "line-through" : ""}>{text}</Title>
          <Button
            variant="outlined"
            color="success"
            onClick={() => onCompleted(id)}
          >
            Done
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDelete(id)}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
        </>
      )}
    </Items>
  );
};

export default TodoList;

const Items = styled.li`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 100px);
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: larger;
  text-decoration: ${(props) => props.bg};
`;
