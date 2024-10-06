import { Button, Box, Typography, TextField } from "@mui/material";
import { TodoListProps } from "../../types/todos";
import { jstFormattedDate } from "../../utils/dateUtils";
import { statusesPull } from "../../status/statuses";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import StatusPullList from "../statusBox/StatusPullList";

type EditProp = {
  todo: TodoListProps;
  input: { text: string; status: string }; // inputをオブジェクト型に変更
	error: boolean;
  modalIsOpen: boolean;
  setError: (error: boolean) => void;
  setEditId: (id: string | null) => void;
  setInput: (input: { text: string; status: string }) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void; 
  saveTodo: () => void;
};

const EditModal = ({ todo, input, error, modalIsOpen, setError, setEditId, setInput, setModalIsOpen, saveTodo }: EditProp) => {

  const handleClose = () => {
		setModalIsOpen(false);
		setError(false); //エラーのリセット
		setEditId(null);
		setInput({ text: "", status: "" }); // リセットする
	};

	return (
    <Modal
      open={modalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-text"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#FFF",
            maxWidth: 650,
            width: "100%",
            boxShadow: 24,
            boxSizing: "border-box",
            px: 4,
            pt: 2.5,
            pb: 4,
            position: "relative",
          }}
        >
          <Typography
            component="span"
            color="#9e9e9e"
            fontSize="12px"
            paddingBottom="8px"
            display="block"
          >
            編集日時：{jstFormattedDate(todo.time)}
          </Typography>
          <TextField
            id="modal-modal-text"
            variant="outlined"
            type="text"
            fullWidth
            value={input.text}
            error={input.text ? undefined : error}
            helperText={
              !input.text && error ? "内容を入力してください" : null
            }
            multiline
            rows={9}
            onChange={(e) => setInput({ ...input, text: e.target.value })}
          />
          <StatusPullList
            // statusプルダウン
            pullDownList={statusesPull}
            input={{ ...input, status: input.status }} // input.statusを渡す
            error={error}
            setInput={(statusInput) =>
              setInput({ ...input, status: statusInput.status })
            }
          />
          <CloseIcon
            // 閉じる

            sx={{
              position: "absolute",
              top: "-27px",
              right: 0,
              color: "#FFF",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{ display: "block" }}
              onClick={() => {
                saveTodo();
                if (input.text && input.status) {
                  setModalIsOpen(false);
                }
              }}
            >
              保存
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;