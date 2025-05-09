'use client';
import { getDetail } from '@/uilts/serverApi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const DetailContents = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['todos', id],
    queryFn: getDetail,
  });

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <Link style={{ backgroundColor: 'lightblue' }} href="/todolist">
        전체리스트 화면으로 이동
      </Link>
      <h2>상세페이지</h2>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
};

export default DetailContents;
