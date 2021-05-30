export default (theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    form: {
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        background: 'white',
        margin: 'auto',
        width: '310px',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px'
    },
    textField: {
        marginBottom: '15px'
    },
    button: {
        marginTop: '15px'
    },
    noAccount: {
        marginTop: '15px'
    },
    link: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.dark,
        }
    }
});