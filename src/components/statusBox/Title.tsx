import { Box } from "@mui/material";

type Prop = {
	title: string;
};

const Title = ({ title }: Prop) => {
	return (
		<Box
			component="p"
			sx={{
				textAlign: "center",
			}}
		>
			{title}
		</Box>
	);
};

export default Title;
