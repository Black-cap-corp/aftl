import {StyleSheet} from 'react-native';
import React from 'react';
import {Input, Icon} from '@ui-kitten/components';
export const IconSimpleUsageShowcase = () => (
  <Icon style={styles.icon} fill="#8F9BB3" name="search" />
);
const OrderSearch = ({onSearch, caption}) => {
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder="Search"
      value={value}
      style={styles.input}
      accessoryRight={IconSimpleUsageShowcase}
      caption={caption || `search stocks for easy editing`}
      onChangeText={nextValue => {
        onSearch(nextValue);
        setValue(nextValue);
      }}
    />
  );
};

export default OrderSearch;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});
