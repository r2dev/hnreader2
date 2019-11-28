/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const App = createAppContainer(AppNavigator);

export default App;
