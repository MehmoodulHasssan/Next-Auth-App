import { getTokenData } from '@/helper/getTokenData';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../../../configure/connectDb';

connectDb();
export const GET = async (request: NextRequest) => {
  console.log('requested to api');
  try {
    const userId = await getTokenData(request);

    const userData = await User.findById(userId).select(['-password', '-_id']);
    if (!userData) {
      return NextResponse.json({ error: 'User not Found' }, { status: 400 });
    }
    return NextResponse.json({ data: userData }, { status: 201 });
  } catch (error: any) {
    console.log(error.response.data);
  }
};
