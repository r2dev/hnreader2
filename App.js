/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import firebase from '@react-native-firebase/app';

import HomeScreen from './screens/HomeScreen';
import CommentScreen from './screens/CommentScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Comment: {
      screen: CommentScreen,
    },
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'none',
  },
);

const App = createAppContainer(AppNavigator);

export default App;
