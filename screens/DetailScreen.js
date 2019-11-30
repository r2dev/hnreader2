import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';
DetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Detail'),
    
  };
};
export default function DetailScreen(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
              <Text>Detail</Text>
          </View>
        </ScrollView> */}
        <WebView source={{uri: props.navigation.getParam('link')}} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },

  body: {
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
});
