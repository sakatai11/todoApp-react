import { TodoListProps } from "../../../types/todos";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import { Box, Button } from "@mui/material";
import { formatter } from "../../../utils/textUtils";
import { Status } from "../../../types/todos";
import ToggleButton from "@mui/material/ToggleButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../modal/Modal";

type TodoProps = {
	todo: TodoListProps;
	deleteTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: () => void;
	setEditId: (id: string | null) => void;
	statusPull: Status[];
	isEditing: boolean;
	input: { text: string; status: string }; // inputをオブジェクト型に変更
	setInput: (input: { text: string; status: string }) => void; // setInputもオブジェクトを受け取るように変更
	error: boolean;
	setError: (error: boolean) => void;
	toggleSelected: () => void;
};

const TodoList = ({
	todo,
	deleteTodo,
	editTodo,
	saveTodo,
	setEditId,
	statusPull,
	isEditing,
	input,
	setInput,
	error,
	setError,
	toggleSelected,
}: TodoProps) => {
	const [modalIsOpen, setModalIsOpen] = useState({
		edit: false,
		delete: false,
	});

	// URLを検出してリンクに変換する関数
	const displayText = (text: string) => {
		return formatter(text).map(({ type, content, index }) => {
			const key = `${type}-${index}-${content}`;
			if (type === "link") {
				return (
					<a key={key} href={content} target="_blank" rel="noopener noreferrer">
						{content}
					</a>
				);
			} else if (type === "space") {
				return <br key={key} />;
			} else {
				return <span key={key}>{content}</span>;
			}
		});
	};

	return (
		<Box
			width={1}
			boxSizing="border-box"
			// display="flex"
			// alignItems="center"
			// justifyContent="space-between"

			sx={{
				boxShadow: 3, // 影の強さを指定
				padding: "16px 16px 10px 16px", // パディングを追加
				marginBottom: 1, // マージンを追加
				borderRadius: 1, // 角を丸くする
				"@media (max-width: 767px)": {
					padding: "10px 10px 3px 10px", // パディングを追加
				},
			}}
		>
			<Box
				component="p"
				sx={{
					// whiteSpace: "nowrap",
					margin: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					"@media (max-width: 767px)": {
						fontSize: "12px",
					},
					// maxWidth: "65%",
					// "&:hover": {
					// 	overflowX: "auto",
					// },
				}}
			>
				{displayText(todo.text)}
			</Box>
			<Box display="flex" alignItems="center" justifyContent="end" pt={1}>
				<ToggleButton
					value="check"
					selected={todo.bool}
					onChange={toggleSelected}
					sx={{
						width: 20,
						height: 20,
						padding: 2,
						"@media (max-width: 767px)": {
							padding: 1,
						},
						backgroundColor: "#FFF",
						"&.Mui-selected": {
							backgroundColor: "#FFF", // 選択時のアウトラインを消す
						},
						border: "none", // アウトラインを消す
					}}
				>
					{todo.bool ? (
						<PushPinIcon
							sx={{
								width: 20,
								height: 20,
								"@media (max-width: 767px)": {
									width: 15,
									height: 15,
								},
							}}
						/>
					) : (
						<PushPinIcon
							sx={{
								color: "rgba(0, 0, 0, 0.08)",
								width: 20,
								height: 20,
								"@media (max-width: 767px)": {
									width: 15,
									height: 15,
								},
							}}
						/>
					)}
				</ToggleButton>
				<Button
					// variant="outlined"
					sx={{
						// p:0,
						minWidth: "auto",
						"@media (max-width: 767px)": {
							padding: 0.5,
						},
					}}
					onClick={() => {
						if (todo.id) {
							setModalIsOpen({ ...modalIsOpen, edit: true });
							editTodo(todo.id);
						}
					}}
				>
					<ModeEditIcon
						sx={{
							width: 20,
							height: 20,
							"@media (max-width: 767px)": {
								width: 15,
								height: 15,
							},
						}}
					/>
				</Button>
				{isEditing && (
					// モーダル
					<Modal
						todo={todo}
						input={input}
						error={error}
						modalIsOpen={modalIsOpen.edit}
						statusPull={statusPull}
						setError={setError}
						setEditId={setEditId}
						setInput={setInput}
						setModalIsOpen={(editModal) =>
							setModalIsOpen({ ...modalIsOpen, edit: editModal })
						}
						saveTodo={saveTodo}
					/>
				)}
				<Button
					// variant="outlined"
					onClick={() => setModalIsOpen({ ...modalIsOpen, delete: true })}
					sx={{
						minWidth: "auto",
						"@media (max-width: 767px)": {
							padding: 0.5,
						},
					}}
				>
					<DeleteIcon
						sx={{
							width: 20,
							height: 20,
							"@media (max-width: 767px)": {
								width: 15,
								height: 15,
							},
						}}
					/>
				</Button>

				{modalIsOpen.delete && (
					<DeleteModal
						onDelete={() => {
							if (todo.id) {
								deleteTodo(todo.id);
							}
						}}
						modalIsOpen={modalIsOpen.delete}
						setModalIsOpen={(deleteModal) =>
							setModalIsOpen({ ...modalIsOpen, delete: deleteModal })
						}
					/>
				)}
			</Box>
		</Box>
	);
};

export default TodoList;
