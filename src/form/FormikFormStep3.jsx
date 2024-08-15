import React, {useState} from 'react';
import { Container, Button, Box, Typography, TextField } from '@mui/material';
import './FormStyle.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {form1Data, form2Data, form3Data, handleFormSubmit} from '../redux/formDataSlice.jsx';

let cardDetails = [
    {
        id: 0,
        cardName: 'Gold Plan',
        cardType: 'Monthly',
        price: '199',
        backgroundColor: 'cardGold'
    },
    {
        id: 1,
        cardName: 'Platinum Plan',
        cardType: 'Yearl',
        price: '2999',
        backgroundColor: 'cardPlatinum'
    }
]

const FormikFormStep3 = (props) => {
    const { handleBack } = props
    const [plan, setPlan] = useState(null)
    const [planDetail, setPlanDetail] = useState(null)
    const [orderSummary, setOrderSummary] = useState(false)
    const formDataRedux = useSelector(state => state.FormDataSlice.form3Data)
    const personalInformation = useSelector(state => state.FormDataSlice.form1Data)
    const companyInformation = useSelector(state => state.FormDataSlice.form2Data)
    const dispatch = useDispatch()
    // handle plan detail start
    const handlePlan = (card) => {
        setPlan(card.id)
        setPlanDetail(card)
        setOrderSummary(true)
    }
    // handle plan detail end

    const formik = useFormik({
        initialValues: {
            numberOfUser: formDataRedux.numberOfUser ? formDataRedux.numberOfUser : 0,
            startDate: formDataRedux.startDate ? formDataRedux.startDate : ''
        },
        validationSchema: Yup.object().shape({
            numberOfUser: Yup.number().min(1,'Invalid User').required('Please enter number of users'),
            startDate: Yup.string().required('Please select date')
        }),
        onSubmit: values => {
            values.plan = planDetail
            values.price = planDetail.price * Number(values.numberOfUser)
            let details = []
            details.push(personalInformation&&personalInformation)
            details.push(companyInformation&&companyInformation)
            details.push(values&&values)
            dispatch(form3Data(values))
            dispatch(handleFormSubmit(details))
            handle
        }
    });

    return (
        <>
        <Container maxWidth="sm">
            <Box className="formBackground">
                <Box className='formMain'>
                    <Typography variant='h5' fontWeight='600'>Company Information</Typography>
                </Box>
                <form className='formWidth' onSubmit={formik.handleSubmit}>
                <Box className='formMain'>
                    <Typography>Start Date</Typography>
                    <input
                    type="date" 
                    name="startDate" 
                    className='datePicker'
                    value={formik.values.startDate} 
                    onChange={formik.handleChange}
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                        <Typography variant="caption" className='error'>{formik.errors.startDate}</Typography>
                    ) : null}
                </Box>
                    <Box className='formMain cardMain'>
                        {cardDetails.map((card) => 
                            <Box name="card" onClick={() => handlePlan(card)} className={`card ${card.backgroundColor} ${card.id === plan ? 'border' : null}`}>
                                <Typography variant='h5' fontWeight='600'>{card.cardName}</Typography>
                                <Typography fontWeight='600'>(Monthly)</Typography>
                                <Typography fontWeight='600'>Price - Rs 199</Typography>
                            </Box>  
                        )}       
                    </Box>

                    <Box className='formMain'>
                        <Typography>Total User</Typography>
                        <TextField
                        name="numberOfUser"
                        type="text"
                        id="outlined-required"
                        placeholder="Enter number of user"
                        onChange={formik.handleChange}
                        value={formik.values.numberOfUser}
                        autoComplete
                        fullWidth
                        />
                        {formik.touched.numberOfUser && formik.errors.numberOfUser ? (
                        <Typography variant="caption" className='error'>{formik.errors.numberOfUser}</Typography>
                        ) : null}
                    </Box>  
                    {orderSummary &&
                    <Box className='formMain'>
                        <Typography variant='h5' fontWeight='600'>Order Summary</Typography>
                        <Box className='planStyle orderStyle'>
                            <Typography>{planDetail.cardName}</Typography>
                            <Typography>
                                Rs.{planDetail.price}
                            </Typography>     
                        </Box>
                        <Box className='planStyle orderStyle'>
                            <Typography>Total Price</Typography>
                            <Typography>
                                Rs.{formik.values.numberOfUser === '' ? 
                                    planDetail.price : 
                                    planDetail.price * formik.values.numberOfUser}   
                            </Typography>     
                        </Box>
                    </Box>
                    }
                    <Box className='formMain nextBackBtn'>
                        <Button fullWidth variant="outlined" onClick={handleBack}>Back</Button>
                        <Button fullWidth variant="outlined" type="submit">Submit</Button>
                    </Box>
                </form>
            </Box>
        </Container>
        </>
    )
}

export default FormikFormStep3