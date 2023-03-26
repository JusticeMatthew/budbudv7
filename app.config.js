import 'dotenv/config';

export default {
  expo: {
    name: 'BudBud',
    description:
      'To sample this app you will need to download the EXPO app from your respective app store and then scan the provided QR code.',
    primaryColor: '#15DB95',
    slug: 'BudBud',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.budbud.budbud',
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      package: 'com.budbud.budbud',
      versionCode: 1,
      googleServicesFile: './GoogleService-Info.plist',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  },
};
