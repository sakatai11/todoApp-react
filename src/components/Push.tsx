import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import StatusPullList from "./statusBox/StatusPullList";
import { statusesPull } from "../status/statuses";

type InputProps = {
	clickOption: {
		add: () => void;
		set: (input: { text: string; status: string }) => void;
		setEdit: (id: string | null) => void;
		inputValue: {
			text: string;
			status: string;
		};
	};
	isEditing: boolean;
	error: boolean;
	setError: (error: boolean) => void;
};

const Push = ({ clickOption, isEditing, error, setError }: InputProps) => {
	const { add, set, setEdit, inputValue } = clickOption;
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleClose = () => {
		setModalIsOpen(false);
		setEdit(null);
		setError(false); //エラーのリセット
		set({ text: "", status: "" }); //リセットする
	};

	// console.log('push:' + isEditing);
	// console.log('push Error:' + error);

	return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				justifyContent: "center",
				gap: 5,
				alignItems: "center",
			}}
		>
			{!isEditing && (
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
								maxWidth: 650,
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
								value={inputValue.text}
								error={inputValue.text ? undefined : error}
								helperText={
									!inputValue.text && error ? "内容を入力してください" : null
								}
								multiline
								rows={9}
								onChange={(e) => set({ ...inputValue, text: e.target.value })}
							/>
							<StatusPullList
								// statusプルダウン
								pullDownList={statusesPull}
								input={{ ...inputValue, status: inputValue.status }} // inputValue.statusを渡す
								error={error}
								setInput={(statusInput) =>
									set({ ...inputValue, status: statusInput.status })
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
									onClick={() => {
										add();
										if (inputValue.text && inputValue.status) {
											setModalIsOpen(false);
										}
									}}
								>
									追加
								</Button>
							</Box>
						</Box>
					</Box>
				</Modal>
			)}
			<Button
				variant="contained"
				onClick={(e) => {
					console.log(e);
					setModalIsOpen(true);
				}}
			>
				新規作成
			</Button>
		</Box>
	);
};

export default Push;
