import { TodoListProps } from "../types/todo";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Delete from "./Delete";
import { Box, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";

type TodoProps = {
	todo: TodoListProps;
	clickOption: {
		deleteTodo: (id: string) => void;
		editTodo: (id: string) => void;
		saveTodo: () => void;
	};
	isEditing: boolean;
	input: string;
	setInput: (text: string) => void;
	toggleSelected: () => void;
};

const TodoList = ({
	todo,
	clickOption,
	isEditing,
	input,
	setInput,
	toggleSelected,
}: TodoProps) => {
	const { deleteTodo, editTodo, saveTodo } = clickOption;
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleClose = () => {
		setModalIsOpen(false);
	};

	return (
		<Box
			width={1}
			boxSizing="border-box"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			bgcolor={todo.bool ? "#8f8f8f" : ""}
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
			<Box
				component="span"
				sx={{
					display: "block",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					paddingX: 1,
					maxWidth: "100%",
					"&:hover": {
						overflowX: "auto",
					},
				}}
			>
				{todo.text}
			</Box>
			<Box display="flex" alignItems="center">
				{!todo.bool ? (
					<>
						<Button
							variant="outlined"
							onClick={() => {
								if (todo.id) {
									setModalIsOpen(true);
									editTodo(todo.id);
								}
							}}
						>
							編集
						</Button>
						{isEditing && (
							<Modal
								open={modalIsOpen}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								// aria-describedby="modal-modal-description"
							>
								<Box>
									<TextField
										id="modal-modal-title"
										variant="outlined"
										type="text"
										value={input}
										onChange={(e) => setInput(e.target.value)}
									/>
									<Button variant="contained" onClick={handleClose}>
										CLOSE
									</Button>
									<Button variant="outlined" onClick={saveTodo}>
										保存
									</Button>
								</Box>
							</Modal>
						)}
					</>
				) : null}
				<Delete
					onDelete={() => {
						if (todo.id) {
							deleteTodo(todo.id);
						}
					}}
				/>
			</Box>
		</Box>
	);
};

export default TodoList;
