'use client';
import React, { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import NavigationBar from '@/components/NavigationBar';
import { Provider } from 'react-redux';
import { store } from '@/store/isLogin';

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="en-us">
        <body className="w-screen h-screen bg-green-500">
          <NavigationBar />
          <div>{children}</div>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
