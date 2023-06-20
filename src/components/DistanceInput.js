"use client";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function DistanceInput({
    distance, 
    distanceUnit, 
    onChangeDistance, 
    onChangeDistanceUnit, 
    onChangeTime,
    time
}){
    const handleOnChangeDistance = event => {
        onChangeDistance(
            {
                target: {
                  value:
                    parseFloat(event.target.value) *
                    (distanceUnit === "km" ? 1.0 : 1.60934)
                }
            }
        )
    }

    const handleOnChangeTime = event => {
        onChangeTime(
            {
                target: {
                  value: event.target.value
                }
            }
        )
    }
    let distanceFormatted = distance;

    if (distanceUnit === "mi") {
        distanceFormatted = distanceFormatted / 1.60934;
    }
  
    if (distanceFormatted.toFixed(1) + "00" === distanceFormatted.toFixed(3)) {
        distanceFormatted = distanceFormatted.toFixed(1);
    } else if (
        distanceFormatted.toFixed(2) + "0" ===
        distanceFormatted.toFixed(3)
    ) {
        distanceFormatted = distanceFormatted.toFixed(2);
    } else {
        distanceFormatted = distanceFormatted.toFixed(3);
    }
    return (
        <div className="contents">
            <FormControl component="fieldset" className="title">
              <FormLabel component="legend">Tempo</FormLabel>
              <div>
                {false && (
                  <TextField
                    type="number"
                    name="distance"
                    value={distanceFormatted}
                    onChange={handleOnChangeDistance}
                    className="Inputs"
                    inputProps={{
                      min: 0,
                      max: 300,
                      step: 0.1
                    }}
                  />
                )}
               
                <TextField
                  type="time"
                  name="time"
                  value={time}
                  onChange={handleOnChangeTime}
                  className="Inputs"
                  inputProps={{
                    step: 1,
                    required: true
                  }}
                />
              </div>
            </FormControl>
          </div>
      );
}



DistanceInput.propTypes = {
    distance: PropTypes.number.isRequired,
    distanceUnit: PropTypes.oneOf(["km", "mi"]).isRequired,
    onChangeDistance: PropTypes.func.isRequired,
    onChangeDistanceUnit: PropTypes.func.isRequired,
    onChangeTime: PropTypes.func.isRequired,
    time:PropTypes.string.isRequired,
};