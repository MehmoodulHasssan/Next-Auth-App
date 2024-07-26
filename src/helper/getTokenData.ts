import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const getTokenData = async (request: NextRequest) => {
  try {
    console.log(process.env.TOKEN_KEY);
    const token: any = request.cookies.get('token');
    const decoded: any = jwt.verify(token.value, 'mehmood');
    return decoded.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
