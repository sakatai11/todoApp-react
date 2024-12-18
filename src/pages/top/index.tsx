import  { useEffect, useState } from "react";
import BaseTop from "../../features/top/Index";
import { fetchApis } from "../../libs/fetchApis";
import { TodoListProps } from "../../types/todos";
import { StatusListProps } from "../../types/lists";

const Top = () => {
  const [todosData, setTodosData] = useState<TodoListProps[]>([]);
  const [listsData, setListsData] = useState<StatusListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { todos, lists } = await fetchApis();
        setTodosData(todos);
        setListsData(lists);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <BaseTop todosData={todosData} listsData={listsData} />;
};

export default Top;
