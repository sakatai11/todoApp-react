import { TodoListProps } from "../types/todo";
import { statusesPull } from "../status/statuses";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Delete from "./Delete";
import StatusPullList from "./statusBox/StatusPullList";
import { Box, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
					maxWidth: "50%",
					// "&:hover": {
					// 	overflowX: "auto",
					// },
				}}
			>
				{todo.text}
			</Box>
			<Box display="flex" alignItems="center">
				{!todo.bool ? (
					<>
						<Button
							// variant="outlined"
							sx={{ 
								// p:0,
								minWidth: 'auto'
							}}
							onClick={() => {
								if (todo.id) {
									setModalIsOpen(true);
									editTodo(todo.id);
								}
							}}
						>
							<ModeEditIcon />
						</Button>
						{isEditing && (
							// モーダル
							<Modal
								open={modalIsOpen}
								onClose={handleClose}
								aria-labelledby="modal-modal-text"
								// aria-describedby="modal-modal-description"
							>
								<Box sx={{
									position: 'absolute',
									display : 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
									height: '100%',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}}>
									<Box sx={{
										bgcolor: '#FFF',
										maxWidth: 400,
										width: '100%',
										boxShadow: 24,
										boxSizing: "border-box",
										p: 4,
										position: 'relative',
									}}>
										<TextField
											id="modal-modal-text"
											variant="outlined"
											type="text"
											fullWidth
											value={input}
											multiline
											rows={9}
											onChange={(e) => setInput(e.target.value)}
										/>
										<StatusPullList
										// statusプルダウン
											pullDownList={statusesPull}
										/>
											<CloseIcon 
											// 閉じる
												sx={{
													position: 'absolute',
													top: '-27px',
													right: 0,
													color: "#FFF",
													cursor: 'pointer',
												}} onClick={handleClose}
											/>
											<Box sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 3}}>
												<Button variant="contained" sx={{display: 'block',}} onClick={saveTodo}>
													保存
												</Button>
											</Box>
									</Box>
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
