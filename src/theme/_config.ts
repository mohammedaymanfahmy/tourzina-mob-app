import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}
export const colors = {
  error: {
    0: '#FFF0F3',
    100: '#DF1C41',
    200: '#96132C',
    25: '#FADBE1',
    300: '#710E21',
    50: '#ED8296',
  },
  grey: {
    0: '#FFFFFF',
    100: '#DFE1E7',
    200: '#C1C7D0',
    25: '#F6F8FA',
    300: '#030404ff',
    400: '#818898',
    50: '#ECEFF3',
    500: '#666D80',
    600: '#36394A',
    700: '#272835',
    800: '#1A1B25',
    900: '#0D0D12',
  },
  primary: {
    100: '#B5D5FA',
    200: '#91C0F8',
    300: '#5EA4F5',
    400: '#3F92F3',
    50: '#E7F1FE',
    500: '#0F77F0',
  },
  success: {
    0: '#EFFEFA',
    100: '#40C4AA',
    200: '#28806F',
    25: '#DDF3EF',
    300: '#184E44',
    50: '#9EE1D4',
  },

  warning: {
    0: '#FFF6E0',
    100: '#FFBE4C',
    200: '#966422',
    25: '#FAEDCC',
    300: '#5C3D1F',
    50: '#FCDA83',
  },

};
const colorsLight = {

  // New semantic colors from palette
  background: colors.grey[0],
  border: colors.grey[200],
  disabled: colors.grey[200],
  divider: colors.grey[50],
  error: colors.error[100],
  primary: colors.primary[500],
  success: colors.success[200],
  text: colors.grey[900],
  textSecondary: colors.grey[500],
  textTertiary: colors.grey[300],
  warning: colors.warning[200],

  // Additional shades for button states
  white: colors.grey[0],
  lightGray: colors.grey[25],
  primaryHover: colors.primary[50],
  errorHover: colors.error[100],
  black: '#000000',


} as const;

const colorsDark = {

  // New semantic colors from palette
  background: colors.grey[900],
  border: colors.grey[700],
  disabled: colors.grey[200],
  divider: colors.grey[800],
  error: colors.error[100],
  primary: colors.primary[100],
  success: colors.success[50],
  text: colors.grey[0],
  textSecondary: colors.grey[300],
  textTertiary: colors.grey[500],
  warning: colors.warning[50],

  // Additional shades for button states
  white: colors.grey[0],
  lightGray: colors.grey[800],
  primaryHover: colors.primary[200],
  errorHover: colors.error[100],
  black: '#FFFFFF',

} as const;

const sizes = [12, 16, 24, 32, 40, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
      },
    },
  },
} as const satisfies ThemeConfiguration;
