import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close,
  Email,
  Lock,
} from "@mui/icons-material";

const LoginComp = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    // Add your authentication logic here
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      className="flex items-center justify-center"
    >
      <Box className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <IconButton
          onClick={handleClose}
          className="absolute -top-4 -right-90 text-gray-500 hover:text-gray-700 "
          size="small"
        >
          <Close />
        </IconButton>

        <div className="text-center mb-8">
          <Typography
            variant="h5"
            component="h2"
            className="text-gray-800 font-bold"
          >
            Login to Your Account
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            Welcome back! Please enter your details
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="mb-10">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="mb-10"
              />
            </div>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className="flex justify-between items-center pt-2 pb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-teal-600 hover:text-teal-500 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-teal-600 hover:bg-teal-700 normal-case py-2.5 text-base font-medium shadow-sm"
            >
              Sign in
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginComp;
