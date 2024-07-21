import React from 'react';

const UserProfile: React.FC<{ params: any }> = ({ params }) => {
  return (
    <div className="text-4xl text-white font-bold text-center mt-28">
      User
      <span className="p-2 bg-orange-500">{params.id}</span>
    </div>
  );
};

export default UserProfile;
