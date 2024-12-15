import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";

export default function Navbar() {
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
                <Link href="/apps/login" passHref>
                  Login/Register
                </Link>
              </Button>
              <Button color="inherit" sx={{ margin: "0 10px" }}>
                <Link href="/apps/contact" passHref>
                  Contact
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
