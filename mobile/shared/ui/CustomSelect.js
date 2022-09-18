import {StyleSheet} from 'react-native';
import React from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import {useField} from 'formik';
const renderOption = title => <SelectItem key={title} title={title} />;

const CustomSelect = ({options, name, label, setSelectedContractor, raw}) => {
  const [value, setValue] = React.useState('');
  console.log(options);
  const [field, meta, helpers] = useField(name);
  return (
    <Select
      value={value}
      placeholder="Select contractors"
      onSelect={index => {
        console.log(index);
        helpers.setValue(index);
        setValue(options[index.row]);
        setSelectedContractor(raw[index.row]);
      }}
      label={label}>
      {options && options.length > 0 && options.map(renderOption)}
    </Select>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({});
