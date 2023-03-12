import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getUser} from '../../app.storage';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import IndentsList from '../../shared/ui/IndentsList';
import OrderSearch from '../orderstocks/OrderSearch';
import OrderFooter from '../orderstocks/OrderFooter';
import {INDENT_ENUM} from './issue.const';

const ViewIndents = ({route, navigation}) => {
  const {selWorkorder, type} = route.params;
  console.log('here', selWorkorder);
  const [indents, setIndents] = useState([]);
  const [filteredIndents, setFilteredIndents] = useState([]);
  const [selectedIndent, setSelectedIndent] = useState(null);
  const [pageError, setPageError] = useState(false);

  const proceedNextHandler = () => {
    if (!selectedIndent) {
      setPageError(true);
    } else {
      setPageError(false);
      if (type === 1) {
        navigation.push('ViewReturns', {
          selIndent: selectedIndent,
          type: type,
        });
      } else {
        navigation.push('ViewSummary', {
          selIndent: selectedIndent,
          type,
        });
      }
    }
  };

  useEffect(() => {
    const workorderId = selWorkorder._id;
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
      {filteredIndents.length < 1 && (
        <Text
          style={{
            fontSize: 12,
            color: 'red',
            marginBottom: 20,
            textAlign: 'center',
          }}
          status="danger">
          No indents found
        </Text>
      )}
      <IndentsList
        selWorkorder={selWorkorder}
        selectedIndent={selectedIndent}
        setSelectedIndent={setSelectedIndent}
        indents={filteredIndents}
        type={INDENT_ENUM.ISSUE}
      />
      <OrderFooter btnText="Proceed" onClick={proceedNextHandler} />
    </View>
  );
};

export default ViewIndents;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
