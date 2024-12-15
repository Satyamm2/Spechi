import { getServerSession } from "next-auth";
import NextAuth from "@/pages/api/auth/[...nextauth]";
import BlogPostService from "./service/blogpostapi-service";

export const authOptions = NextAuth;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "POST":
      const { servicePost, user_id, description, heading } = req.body;

      if (servicePost == "SETBLOGPOST") {
        try {
          const response = await BlogPostService.setBlogPost(
            user_id,
            description,
            heading
          );
          return res.status(201).json(response);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error." });
        }
      }

    case "GET":
      const { service, userid } = req.query;

      if (service == "GETBOLGPOST") {
        try {
          const response = await BlogPostService.getBlogPost();
          return res.status(200).json(response);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error." });
        }
      }

      if (service == "GETBLOGPOSTOFLOGGEDUSER") {
        try {
          const response = await BlogPostService.getBlogPostOfLoggedInUser(
            userid
          );
          return res.status(200).json(response);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error." });
        }
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
