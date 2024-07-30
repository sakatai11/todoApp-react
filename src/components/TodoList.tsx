import { TodoListProps } from '../types/todo';
import Delete from './Delete';
import {Box} from '@mui/material';

type TodoProps = {
  todo: TodoListProps;
  deleteTodo: (id: number) => void;
}

const TodoList = ({todo, deleteTodo}:TodoProps) => {
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
      {todo.text}
      <Delete onDelete={() => deleteTodo(todo.id)}/>
    </Box>
  );
}

export default TodoList;
