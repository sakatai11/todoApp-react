import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { TodoListProps } from "./types/todo";
import Push from "./components/Push";
import TodoList from "./components/TodoList";
import Title from "./components/statusBox/Title";
import { statuses } from "./status/statuses";
// firebase
import { db } from "./utils/firebase";
import {
	doc,
	getDocs,
	addDoc,
	collection,
	deleteDoc,
	updateDoc,
	query,
	orderBy,
} from "firebase/firestore";

function App() {
	const [todos, setTodos] = useState<TodoListProps[]>([]);
	const [input, setInput] = useState("");
	const [editId, setEditId] = useState<string | null>(null);

	// 表示
	const fetchTodos = async () => {
		const q = query(collection(db, "todos"), orderBy("time", "desc"));
		const querySnapshot = await getDocs(q);
		const todosData = querySnapshot.docs.map((document) => ({
			id: document.id,
			time: document.data().time,
			text: document.data().text,
			bool: document.data().bool,
		}));
		console.log(todosData);
		setTodos(todosData as TodoListProps[]);
		return todosData.sort((a, b) => Number(a.bool) - Number(b.bool)); // 降順にする
	};

	// todo追加
	const addTodo = async () => {
		if (input) {
			const newTodo = { time: Date.now(), text: input, bool: false };
			const docRef = await addDoc(collection(db, "todos"), newTodo);
			setTodos((prevTodos) => {
				const updatedTodos = [...prevTodos, { id: docRef.id, ...newTodo }];
				return updatedTodos.sort((a, b) => {
					const boolComparison = Number(a.bool) - Number(b.bool);
					const timeComparison = b.time - a.time;
					return boolComparison || timeComparison; // 両方の条件を実行
				});
			});
			setInput("");
		} else {
			return;
		}
	};

	// 削除
	const deleteTodo = async (id: string) => {
		await deleteDoc(doc(db, "todos", id.toString())); // idをstring型に変換
		setTodos(todos.filter((todo) => todo.id !== id)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
	};

	// 編集
	const editTodo = (id: string) => {
		const todoToEdit = todos.find((todo) => todo.id === id); // todo.id が指定された id と一致するかどうかをチェック
		if (todoToEdit) {
			setInput(todoToEdit.text);
			setEditId(id);
		}
	};

	// 保存
	const saveTodo = async () => {
		if (editId !== null) {
			// trueの場合
			const todoToUpdate = todos.find((todo) => todo.id === editId);
			if (todoToUpdate) {
				await updateDoc(doc(db, "todos", editId), { text: input });
				setTodos(
					todos.map((todo) =>
						todo.id === editId ? { ...todo, text: input } : todo
					)
				);
				setInput("");
				setEditId(null);
			}
		}
	};

	// 選択状態を切り替える関数
	const toggleSelected = async (id: string) => {
		setTodos((prevTodos) => {
			// trueの場合、
			const updatedTodos = prevTodos.map((todo) =>
				todo.id === id ? { ...todo, bool: !todo.bool } : todo
			);
			return updatedTodos.sort((a, b) => Number(a.bool) - Number(b.bool)); // 降順にする
		});
		// 更新するboolの値を取得
		const todoToUpdate = todos.find((todo) => todo.id === id);
		if (todoToUpdate) {
			await updateDoc(doc(db, "todos", id), { bool: !todoToUpdate.bool });
		}
	};

	// 初期処理
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<Container maxWidth="lg">
			<Push
				clickOption={{ add: addTodo, set: setInput, text: input }}
				isEditing={editId !== null}
			/>

			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexWrap="wrap"
				gap={3}
				mt={3}
			>
				{statuses.map((status) => (
					<Box 
						key={status.title} 
						sx={{
						maxWidth: 520,
						width: '100%',
						'@media (max-width: 767px)': {
							width: '100%',
						},
					}}>
						<Title title={status.title} />
						<Box
							height={300}
							display="flex"
							flexDirection="column"
							alignItems="center"
							sx={{ border: "2px solid #cacaca", overflow: "auto" }}
							borderRadius={2}
							p={2}
						>
							{todos
								.filter((todo) => status.bool === todo.bool)
								.map((todo) => (
									<TodoList
										key={todo.id}
										todo={todo}
										clickOption={{
											deleteTodo: deleteTodo,
											editTodo: editTodo,
											saveTodo: saveTodo,
										}}
										isEditing={editId === todo.id}
										input={input}
										setInput={setInput}
										toggleSelected={() => {
											if (todo.id) {
												toggleSelected(todo.id);
											}
										}} // idがundefinedでないことを確認
									/>
								))}
						</Box>
					</Box>
				))}
			</Box>
		</Container>
	);
}

export default App;
