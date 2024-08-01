import { TodoListProps } from '../types/todo';
import Delete from './Delete';
import Edit from './Edit';
import { Box,TextField, Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';

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
  toggleSelected: () => void;
}

const TodoList = ({todo, clickOption, isEditing, input , setInput, toggleSelected}:TodoProps) => {
  const { deleteTodo, editTodo, saveTodo } = clickOption;

  return (
    <Box 
      width={1}
      boxSizing="border-box"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={ todo.bool ? '#8f8f8f' : '' }
      sx={{
        boxShadow: 3, // 影の強さを指定
        padding: 2, // パディングを追加
        marginBottom: 1, // マージンを追加
        borderRadius: 1, // 角を丸くする
      }}
    >
      <ToggleButton
      value="check"
      selected={todo.bool}
      onChange={toggleSelected}
      sx={{
        width: 20,
        height: 20,
      }}
    >
      {todo.bool ? <CheckIcon /> : null}
    </ToggleButton>
       {isEditing ? (
        <TextField 
          variant="outlined" 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <Box
        component="span"
        sx={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingX: 1,
          maxWidth: '100%',
          '&:hover': {
            overflowX: 'auto',
          },
        }}
      >
        {todo.text}
      </Box>
      )}
      <Box
        display="flex"
        alignItems="center"
      >
        {isEditing ? (
          <Button variant="outlined" onClick={saveTodo}>保存</Button>
        ) : (
          <Edit onEdit={() => editTodo(todo.id)} />
        )}
        <Delete onDelete={() => deleteTodo(todo.id)} />
      </Box>
    </Box>
  );
}

export default TodoList;
