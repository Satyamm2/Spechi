import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session, status } = useSession();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome {session?.user ? session?.user?.first_name : "to Spechi"}
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Share your thoughts with world..
        </Typography>
        {session?.user ? (
          <></>
        ) : (
          <>
            <Button variant="contained" color="primary">
              <Link href="/apps/login" passHref>
                Get Started
              </Link>
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
