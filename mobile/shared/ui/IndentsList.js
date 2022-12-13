import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {List, Divider, Text} from '@ui-kitten/components';

import Ionicons from 'react-native-vector-icons/Ionicons';

const IndentsList = ({
  indents,
  selWorkorder = {},
  selectedIndent,
  setSelectedIndent,
  selParentIndent = {},
}) => {
  return (
    <List
      style={styles.container}
      data={indents || []}
      ItemSeparatorComponent={Divider}
      renderItem={props =>
        renderListItem(
          props,
          selWorkorder.workorder,
          selectedIndent,
          setSelectedIndent,
          selParentIndent,
        )
      }
    />
  );
};

const renderListItem = (
  props,
  name,
  selectedIndent,
  setSelectedIndent,
  selParentIndent,
) => {
  const item = props.item;
  const neededFor = new Date(item.NeededFor).toDateString();
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedIndent(item);
      }}>
      <View
        style={[
          styles.listItem,
          item._id === selectedIndent?._id ? styles.selected : '',
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Ionicons
            name="ios-document-text-outline"
            style={{marginRight: 10, fontSize: 14}}
          />
          <Text category="h6">{item.indentNo}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text category="c1" style={{textAlign: 'center', marginRight: 10}}>
              {name ? 'Wordorder' : 'Indent'}
            </Text>
            <Text category="label" style={{textAlign: 'center'}}>
              {name || selParentIndent.indentNo}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text category="c1" style={{textAlign: 'center', marginRight: 10}}>
              Requested For
            </Text>
            <Text category="label" style={{textAlign: 'center'}}>
              {neededFor}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text category="c1" style={{textAlign: 'center', marginRight: 10}}>
              Location
            </Text>
            <Text category="label" style={{textAlign: 'center'}}>
              {item.location || selParentIndent.location}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text category="c1" style={{textAlign: 'center', marginRight: 10}}>
              Vehicle
            </Text>
            <Text category="label" style={{textAlign: 'center'}}>
              {item.vehicle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IndentsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebecf0',
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  selected: {
    borderColor: 'green',
    borderWidth: 1,
  },
});
