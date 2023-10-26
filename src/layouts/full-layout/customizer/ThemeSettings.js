import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BuildTheme } from '../../../assets/global/Theme-variable';

const ThemeSettings = () => {
  const custom = useSelector((state) => state.CustomizerReducer);
  const theme = BuildTheme({
    direction: custom.activeDir,
    theme: custom.activeTheme,
  });
  useEffect(() => {
    document.dir = custom.activeDir;
  }, [custom]);

  return theme;
};
export default ThemeSettings;
