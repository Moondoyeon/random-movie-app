import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AlertModalProvider } from './context/alertModalContext';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/theme';
import SearchListProvider from './context/searchMoviesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SearchListProvider>
    <ThemeProvider theme={colors}>
      <AlertModalProvider>
        <App />
      </AlertModalProvider>
    </ThemeProvider>
  </SearchListProvider>,
);
