'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const VerificationPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      setIsError(false);
      const res = await axios.post('/api/verifyemail', { token });
      if (res.status === 200 || 201) {
        console.log(res.data);
        setIsVerified(true);
        return;
      }
    } catch (error: any) {
      setIsError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    setToken(url.searchParams.get('token') || '');
  }, []);

  useEffect(() => {
    if (token !== '') {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className=" text-white bg-white font-semibold text-center mt-8 w-1/4 flex flex-col mx-auto">
      <div className="text-white font-bold text-xl bg-green-700 py-2 w-full">
        Verify Email
      </div>
      <div className="p-4">
        <div className="flex items-center text-green-600 p-1">
          <span className="mx-1">Token:</span>
          <span className="mx-1">{token ? token : 'no token'}</span>
        </div>
        {isError && (
          <div className="flex items-center text-red-600 p-1">
            <span className="mx-1">Error:</span>
            <span className="mx-1">{`There's some error verifying your email`}</span>
          </div>
        )}
        <div className="flex items-center text-green-600 p-1">
          {isVerified && (
            <span className="mx-1">
              Your are verified plz click <Link href="/login">here</Link> to
              login
            </span>
          )}
          {!isVerified && (
            <span className="mx-1">
              Your are verified plz click <Link href="/login">here</Link> to
              login
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
