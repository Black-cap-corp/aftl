import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, RadioGroup, Radio} from '@ui-kitten/components';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import CustomAutocomplete from '../../shared/ui/CustomAutocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';

const returnFormSchema = yup.object().shape({
  workorder: yup.string().required('Required'),
});

const ArrowRightIcon = props => <AntDesign name="right" {...props} />;

const initialValues = {
  workorder: '',
  type: 0,
};

const ViewForm = ({route, navigation}) => {
  const [data, setData] = React.useState([]);
  const [workorders, setWorkorders] = React.useState([]);
  const [noWorkorders, setNoWorkorders] = React.useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const debounce = (func, delay) => {
    let timer;
    return function (args) {
      clearTimeout(timer);
      const context = this;
      timer = setTimeout(async function () {
        if (args) {
          const data = await func.call(context, args);
          const workordersMap =
            data.length > 0
              ? data.map(work => {
                  return {
                    title: work?.displayName,
                  };
                })
              : [];
          if (workordersMap.length < 1) {
            setNoWorkorders(true);
          } else {
            setNoWorkorders(false);
          }
          setData(data);
          setWorkorders(workordersMap);
        }
      }, delay);
    };
  };

  const debouncer = debounce(getWorkorders, 500);

  const onSelect = workorder => {
    setSelectedWorkOrder(workorder);
  };

  const clearContractors = () => {};

  const handleSubmit = (values, {setSubmitting}) => {
    navigation.push('ViewIndents', {
      selWorkorder: selectedWorkOrder,
      type: selectedIndex,
    });
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={returnFormSchema}
      onSubmit={handleSubmit}>
      {({isSubmitting, isValid, handleSubmit}) => (
        <>
          <CustomAutocomplete
            label="Workorder"
            name="workorder"
            workorders={workorders}
            onSelectParent={onSelect}
            data={data}
            debouncer={debouncer}
            clearContractors={clearContractors}
          />

          {noWorkorders && (
            <Text style={styles.error} status="danger">
              No Workorders Found
            </Text>
          )}

          <RadioGroup
            style={{flexDirection: 'row', marginBottom: 20}}
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}>
            <Radio>Issue</Radio>
            <Radio>Return</Radio>
          </RadioGroup>

          <Button
            onPress={handleSubmit}
            disabled={isSubmitting || !isValid || !selectedWorkOrder}
            accessoryRight={ArrowRightIcon}
            title="submit">
            Next
          </Button>
        </>
      )}
    </Formik>
  );
};

const getWorkorders = async filter => {
  try {
    const result = await axios.post(
      `${APP_BASE_URL}/workorder/getWorkorderByQuery`,
      {filter: filter},
    );
    return result.data;
  } catch (e) {
    console.log('error', e);
    return [];
  }
};

export default ViewForm;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
