import {StyleSheet, View} from 'react-native';
import React from 'react';
import {List, Divider, Text} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewSummaryList = ({stocks}) => {
  return (
    <List
      style={styles.container}
      data={stocks}
      ItemSeparatorComponent={Divider}
      renderItem={props => renderItem(props)}
    />
  );
};

const renderItem = props => {
  const item = props.item;
  return (
    <View
      style={{
        marginBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
      }}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Ionicons
          name="ios-document-text-outline"
          style={{marginRight: 10, fontSize: 14}}
        />
        <Text category="h6">{item.name}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text category="c1">Requested Quantity</Text>
          <Text category="label">{item.requestedQuantity}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text category="c1">Approved Quantity</Text>
          <Text category="label">{item.approvedQuantity}</Text>
        </View>
      </View>
    </View>
  );
};

export default ViewSummaryList;

const styles = StyleSheet.create({});
