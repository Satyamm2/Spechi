import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostsCreation() {
  const [formData, setFormData] = useState({
    description: "",
    heading: "",
  });
  const [isSubmitting, setIsubmitting] = useState(false);
  const { data: session, status } = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsubmitting(true);

    try {
      const response = await axios.post("/api/blogpost-api", {
        servicePost: "SETBLOGPOST",
        user_id: session?.user?.id,
        description: formData?.description,
        heading: formData?.heading,
      });

      if (response.status === 201) {
        toast.success(response?.statusText);
        setFormData({});
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(response?.message);
    } finally {
      setIsubmitting(false);
    }
  };

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (status == "unauthenticated") {
    return <div>Unauthorized, please login...!!!</div>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create a Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              name="heading"
              label="Heading"
              fullWidth
              variant="outlined"
              required
              value={formData.heading}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Story Description"
              required
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
