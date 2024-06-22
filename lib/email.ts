import { env } from '@/env.mjs';
import { Resend } from 'resend';

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `${env.NEXT_PUBLIC_APP_URL}/new-verification?token=${token}`;

  return await resend.emails.send({
    from: 'Verify <support@aintellecthub.com>',
    to: [email],
    subject: 'Verify your email',
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetPasswordLink = `${env.NEXT_PUBLIC_APP_URL}/new-password?token=${token}`;

  return await resend.emails.send({
    from: 'Reset password <support@aintellecthub.com>',
    to: [email],
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`,
  });
}