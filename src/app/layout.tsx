import React, { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import { connectDb } from '../../configure/connectDb';

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en-us">
      <body className="w-screen h-screen bg-green-500">
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
