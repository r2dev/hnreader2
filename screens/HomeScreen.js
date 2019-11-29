import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default function HomeScreen(props) {
  const [data, setData] = useState([
    {
      id: 'fhgodshfgos',
      title: 'Rooms can be as bright as the outdoors',
    },
    {
      id: '45ytjrtjtr',
      title: 'Matrix Calculus for Deep Learning',
    },
    {
      id: 'asdofhashdogfa',
      title: 'Singapore tells Facebook to correct post under new fake news law',
    },
  ]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {data.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => props.navigation.navigate('Detail')}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{item.title}</Text>
                  <Text style={styles.sectionDescription}>
                    {/* Edit <Text style={styles.highlight}>App.js</Text> to change
                    this screen and then come back to see your edits. */}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  safeArea: {
    flex: 1,
  },
});
