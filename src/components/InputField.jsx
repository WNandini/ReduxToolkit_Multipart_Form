import React from 'react';
import { TextField, Typography } from '@mui/material';

const InputField = (props) => {
    const {
        name, 
        value,
        onChange,
        error,
        placeholder
    } = props;
    
    return (
      <div className="formMain">
        <TextField
          name={name}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          fullWidth
        />
        {error && <Typography variant="caption" className='error'>{error}</Typography>}
      </div>
    );
  };

export default InputField;