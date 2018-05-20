import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Page extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        {this.props.children}
      </View>
  )}
}

export class PageHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerBanner}>
          <Text style={styles.heading}>{this.props.children}</Text>
        </View>
      </View>
    )}
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 24,
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#884',
    alignItems: 'stretch',
  },
  headerBanner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 30,
    color: 'white',
  },
});
