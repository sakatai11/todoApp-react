import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteModal from './DeleteModal';

type HandleClickProps = {
  id: string;
  modalIsOpen: {order: boolean, list: boolean}
  setModalIsOpen: (modal:{order: boolean,list: boolean}) => void;
  deleteList: (id: string) => void;
}

const SelectListModal = ({id, modalIsOpen, setModalIsOpen, deleteList}:HandleClickProps) => {
  const [deleteIsModalOpen, setDeleteIsModalOpen] = useState(false);
  console.log(id);

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
          color: "rgba(0, 0, 0, 0.54)"
        }}
      >
        <Button onClick={() => setModalIsOpen({...modalIsOpen, order: false, list: false})}>順番を変える</Button>
        <Button onClick={() => {
          setDeleteIsModalOpen(true);
          setModalIsOpen({...modalIsOpen, order: false, list: false });
        }
        }>リストを削除する</Button>

      </ButtonGroup>
        {
          (deleteIsModalOpen && id) && (
            <DeleteModal
              modalIsOpen={deleteIsModalOpen} 					
              onDelete={() => {
                if (id) {
                  deleteList(id);
                }
              }}
              setModalIsOpen={() => setDeleteIsModalOpen}
            />
          )
        }
    </Box>
 );
};

export default SelectListModal;