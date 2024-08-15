import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form1Data: {},
    form2Data: {},
    form3Data: {},
    allFormData: []
}

const FormDataSlice = createSlice({
    name: 'FormDataSlice',
    initialState,
    reducers: {
        form1Data: (state, action) => {
            state.form1Data = action.payload
        },
        form2Data: (state, action) => {
            state.form2Data = action.payload
        },
        form3Data: (state, action) => {
            state.form3Data = action.payload
            console.log('form3Data',action.payload)
        },
        handleFormSubmit: (state, action) => {
            // state.allFormData = [...state.allFormData, form1Data]
            console.log('FormDataFinal',action.payload)
        }
    }   
})

export const { form1Data, form2Data,form3Data, handleFormSubmit } = FormDataSlice.actions;
export default FormDataSlice.reducer;