import React from 'react';
import Slide1 from '../../assets/banner/slide1.png';
import Slide2 from '../../assets/banner/slide2.png';
import Slide3 from '../../assets/banner/slide3.png';
// import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {SimpleCarousel, Banner} from 'react-native-simple-banner-carousel';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <SimpleCarousel
          data={[
            {
              title: 'Hokkaido',
              source: Slide1,
            },
            {
              title: 'Tokyo',
              source: Slide2,
            },
            {
              title: 'Osaka',
              source: Slide3,
            },
          ]}
          renderItem={(props, i, width) => {
            return (
              <Banner
                id={`${props.title}_${i}`}
                source={props.source}
                width={width}
                onPress={id => console.log(`${id} was tapped.`)}
              />
            );
          }}
        />
      </View>
      {/* <StatusBar translucent={true} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    paddingVertical: 12,
    width: '100%',
    height: 215,
    backgroundColor: '#fff',
  },
});
