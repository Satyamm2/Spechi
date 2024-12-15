import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    mobileNumber: "",
  });
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  const handleFormMode = () => {
    setFormData({
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      mobileNumber: "",
    });
    setMessage("");
    setIsRegister(!isRegister);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const endPoint = "/api/register";

    const payLoad = {
      username: formData?.username,
      password: formData?.password,
      firstName: formData?.firstname,
      lastName: formData?.lastname,
      mobileNumber: formData?.mobileNumber,
      email: formData?.email,
    };

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });

    const data = await response.json();
    if (response.ok) {
      setFormData({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        mobileNumber: "",
      });
      setMessage(data.message);
      setIsSuccess(true);
    } else {
      setMessage(data.message);
      setIsSuccess(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isRegister) {
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: formData?.email,
      password: formData?.password,
    });
    if (result.ok) {
      setFormData({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        mobileNumber: "",
      });
      setMessage("Login Successfull!");
      setIsSuccess(true);
    } else {
      setMessage(result.error || "Login failed");
      setIsSuccess(false);
    }
  };

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <form onSubmit={isRegister ? handleRegister : handleLogin} noValidate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" align="center">
            {isRegister ? "Register" : "Login"}
          </Typography>

          {isRegister && (
            <>
              <TextField
                name="firstname"
                label="First Name"
                variant="outlined"
                fullWidth
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {isRegister && (
            <TextField
              name="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>

          {message && (
            <Alert severity={isSuccess ? "success" : "error"}>{message}</Alert>
          )}
          <Typography align="center" sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                handleFormMode();
              }}
            >
              {isRegister
                ? "Already have an account? Login here!"
                : "Don't have an account? Register now!"}
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
}

//
