// import { TodoListProps } from '../types/todo';
import {TextField, Button, Box} from '@mui/material';

type InputProps = {
  clickOption:{
    add: () => void;
    set: (textInput: string) => void;
    text: string;
  }
}

const Push = ({clickOption}:InputProps) => {
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
      <TextField 
        variant="outlined" 
        label="入力" 
        type="text" 
        value={text}
        onChange={(e) => set(e.target.value)}
      >
        {text}
      </TextField>
      <Button 
        variant="contained" 
        onClick={add}>追加
      </Button>
    </Box>
  );
}

export default Push;