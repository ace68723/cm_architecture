'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  View,
} from 'react-native';

import SboxHomeAction from '../../Actions/SboxHomeAction';
import SboxHomeStore from '../../Stores/SboxHomeStore';

const { height, width } = Dimensions.get('window');

export default class HomeViewController extends Component {
  constructor() {
    super();
		this.state = Object.assign({},SboxHomeStore.getState(),{
        //init state
    })
    this._onChange = this._onChange.bind(this);
  }
	componentDidMount() {
    SboxHomeStore.addChangeListener(this._onChange);
	}
  componentWillUnmount() {
    SboxHomeStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const state = Object.assign({},SboxHomeStore.getState());
    this.setState(state);
  }
  _renderHomeView() {
    return(
      <View>
      </View>
    )
  }
  render() {
    return(
      <View style={styles.viewController}>
        {this._renderHomeView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
  }
});
