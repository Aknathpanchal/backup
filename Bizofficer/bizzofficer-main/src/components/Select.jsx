import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">{props.lable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {props.data?.map((e, i) => (
    <MenuItem key={i} value={e.text}>
      {e.text}
    </MenuItem>
  ))}
        </Select>
      </FormControl>
    </Box>
  );
}

