import React from 'react';
import { useState, useEffect } from 'react';
import useInput from '@/hooks/useInput';
import Input from './Input';
import Link from 'next/link';
import User from '@/models/User';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginForm: React.FC<{
  isLoading: boolean;
  onLogin: (enteredValue: { email: string; password: string }) => void;
}> = ({ onLogin, isLoading }) => {
  const router = useRouter();
  const {
    enteredValue,
    handleChangeEmail,
    handleChangePassword,
    handleChangeUsername,
  } = useInput();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      enteredValue.email.trim().length > 0 &&
      enteredValue.password.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredValue]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalValue = {
      email: enteredValue.email,
      password: enteredValue.password,
    };
    onLogin(finalValue);
    // const fd = new FormData(e.target as HTMLFormElement);
    // const data = Object.fromEntries(fd.entries());
    // for (const [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }
  };
  const handleForgotPassword = async () => {
    // const user = await User.findOne({ email: enteredValue.email }).exec();
    // if (!user) {
    //   console.log('email does not exist');
    //   return;
    // }

    const response = await axios.post('api/send-email', {
      email: enteredValue.email,
      emailType: 'RESET',
      userId: 'kjfsjfsk3424234',
    });
    if (response.status === 200 || 201) {
      console.log(response.data);
      router.push('/emailSent');
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
      <Input inputType="email" onChange={handleChangeEmail} />
      <Input inputType="password" onChange={handleChangePassword} />
      <div className="text-green-400 font-semibold">
        <button type="button" onClick={handleForgotPassword}>
          forgot password?
        </button>
      </div>
      <div className="w-10/12 py-2">
        <button
          disabled={isDisabled}
          className="text-xl text-white font-semibold w-full py-2 bg-green-700 hover:bg-green-600 my-1 disabled:cursor-not-allowed disabled:bg-green-600"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <div className="text-green-400 font-semibold mb-8">
        Not a member?
        <Link className="text-green-500 underline" href="/signup">
          {' Sign Up'}
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
