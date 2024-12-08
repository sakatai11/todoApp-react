type FormatterResult = {
	type: "link" | "space" | "normal";
	content: string;
	index: string;
};

export const formatter = (text: string): FormatterResult[] => {
	const urlPattern = /(https?:\/\/[^\s]+)/g;
	const result: FormatterResult[] = [];

	text.split(urlPattern).forEach((part, index) => {
		if (part.match(urlPattern)) {
			result.push({ type: "link", content: part, index: `link-${index}` }); // ユニークなindex
		} else {
			const spacePattern = / /g;
			part.split(spacePattern).forEach((subPart, subIndex) => {
				const uniqueIndex = `normal-${index}-${subIndex}`; // サブインデックスも含めてユニークにする
				if (subPart.match(urlPattern)) {
					result.push({
						type: "space",
						content: subPart,
						index: `space-${index}-${subIndex}`,
					});
				} else {
					result.push({ type: "normal", content: subPart, index: uniqueIndex });
				}
			});
		}
	});

	return result;
};
