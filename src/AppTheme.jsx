import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import './assets/styles/variables.scss'

export const AppTheme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: indigo,
    error: red,
    textPrimary: 'white',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Futura PT Book, sans-serif',
    letterSpacing: '0.1em',
    htmlFontSize: 12,
    useNextVariants: true,
  },

  overrides: {
    MuiButton: {
      text: {
        fontWeight: 300,
        fontSize: '13px',
        fontFamily: 'Futura PT Medium, sans-serif',
      },
    },

  }
});

