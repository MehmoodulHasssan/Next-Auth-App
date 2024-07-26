import React, { ReactEventHandler } from 'react';
import { useState } from 'react';

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
    username: '',
    confirm: '',
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
  function handleChangeConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue((prev) => ({ ...prev, confirm: e.target.value }));
  }

  return {
    enteredValue,
    handleChangeEmail,
    handleChangePassword,
    handleChangeUsername,
    handleChangeConfirm,
  };
};
export default useInput;
