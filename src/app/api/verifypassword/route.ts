import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../../../configure/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
connectDb();

export const POST = async (request: NextRequest) => {
  try {
    const { token, password } = await request.json();
    const user = await User.findOne({
      forgotPasswroddToken: token,
      forgotPasswrodTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: 'user not found' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.password = hashedPassword;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: 'Password reset successfully successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
