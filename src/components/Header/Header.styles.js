export default (theme) => ({
    avatar: {
        marginLeft: 'auto'
    },
    header: {
        zIndex: 10000
    },
    popper: {
        zIndex: '10000 !important'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.primary
        }
    },
    logo: {
        width: '210px',
        position: 'relative',
        top: '2px',
    }
});