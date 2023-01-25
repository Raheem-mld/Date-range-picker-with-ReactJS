import * as React from 'react';
import { addDays, addMonths, addWeeks } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import date from 'date-and-time';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './App.css';

export default function App() {

  const [showCompare, setShowCompare] = useState(false)

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [state, setState] = useState({
    selection1: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection1'
    },
    selection2: {
      startDate: addDays(new Date(), -1),
      endDate: addDays(new Date(), -1),
      key: 'selection2'
    }
  });


  const [prediod, setPeriod] = React.useState(1);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleStartDateChange = (value) => {
    if (value.$d != "Invalid Date") {
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
  }

  const handlePresetDateClick = (index) => {
    switch (index) {
      case 0:
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: new Date(),
            endDate: new Date()
          }
        })
        break;

      case 1:
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addDays(new Date(), -1),
            endDate: addDays(new Date(), -1)
          }
        })
        break;

      case 2:
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addDays(new Date(), -7),
            endDate: addDays(new Date(), -1)
          }
        })
        break;

      case 3:
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addDays(new Date(), -14),
            endDate: addDays(new Date(), -1)
          }
        })
        break;

      case 4:
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addDays(new Date(), -30),
            endDate: addDays(new Date(), -1)
          }
        })
        break;

      case 5:
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay();
        first = first - 7
        var firstdayOb = new Date(curr.setDate(first));
        var firstday = firstdayOb.toDateString();
        var firstdayTemp = firstdayOb;
        var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6));
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: new Date(firstday),
            endDate: lastday,
          }
        })
        break;

      case 6:
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay();
        var firstdayOb = new Date(curr.setDate(first));
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: firstdayOb,
            endDate: new Date()
          }
        })
        break;

      case 7:
        var curr = new Date;
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addMonths(addDays(new Date(), -curr.getDate() + 1), -1),
            endDate: addDays(new Date(), -curr.getDate())
          }
        })
        break;

      case 8:
        var curr = new Date;
        setState({
          ...state,
          selection1: {
            ...state.selection1,
            startDate: addDays(new Date(), -curr.getDate() + 1),
            endDate: new Date()
          }
        })
        break;

      default:
        break;
    }
  }

  const handleEndDateChange = (value) => {
    if (value.$d != "Invalid Date") {
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
  }

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='dateRangePicker' >
        <div>
          <div className="comparer-container">
            <div></div>
            <div className={showCompare ? "inputs-container active" : "inputs-container"} >
              <div className="row-container">
                <div className="thisMonthContainer">
                  <div className="square"></div>
                  <div className="label">This week</div>
                </div>
                <div className="inputs">
                  <DesktopDatePicker
                    value={state.selection1.startDate}
                    onChange={(newValue) => { handleStartDateChange(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/DD/YYYY"
                    size='small'
                  />
                  -
                  <DesktopDatePicker
                    value={state.selection1.endDate}
                    onChange={(newValue) => { handleEndDateChange(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/DD/YYYY"
                    size='small'
                  />
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
                  <DesktopDatePicker
                    value={state.selection2.startDate}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/DD/YYYY"
                    size='small'
                  />
                  -
                  <DesktopDatePicker
                    value={state.selection2.endDate}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/DD/YYYY"
                    size='small'
                  />
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
        </div>
        <div className="datePreset">
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => { handleListItemClick(event, 0); handlePresetDateClick(0) }}
            >
              <ListItemText primary="Today" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => { handleListItemClick(event, 1); handlePresetDateClick(1) }}
            >
              <ListItemText primary="Yesterday" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => { handleListItemClick(event, 2); handlePresetDateClick(2) }}
            >
              <ListItemText primary="Last 7 days" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => { handleListItemClick(event, 3); handlePresetDateClick(3) }}
            >
              <ListItemText primary="Last 14 days" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => { handleListItemClick(event, 4); handlePresetDateClick(4) }}
            >
              <ListItemText primary="Last 30 days" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => { handleListItemClick(event, 5); handlePresetDateClick(5) }}
            >
              <ListItemText primary="Last week" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => { handleListItemClick(event, 6); handlePresetDateClick(6) }}
            >
              <ListItemText primary="This week" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 7}
              onClick={(event) => { handleListItemClick(event, 7); handlePresetDateClick(7) }}
            >
              <ListItemText primary="Last month" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 8}
              onClick={(event) => { handleListItemClick(event, 8); handlePresetDateClick(8) }}
            >
              <ListItemText primary="This month" />
            </ListItemButton>
          </List>
        </div>
      </div >
    </LocalizationProvider >


  );

}
