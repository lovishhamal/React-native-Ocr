/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';

import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const App: () => React$Node = () => {
  const [state, setState] = useState({photo: null});
  const [text, setText] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setState({photo: response});
      }
    });
  };

  const AnalyzeText = async (image) => {
    let ret = axios
      .post('http://127.0.0.1:5000/analyze', {file: image})
      .then((res) => setText(res.data));
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
        <View style={styles.imageView}>
          {state.photo && (
            <View>
              <Image
                source={{uri: state.photo.uri}}
                style={{width: 250, height: 250}}
              />
              <Button
                title="Analyze Photo"
                onPress={() => AnalyzeText(state.photo)}></Button>
              <Text>{text}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 40,
  },
});

export default App;
