import nodemailer from 'nodemailer';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  const { email, emailType } = reqBody;
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json(
      { error: 'email does not exist ' },
      { status: 400 }
    );
  }
  await sendEmail({ email, emailType, userId: user._id });
  return NextResponse.json({ message: 'success' }, { status: 201 });
};

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    console.log(userId);
    //create a hashed token to be sent
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(hashedToken);
    //find the user and update it

    if (emailType === 'VERIFY') {
      console.log('started verification');
      //set date to one hour by adding milliseconds prseent in one hour to date.now()
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      if (emailType === 'RESET') {
        await User.findByIdAndUpdate(userId, {
          forgotPasswrodToken: hashedToken,
          forgotPasswrodTokenExpiry: Date.now() + 3600000,
        });
      }
    }
    //create trasnport for sending mail
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a0afb90f8125bb',
        pass: 'ca6823259bcff1',
      },
    });

    const mailResponse = await transporter.sendMail({
      from: 'mehmoodjutt471@gmail.com',
      to: email,
      subject:
        emailType && emailType === 'VERIFY'
          ? 'Verify your email'
          : 'Reset you password',
      html: `<p>Please click <a href = "${
        process.env.NEXT_PUBLIC_DOMAIN
      }/verify${
        emailType === 'VERIFY' ? 'email' : 'password'
      }?token=${hashedToken}">here</a> ${
        emailType === 'VERIFY'
          ? 'to verify your email'
          : 'to reset your password'
      }</p>`,
      // auth: {
      //   user: 'user@example.com',
      // },
    });

    return mailResponse;
  } catch (error: any) {
    return error.message;
  }
};
