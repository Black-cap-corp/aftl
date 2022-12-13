import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Autocomplete, AutocompleteItem, Layout} from '@ui-kitten/components';
import {useField} from 'formik';

const movies = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

const renderOption = (item, index) => (
  <AutocompleteItem key={index} title={item.title} />
);

const CustomAutocomplete = ({
  workorders,
  name,
  label,
  onSelectParent,
  data,
  debouncer,
  clearContractors,
}) => {
  const [field, meta, helpers] = useField(name);

  const onSelect = index => {
    helpers.setValue(data[index].displayName);
    onSelectParent(data[index]);
  };

  const onChangeText = query => {
    debouncer(query);
    helpers.setValue(query);
    clearContractors();
  };

  return (
    <Layout style={{marginBottom: 20, backgroundColor: 'transparent'}}>
      <Autocomplete
        placeholder="Search for workorders"
        label={label}
        onSelect={onSelect}
        name={name}
        value={field.value}
        onBlur={() => helpers.setTouched(!meta.touched)}
        onChangeText={onChangeText}>
        {workorders.map(renderOption)}
      </Autocomplete>
    </Layout>
  );
};

export default CustomAutocomplete;

const styles = StyleSheet.create({});
