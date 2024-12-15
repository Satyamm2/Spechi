import pool from "@/lib/db";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          const userResult = await pool.query(
            "SELECT * FROM public.users WHERE email = $1",
            [email]
          );
          if (userResult.rowCount === 0) {
            throw new Error("Invalid email or password");
          }

          const user = userResult.rows[0];

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            mobile_number: user.mobile_number,
            user_role: user.user_role,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Login Failed");
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.mobile_number = user.mobile_number;
        token.user_role = user.user_role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.mobile_number = token.mobile_number;
      session.user.user_role = token.user_role;

      delete session.user.iat;
      delete session.user.sub;
      delete session.user.jti;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
