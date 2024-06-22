
import Google from "next-auth/providers/google"
import { env } from "@/env.mjs"

import type { NextAuthConfig } from "next-auth"
import { siteConfig } from "@/config/site"
import { getUserByEmail } from "@/data/user";
import MagicLinkEmail from "@/emails/magic-link-email"
import { prisma } from "@/lib/db"
import { resend } from "./lib/email";
import Credentials from "next-auth/providers/credentials"

import { userAuthSchema } from "./lib/validations/auth"
import bcrpyt from "bcryptjs"

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = userAuthSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrpyt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
    // Email({
    //   sendVerificationRequest: async ({ identifier, url, provider }) => {
    //     const user = await getUserByEmail(identifier);
    //     if (!user || !user.name) return null;

    //     const userVerified = user?.emailVerified ? true : false;
    //     const authSubject = userVerified ? `Sign-in link for ${siteConfig.name}` : "Activate your account";

    //     try {
    //       const { data, error } = await resend.emails.send({
    //         from: 'AIntellectHub App <onboarding@resend.dev>',
    //         to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
    //         subject: authSubject,
    //         react: MagicLinkEmail({
    //           firstName: user?.name as string,
    //           actionUrl: url,
    //           mailType: userVerified ? "login" : "register",
    //           siteName: siteConfig.name
    //         }),
    //         // Set this to prevent Gmail from threading emails.
    //         // More info: https://resend.com/changelog/custom-email-headers
    //         headers: {
    //           'X-Entity-Ref-ID': new Date().getTime() + "",
    //         },
    //       });

    //       if (error || !data) {
    //         throw new Error(error?.message)
    //       }

    //       // console.log(data)
    //     } catch (error) {
    //       throw new Error("Failed to send verification email.")
    //     }
    //   },
    // }),
  ],
} satisfies NextAuthConfig