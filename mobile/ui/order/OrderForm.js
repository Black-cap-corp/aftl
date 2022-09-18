import {StyleSheet} from 'react-native';
import React from 'react';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../shared/ui/CustomInput';
import {Button, Icon} from '@ui-kitten/components';
import CustomAutocomplete from '../../shared/ui/CustomAutocomplete';
import CustomSelect from '../../shared/ui/CustomSelect';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';

const initialValues = {
  workorder: '',
  contractor: '',
  vehicle: '',
  location: '',
};
const orderSchema = yup.object().shape({
  workorder: yup.string().required('Required'),
  contractor: yup.string().required('Required'),
  vehicle: yup.string().required('Required'),
  location: yup.string().required('Required'),
});
const ArrowRightIcon = props => (
  <Icon name="arrow-ios-forward-outline" {...props} />
);

const OrderForm = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [workorders, setWorkorders] = React.useState([]);
  const [contractors, setContractors] = React.useState([]);
  const [contractorsRaw, setContractorsRaw] = React.useState([]);
  const [selectedContractor, setSelectedContractor] = React.useState();
  const [selectedWorkOrder, setSelectedWorkOrder] = React.useState();

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
                    title: work?.workorder,
                  };
                })
              : [];
          setData(data);
          setWorkorders(workordersMap);
        }
      }, delay);
    };
  };

  const debouncer = debounce(getWorkorders, 500);

  const handleSubmit = (values, {setSubmitting}) => {
    const workorder = {
      workorder: selectedWorkOrder,
      contractor: selectedContractor,
      vehicle: values.vehicle,
      location: values.location,
    };
    setSubmitting(false);
    navigation.navigate('OrderStocks', {isComplete: false, workorder});
  };
  const onSelect = workorder => {
    const contractorsmap = workorder.contractors.map(
      contractor => contractor.contractor,
    );
    setSelectedWorkOrder(workorder._id);
    setContractorsRaw(workorder.contractors);
    setContractors(contractorsmap);
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={handleSubmit}
      validationSchema={orderSchema}>
      {({isSubmitting, isValid, handleSubmit}) => (
        <>
          <CustomAutocomplete
            label="Workorder"
            name="workorder"
            workorders={workorders}
            onSelectParent={onSelect}
            data={data}
            debouncer={debouncer}
          />
          <CustomSelect
            label="Contractor"
            name="contractor"
            options={contractors}
            raw={contractorsRaw}
            setSelectedContractor={setSelectedContractor}
          />

          <CustomInput
            placeholder="Enter Vehicle Number"
            name="vehicle"
            label="Vehicle"
          />
          <CustomInput
            placeholder="Enter location"
            name="location"
            label="Location"
          />
          <Button
            onPress={handleSubmit}
            disabled={isSubmitting || !isValid}
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

export default OrderForm;

const styles = StyleSheet.create({});
