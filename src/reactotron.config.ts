import type { ReactotronReactNative } from 'reactotron-react-native';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import config from '../app.json';
import { storage } from './App';

const tron = Reactotron.configure({
  name: config.name,
  host: '192.168.1.26',
})
  .useReactNative({
    networking: { ignoreUrls: /symbolicate/ },
    asyncStorage: false,
    overlay: false,
  })
  //
  .use(
    mmkvPlugin<ReactotronReactNative>({ storage }),
  )
  .connect();

if (__DEV__) {
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    originalConsoleLog(...args);
    tron.log(...args);
  };
}

export default tron;
