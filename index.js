/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Slider,
  Dimensions
} from 'react-native';

import Video from 'react-native-video';

const {width,height} = Dimensions.get('window')

export default class VideoPlay extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      playState:false,
      max:0,
      min:0,
      currentTime:0
    };
  }

  // 更改播放状态 播放 - 暂停
  _changPlayState = () =>{
    this.setState({playState:!this.state.playState})
  }

  //  播放器进度条回调
  _onProgress = (e) =>{
    this.setState({currentTime:e.currentTime})
  }

  // 播放器读取数据
  _onLoad = (e) =>{
    this.setState({max:e.duration})
  }

  // 播放器读取开始时间
  _onEnd = (e) =>{
    console.log('播放器读取结束事件',e);
  }

  // 滑动结束
  _onSlidingComplete = (e) =>{
    this.player.seek(e)
  }

  render() {
    const {source} = this.props
    return (
      <View style={styles.container}>
        <Video
          ref={(ref) => {
            this.player = ref
          }}
          style={{flex:1,}}
          muted={true}
          source={source}
          paused={this.state.playState}
          onProgress={this._onProgress}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
          // onError={this._onError}
        />
        <View style={styles.playView}>
          <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
            <Text onPress={this._changPlayState}>{this.state.playState?'播放':'暂停'}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <Slider
              onSlidingComplete={this._onSlidingComplete}
              maximumValue={this.state.max}
              minimumValue={this.state.min}
              step={1}
              value={this.state.currentTime}
              maximumTrackTintColor={{backgroundColor:'rgb(147,147,147)'}}
              style={{flex:1,}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:310,
  },
  playView:{
    position:'absolute',
    bottom:0,height:50,backgroundColor:'white',
    zIndex:999,left:0,right:0,
    flexDirection:'row',alignItems:'center'
  },
});
