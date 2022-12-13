import {StyleSheet} from 'react-native';
import React from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import {useField} from 'formik';
const renderOption = title => <SelectItem key={title} title={title} />;

const CustomSelect = ({
  options,
  name,
  label,
  setSelectedContractor,
  raw,
  value,
  setValue,
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <Select
      value={value}
      placeholder="Select contractors"
      onSelect={index => {
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
