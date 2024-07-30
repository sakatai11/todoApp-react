import { useState } from 'react'
import { Container, Box } from '@mui/material';
import { TodoListProps } from './types/todo';
import Push from './components/Push';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<TodoListProps[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    } else {
      return;
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
  };

  // console.log(todos);


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Push clickOption={{add: addTodo, set: setInput, text: input}}  />
        <Box 
          height={300}
          width={1}
          mt={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ border: '2px solid #cacaca', overflow: 'auto' }}
          borderRadius={2}
          p={2}
        >
        {
          todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} deleteTodo={deleteTodo} />
          ))
        }
        </Box>
      </Box>
    </Container>
  )
}

export default App
