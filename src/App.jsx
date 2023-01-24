import * as React from 'react';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Moment from 'moment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DateTimePicker from 'react-datetime-picker';
import date from 'date-and-time'
import './App.css';

export default function App() {

  const [showCompare, setShowCompare] = useState(false)



  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: 'selection1'
    },
    selection2: {
      startDate: addDays(new Date(), -13),
      endDate: addDays(new Date(), -7),
      key: 'selection2'
    }
  });


  const [prediod, setPeriod] = React.useState(1);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleStartDateChange = (value) => {
    const diffDate = date.subtract(state.selection1.endDate, new Date(value)).toDays() + 1
    setState({
      selection1: { ...state.selection1, startDate: new Date(value) },
      selection2: {
        startDate: addDays(new Date(value), -diffDate),
        endDate: addDays(new Date(value), -1),
        key: 'selection2'
      }
    })
  }

  const handleEndDateChange = (value) => {
    const diffDate = date.subtract(new Date(value), state.selection1.startDate).toDays() + 1
    setState({
      selection1: { ...state.selection1, endDate: new Date(value) },
      selection2: {
        startDate: addDays(new Date(state.selection1.startDate), -diffDate),
        endDate: addDays(new Date(state.selection1.startDate), -1),
        key: 'selection2'
      }
    })
  }

  return (

    <div>
      <div className="comparer-container">
        <div></div>
        <div className={showCompare ? "inputs-container active" : "inputs-container"} >
          <div className="row-container">
            <div className="thisMonthContainer">
              <div className="square"></div>
              <div className="label">This month</div>
            </div>
            <div className="inputs">
              <DateTimePicker openWidgetsOnFocus={false} format={"y-MM-dd"} value={state.selection1.startDate} onChange={(value) => { handleStartDateChange(value) }} />

              <DateTimePicker openWidgetsOnFocus={false} format={"y-MM-dd"} value={state.selection1.endDate} onChange={(value) => { handleEndDateChange(value) }} />
            </div>
          </div>
          <div className="row-container">
            <div className="previousPeriod">
              <div className="square"></div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={prediod}
                onChange={handleChange}
                size='small'
              >
                <MenuItem value={1}>Previous period</MenuItem>
                <MenuItem value={2}>Previous month</MenuItem>
                <MenuItem value={3}>Previous year</MenuItem>
                <MenuItem value={4}>Custom</MenuItem>
              </Select>
            </div>
            <div className="inputs">
              <TextField id="outlined-basic" variant="outlined" size='small' value={Moment(state.selection2.startDate).format('DD/MM/YYYY')} />
              -
              <TextField id="outlined-basic" variant="outlined" size='small' value={Moment(state.selection2.endDate).format('DD/MM/YYYY')} />
            </div>
          </div>
        </div>
        <div className="switch-container">
          <div className="label">Compare</div>
          <Switch onChange={(e) => { setShowCompare(e.target.checked) }} />
        </div>
      </div>

      <DateRangePicker
        onChange={item => setState({ ...state, ...item })}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={showCompare ? [state.selection1, state.selection2] : [state.selection1]}
        direction="horizontal"
        ariaLabels={{
          dateInput: {
            selection1: { startDate: "start date input of selction 1", endDate: "end date input of selction 1" },
            selection2: { startDate: "start date input of selction 2", endDate: "end date input of selction 2" }
          },
          monthPicker: "month picker",
          yearPicker: "year picker",
          prevButton: "previous month button",
          nextButton: "next month button",
        }}
        maxDate={addDays(new Date(), 0)}
      />

    </div >


  );

}
