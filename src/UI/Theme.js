import { useSelector } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Theme = (props) => {
    const isDarkModeEnabled = useSelector(state => state.ui.isDarkModeEnabled);
    const theme = isDarkModeEnabled ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                {props.children}
            </CssBaseline>
        </ThemeProvider>
    )
};

export default Theme; 