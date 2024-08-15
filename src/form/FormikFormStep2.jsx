import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Checkbox, Container, Typography, Button, RadioGroup, Radio, FormLabel,FormControl, InputLabel, Select,FormControlLabel, FormGroup, } from '@mui/material';
import './FormStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {form2Data} from '../redux/formDataSlice.jsx';

const workingField = [
    { label: 'Software Development', value: 'software development' },
    { label: 'Cyber Security', value: 'cybersecurity' },
    { label: 'Artificial Intelligence', value: 'artificial intelligence' },
];

const employeeCount = [
    { label: '1-10', value: '1-10' },
    { label: '10-20', value: '10-20' },
    { label: '20-30', value: '20-30' },
    { label: '40+', value: '40+' },
];

const FormikFormStep2 = (props) => {
    const { handleNext, handleBack } = props;
    const formDataRedux = useSelector(state => state.FormDataSlice.form2Data)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            companyWorkingField: formDataRedux.companyWorkingField ? formDataRedux.companyWorkingField : [],
            employees: formDataRedux.employees ?  formDataRedux.employees : '',
            isWFH: formDataRedux.isWFH ? formDataRedux.isWFH : ''
        },
        validationSchema: Yup.object().shape({
            companyWorkingField: Yup.array()
            .min(1, 'At least one option must be selected')
            .required('Required'),
            employees: Yup.string().required('Please select an option'),
            isWFH: Yup.string().required('Please select an option'),
        }),
        onSubmit: values => {
          handleNext()
          dispatch(form2Data(values))
        },
    });
    
    // handle multiple checkbox start
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        formik.setFieldValue('companyWorkingField', checked
        ? [...formik.values.companyWorkingField, value]
        : formik.values.companyWorkingField.filter(option => option !== value)
        );
    };
    // handle multiple checkbox end

    // handle single checkbox start
    const handleEmployee = (event) => {
        const { value } = event.target;
        formik.setFieldValue('employees', value);
    };
    // handle single checkbox end

    return (
        <Container maxWidth="sm">
            <Box className="formBackground">
                <Box className='formMain'>
                    <Typography variant='h5' fontWeight='600'>Company Information</Typography>
                </Box>
                <form className='formWidth' onSubmit={formik.handleSubmit}>
                    <Box className='formMain'>
                        <FormControl component="fieldset">
                        <Typography>Company field (More than 1 option can be selected)</Typography>
                            <FormGroup>
                                {workingField.map(option => (
                                    <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                        value={option.value}
                                        checked={formik.values.companyWorkingField.includes(option.value)}
                                        onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={option.label}
                                    />
                                ))}
                            </FormGroup>
                            {formik.touched.companyWorkingField && formik.errors.companyWorkingField ? (
                            <Typography variant="caption" color="error">
                                {formik.errors.companyWorkingField}
                            </Typography>
                        ) : null}
                        </FormControl>
                    </Box>
                    <Box className='formMain'>
                    <FormControl component="fieldset">
                    <Typography>Employees</Typography>
                            {employeeCount.map(option => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                    <Checkbox
                                        value={option.value}
                                        checked={formik.values.employees === option.value}
                                        onChange={handleEmployee}
                                    />
                                    }
                                    label={option.label}
                                />
                            ))}
                            {formik.touched.employees && formik.errors.employees ? (
                            <Typography variant="caption" color="error">
                                {formik.errors.employees}
                            </Typography>
                            ) : null}
                        </FormControl>
                    </Box>
                    <Box className='formMain'>
                        <FormControl>
                            <Typography>Company have WFH</Typography>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="isWFH"
                                value={formik.values.isWFH}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                            {formik.touched.isWFH && formik.errors.isWFH ? (
                            <Typography variant="caption" color="error">
                                {formik.errors.isWFH}
                            </Typography>
                            ) : null}
                        </FormControl>
                    </Box>
                    <Box className='formMain nextBackBtn'>
                        <Button fullWidth variant="outlined" onClick={handleBack} type="submit">Back</Button>    
                        <Button fullWidth variant="outlined" type="submit">Next</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

export default FormikFormStep2;