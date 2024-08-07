import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.musicalCubes',
  appName: 'musical-cubes',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
