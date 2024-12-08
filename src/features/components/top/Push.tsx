import { Button, Box } from "@mui/material";
import { useState } from "react";
import { Status } from "../../../types/todos";
import Modal from "../modal/Modal";

type InputProps = {
	clickOption: {
		addTodo: () => void;
		setInput: (input: { text: string; status: string }) => void;
		setEditId: (id: string | null) => void;
		input: {
			text: string;
			status: string;
		};
	};
	statusPull: Status[];
	isEditing: boolean;
	error: boolean;
	setError: (error: boolean) => void;
};

const Push = ({
	clickOption,
	statusPull,
	isEditing,
	error,
	setError,
}: InputProps) => {
	const { addTodo, setInput, setEditId, input } = clickOption;
	const [modalIsOpen, setModalIsOpen] = useState(false);

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
					input={input}
					error={error}
					modalIsOpen={modalIsOpen}
					statusPull={statusPull}
					setError={setError}
					setEditId={setEditId}
					setInput={setInput}
					setModalIsOpen={setModalIsOpen}
					addTodo={addTodo}
				/>
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
