import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.italostudy.app',
  appName: 'ITALOSTUDY',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "243486405781-pb7iiqt4efkamq9lmipcvbisinehs2o7.apps.googleusercontent.com",
      clientId: "243486405781-pb7iiqt4efkamq9lmipcvbisinehs2o7.apps.googleusercontent.com",
      androidClientId: "243486405781-pb7iiqt4efkamq9lmipcvbisinehs2o7.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
