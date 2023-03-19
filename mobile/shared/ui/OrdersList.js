import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  List,
  ListItem,
  Divider,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const OrdersList = ({
  stocks,
  setStocks,
  setSearchStocks,
  rawStocks,
  isEditable = true,
}) => {
  const onQuantityRequested = (operation, stockId, value) => {
    switch (operation) {
      case 'manual':
        const updatedStocks = stocks.map(stock => {
          if (stock.id === stockId) {
            return {...stock, stockRequested: value};
          } else {
            return stock;
          }
        });
        const updatedRawStocks = rawStocks.map(stock => {
          if (stock.id === stockId) {
            return {...stock, stockRequested: value};
          } else {
            return stock;
          }
        });

        setSearchStocks(updatedStocks);
        setStocks(updatedRawStocks);
        break;
      case 'add':
        const updatedStocksAdd = stocks.map(stock => {
          if (stock.id === stockId && stock.stockRequested < stock.limit) {
            return {...stock, stockRequested: Number(stock.stockRequested) + 1};
          } else {
            return stock;
          }
        });
        const updatedRawStocksAdd = rawStocks.map(stock => {
          if (stock.id === stockId && stock.stockRequested < stock.limit) {
            return {...stock, stockRequested: Number(stock.stockRequested) + 1};
          } else {
            return stock;
          }
        });
        setSearchStocks(updatedStocksAdd);
        setStocks(updatedRawStocksAdd);
        break;

      case 'minus':
        const updatedStocksMinus = stocks.map(stock => {
          if (stock.id === stockId && stock.stockRequested > 0) {
            return {...stock, stockRequested: Number(stock.stockRequested) - 1};
          } else {
            return stock;
          }
        });
        const updatedRawStocksMinus = rawStocks.map(stock => {
          if (stock.id === stockId && stock.stockRequested > 0) {
            return {...stock, stockRequested: Number(stock.stockRequested) - 1};
          } else {
            return stock;
          }
        });
        setSearchStocks(updatedStocksMinus);
        setStocks(updatedRawStocksMinus);

        break;
    }
  };
  return (
    <List
      style={styles.container}
      data={stocks}
      ItemSeparatorComponent={Divider}
      renderItem={props => renderItem(props, onQuantityRequested, isEditable)}
    />
  );
};

export default OrdersList;

const renderItem = (props, onQuantityRequested, isEditable) => {
  const item = props.item;
  return (
    <ListItem
      style={{marginBottom: 10, borderRadius: 5}}
      title={item.name}
      description={() => desc(item)}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => (
        <RightWidget
          item={item}
          onQuantityRequested={onQuantityRequested}
          isEditable={isEditable}
        />
      )}
    />
  );
};

const desc = item => (
  <View style={{display: 'flex', flexDirection: 'row'}}>
    <Text style={[styles.text, {color: '#gray'}]}>{item.unit}</Text>
    <Text style={styles.text} status="warning">
      {item.limit}
    </Text>
  </View>
);

const renderItemIcon = props => <Feather {...props} name="layers" />;

const RightWidget = ({item, onQuantityRequested, isEditable}) => {
  const [value, setValue] = useState(String(item.stockRequested));
  if (isEditable) {
    return (
      <Layout style={styles.rightWidget}>
        <RightWidgetMinusIcon
          item={item}
          onQuantityRequested={onQuantityRequested}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onEndEditing={() =>
            onQuantityRequested(onQuantityRequested('manual', item.id, value))
          }
          onChangeText={input => {
            const val = Number(input);
            if (val <= item.limit) {
              setValue(input);
            } else {
              setValue(String(item.limit));
            }
          }}
          textAlign={'center'}
        />
        <RightWidgetPlusIcon
          item={item}
          onQuantityRequested={onQuantityRequested}
        />
      </Layout>
    );
  } else {
    return (
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={{color: 'gray', fontSize: 12}}>Requested</Text>
        <Text>{item.stockRequested}</Text>
      </View>
    );
  }
};

const RightWidgetPlusIcon = ({item, onQuantityRequested}) => {
  const onAddTouch = () => {
    onQuantityRequested('add', item.id, 0);
  };
  return (
    <TouchableOpacity onPress={onAddTouch}>
      <View style={styles.rightWidgetIcon} onpress>
        <AntDesign name="plus" style={{fontSize: 20}} />
      </View>
    </TouchableOpacity>
  );
};
const RightWidgetMinusIcon = ({item, onQuantityRequested}) => {
  const onMinusTouch = () => {
    onQuantityRequested('minus', item.id, 0);
  };
  return (
    <TouchableOpacity onPress={onMinusTouch}>
      <View style={styles.rightWidgetIcon}>
        <AntDesign name="minus" style={{fontSize: 20}} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebecf0',
  },
  rightWidgetIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightWidget: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 12,
    marginLeft: 10,
  },
});
