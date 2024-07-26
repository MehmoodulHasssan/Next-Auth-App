'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile: React.FC<{ params: any }> = ({ params }) => {
  const [data, setData] = useState('');
  console.log(data);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/user-profile');
        if (res.status === 200 || res.status === 201) {
          setData(res.data.data);
          console.log('details fetched');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [params]);
  return (
    <div className=" text-white bg-white font-semibold text-center mt-8 w-1/4 flex flex-col mx-auto">
      <div className="text-white font-bold text-xl bg-green-700 py-2 w-full">
        User Details
      </div>
      <div className="p-4">
        <div className="flex items-center text-green-600 p-1">
          <span className="mx-1">Name:</span>
          <span className="mx-1">{data !== '' && data.username}</span>
        </div>
        <div className="flex items-center text-green-600 p-1">
          <span className="mx-1">Email:</span>
          <span className="mx-1">{data !== '' && data.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
