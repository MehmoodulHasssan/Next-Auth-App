'use client';
import SignupForm from '@/components/SignupForm';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SignupPage = () => {
  const router = useRouter();
  const onSignup = async (enteredValue: {}) => {
    try {
      const res = axios.post('/api/signup', enteredValue);
      const resData = await res;
      if (resData.status == 200) {
        router.push('/login');
        console.log(resData.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return <SignupForm onSignup={onSignup} />;
};

export default SignupPage;
