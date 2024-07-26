import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const cookies = request.cookies.get('token');
  if (!cookies || cookies.value === '') {
    return NextResponse.json('noCookies');
  } else {
    return NextResponse.json('cookies');
  }
};
