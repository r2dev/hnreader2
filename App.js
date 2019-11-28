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
import DetailScreen from './screens/DetailScreen';

// var hnapi = firebase
//   .initializeApp(
//     {databaseURL: 'https://hacker-news.firebaseio.com/v3/'},
//     'hackernews',
//   )
//   .then(app => console.log('initialized apps ->', firebase.apps));
// const db = firebase.app('hackernews').database();

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
