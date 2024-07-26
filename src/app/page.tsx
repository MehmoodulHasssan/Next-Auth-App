'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="text-white text-2xl font-bold text-center">HomePage</div>
  );
};

export default HomePage;
