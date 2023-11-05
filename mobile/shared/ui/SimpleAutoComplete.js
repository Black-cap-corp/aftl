import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useImperativeHandle} from 'react';
import {Autocomplete, AutocompleteItem, Layout} from '@ui-kitten/components';
import {useField} from 'formik';
import {TouchableWithoutFeedback} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const renderOption = (item, index) => (
  <AutocompleteItem key={item.id} title={item.name} />
);

const filter = (item, query) =>
  item.name.toLowerCase().includes(query.toLowerCase());

const SimpleAutoComplete = React.forwardRef(
  ({name, label, onSelectParent, inputData}, ref) => {
    const [field, meta, helpers] = useField(name);
    const [data, setData] = React.useState(
      JSON.parse(JSON.stringify(inputData)),
    );
    useEffect(() => {
      setData(JSON.parse(JSON.stringify(inputData)));
    }, [inputData]);

    useImperativeHandle(ref, () => ({
      resetValue: () => helpers.setValue(''),
    }));

    const onSelect = index => {
      helpers.setValue(data[index].name);
      onSelectParent(data[index]);
    };

    const onChangeText = query => {
      // debouncer(query);
      if (query == '') {
        clearInput();
      }
      helpers.setValue(query);
      setData(data.filter(item => filter(item, query)));
      // clearContractors();
    };

    const clearInput = () => {
      helpers.setValue('');
      setData(JSON.parse(JSON.stringify(inputData)));
    };

    const renderCloseIcon = props => (
      <TouchableWithoutFeedback
        onPress={clearInput}
        style={{paddingTop: '4px'}}>
        <AntDesign {...props} name="close" />
      </TouchableWithoutFeedback>
    );

    return (
      <Layout style={{marginBottom: 20, backgroundColor: 'transparent'}}>
        <Autocomplete
          placeholder="Search for supervisor"
          label={label}
          onSelect={onSelect}
          name={name}
          value={field.value}
          accessoryRight={renderCloseIcon}
          onBlur={() => helpers.setTouched(!meta.touched)}
          onChangeText={onChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
      </Layout>
    );
  },
);

export default SimpleAutoComplete;

const styles = StyleSheet.create({});
