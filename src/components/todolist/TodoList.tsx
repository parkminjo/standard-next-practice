'use client';
import { useQuery } from '@tanstack/react-query';
import TodoItem, { Todo } from './TodoItem';

export default function TodoList() {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data: Todo[] = await response.json();
      return data;
    },
  });

  if (isPending) {
    return (
      <div style={{ fontSize: 36 }}>
        <p>로딩중...</p>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <ul style={{ listStyle: 'none', width: 250 }}>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
}
