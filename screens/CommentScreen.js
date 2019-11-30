import React, {useState, useEffect} from 'react';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlatList} from 'react-native-gesture-handler';
// import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
CommentScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Detail'),
  };
};
export default function CommentScreen(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    const itemId = props.navigation.getParam('id');
    fetch(`https://api.hnpwa.com/v0/item/${itemId}.json`)
      .then(response => response.json())
      .then(json => {
        setData(json);
      });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.body}>
          {data && (
            <CommentItem
              content={data.content}
              user={data.user}
              ago={data.time_ago}
              comments={data.comments}
              root={true}></CommentItem>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

function CommentItem(props) {
  async function openLink(url) {
    try {
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
  if (props.root) {
    return (
      <FlatList
        data={props.comments}
        renderItem={({item}) => (
          <>
            {
              (item.type = 'comment' && (
                <CommentItem
                  content={item.content}
                  user={item.user}
                  ago={item.time_ago}
                  comments={item.comments}></CommentItem>
              ))
            }
          </>
        )}
        keyExtractor={item => '' + item.id}></FlatList>
    );
  }
  return (
    <View style={styles.commentContainer}>
      <Text>
        🔽{' ' + props.ago} by {props.user}
      </Text>
      <View style={styles.commentContent}>
        <HTMLView value={props.content} onLinkPress={openLink}></HTMLView>
        {props.comments && props.comments.length !== 0 && (
          <View style={styles.nestContainer}>
            <FlatList
              data={props.comments}
              renderItem={({item}) => (
                <>
                  {
                    (item.type = 'comment' && (
                      <CommentItem
                        content={item.content}
                        user={item.user}
                        ago={item.time_ago}
                        comments={item.comments}></CommentItem>
                    ))
                  }
                </>
              )}
              keyExtractor={item => '' + item.id}></FlatList>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },

  body: {
    backgroundColor: Colors.white,
    paddingRight: 12,
  },
  safeArea: {
    flex: 1,
  },
  commentContainer: {
    paddingLeft: 16,
    marginBottom: 16,
    marginTop: 4,
  },
  commentContent: {
    marginTop: 4,
    paddingLeft: 8,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#9E9E9E',
  },
  nestContainer: {
    marginTop: 2,
  },
});
