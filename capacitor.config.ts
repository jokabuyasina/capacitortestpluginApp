import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jonathank.apptestplugin',
  appName: 'Jonathan k Plugin',
  webDir: 'www',
  plugins: {
    extConfig: {},
    SplashScreen: {
      launchAutoHide: false
    },
    CapacitorUpdater: {
      version: '1.0.1',
      appId: 'com.jonathank.apptestplugin',
      autoUpdate: true,
      directUpdate: 'always',
      autoSplashscreen: true,
      publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEArQhWvQLs97e5RODyUb8g61+qXK7173bZbmENP4O+pmqoFg0DYEWL\nBXvOUdvjXxWBmlSTeKllfRY0NQ0EM7GqrUu/55wwsbmi4Yi2TAno8yn8NujSbQDr\noam23x5+IaPm/sLDMqFbjwL11jDqEWWWvXxgSu6PATZ44Lh+KtcoPeK8mj/ktwDd\nRBsNXTtmI4Mk5UMWdTLZ1eoXqldr/zA6crYlVES8MKP8sshyAFUCBOaelp8CIOUQ\nMmn9d+KqikERMv5l7aYrxwvTgokLZEihazakoID5zgmXIGDadV54QcyUrm5Exw0F\nlEEmbPDJVAeXns8JQuNqC1mRixIuFxzGtwIDAQAB\n-----END RSA PUBLIC KEY-----\n'
    }
  }
};

export default config;
