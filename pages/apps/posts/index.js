import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function Posts() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        //   justifyContent: "center", // Horizontally center the card
        //   alignItems: "center", // Vertically center the card
          height: "100vh", // Full viewport height
          m: 2, // 10px margin around the box
          width: '100%'
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 345 }}>
          {/* Card Header with Title and Subheader */}
          <CardHeader title="Card Title" subheader="Card Subheader" />

          {/* Card Content */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This is the content of the card. It can include text, images, or
              other components.
            </Typography>
          </CardContent>

          {/* Card Footer */}
          <CardActions>
            <Button size="small">Action 1</Button>
            <Button size="small">Action 2</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
