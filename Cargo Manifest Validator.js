const mani = {
  containerId: -88, destination: "Soledad", weight: NaN
};

function normalizeUnits(manifest) {
  const copy = {...manifest};
  
  if (copy.unit === 'lb') {
    copy.unit = 'kg';
    copy.weight = copy.weight * 0.45;
  };

  return copy;
};

function validateManifest(manifest) {
  let errorObj = {};

  if (manifest.containerId === undefined) {
      errorObj.containerId = 'Missing';
  }else if (typeof manifest.containerId !== 'number' || !Number.isInteger(manifest.containerId) || manifest.containerId <= 0) {
    errorObj.containerId = 'Invalid'
  };

  if (manifest.destination === undefined) {
    errorObj.destination = 'Missing';
  }else if (typeof manifest.destination !== 'string' || manifest.destination.trim() === "") {
    errorObj.destination = 'Invalid'
  };
  
  if (manifest.weight === undefined) {
    errorObj.weight = 'Missing';
  }else if (typeof manifest.weight !== 'number'|| Number.isNaN(manifest.weight) || manifest.weight <= 0) {
    errorObj.weight = 'Invalid'
  };
  
  if (manifest.unit === undefined) {
    errorObj.unit = 'Missing';
  }else if (typeof manifest.unit !== 'string' || manifest.unit !== 'lb' && manifest.unit !== 'kg') {
    errorObj.unit = 'Invalid'
  };
  
  if (manifest.hazmat === undefined) {
    errorObj.hazmat = 'Missing';
  }else if (typeof manifest.hazmat !== 'boolean') {
    errorObj.hazmat = 'Invalid'
  };

  return errorObj;
};

function processManifest(manifest) {
  const result = validateManifest(manifest);
  
  if (Object.keys(result).length === 0) {
    console.log(`Validation success: ${manifest.containerId}` );

    const convUnit = normalizeUnits(manifest);
    console.log(`Total weight: ${convUnit.weight} ${convUnit.unit}` );
  }else {
    console.log(`Validation error: ${manifest.containerId}`);
    console.log(result);
  };
};


console.log(processManifest(mani));

// -- Pruebas --

//containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false
//containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true
//containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false
//containerId: null, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false
//containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" 