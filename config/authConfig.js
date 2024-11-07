import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';

import { makeRedirectUri } from 'expo-auth-session';

  const AndroidClientId = Constants.expoConfig?.extra?.AndroidClientId;
  const IosClientId = Constants.expoConfig?.extra?.IosClientId;
  const WebClientId = Constants.expoConfig?.extra?.WebClientId;
  const apiKey = Constants.expoConfig?.extra?.firebaseConfig?.apiKey;
  const authDomain = Constants.expoConfig?.extra?.firebaseConfig?.authDomain;
  const projectId = Constants.expoConfig?.extra?.firebaseConfig?.projectId;
  const storageBucket = Constants.expoConfig?.extra?.firebaseConfig?.storageBucket;
  const messagingSenderId = Constants.expoConfig?.extra?.firebaseConfig?.messagingSenderId;
  const appId = Constants.expoConfig?.extra?.firebaseConfig?.appId;
  const measurementId = Constants.expoConfig?.extra?.firebaseConfig?.measurementId;

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  let RedirectUri;
  export const useGoogleAuthRequest = () => {

    if(Platform.OS === 'web'){
      RedirectUri = makeRedirectUri({
        scheme: 'pausaacucarada',
        useProxy: true,
        //path: '/@caueuliani/PausaAcucarada',
      })
    }
    else {
      RedirectUri = makeRedirectUri({
        scheme: 'pausaacucarada',
        useProxy: true,
        path: '/@caueuliani/PausaAcucarada',
      })
    }

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: AndroidClientId,
    iosClientId: IosClientId,
    webClientId: WebClientId,
    redirectUri: RedirectUri,
    scopes:  ['openid', 'profile', 'email']

  });
  return { request, response, promptAsync };
}
export { auth, app };