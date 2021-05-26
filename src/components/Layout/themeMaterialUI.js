import {createMuiTheme} from '@material-ui/core/styles';

export const PRIMARY = '#1d51a3';
export const PRIMARY_HOVERED = '#163ea4';

export const SECONDARY = '#ec1946';
export const SECONDARY_HOVERED = '#bf1338';

export const TEXT_COLOR = '#333';

const muiTheme = createMuiTheme({
    fontWeight: 200,
    typography: {
        useNextVariants: true,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 15
    },
    palette: {
        primary: {
            main: PRIMARY,
            dark: PRIMARY_HOVERED,
        },
        secondary: {
            main: SECONDARY,
            dark: SECONDARY_HOVERED,
        },
        text: {
            primary: TEXT_COLOR,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                padding: '5px 25px !important'
            },
        },
    },
});

export default muiTheme;