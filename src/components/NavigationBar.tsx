'use client';
import React from 'react';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { paramCase } from 'param-case';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '@/store/isLogin';

const NavigationBar = () => {
  const login = useSelector((state) => state.loginFn);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(login);
  // useEffect(() => {
  //   const getCookies = async () => {
  //     const res = await axios.get('/api/get-cookies');
  //     console.log(res.data);
  //   };
  //   getCookies();
  // }, []);

  const handleProfileSwitch = async () => {
    try {
      const res = await axios.get('api/user-profile');
      if (res.status === 201) {
        const param = paramCase(res.data.data.userParam);
        return router.push(`/profile/${param}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/logout');
      if (response.status === 200) {
        console.log('logout success');
        dispatch(loginActions.logout());
        router.push('/');
      } else {
        throw new Error(response.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <ul className="bg-green-700 list-none font-semibold text-green-700 flex py-4 px-8 text-lg">
      <li>
        <button className="py-2 px-4 bg-white rounded-md mx-4 hover:bg-black hover:text-white">
          <Link href="/">Home</Link>
        </button>
      </li>
      {!login && (
        <li>
          <button className="py-2 px-4 bg-white rounded-md mx-4 hover:bg-black hover:text-white">
            <Link href="/login">Login</Link>
          </button>
        </li>
      )}
      {login && (
        <>
          <li>
            <button
              onClick={handleProfileSwitch}
              className="py-2 px-4 bg-white rounded-md mx-4 hover:bg-black hover:text-white"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-white rounded-md mx-4 hover:bg-black hover:text-white"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavigationBar;
