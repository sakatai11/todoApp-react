// todoデータの型
export type TodoListProps = {
	id?: string;
	time: number;
	text: string;
	// status: string;
	// value?: string;
	bool: boolean;
};

// statusのプルダウンの型
export type Status = {
  category: string;
};
