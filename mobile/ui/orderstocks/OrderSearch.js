import {StyleSheet} from 'react-native';
import React from 'react';
import {Input, Icon} from '@ui-kitten/components';
export const IconSimpleUsageShowcase = () => (
  <Icon style={styles.icon} fill="#8F9BB3" name="search" />
);
const OrderSearch = () => {
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder="Place your Text"
      value={value}
      accessoryRight={IconSimpleUsageShowcase}
      caption="search stocks for easy editing"
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

export default OrderSearch;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
