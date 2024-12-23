import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoggedInNavbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" color="white">
              Spechi
            </Typography>
            <Box>
              <Button color="inherit" sx={{ margin: "0 10px" }}>
                <Link href="/" passHref>
                  Home
                </Link>
              </Button>
              <Button color="inherit" sx={{ margin: "0 10px" }}>
                <Link href="/apps/explore-blogs" passHref>
                  Explore
                </Link>
              </Button>
              <Button
                color="inherit"
                sx={{ margin: "0 10px" }}
                onClick={handleMenuOpen}
              >
                Posts
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/apps/posts-creation" passHref>
                    Create a Post
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/apps/your-posts" passHref>
                    Your Posts
                  </Link>
                </MenuItem>
              </Menu>
              <Button color="inherit" sx={{ margin: "0 10px" }}>
                <Link href="/apps/contact" passHref>
                  Contact
                </Link>
              </Button>
              <Button
                color="inherit"
                sx={{ margin: "0 10px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
