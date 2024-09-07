import { TextField, Button, Box } from "@mui/material";

type InputProps = {
	clickOption: {
		add: () => void;
		set: (textInput: string) => void;
		text: string;
	};
	isEditing: boolean;
	error: boolean;
};

const Push = ({ clickOption, isEditing, error }: InputProps) => {
	const { add, set, text } = clickOption;

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
			{!isEditing ? (
				<TextField
					variant="outlined"
					label="入力"
					error={error}
					type="text"
					value={text}
					helperText={error ? "内容を入力してください" : ""}
					onChange={(e) => set(e.target.value)}
				>
					{text}
				</TextField>
			) : (
				<TextField variant="outlined" label="入力" type="text" value={""} />
			)}
			<Button variant="contained" onClick={add}>
				追加
			</Button>
		</Box>
	);
};

export default Push;
