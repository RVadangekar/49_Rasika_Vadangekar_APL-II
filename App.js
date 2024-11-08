import React, { useState } from "react";
import { Button, Typography, Container, AppBar, Toolbar, Box, TextField } from "@mui/material";

function App() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center', 
        }}>
          <Typography variant="h6">
            My MUI App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome, {name || "User"}
          </Typography>
          <TextField
            label="Enter your name"
            variant="outlined"
            value={name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary">
            Click Me
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
