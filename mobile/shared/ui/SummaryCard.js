import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Layout} from '@ui-kitten/components';

const SummaryCard = ({items}) => {
  return (
    <View style={styles.cardSummary}>
      {items &&
        items.map(item => (
          <SummaryColumn
            key={item.label}
            label={item.label}
            text={item.value}
          />
        ))}
    </View>
  );
};

const SummaryColumn = ({label, text}) => {
  return (
    <Layout style={styles.col}>
      <Text style={{color: 'gray', fontSize: 12}}>{label}</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text>
    </Layout>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  cardSummary: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    flex: 1,
    borderTopColor: '#07315B',
    borderTopWidth: 3,
  },
  col: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
