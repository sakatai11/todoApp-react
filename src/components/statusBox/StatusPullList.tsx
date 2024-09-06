import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Status } from "../../types/todos";

type PullDownType = {
	pullDownList: Status[];
	setInput: (status: string) => void; // setInputはstatusのみを受け取るように変更
};

const StatusPullList = ({ pullDownList, setInput }: PullDownType) => {
	const [label, setLabel] = useState("選択してください");

	return (
		<Autocomplete
			disablePortal
			options={pullDownList}
			getOptionLabel={(option) => option.category}
			sx={{ width: "100%", marginTop: 3 }}
			onChange={(_, newValue) => {
				// _はeventの略
				if (newValue) {
					setInput(newValue.category);
					setLabel(newValue.category);
				} else if (newValue === null) {
					setLabel("選択してください");
				}
			}}
			renderInput={(options) => <TextField {...options} label={label} />}
		/>
	);
};

export default StatusPullList;
