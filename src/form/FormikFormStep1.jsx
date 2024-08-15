import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Container, Typography, Button } from '@mui/material';
import './FormStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {form1Data} from '../redux/formDataSlice.jsx';

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
                <form className='formWidth' onSubmit={formik.handleSubmit}>
                    <Box className='formMain'>
                        <TextField
                        name="firstName"
                        type="text"
                        id="outlined-required"
                        placeholder="Enter first name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        autoComplete
                        fullWidth
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                        <Typography variant="caption" className='error'>{formik.errors.firstName}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="lastName"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        fullWidth
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                        <Typography variant="caption" className='error'>{formik.errors.lastName}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="email"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter email id"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        fullWidth
                        />
                        {formik.touched.email && formik.errors.email ? (
                        <Typography variant="caption" className='error'>{formik.errors.email}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="companyName"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter company name"
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                        fullWidth
                        />
                        {formik.touched.companyName && formik.errors.companyName ? (
                        <Typography variant="caption" className='error'>{formik.errors.companyName}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="companyWebsite"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter company website"
                        onChange={formik.handleChange}
                        value={formik.values.companyWebsite}
                        fullWidth
                        />
                        {formik.touched.companyWebsite && formik.errors.companyWebsite ? (
                        <Typography variant="caption" className='error'>{formik.errors.companyWebsite}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="state"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        fullWidth
                        />
                        {formik.touched.state && formik.errors.state ? (
                        <Typography variant="caption" className='error'>{formik.errors.state}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'> 
                        <TextField
                        name="zipCode"
                        type="text"
                        id="outlined-required"
                        autoComplete
                        placeholder="Enter zipCode"
                        onChange={formik.handleChange}
                        value={formik.values.zipCode}
                        fullWidth
                        />
                        {formik.touched.zipCode && formik.errors.zipCode ? (
                        <Typography variant="caption" className='error'>{formik.errors.zipCode}</Typography>
                        ) : null}
                    </Box>
                    <Box className='formMain'>
                        <Button fullWidth variant="outlined" type="submit">Next</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

export default FormikForm;