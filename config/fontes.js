import { Platform } from 'react-native';

export const fontes = {
  principal: Platform.select({
    android: 'sans-serif',
    ios: 'System',
    web: 'Arial',
    default: 'System',
  }),
};
