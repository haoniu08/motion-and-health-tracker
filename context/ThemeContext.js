import React, { createContext, useState, useContext } from 'react'
import styling from '../utils/StylingUtils';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
    backgroundColor: styling.colors.white,
    color: styling.colors.black,
    buttonColor: styling.colors.black,
    buttonTextColor: styling.colors.white,
}

const darkTheme = {
    backgroundColor: styling.colors.black,
    color: styling.colors.white,
    buttonColor: styling.colors.white,
    buttonTextColor: styling.colors.black,
}

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

