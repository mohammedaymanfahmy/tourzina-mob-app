import { createTamagui, createTokens } from 'tamagui';

// Import color palette from your theme config
const colors = {
  error: {
    0: '#FFF0F3',
    25: '#FADBE1',
    50: '#ED8296',
    100: '#DF1C41',
    200: '#96132C',
    300: '#710E21',
  },
  grey: {
    0: '#FFFFFF',
    25: '#F6F8FA',
    50: '#ECEFF3',
    100: '#DFE1E7',
    200: '#C1C7D0',
    300: '#A4ACB9',
    400: '#818898',
    500: '#666D80',
    600: '#36394A',
    700: '#272835',
    800: '#1A1B25',
    900: '#0D0D12',
  },
  primary: {
    50: '#E7F1FE',
    100: '#B5D5FA',
    200: '#91C0F8',
    300: '#5EA4F5',
    400: '#3F92F3',
    500: '#0F77F0',
  },
  success: {
    0: '#EFFEFA',
    25: '#DDF3EF',
    50: '#9EE1D4',
    100: '#40C4AA',
    200: '#28806F',
    300: '#184E44',
  },
  warning: {
    0: '#FFF6E0',
    25: '#FAEDCC',
    50: '#FCDA83',
    100: '#FFBE4C',
    200: '#966422',
    300: '#5C3D1F',
  },
};

const tokens = createTokens({
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    true: 16,
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    true: 16,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    true: 4,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
  },
  color: {
    // Primary
    primary0: colors.primary[50],
    primary25: colors.primary[100],
    primary50: colors.primary[100],
    primary100: colors.primary[200],
    primary200: colors.primary[300],
    primary300: colors.primary[400],
    primary: colors.primary[500],

    // Grey
    grey0: colors.grey[0],
    grey25: colors.grey[25],
    grey50: colors.grey[50],
    grey100: colors.grey[100],
    grey200: colors.grey[200],
    grey300: colors.grey[300],
    grey400: colors.grey[400],
    grey500: colors.grey[500],
    grey600: colors.grey[600],
    grey700: colors.grey[700],
    grey800: colors.grey[800],
    grey900: colors.grey[900],

    // Success
    success0: colors.success[0],
    success25: colors.success[25],
    success50: colors.success[50],
    success100: colors.success[100],
    success200: colors.success[200],
    success: colors.success[100],

    // Error
    error0: colors.error[0],
    error25: colors.error[25],
    error50: colors.error[50],
    error100: colors.error[100],
    error200: colors.error[200],
    error: colors.error[100],

    // Warning
    warning0: colors.warning[0],
    warning25: colors.warning[25],
    warning50: colors.warning[50],
    warning100: colors.warning[100],
    warning200: colors.warning[200],
    warning: colors.warning[100],

    // Semantic
    background: colors.grey[0],
    text: colors.grey[900],
    textSecondary: colors.grey[500],
    textTertiary: colors.grey[300],
    border: colors.grey[100],
    divider: colors.grey[50],
    disabled: colors.grey[300],
  },
});

const config = createTamagui({
  tokens,
  themes: {
    light: {
      background: colors.grey[0],
      text: colors.grey[900],
      textSecondary: colors.grey[500],
      textTertiary: colors.grey[300],
      primary: colors.primary[500],
      success: colors.success[100],
      error: colors.error[100],
      warning: colors.warning[100],
      border: colors.grey[100],
      divider: colors.grey[50],
      disabled: colors.grey[300],
    },
    dark: {
      background: colors.grey[900],
      text: colors.grey[0],
      textSecondary: colors.grey[300],
      textTertiary: colors.grey[500],
      primary: colors.primary[100],
      success: colors.success[50],
      error: colors.error[50],
      warning: colors.warning[50],
      border: colors.grey[700],
      divider: colors.grey[800],
      disabled: colors.grey[600],
    },
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
