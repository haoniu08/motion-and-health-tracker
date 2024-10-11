import React, { createContext, useState, useContext } from 'react'
import styling from '../utils/StylingUtils';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
    headerColor: styling.colors.indigo,
    backgroundColor: styling.colors.mediumPurple,
    color: styling.colors.white,
}

const darkTheme = {
    headerColor: styling.colors.rebeccaPurple,
    backgroundColor: styling.colors.slateBlue,
    color: styling.colors.white,
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

