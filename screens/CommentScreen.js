import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
CommentScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Detail'),
  };
};
export default function CommentScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <Text>Comment</Text>
      </View>
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>Comment</Text>
          </View>
        </ScrollView> */}
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
