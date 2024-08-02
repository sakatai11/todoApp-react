import { Button } from "@mui/material";

type DeleteProp = {
	onEdit: () => void;
};

const Edit = ({ onEdit }: DeleteProp) => {
	return (
		<Button variant="outlined" onClick={onEdit}>
			編集
		</Button>
	);
};

export default Edit;
