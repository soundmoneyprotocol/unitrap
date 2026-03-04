import Button from '../basic/button/Button'
import { useState, useEffect } from "react";

const ThemeButton = () => {
    const [activeTheme, setActiveTheme] = useState('light');
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
      const savedTheme = window.localStorage.getItem('theme');
      savedTheme && setActiveTheme(savedTheme);
    }, []);

    useEffect(() => {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem('theme', activeTheme);
    }, [activeTheme]);

    return (
        <Button type='secondary' bg='toggle' onClick={() => setActiveTheme(inactiveTheme)} iconClass='icon-moon' ariaLabel={`Change to ${inactiveTheme} mode`} title={`Change to ${inactiveTheme} mode`}/>
    )
}

export default ThemeButton