import { TodoListProps } from '../types/todo';
import Delete from './Delete';
import Edit from './Edit';
import { Box,TextField, Button } from '@mui/material';

type TodoProps = {
  todo: TodoListProps;
  clickOption : {
    deleteTodo: (id: number) => void;
    editTodo:  (id: number) => void;
    saveTodo: () => void;
  }
  isEditing: boolean;
  input: string;
  setInput: (text: string) => void;
}

const TodoList = ({todo, clickOption, isEditing, input , setInput}:TodoProps) => {

  const { deleteTodo, editTodo, saveTodo } = clickOption;

  return (
    <Box 
      width={1}
      boxSizing={"border-box"}
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
      sx={{
        boxShadow: 3, // 影の強さを指定
        padding: 2, // パディングを追加
        marginBottom: 1, // マージンを追加
        borderRadius: 1, // 角を丸くする
      }}
    >
       {isEditing ? (
        <TextField 
          variant="outlined" 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <Button variant="outlined" onClick={saveTodo}>保存</Button>
        ) : (
          <Edit onEdit={() => editTodo(todo.id)} />
        )}
        <Delete onDelete={() => deleteTodo(todo.id)} />
      </div>
    </Box>
  );
}

export default TodoList;
