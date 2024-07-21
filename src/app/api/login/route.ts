import { request } from 'http';
import { connectDb } from '../../../../configure/connectDb';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { error } from 'console';

connectDb();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const isUser = await User.findOne({ email }).exec();
    if (!isUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }
    //check validity of password
    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 }
      );
    }

    const token = await jwt.sign(
      {
        id: isUser._id,
      },
      process.env.TOKEN_KEY!,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log(error);
  }
};
