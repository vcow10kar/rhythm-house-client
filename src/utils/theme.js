import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        
        primary: {
            main: '#384AF1'
        },

        secondary: {
            main: '#3F7EA6'
        }
    },

    shape: {
        borderRadius: '0px'
    },

    components :{
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'white',
                    height: '48px',
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: '500',
                    borderRadius: '0px',
                    outline: '2px',
                    width: '200px',
                    border: '2px solid #384AF1'
                }

            }
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: '10px 0px',
                }
            }
        },

        MuiModal: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                    outline: '2px'
                }

            }
        }
    }
})

export default theme;