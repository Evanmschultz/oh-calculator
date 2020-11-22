import React, { useState } from "react";
import PropTypes from "prop-types";

import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Button from "@material-ui/core/Button";

import Logo from './assests/orderhoundsvg.svg';
import "./App.css";


function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(state) => {
        onChange({
          target: {
            name: props.name,
            value: state.value
          }
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

function FormattedInputs() {
  const [state, setState] = useState({
    numberformatOH: "150",
    numberformatThird: "25",
    numberformatAvgGross: "38",
    numberformatMin: "20",
    numberformatGoal: "200",
    numberformatMnth: "", // add this values to the state
    numberformatYrly: ""
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    return state;
  };

  const onButtonClick = () => {
    const numberformatMnth =
      (Number(state.numberformatAvgGross) *
        Number(state.numberformatGoal) *
        Number(state.numberformatThird)) /
        100 -
      Number(state.numberformatOH);
    const numberformatYrly =
      12 * numberformatMnth;
    console.log(state.numberformatAvgGross);
    console.log(state.numberformatGoal);
    console.log(state.numberformatOH);
    console.log(state.numberformatMnth);

    setState({
      ...state,
      numberformatMnth,
      numberformatYrly // update this values when button clicked
    });
    return state;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="Logo"/>
        <h1>Savings Calculator</h1>
        <body>
          <div>
            <form>
              <div className="input">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom
                  }}
                  label="OrderHound Cost"
                  id="outlined-size-numberformatOH"
                  variant="outlined"
                  value={state.numberformatOH}
                  onChange={handleChange}
                  name="numberformatOH"
                />
              </div>
              <div className="input">
                <TextField
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  label="3rd Party Percentage Cost"  
                  id="outlined-size-numberformatThird"
                  variant="outlined"
                  value={state.numberformatThird}
                  onChange={handleChange}
                  name="numberformatThird"
                />
              </div>
              <div className="input">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom
                  }}
                  label="Average Sales Gross"
                  id="outlined-size-numberformatAvgGross"
                  variant="outlined"
                  value={state.numberformatAvgGross}
                  onChange={handleChange}
                  name="numberformatAvgGross"
                />
              </div>
              <div className="online-orders">
                <TextField
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  label="Minimum Number of Orders"
                  id="outlined-size-numberformatMin"
                  variant="outlined"
                  value={state.numberformatMin}
                  onChange={handleChange}
                  name="numberformatMin"
                  className="online-orders1"
                />
                <TextField
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  label="Goal Number of Orders"
                  id="outlined-size-numberformatGoal"
                  variant="outlined"
                  value={state.numberformatGoal}
                  onChange={handleChange}
                  name="numberformatGoal"
                  className="online-orders2"
                />
              </div>
              <div className="savings">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    readOnly: true
                  }}
                  label="Monthly Savings"
                  id="outlined-size-read-only-numberformatMnth"
                  variant="outlined"
                  value={state.numberformatMnth}
                  // onButtonClick={savingsMnth}
                  name="numberformatMnth"
                  className="savings1"
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    readOnly: true
                  }}
                  label="Yearly Savings"
                  id="outlined-size-read-only-numberformatYrly"
                  variant="outlined"
                  value={state.numberformatYrly}
                  // onButtonClick={savingsYrly}
                  name="numberformatYrly"
                  className="savings2"
                />
              </div>
              <Button
                className="button"
                variant="contained"
                color="primary"
                size="large"
                onClick={onButtonClick}
              >
                Calculate
              </Button>
            </form>
          </div>
        </body>
      </header>
    </div>
  );
}

export default FormattedInputs;
