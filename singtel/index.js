/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {GameScreen} from './src/screens/GameScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => GameScreen);
