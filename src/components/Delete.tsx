import { Button } from '@mui/material';

type DeleteProp = {
  onDelete: () => void;
}

const Delete = ({onDelete}:DeleteProp) => {
  return (
    <Button 
      variant="outlined"
      onClick={onDelete}
    >
      削除
    </Button>
  );
}

export default Delete;