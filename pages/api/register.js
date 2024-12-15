import bcrypt from "bcrypt";
import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, firstName, lastName, mobileNumber, email } =
      req.body;

    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !email
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await pool.query(
        "SELECT id from public.users WHERE username = $1 OR mobile_number = $2 OR email = $3",
        [username, mobileNumber, email]
      );
      if (existingUser.rowCount > 0) {
        return res
          .status(409)
          .json({
            message: "Username, mobile number or email already exists.",
          });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO public.users (username, first_name, last_name, mobile_number, password, user_role, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
          username,
          firstName,
          lastName,
          mobileNumber,
          hashedPassword,
          "user",
          email,
        ]
      );

      if (result.rowCount > 0) {
        res.status(201).json({ message: "Registration successful!" });
      } else {
        res
          .status(500)
          .json({ message: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
