import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

type HandleClickProps = {
  setModal: (value: boolean) => void
}

const SelectListModal = ({setModal}:HandleClickProps) => {

 return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
        position: 'absolute',
        right: -140,
        bottom: -30,
        zIndex: 99,
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        color='inherit'
        sx={{
          backgroundColor: "#FFF",
          boxShadow: "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
          color: "#999"
        }}
      >
        <Button onClick={() => setModal(false)}>リストを移動する</Button>
        <Button onClick={() => setModal(false)}>リストを削除する</Button>
      </ButtonGroup>
    </Box>
 );
};

export default SelectListModal;