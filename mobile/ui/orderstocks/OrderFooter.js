import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';

const OrderFooter = ({onClick, btnText}) => {
  return (
    <View style={{paddingBottom: 10, backgroundColor: '#ebecf0'}}>
      <Button title="submit" onPress={onClick}>
        {btnText}
      </Button>
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({});
