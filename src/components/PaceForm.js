"use client";
import { useState } from "react";
import Form from "./styles/form";
import PaceInput from "./PaceInput";
import DistanceInput from './DistanceInput';
import ResultTable from './ResultTable';
import Formatter from "../utils/formatter";
export default function PaceForm(){
    const [state, setState] = useState({
        imperial: false,
        conversionMode: "auto",
        pace: 360,
        paceUnit: "km/h",
        distance: 10,
        distanceUnit: "km",
        time: "01:00:00"
    });

    const onChange = name => event =>{
        let val = event.target.value;
        setState(state => {
            let newState = { [name]: val };
      
            if ("time" === name) {
              console.log("TIME!");
              if (5 === val.length) {
                newState.time = val + ":00";
              }
      
              newState.pace =
                Formatter.stringToSeconds(newState.time) / state.distance;
      
              if ("00:00:00" === newState.time) {
                newState.pace = 360;
              }
            } else if ("distance" === name) {
              newState.pace = Formatter.stringToSeconds(state.time) / val;
            } else if ("pace" === name) {
              newState.time = Formatter.secondsToTimeString(
                state.distance * val,
                true
              );
              console.log(newState.time);
            }
      
            return {...state, ...newState};
          });
    }
    console.log('---SATETE---',state)
    return(
        <>
            <div>
                <Form autoComplete="off">
                <PaceInput
                    value={state.pace}
                    unit={state.paceUnit}
                    onChangeValue={onChange("pace")}
                    onChangeUnit={onChange("paceUnit")}
                />
                <DistanceInput
                    distance={state.distance}
                    distanceUnit={state.distanceUnit}
                    time={state.time}
                    onChangeDistance={onChange("distance")}
                    onChangeDistanceUnit={onChange("distanceUnit")}
                    onChangeTime={onChange("time")}
                />
                <ResultTable
                    pace={state.pace}
                    imperial={state.imperial}
                />
                </Form>
            </div>
        </>
    )
}