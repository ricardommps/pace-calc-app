"use client";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import paceUnits from "../utils/paceUnits";
import Formatter from "../utils/formatter";

export const InputsContainer = styled.div`
  .contents {
    .paces {
      @media (min-width: 767px) {
        > div {
          position: relative;
          font-size: .6em;
          &:after {
            content: '';
            width: 1px;
            height: 15px;
            background-color: ${props => props.theme.colors.sea};
            display: block;
            position: absolute;
            top: 0;
            right: -1.6em;
            bottom: 0;
            margin: auto;
            transform: rotate3d(1,1,1,45deg);
          }
          &:last-of-type {
              &:after {
                display: none;
              }
            }
        }
      }
    }
  }
`;

const BoxShadow = "0 3px 1px rgba(0,0,0,0.1)";

const RangeSLider = withStyles({
    root: {
      color: "#4b5373",
      height: 8,
      margin: "20px 0"
    },
    thumb: {
      height: 28,
      width: 28,
      backgroundColor: "#fff",
      boxShadow: BoxShadow,
      marginTop: -14,
      marginLeft: -14,
      borderRadius: "30%",
      "&:focus,&:hover,&$active": {
        boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.1)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: BoxShadow
        }
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      borderRadius: 4
    },
    rail: {
      borderRadius: 4
    }
  })(Slider);

export default function PaceInput({value,unit, onChangeUnit, onChangeValue}){
  console.log('--unit--', unit);
    const getUnitObject  = u => {
        let unitToCompare = u || unit;
        return paceUnits.find(v => v.name === unitToCompare);
    }
    const onChangeValueInUnit = event =>{
        onChangeValue({
            target: { value: getUnitObject().toSecondsPerKm(event.target.value) }
        })
    }

    const onChangeSlider = (event, value) => {
        onChangeValueInUnit({
            target: {
              value: fromSliderValue(getUnitObject(), value)
            }
        })
    }

    const toSliderValue = (unit, value) => {
        return (
          (getUnitObject("km/h").fromSecondsPerKm(unit?.toSecondsPerKm(value)) -
            1.0) /
          0.05
        );
    }

    const fromSliderValue = (unit, value) => {
        return (
          Math.round(
            getUnitObject().fromSecondsPerKm(
              getUnitObject("km/h").toSecondsPerKm(1.0 + value * 0.05)
            ) * 100
          ) / 100
        );
    }
    let unitObject = getUnitObject();
    let valueInUnit = unitObject?.fromSecondsPerKm(value);
    const valueSlider = roundTo(toSliderValue(unitObject, valueInUnit), 2);

    function roundTo(n, digits) {
        if (digits === undefined) {
          digits = 0;
        }
  
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test = Math.round(n) / multiplicator;
        return +test.toFixed(digits);
    }
  
    if (valueInUnit?.toFixed) {
        valueInUnit = valueInUnit.toFixed(unitObject.precision);
    }
    return (
        <InputsContainer>
          <div className="contents">
            <FormControl component="fieldset" className="title">
              <FormLabel component="legend">Pace</FormLabel>
              <div>
                <TextField
                  type="number"
                  name="pace"
                  value={valueInUnit}
                  onChange={onChangeValueInUnit}
                  className="Inputs"
                  inputProps={{
                    min: unitObject?.min,
                    max: unitObject?.max,
                    step: Math.pow(10, -unitObject?.precision)
                  }}
                />
              </div>
            </FormControl>
          </div>
          <div className="contents">
            <div className="paces">
              {(() => {
                if (true) {
                  return paceUnits.map(unit => (
                    <div key={unit.name}>
                      {Formatter.formatUnit(unit, value)}{" "}
                      <small>{unit.name}</small>
                    </div>
                  ));
                }
              })()}
            </div>
          </div>
        </InputsContainer>
      );
}

PaceInput.propTypes = {
    value: PropTypes.number.isRequired,
    unit: PropTypes.oneOf(paceUnits.map(v => v.name)),
    onChangeUnit: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func
};