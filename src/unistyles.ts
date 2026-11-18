import { StyleSheet } from 'react-native-unistyles';

const lightTheme = { colors: {} };

type AppThemes = { light: typeof lightTheme };

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: { light: lightTheme },
  settings: { initialTheme: 'light' },
});
