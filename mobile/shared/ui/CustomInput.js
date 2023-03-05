import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useField} from 'formik';
import {Input} from '@ui-kitten/components';

const CustomInput = ({label, placeholder, caption, ...props}) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <View style={styles.form_group}>
      <Input
        label={label}
        placeholder={placeholder}
        style={styles.form_control}
        autoComplete={false}
        caption={caption}
        value={field.value}
        onBlur={() => helpers.setTouched(!meta.touched)}
        onChangeText={helpers.setValue}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  form_control: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  form_group: {
    backgroundColor: 'transparent',
  },
});
