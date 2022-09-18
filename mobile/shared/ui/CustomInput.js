import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useField} from 'formik';
import {Input, Layout} from '@ui-kitten/components';

const CustomInput = ({label, placeholder, caption, ...props}) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Layout level="3">
      <Input
        label={label}
        placeholder={placeholder}
        style={styles.form_control}
        caption={caption}
        value={field.value}
        onBlur={() => helpers.setTouched(!meta.touched)}
        onChangeText={helpers.setValue}
      />
    </Layout>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  form_control: {
    marginBottom: 20,
  },
});
