import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, Button, Layout, Text} from '@ui-kitten/components';
import CustomInput from '../../shared/ui/CustomInput';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {AuthContext} from '../../shared/context/logincontext';

const LoginIcon = props => <Icon name="log-in-outline" {...props} />;

const loginSchema = yup.object().shape({
  mobile: yup
    .string()
    .max(10, 'Too Long')
    .min(10, 'Too Short')
    .required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = () => {
  const [error, setError] = useState({showError: false, error: ''});
  const contextValues = React.useContext(AuthContext);

  const onSubmit = (values, {setSubmitting}) => {
    contextValues.signIn(
      values,
      contextValues.dispatch,
      setError,
      setSubmitting,
    );
  };

  return (
    <Formik
      initialValues={{mobile: '', password: ''}}
      onSubmit={onSubmit}
      validateOnMount={true}
      validationSchema={loginSchema}>
      {({isSubmitting, isValid, handleSubmit}) => (
        <Layout>
          <CustomInput
            placeholder="Enter Mobile Number"
            label="Mobile Number"
            name="mobile"
          />

          <CustomInput
            placeholder="Enter Password"
            label="Password"
            name="password"
          />

          {error.showError && (
            <Text style={{marginBottom: 10}} appearance="hint" status="danger">
              {error.error}
            </Text>
          )}

          <Button
            onPress={handleSubmit}
            accessoryRight={LoginIcon}
            title="submit"
            disabled={isSubmitting || !isValid}>
            Login
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form_control: {
    marginBottom: 30,
  },
});
