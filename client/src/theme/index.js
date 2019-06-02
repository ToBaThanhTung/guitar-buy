import { createMuiTheme } from "@material-ui/core"


const defaultTheme = createMuiTheme({});
const { breakpoints, typography: { pxToRem } } = defaultTheme

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      headline: {
        fontSize: pxToRem(24),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(32)
        }
      },
      title: {
        fontSize: pxToRem(16),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(24)
        }
      },
     
    }
  }
});

export default theme;