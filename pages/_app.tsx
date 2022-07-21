import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header/Header';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/Theme';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <Header theme={theme} setTheme={setTheme} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
