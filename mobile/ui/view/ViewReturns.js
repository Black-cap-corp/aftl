import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUser} from '../../app.storage';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import IndentsList from '../../shared/ui/IndentsList';
import OrderSearch from '../orderstocks/OrderSearch';
import OrderFooter from '../orderstocks/OrderFooter';

const ViewReturns = ({route, navigation}) => {
  const {selIndent, type} = route.params;
  const [indents, setIndents] = useState([]);
  const [filteredIndents, setFilteredIndents] = useState([]);
  const [selectedIndent, setSelectedIndent] = useState(null);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    const indentId = selIndent._id;
    getUser().then(value => {
      const user = JSON.parse(value);
      const requestor = user._id;
      axios
        .post(`${APP_BASE_URL}/returnIndents/getReturnsByIndent`, {
          indent: indentId,
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
  const proceedNextHandler = () => {
    if (!selectedIndent) {
      setPageError(true);
    } else {
      setPageError(false);
      navigation.navigate('ViewSummary', {
        selIndent: selectedIndent,
        type,
      });
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

      {filteredIndents.length < 1 && (
        <Text
          style={{
            fontSize: 12,
            color: 'red',
            marginBottom: 20,
            textAlign: 'center',
          }}
          status="danger">
          No Returns found
        </Text>
      )}
      <IndentsList
        selWorkorder={{}}
        selectedIndent={selectedIndent}
        setSelectedIndent={setSelectedIndent}
        indents={filteredIndents || []}
        selParentIndent={selIndent}
      />
      <OrderFooter btnText="Proceed" onClick={proceedNextHandler} />
    </View>
  );
};

export default ViewReturns;

const styles = StyleSheet.create({});
