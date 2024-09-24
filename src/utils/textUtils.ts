// URLを検出してリンクに変換する関数
export const linkify = (text: string) => {
	const urlPattern = /(https?:\/\/[^\s]+)/g;
	return text.split(urlPattern).map((part, index) => {
		if (part.match(urlPattern)) {
			return {
				type: "link",
				content: part,
				index: index,
			};
		} else {
			return {
				type: "text",
				content: part,
				index: index,
			};
		}
	});
};
