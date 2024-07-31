import { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material';
import { TodoListProps } from './types/todo';
import Push from './components/Push';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<TodoListProps[]>([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

   // ローカルストレージからデータを読み込む
   useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      console.log(storedTodos);
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // todosが変更されるたびにローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  
  // todo追加
  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    } else {
      return;
    }
  };

  // 削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
  };

  // 編集
  const editTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id); // todo.id が指定された id と一致するかどうかをチェック
    if (todoToEdit) {
      setInput(todoToEdit.text);
      setEditId(id);
    }
  };

  // 保存
  const saveTodo = () => {
    if (editId !== null) { // trueの場合
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, text: input } : todo
      ));
      setInput('');
      setEditId(null);
    }
  };


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Push 
          clickOption={{add: addTodo, set: setInput, text: input}} 
          isEditing={editId !== null}
          />
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
            <TodoList 
              key={todo.id} 
              todo={todo} 
              clickOption = {{deleteTodo: deleteTodo, editTodo:editTodo, saveTodo:saveTodo}} 
              isEditing={editId === todo.id}
              input={input}
              setInput={setInput}
            />
          ))
        }
        </Box>
      </Box>
    </Container>
  )
}

export default App
