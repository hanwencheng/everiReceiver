import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {HomeScreenStyles as styles} from "../styles/HomeScreenStyle";
import TokenProgress from '../components/TokenProgress';

export default class HomeScreen extends React.Component {
  constructor (props) {
    super();
    this.state = {message: 'no message'};
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    const ws = new WebSocket('ws://192.168.178.22:1337', (result, code)=> {
      console.log(result, code)
    })
    ws.onopen = () => {
      // connection opened
      console.log('is opened')
      ws.send('something'); // send a message
    };
    ws.onmessage = (message) => {
      this.setState({message: message.data.toString()})
      console.log('receive message4')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/EveriDeliver.jpg')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {/*{this._maybeRenderDevelopmentModeWarning()}*/}

            <TokenProgress/>

            <Text style={styles.getStartedText}>
              {this.state.message}
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <Button onPress={this._handleHelpPress} style={styles.helpLink} title='Reload'>
            </Button>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Powered By</Text>

          <Image
            source={
              __DEV__
                ? require('../assets/images/EveriToken.png')
                : require('../assets/images/EveriToken.png')
            }
            style={styles.poweredImage}
          />

          <Image
            source={require('../assets/images/blockweise.png')}
            style={styles.poweredImage}
          />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    Expo.Util.reload()
    // WebBrowser.openBrowserAsync(
    //   'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    // );
  };
}
