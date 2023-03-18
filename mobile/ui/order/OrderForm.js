import {StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../shared/ui/CustomInput';
import {Button} from '@ui-kitten/components';
import CustomAutocomplete from '../../shared/ui/CustomAutocomplete';
import CustomSelect from '../../shared/ui/CustomSelect';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import {Text} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  <AntDesign name="right" style={{fontSize: 20}} {...props} />
);

const OrderForm = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [workorders, setWorkorders] = React.useState([]);
  const [contractors, setContractors] = React.useState([]);
  const [contractorsRaw, setContractorsRaw] = React.useState([]);
  const [selectedContractor, setSelectedContractor] = React.useState();
  const [selectedWorkOrder, setSelectedWorkOrder] = React.useState();
  const [noWorkorders, setNoWorkorders] = React.useState(false);
  const [pageError, setPageError] = React.useState(false);

  const workorderRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      workorderRef.current.resetValue();
      //Put your Data loading function here instead of my loadData();
      setSelectedWorkOrder();
      setWorkorders([]);
      setData([]);
      clearContractors();
    });
    return unsubscribe;
  }, [navigation]);
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

  const handleSubmit = (values, {setSubmitting, resetForm}) => {
    console.log(values);
    if (!selectedContractor || !selectedWorkOrder) {
      setPageError(true);
      setSubmitting(false);
    } else {
      const workorder = {
        workorder: selectedWorkOrder._id,
        contractor: selectedContractor,
        vehicle: values.vehicle,
        location: values.location,
        name: selectedWorkOrder.displayName,
      };
      setSubmitting(false);
      setPageError(false);
      navigation.push('OrderStocks', {
        isComplete: false,
        workorder,
        stocks: selectedWorkOrder.stocks,
      });
    }
  };
  const onSelect = workorder => {
    const contractorsmap = workorder.contractors.map(
      contractor => contractor.contractor,
    );
    setSelectedWorkOrder(workorder);
    setContractorsRaw(workorder.contractors);
    setContractors(contractorsmap);
  };

  const clearContractors = () => {
    setSelectedContractor('');
    setContractorValue('');
    setContractors([]);
    setContractorsRaw([]);
  };
  const [contractorValue, setContractorValue] = React.useState('');

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
            ref={workorderRef}
            debouncer={debouncer}
            clearContractors={clearContractors}
          />
          {noWorkorders && (
            <Text style={styles.error} status="danger">
              No Workorders Found
            </Text>
          )}

          <CustomSelect
            label="Contractor"
            name="contractor"
            value={contractorValue}
            setValue={setContractorValue}
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
          {pageError && (
            <Text style={styles.error} status="danger">
              Please Fill all Details
            </Text>
          )}
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
    const headers = {
      'Content-Type': 'application/json',
    };
    console.log(`${APP_BASE_URL}/workorder/getWorkorderByQuery`);
    const result = await axios.post(
      `${APP_BASE_URL}/workorder/getWorkorderByQuery`,
      {filter: filter},
      {headers},
    );
    return result.data;
  } catch (e) {
    console.log('error', e);
    return [];
  }
};

export default OrderForm;

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
  },
});
