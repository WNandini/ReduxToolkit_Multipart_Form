import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Container, Typography, Button } from '@mui/material';
import './FormStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {form1Data} from '../redux/formDataSlice.jsx';
import InputField from '../components/InputField.jsx';

const FormField = [
    { name: 'firstName', placeholder: 'Enter first name' },
    { name: 'lastName', placeholder: 'Enter last name' },
    { name: 'email', placeholder: 'Enter your email' },
    { name: 'companyName', placeholder: 'Enter your company name' },
    { name: 'companyWebsite', placeholder: 'Enter your company website' },
    { name: 'state', placeholder: 'Enter your state' },
    { name: 'zipCode', placeholder: 'Enter your zip code' },
]

const FormikForm = (props) => {
    const { handleNext } = props;
    const formDataRedux = useSelector(state => state.FormDataSlice.form1Data)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          firstName: formDataRedux.firstName ? formDataRedux.firstName : '',
          lastName: formDataRedux.lastName ? formDataRedux.lastName : '',
          email: formDataRedux.email ? formDataRedux.email : '',
          companyName: formDataRedux.companyName ? formDataRedux.companyName : '',
          companyWebsite: formDataRedux.companyWebsite ? formDataRedux.companyWebsite : '',
          state: formDataRedux.state ? formDataRedux.state : '',
          zipCode: formDataRedux.zipCode ? formDataRedux.zipCode:''
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().min(3, 'Username must be at least 3 characters long').required('Please enter first name'),
            lastName: Yup.string().min(3, 'Username must be at least 3 characters long').required('Please enter last name'),
            email: Yup.string().email('Please enter a valid email').required('Please enter email id'),
            companyName: Yup.string().required('Please enter company name'),
            companyWebsite: Yup.string().url('Please enter valid URL').required('Please enter company website'),
            state: Yup.string().required('Please enter state'),
            zipCode: Yup.string().required('Please enter zip code'),
        }),
        onSubmit: values => {
            handleNext()
            dispatch(form1Data(values))
        }
    });
    
    return (
        <Container maxWidth="sm">
            <Box className="formBackground">
                <Box className='formMain'>
                    <Typography variant='h5' fontWeight='600'>Personal Information</Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    {FormField.map(field => (
                        <InputField
                            key={field.name}
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            error={formik.touched[field.name] && formik.errors[field.name]}
                            placeholder={field.placeholder}
                        />
                    ))}
                    <Box className='formMain'>
                        <Button fullWidth variant="outlined" type="submit">Next</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

export default FormikForm;