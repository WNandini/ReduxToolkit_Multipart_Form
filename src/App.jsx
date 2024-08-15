import React from 'react';
import FormStepper from './form/FormStepper';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <FormStepper/>
    </Provider>
  )
}

export default App;