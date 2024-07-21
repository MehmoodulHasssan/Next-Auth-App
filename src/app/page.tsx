'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="text-red-500 text-2xl font-bold">
      HomePage
      <button
        onClick={() => router.push('/login')}
        className="p-2 text-blue-500 bg-slate-400 text-2xl"
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
