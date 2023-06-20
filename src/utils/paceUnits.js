const paceUnits = [
  {
    name: "km/h",
    min: 0.1,
    max: 60.0,
    precision: 1,
    timeBased: false,
    toSecondsPerKm: v => 3600 / v,
    fromSecondsPerKm: v => 3600 / v
  },
  ];
  
  export default paceUnits;