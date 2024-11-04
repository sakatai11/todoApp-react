import { Box, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SelectListModal from "../modal/SelectListModal";
import { useState, useEffect, useRef } from "react";

type Prop = {
	title: string;
};

const Title = ({ title }: Prop) => {
	const [modal, setModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
				// クリックイベントがモーダル外で発生した場合
					if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
							setModal(false);
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
			component="p"
			sx={{
				textAlign: "center",
				position: "relative",
			}}
		>
			{title}
			<IconButton
				onClick={() => setModal(true)}
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
				modal && (
					<div ref={modalRef}>
						<SelectListModal 
							setModal={() => setModal(false)}
						/>
					</div>
				)
			}
		</Box>
	);
};

export default Title;
