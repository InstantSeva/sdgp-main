import * as eva from '@eva-design/eva';
import { darkTheme as customDark } from './dark';
import { lightTheme as customLight } from './light';

export const lightTheme = { ...eva.light, ...customLight };
export const darkTheme = { ...eva.dark, ...customDark };
