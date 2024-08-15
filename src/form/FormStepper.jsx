import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormikForm from './FormikFormStep1';
import FormikFormStep2 from './FormikFormStep2';
import FormikFormStep3 from './FormikFormStep3.jsx';
import './FormStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {handleFormSubmit} from '../redux/formDataSlice.jsx';

export default function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Personal Information', 'Company Information', 'Plan Selection'];
  const formSliceState = useSelector(state => state.FormDataSlice.formData)
  const dispatch = useDispatch();

  // Handle Next Button Start
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(handleFormSubmit('3'))
  };
  // Handle Next Button End

  // Handle Back Button Start
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Handle Back Button End

  // Manage component on the basis of steps start
  const renderForm = (activeStep) => {
    switch (activeStep) {
        case 0:
            return <FormikForm handleNext={handleNext}/>
        case 1:
            return <FormikFormStep2 handleNext={handleNext} handleBack={handleBack}/>
        case 2:
            return <FormikFormStep3 handleBack={handleBack}/>
        default:
            return <p>Data Not found</p>
    }
  }
  // Manage component on the basis of steps end

  return (
    <Box>
      <Stepper className='stepperSpace' activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : (
        <>
            {renderForm(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
            </Box>
        </>
      )}
    </Box>
  );
}
