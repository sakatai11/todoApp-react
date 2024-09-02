import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteProp = {
	onDelete: () => void;
};

const Delete = ({ onDelete }: DeleteProp) => {
	return (
		<Button
			// variant="outlined"
			onClick={onDelete}
			sx={{
				marginLeft: 1,
			}}
		>
			<DeleteIcon />
		</Button>
	);
};

export default Delete;
