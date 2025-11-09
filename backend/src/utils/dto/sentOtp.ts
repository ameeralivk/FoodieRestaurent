import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface otpResponse {
    success:boolean,
    message:string
}

export const sentOtp = async (email: string, otp: string): Promise<otpResponse> => {
  try {
    const mailOptions = {
      from: `"FoodieRestaurant" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html:`<div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 10px;
      border: 1px solid #ddd;
      max-width: 480px;
      margin: auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  ">
    <div style="text-align: center;">
      <h1 style="
        color: #e63946;
        font-size: 28px;
        margin-bottom: 10px;
      ">🍴 FoodieRestaurant</h1>
      <p style="color: #555; font-size: 16px; margin-bottom: 25px;">
        Welcome to <strong>FoodieRestaurant</strong>! To complete your verification, please use the OTP below:
      </p>
      <div style="
        background-color: #fff;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 8px;
        border: 2px dashed #e63946;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 3px;
        color: #e63946;
        margin-bottom: 20px;
      ">
        ${otp}
      </div>
      <p style="color: #777; font-size: 14px;">
        This OTP is valid for <b>5 minutes</b>.<br>
        Please do not share it with anyone.
      </p>
      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        You're receiving this email because you requested verification from FoodieRestaurant.<br>
        If you didn’t request this, please ignore this message.
      </p>
    </div>
  </div>`
    };
    await transporter.sendMail(mailOptions);
    return {success:true,message:"Otp sented successfully"}
  } catch (error) {
  console.error(error);
  return { success: false, message: "Failed to send OTP" };
  }
};


export const resendOtpEmail = async (email: string, otp: string) => {
  try {
     const mailOptions = {
      from: `"FoodieRestaurant" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html:`<div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 10px;
      border: 1px solid #ddd;
      max-width: 480px;
      margin: auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  ">
    <div style="text-align: center;">
      <h1 style="
        color: #e63946;
        font-size: 28px;
        margin-bottom: 10px;
      ">🍴 FoodieRestaurant</h1>
      <p style="color: #555; font-size: 16px; margin-bottom: 25px;">
        Welcome to <strong>FoodieRestaurant</strong>! To complete your verification, please use the OTP below:
      </p>
      <div style="
        background-color: #fff;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 8px;
        border: 2px dashed #e63946;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 3px;
        color: #e63946;
        margin-bottom: 20px;
      ">
        ${otp}
      </div>
      <p style="color: #777; font-size: 14px;">
        This OTP is valid for <b>5 minutes</b>.<br>
        Please do not share it with anyone.
      </p>
      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        You're receiving this email because you requested verification from FoodieRestaurant.<br>
        If you didn’t request this, please ignore this message.
      </p>
    </div>
  </div>`
    };
    await transporter.sendMail(mailOptions);
    return {success:true,message:"Otp resented successfully"}
  } catch (error) {
  console.error(error);
  return { success: false, message: "Failed to send OTP" };
  }
};