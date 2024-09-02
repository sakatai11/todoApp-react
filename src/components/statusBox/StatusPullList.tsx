import { useState } from "react";
import { Autocomplete, TextField  } from "@mui/material";
import { Status } from "../../types/todo";

type PullDownType = {
	pullDownList: Status[];
};

const StatusPullList = ({pullDownList}:PullDownType) => {
  const [label, setLabel] = useState('選択してください');

	return (
    <Autocomplete
      disablePortal
      options={pullDownList}
      getOptionLabel={(option) => option.category} 
      sx={{ width: '100%', marginTop: 3}}
      onChange={(event, newValue) => {
        if (newValue) {
          setLabel(newValue.category);
        } else if (newValue === null) {
          setLabel('選択してください');
        }
      }}
      renderInput={(options) => <TextField {...options} label={label} />}
    />
	);
};

export default StatusPullList;
