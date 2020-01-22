import React from 'react';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import amber from 'material-ui/colors/amber';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: amber[300],
      main: amber[500],
      light: amber[700]
    }
  }
});

export default Component => props => (
  <MuiThemeProvider theme={theme}>
    <Component {...props} />
  </MuiThemeProvider>
);
