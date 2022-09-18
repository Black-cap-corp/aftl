import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {List, ListItem, Divider} from '@ui-kitten/components';

const OrdersList = ({stocks}) => {
  const renderItem = ({item, index}) => (
    <ListItem title="hi" description="{`${item.description} ${index + 1}`}" />
  );

  return (
    <List
      style={styles.container}
      data={stocks || []}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});
