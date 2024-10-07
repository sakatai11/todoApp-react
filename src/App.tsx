import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TodoListProps } from "./types/todos";
import Push from "./components/Push";
import TodoList from "./components/TodoList";
import Title from "./components/statusBox/Title";
import { statusesPull } from "./status/statuses";
import { jstTime } from "./utils/dateUtils";
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
	const [todos, setTodos] = useState<TodoListProps[]>([]); // データ
	const [input, setInput] = useState({
		text: "",
		status: "",
	});
	const [editId, setEditId] = useState<string | null>(null); // 編集したリストのID
	const [error, setError] = useState({
		listPushArea: false,
		listModalArea: false,
	});

	// 表示
	const fetchTodos = async () => {
		const q = query(collection(db, "todos"), orderBy("time", "desc"));
		const status = query(collection(db, "statuses"));
		const querySnapshot = await getDocs(q);
		const statusSnapshot = await getDocs(status);
		const todosData = querySnapshot.docs.map((document) => ({// オブジェクトにとして格納
			id: document.id,
			time: document.data().time,
			text: document.data().text,
			status: document.data().status,
			bool: document.data().bool,
		}));

		const statusData = statusSnapshot.docs.map((document) =>({// オブジェクトにとして格納
        id: document.id,
        category: document.data().category
		}));
		console.log(todosData);
		console.log(statusData);
		const sortedTodos = todosData.sort((a, b) => {
			const boolComparison = Number(b.bool) - Number(a.bool);
			const timeComparison = b.time - a.time;
			return boolComparison || timeComparison; // 両方の条件を実行
		});
		setTodos(sortedTodos as TodoListProps[]);
		return sortedTodos;
	};

	// todo追加
	const addTodo = async () => {
		if (input.text && input.status) {
			const newTodo = {
				time: jstTime().getTime(),
				text: input.text,
				bool: false,
				status: input.status,
			};
			const docRef = await addDoc(collection(db, "todos"), newTodo);
			setTodos((prevTodos) => {
				const updatedTodos = [...prevTodos, { id: docRef.id, ...newTodo }];
				return updatedTodos.sort((a, b) => {
					const boolComparison = Number(b.bool) - Number(a.bool);
					const timeComparison = b.time - a.time;
					return boolComparison || timeComparison; // 両方の条件を実行
				});
			});
			setInput({ text: "", status: "" });
			setError({ ...error, listPushArea: false }); // エラーをリセット
		} else {
			setError({ ...error, listPushArea: true }); // エラー表示
			return;
		}
	};

	// 削除
	const deleteTodo = async (id: string) => {
		await deleteDoc(doc(db, "todos", id.toString())); // idをstring型に変換
		setTodos(todos.filter((todo) => todo.id !== id)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
	};

	// 編集（モーダル内）
	const editTodo = (id: string) => {
		const todoToEdit = todos.find((todo) => todo.id === id); // todo.id が指定された id と一致するかどうかをチェック
		if (todoToEdit) {
			setInput({ ...input, text: todoToEdit.text, status: todoToEdit.status });
			setEditId(id);
		}
	};

	// 選択状態を切り替える関数
	const toggleSelected = async (id: string) => {
		setTodos((prevTodos) => {
			// trueの場合、
			const updatedTodos = prevTodos.map((todo) =>
				todo.id === id ? { ...todo, bool: !todo.bool } : todo
			);
			return updatedTodos.sort((a, b) => Number(b.bool) - Number(a.bool));
		});

		// 更新するboolの値を取得
		const todoToUpdate = todos.find((todo) => todo.id === id);
		if (todoToUpdate) {
			await updateDoc(doc(db, "todos", id), { bool: !todoToUpdate.bool });
		}
	};

	// 保存
	const saveTodo = async () => {
		if (editId !== null) {
			// trueの場合
			const todoToUpdate = todos.find((todo) => todo.id === editId);
			if (todoToUpdate && input.text && input.status) {
				await updateDoc(doc(db, "todos", editId), {
					text: input.text,
					status: input.status,
					time: jstTime().getTime(),
				});
				console.log(input);
				setTodos(
					todos.map((todo) =>
						todo.id === editId
							? { ...todo, text: input.text, status: input.status }
							: todo
					)
				);
				setInput({ text: "", status: "" });
				setEditId(null);
				setError({ ...error, listModalArea: false }); // エラーをリセット
			} else {
				setError({ ...error, listModalArea: true }); // エラーを表示
				return;
			}
		}
	};

	// 初期処理
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<Box>
			<Push
				clickOption={{
					addTodo: addTodo,
					setInput: (inputValue) => setInput(inputValue),
					setEditId: setEditId,
					input: input,
				}}
				isEditing={editId !== null} // idがない場合はfalse
				error={error.listPushArea}
				setError={(pushError) =>
					setError({ ...error, listPushArea: pushError })
				} // ラッパー関数を渡す
			/>

			<Box
				display="flex"
				justifyContent="space-between"
				// flexWrap='wrap'
				mt={3}
				px={3}
				sx={{
					"@media (max-width: 767px)": {
						px: 0,
						width: 1,
						flexWrap: "wrap" /* 追加 */,
					},
				}}
			>
				{statusesPull.map((status) => (
					<Box
						key={status.category}
						sx={{
							width: "25%",
							"@media (max-width: 767px)": {
								width: "50%",
							},
						}}
					>
						<Title title={status.category} />
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							sx={{
								overflow: "auto",
								"@media (max-width: 767px)": {
									p: 1.2,
								},
							}}
							p={2}
						>
							{todos
								.filter((todo) => status.category === todo.status)
								.map((todo) => (
									<TodoList
										key={todo.id}
										todo={todo}
										clickOption={{
											deleteTodo: deleteTodo,
											editTodo: editTodo,
											saveTodo: saveTodo,
											setEditId: setEditId,
										}}
										isEditing={editId === todo.id}
										input={input}
										setInput={setInput}
										error={error.listModalArea}
										setError={(modalError) =>
											setError({ ...error, listModalArea: modalError })
										} // ラッパー関数を渡す
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
		</Box>
	);
}

export default App;
