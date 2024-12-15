import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function ExploreBlogs() {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get("/api/blogpost-api", {
        params: {
          service: "GETBOLGPOST",
        },
      });
      if (response?.status == 200) {
        const data = response?.data?.rows;
        setBlogPost(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Grid container spacing={2} mt={2} p={2}>
        {blogPost?.map((ele, index) => {
          return (
            <>
              <Grid key={index} item xs={4}>
                <Card sx={{ border: "1px solid #ccc" }}>
                  <CardHeader title={ele?.heading || "No Title"} />
                  <Divider sx={{ mx: 1 }} />
                  <CardContent sx={{ height: 150, overflow: "auto" }}>
                    {ele?.description}
                  </CardContent>
                  <Divider sx={{ mx: 1 }} />
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      By: {ele?.username || "Unknown"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Date:{" "}
                      {formatDate(ele?.created_at) || "Date not available"}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
