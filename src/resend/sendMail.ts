import ResetPasswordEmail from "@/emails/ResetPassword";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handlePasswordResetEmail = async (
  email: string,
  url: string,
  firstName: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply <onboarding@personalfinance.com>",
      to: [email],
      subject: "Reset Password",
      react: ResetPasswordEmail({
        userFirstname: firstName,
        resetPasswordLink: url,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
