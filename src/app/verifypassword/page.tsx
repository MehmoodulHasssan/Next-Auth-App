'use client';
import React from 'react';
import useInput from '@/hooks/useInput';
import Input from '@/components/Input';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const VerifyPasswordPage = () => {
  const router = useRouter();
  const { handleChangeConfirm, handleChangePassword, enteredValue } =
    useInput();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      enteredValue.confirm.trim().length > 0 &&
      enteredValue.password.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredValue]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredValue.confirm !== enteredValue.password) {
      console.log('Passwords didnt match');
      return;
    }
    onReset();
  };
  const onReset = async () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const response = await axios.post('api/verifypassword', {
      token,
      password: enteredValue.password,
    });
    if (response.status === 200 || 201) {
      console.log(response.data);
      router.push('/login');
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col m-auto w-2/6 items-center bg-white mt-28"
    >
      <div className="font-bold text-2xl text-white bg- bg-green-700 px-4 py-3 w-full flex justify-center">
        Login Form
      </div>
      <Input inputType="password" onChange={handleChangePassword} />
      <Input inputType="Confirm Password" onChange={handleChangeConfirm} />

      <div className="w-10/12 py-2">
        <button
          disabled={isDisabled}
          className="text-xl text-white font-semibold w-full py-2 bg-green-700 hover:bg-green-600 my-1 disabled:cursor-not-allowed disabled:bg-green-600"
        >
          {/* {isLoading ? 'Logging in...' : 'Login'} */}
          submit
        </button>
      </div>
    </form>
  );
};

export default VerifyPasswordPage;
