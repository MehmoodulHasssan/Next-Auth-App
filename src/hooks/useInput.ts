import React, { ReactEventHandler } from 'react';
import { useState } from 'react';

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
    username: '',
  });
  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue((prev) => ({ ...prev, password: e.target.value }));
  }
  function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue((prev) => ({ ...prev, username: e.target.value }));
  }
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue((prev) => ({ ...prev, email: e.target.value }));
  }

  return {
    enteredValue,
    handleChangeEmail,
    handleChangePassword,
    handleChangeUsername,
  };
};
export default useInput;
