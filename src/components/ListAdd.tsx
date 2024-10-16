import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const ListAdd = () => {
	const [addBtn, setAddBtn] = useState(false);

	return (
		<>
			{addBtn ? (
				<>
					<TextField
						id="outlined-basic"
						label="リスト名を入力"
						variant="outlined"
						size="small"
						sx={{
							marginBottom: "10px",
							width: "100%",
						}}
					/>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "12px",
						}}
					>
						<Button variant="outlined" fullWidth>
							追加する
						</Button>
						<Button
							variant="outlined"
							fullWidth
							sx={{
								borderColor: "#8a8a8a",
								color: "#8a8a8a",
							}}
							onClick={() => setAddBtn(false)}
						>
							戻る
						</Button>
					</Box>
				</>
			) : (
				<Button
					variant="outlined"
					fullWidth
					endIcon={<AddBoxIcon color="primary" />}
					onClick={() => setAddBtn(true)}
				>
					リストを追加する
				</Button>
			)}
		</>
	);
};

export default ListAdd;
