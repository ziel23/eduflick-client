// src/App.js
import React from 'react';
import AppRouter from './router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  // Customize your theme here
});

const App = () => (
  <div style={{minHeight: '100vh', background: '#3098c6'}}>
    <ThemeProvider theme={theme}>
      <AppRouter/>
    </ThemeProvider>
  </div>
);

export default App;