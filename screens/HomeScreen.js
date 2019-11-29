import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default function HomeScreen(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.hnpwa.com/v0/news/1.json')
      .then(response => response.json())
      .then(json => {
        setData(json);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.body}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <>
                {
                  (item.type = 'link' && (
                    <LinkNews item={item} navigation={props.navigation} />
                  ))
                }
              </>
            )}
            keyExtractor={item => '' + item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function LinkNews(props) {
  function handleLinkPress() {
    props.navigation.navigate('Detail', {
      id: props.item.id,
      link: props.item.url,
    });
  }
  function handleCommentPress() {
    props.navigation.navigate('Comment');
  }
  return (
    <TouchableOpacity onPress={handleLinkPress}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{props.item.title}</Text>
        <View style={styles.sectionButton}>
          <View style={styles.sectionInfo}>
            <Text>⬆️{props.item.points}</Text>
            <Text>{' | ' + props.item.user}</Text>
            {props.item.domain && <Text>{' | ' + props.item.domain}</Text>}
          </View>
          <TouchableOpacity onPress={handleCommentPress}>
            <View>
              <Text>🗣{props.item.comments_count}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  sectionButton: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionInfo: {
    flexDirection: 'row',
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
