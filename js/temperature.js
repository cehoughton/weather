exports.convertCels = function(kelvin){
  return Math.round((kelvin -273)*100)/100;
}

exports.convertFar = function(cel){
  return Math.round((cel *1.8 + 32)*100)/100;
}
