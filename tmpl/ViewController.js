'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  View,
} from 'react-native';

Action
Store

const { height, width } = Dimensions.get('window');

export default class writeViewController extends Component {
  constructor() {
    super();
		this.state
    this._onChange = this._onChange.bind(this);
  }
	componentDidMount() {
    addChangeListener
	}
  componentWillUnmount() {
    removeChangeListener
  }
  _onChange() {
    const state = Object.assign({},Store.getState());
    this.setState(state);
  }
  _renderView() {
    return(
      <View>
      </View>
    )
  }
  render() {
    return(
      <View style={styles.viewController}>
        {this._renderView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
  }
});
