import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TodoListProps } from "./types/todos";
import { StatusListProps } from "./types/lists";
import Push from "./components/Push";
import TodoList from "./components/TodoList";
import Title from "./components/statusBox/Title";
import ListAdd from "./components/ListAdd";
// import { statusesPull } from "./status/statuses";
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
	const [todos, setTodos] = useState<TodoListProps[]>([]); // todoデータ
	const [lists, setLists] = useState<StatusListProps[]>([]); // listデータ
	const [input, setInput] = useState({
		text: "",
		status: "",
	});
	const [editId, setEditId] = useState<string | null>(null); // 編集したリストのID
	const [error, setError] = useState({
		listPushArea: false,
		listModalArea: false,
		addListArea: false,
	});

	// 表示
	const fetchTodos = async () => {
		const qTodos = query(collection(db, "todos"), orderBy("time", "desc")); // 降順
		const qLists = query(collection(db, "lists"), orderBy("number", "asc")); // 昇順
		const todoSnapshot = await getDocs(qTodos);
		const listSnapshot = await getDocs(qLists);
		const todosData = todoSnapshot.docs.map((document) => ({
			// オブジェクトにとして格納
			id: document.id,
			time: document.data().time,
			text: document.data().text,
			status: document.data().status,
			bool: document.data().bool,
		}));

		console.log(todosData);
		const sortedTodos = todosData.sort((a, b) => {
			const timeComparison = b.time - a.time;
			return timeComparison;
		});
		const listsData = listSnapshot.docs.map((document) => ({
			// オブジェクトにとして格納
			id: document.id,
			category: document.data().category,
			number: document.data().number,
		}));
		console.log(listsData);
		setTodos(sortedTodos as TodoListProps[]);
		setLists(listsData as StatusListProps[]);
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

		// list追加
		const addList = async () => {
			if (input.status) {
				// リストの数を再計算して連続番号を振り直す 
				const updatedLists = lists.map((list, index) => ({ ...list, number: index + 1 }));

				const newList = {
					category: input.status,
					number: updatedLists.length + 1
				};
				console.log(newList.number);
				const docRef = await addDoc(collection(db, "lists"), newList);

				// 再計算されたリストと新しいリストを追加してセットする 
				setLists([...updatedLists, { id: docRef.id, ...newList }]);
				setInput({ ...input , status: "" }); //ステータスリセット
				setError({ ...error, addListArea: false }); // エラーをリセット
			} else {
				setError({ ...error, addListArea: true }); // エラー表示
				return;
			}

		};

	// todo削除
	const deleteTodo = async (id: string) => {
		console.log(`Deleting todo with id: ${id}`);
		await deleteDoc(doc(db, "todos", id.toString())); // idをstring型に変換
		setTodos(todos.filter((todo) => todo.id !== id)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
	};

	// list削除
	const deleteList = async (id: string,  title: string) => {
		// リストを削除 
		await deleteDoc(doc(db, "lists", id.toString())); 
		setLists(lists.filter((list) => list.id !== id));// todo.id が id と一致しない list だけを残す新しい配列を作成

		// 該当するtodosを削除 
		const todosToDelete = todos.filter((todo) => todo.status === title); // 該当する配列を作成
		console.log(todosToDelete);

		const deleteTodoPromises = todosToDelete.map(async (todo) => { 
			if (todo.id !== undefined) { 
				await deleteDoc(doc(db, "todos", todo.id.toString())); 
			} else {
				return;
			}
		});

		// 削除が完了するのを待つ 
		await Promise.all(deleteTodoPromises); 
		setTodos(todos.filter((todo) => todo.status !== title)); // todo.id が id と一致しない todo だけを残す新しい配列を作成
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
				statusPull={lists}
				isEditing={editId !== null} // idがない場合はfalse
				error={error.listPushArea}
				setError={(pushError) =>
					setError({ ...error, listPushArea: pushError })
				} // ラッパー関数を渡す
			/>

			<Box
				sx={{
					maxWidth: "1660px",
					width: "100%",
					margin: "0 auto",
					overflowX: "auto",
					"@media (max-width: 767px)": {
						width: 1,
					},
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					// flexWrap='wrap'
					mt={4}
					px={3}
					sx={{
						"@media (max-width: 767px)": {
							px: 0,
							width: 1,
							flexWrap: "wrap" /* 追加 */,
						},
					}}
				>
					{lists.map((statusPull) => {
						const filteredTrueTodos = todos.filter((todo) => statusPull.category === todo.status && todo.bool); 
						const filteredFalseTodos = todos.filter((todo) => statusPull.category === todo.status && !todo.bool);

						return (
							<Box
								key={statusPull.id}
								sx={{
									minWidth: "320px",
									"@media (max-width: 767px)": {
										width: "50%",
										minWidth: "auto",
									},
								}}
							>
								<Title 
									title={statusPull.category}
									id={statusPull.id}
									deleteList={deleteList}
								/>
								<Box
									sx={{
										display:"flex",
										flexDirection:"column",
										alignItems:"center",
										overflow: "auto",
										"@media (max-width: 767px)": {
											p: 1.2,
										},
									}}
									p={2}
								>
									{/* boolがtrueの場合 */}
									<Box 
										sx={{
											width: 1,
											display: filteredTrueTodos.length > 0 ? 'block' : 'none',
											marginBottom: 4,
										}}
									>
										{todos
											.filter((todo) => (statusPull.category === todo.status) && todo.bool )
											.map((todo) => (
												<TodoList
													key={todo.id}
													todo={todo}
													deleteTodo={deleteTodo}
													editTodo={editTodo}
													saveTodo={saveTodo}
													setEditId={setEditId}
													statusPull={lists}
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
									{/* boolがfalseの場合 */}
									<Box
										sx={{
											width: 1,
											display: filteredFalseTodos.length > 0 ? 'block' : 'none',
										}}
									>
										{todos
											.filter((todo) => (statusPull.category === todo.status) && !todo.bool )
											.map((todo) => (
												<TodoList
													key={todo.id}
													todo={todo}
													deleteTodo={deleteTodo}
													editTodo={editTodo}
													saveTodo={saveTodo}
													setEditId={setEditId}
													statusPull={lists}
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
							</Box>
						);
						})}
					<Box
						sx={{
							minWidth: "320px",
							paddingX: "16px",
							boxSizing: "border-box",
							"@media (max-width: 767px)": {
								width: "100%",
								minWidth: "auto",
							},
						}}
					>
						<ListAdd 
							status={input.status}
							error={error.addListArea}
							addList={addList}
							setInput={(listStatus) => setInput({...input, status: listStatus})}
							setError={(listTextError) => setError({...error, addListArea: listTextError })} 
						/> 
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
export default App;
