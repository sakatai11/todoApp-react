import { Box, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SelectListModal from "../modal/SelectListModal";
import { useState, useEffect, useRef } from "react";

type Prop = {
	title: string;
	id: string;
	deleteList: (id: string) => void
};

const Title = ({ title, id, deleteList }: Prop) => {
	const [modalIsOpen, setModalIsOpen] = useState({
		order: false,
		list: false,
	});
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
				// クリックイベントがモーダル外で発生した場合
					if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
						setModalIsOpen({...modalIsOpen, order:false, list: false});
					}
			};
			// 画面をクリックした際に handleClickOutside 関数を実行
			document.addEventListener("mousedown", handleClickOutside);
			// コンポーネントがアンマウントされた時にhandleClickOutside 関数を実行。クリーンアップ関数。
			return () => {
					document.removeEventListener("mousedown", handleClickOutside);
			};
	}, [modalRef]);

	return (
		<Box
			component="div"
			sx={{
				textAlign: "center",
				position: "relative",
			}}
		>
			{title}
			<IconButton
				onClick={() => setModalIsOpen({...modalIsOpen, order:true, list: true})}
				sx={{
					position: "absolute",
					top: 0,
					right: 10,
					p: 0
				}}
			>
				<MoreVertIcon />
			</IconButton>
			{
				(modalIsOpen.order && modalIsOpen.list) && (
					<div ref={modalRef}>
						<SelectListModal 
							id={id}
							modalIsOpen={modalIsOpen}
							setModalIsOpen={() => setModalIsOpen({...modalIsOpen})}
							deleteList={() => deleteList}
						/>
					</div>
				)
			}
		</Box>
	);
};

export default Title;
