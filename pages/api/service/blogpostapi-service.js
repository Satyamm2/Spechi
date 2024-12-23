import pool from "@/lib/db";

const BlogPostService = {
  setBlogPost: async (user_id, description, heading) => {
    try {
      if (!heading || heading.length === 0) {
        return res.status(400).json({ message: "Heading is required" });
      }

      if (!description || description.length === 0) {
        return res.status(400).json({ message: "Description is required." });
      }

      const query = `
                  INSERT INTO public.posts (user_id, description, heading)
                  VALUES ($1, $2, $3)
                  RETURNING id, user_id, description, heading, created_at, updated_at
                `;
      const values = [user_id, description, heading];

      const result = await pool.query(query, values);

      const newPost = result.rows[0];
      return newPost;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getBlogPost: async () => {
    try {
      const query = `
          SELECT 
            p.id,
            p.user_id,
            p.description,
            p.created_at,
            p.updated_at,
            p.heading,
            u.username,
            u.first_name,
            u.last_name
          FROM
            public.posts p
          JOIN
            public.users u ON p.user_id = u.id
          ORDER BY created_at DESC
            ;
        `;
      const result = await pool.query(query);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getBlogPostOfLoggedInUser: async (id) => {
    try {
      const query = `
          SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC;
        `;
      const values = [id];
      const result = await pool.query(query, values);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default BlogPostService;
