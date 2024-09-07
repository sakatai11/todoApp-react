import { TodoListProps } from "../types/todos";
import { statusesPull } from "../status/statuses";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Delete from "./Delete";
import StatusPullList from "./statusBox/StatusPullList";
import { Box, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

type TodoProps = {
	todo: TodoListProps;
	clickOption: {
		deleteTodo: (id: string) => void;
		editTodo: (id: string) => void;
		saveTodo: () => void;
	};
	isEditing: boolean;
	input: { text: string; status: string }; // inputをオブジェクト型に変更
	setInput: (input: { text: string; status: string }) => void; // setInputもオブジェクトを受け取るように変更
	error: boolean;
	setError: (error: boolean) => void;
	toggleSelected: () => void;
};

const TodoList = ({
	todo,
	clickOption,
	isEditing,
	input,
	setInput,
	error,
	setError,
	toggleSelected,
}: TodoProps) => {
	const { deleteTodo, editTodo, saveTodo } = clickOption;
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleClose = () => {
		setModalIsOpen(false);
		setError(false); //エラーのリセット
	};

	// console.log(input.text);
	// console.log(input.status);

	return (
		<Box
			width={1}
			boxSizing="border-box"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
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
					padding: 2,
					backgroundColor: "#FFF",
					"&.Mui-selected": {
						backgroundColor: "#FFF", // 選択時のアウトラインを消す
					},
					border: "none", // アウトラインを消す
				}}
			>
				{todo.bool ? (
					<PushPinIcon />
				) : (
					<PushPinIcon sx={{ color: "rgba(0, 0, 0, 0.08)" }} />
				)}
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
				<Button
					// variant="outlined"
					sx={{
						// p:0,
						minWidth: "auto",
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
						<Box
							sx={{
								position: "absolute",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								height: "100%",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							<Box
								sx={{
									bgcolor: "#FFF",
									maxWidth: 400,
									width: "100%",
									boxShadow: 24,
									boxSizing: "border-box",
									p: 4,
									position: "relative",
								}}
							>
								<TextField
									id="modal-modal-text"
									variant="outlined"
									type="text"
									fullWidth
									value={input.text}
									error={error}
									helperText={error ? "内容を入力してください" : ""}
									multiline
									rows={9}
									onChange={(e) => setInput({ ...input, text: e.target.value })}
								/>
								<StatusPullList
									// statusプルダウン
									pullDownList={statusesPull}
									input={input} // inputを渡す
									setInput={(statusInput) =>
										setInput({ ...input, status: statusInput.status })
									}
								/>
								<CloseIcon
									// 閉じる

									sx={{
										position: "absolute",
										top: "-27px",
										right: 0,
										color: "#FFF",
										cursor: "pointer",
									}}
									onClick={handleClose}
								/>
								<Box
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "center",
										marginTop: 3,
									}}
								>
									<Button
										variant="contained"
										sx={{ display: "block" }}
										onClick={saveTodo}
									>
										保存
									</Button>
								</Box>
							</Box>
						</Box>
					</Modal>
				)}
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
