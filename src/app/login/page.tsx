'use client';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loginActions } from '@/store/isLogin';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async (enteredValue: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/login', enteredValue);
      if (res.status === 200) {
        console.log('ligin success');
        dispatch(loginActions.login());
        router.push(`/`);
      }
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onLogin={onLogin} isLoading={loading} />;
};

export default LoginPage;
