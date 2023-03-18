import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import IndentsList from './IndentsList';
import {Text} from '@ui-kitten/components';
import OrderSearch from '../../ui/orderstocks/OrderSearch';
import OrderFooter from '../../ui/orderstocks/OrderFooter';
import axios from 'axios';
import {getUser} from '../../app.storage';
import {APP_BASE_URL} from '../../app.const';

const IndentsPage = ({route, navigation}) => {
  const selWorkorder = route.params.selWorkorder;

  const [indents, setIndents] = useState([]);
  const [filteredIndents, setFilteredIndents] = useState([]);
  const [selectedIndent, setSelectedIndent] = useState(null);
  const [pageError, setPageError] = useState(false);

  const proceedNextHandler = () => {
    if (!selectedIndent) {
      setPageError(true);
    } else {
      setPageError(false);
      navigation.push('ReturnStocks', {
        selectedIndent,
        vehicle: route.params.vehicle,
      });
    }
  };

  useEffect(() => {
    const workorderId = selWorkorder._id;
    console.log(workorderId);
    getUser().then(value => {
      const user = JSON.parse(value);
      const requestor = user._id;
      axios
        .post(`${APP_BASE_URL}/indent/getIndentsByWorkorder`, {
          workorder: workorderId,
          requestor,
        })
        .then(
          result => {
            setIndents(result.data);
            setFilteredIndents(result.data);
          },
          error => {
            setIndents([]);
          },
        );
    });
  }, []);

  const onSearch = key => {
    if (key.trim() === '') {
      setFilteredIndents(indents);
    } else {
      const filteredIndents = indents.filter(indent =>
        indent.indentNo.toLowerCase().includes(key.toLowerCase()),
      );
      setFilteredIndents(filteredIndents);
    }
  };
  return (
    <View style={styles.page}>
      <Text category="h5" style={{marginBottom: 20}}>
        Select a Indent to proceed
      </Text>
      <OrderSearch caption="Search Indents" onSearch={onSearch} />
      {pageError && (
        <Text style={{fontSize: 12}} status="danger">
          Select a Indent to proceed
        </Text>
      )}
      <IndentsList
        selWorkorder={selWorkorder}
        selectedIndent={selectedIndent}
        setSelectedIndent={setSelectedIndent}
        indents={filteredIndents}
      />
      <OrderFooter btnText="Proceed" onClick={proceedNextHandler} />
    </View>
  );
};

export default IndentsPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
