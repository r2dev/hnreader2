import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow';
HomeScreen.navigationOptions = {
  title: 'Home',
  // headerRight: () => (
  //   <Button onPress={() => alert('This is a button!')} title="Info" />
  // ),
};
export default function HomeScreen(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date());
  useEffect(() => {
    getNews(page, true);
  }, []);
  function getNews(page, refresh = false) {
    if (refresh) {
      setRefreshing(true);
    }
    setLoading(true);
    fetch(`https://api.hnpwa.com/v0/news/${page}.json`)
      .then(response => response.json())
      .then(json => {
        if (refresh) {
          setRefreshing(false);
          setData(json);
          setRefreshTime(new Date());
        } else {
          setData(data.concat(json));
        }
        setLoading(false);
      });
  }
  function handleRefresh() {
    setPage(1);
    getNews(1, true);
  }
  function handleEndReach() {
    const currentPage = page;
    setPage(currentPage + 1);
    getNews(currentPage + 1, false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.body}>
          <FlatList
            data={data}
            onEndReached={handleEndReach}
            onEndReachedThreshold={1}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            renderItem={({item}) => (
              <>
                {(item.type === 'link' || item.type === 'job') && (
                  <LinkNews
                    item={item}
                    navigation={props.navigation}
                    type={item.type}
                  />
                )}
              </>
            )}
            keyExtractor={item => '' + item.id}
            ListFooterComponent={
              loading && <ActivityIndicator style={{color: '#000'}} />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                title={formatDistanceToNow(refreshTime)}
              />
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function LinkNews(props) {
  function handleCommentPress() {
    props.navigation.navigate('Comment', {
      id: props.item.id,
      link: props.item.url,
      title: props.item.title,
    });
  }
  async function openLink() {
    try {
      const url = props.item.url;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'popover',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  return (
    <TouchableOpacity onPress={openLink}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {props.item.title}
          {props.item.domain && (
            <Text style={styles.domain}> ({props.item.domain})</Text>
          )}
        </Text>

        <View style={styles.sectionBottom}>
          {(props.type === 'link') && (
            <>
              <View style={styles.sectionInfo}>
                <Text>⬆️{props.item.points}</Text>
                <Text>{' · ' + props.item.user}</Text>
              </View>
              <TouchableOpacity onPress={handleCommentPress}>
                <View style={styles.commentButton}>
                  <Text>🗣{props.item.comments_count}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {props.type === 'job' && (
            <View style={styles.sectionInfo}>
              <Text>💼</Text>
            </View>
          )}
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
    marginTop: 8,
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
  sectionBottom: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCC',
    marginTop: 16,
    marginLeft: 24,
    width: '100%',
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
  domain: {
    fontSize: 16,
    fontWeight: '400',
  },
  commentButton: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
