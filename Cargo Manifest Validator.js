const mani = {
  containerId: -88, destination: "Soledad", weight: NaN
};

/**
 * Convierte el peso de un manifiesto de libras (lb) a kilogramos (kg),
 * SIN modificar el objeto original (retorna una copia nueva).
 *
 * @param {Object} manifest - Objeto manifiesto, debe tener `unit` y `weight`.
 * @returns {Object} Copia del manifiesto. Si unit === 'lb', el peso queda
 *          convertido a kg y `unit` cambia a 'kg'. Si no, se devuelve igual.
 */
function normalizeUnits(manifest) {
  // Crea una copia superficial del objeto para no mutar el manifiesto original.
  const copy = {...manifest};
  
  if (copy.unit === 'lb') {
    copy.unit = 'kg';
    // Factor de conversión aproximado: 1 libra ≈ 0.45 kilogramos.
    copy.weight = copy.weight * 0.45;
  };

  return copy;
};

/**
 * Valida que un manifiesto tenga todos sus campos requeridos con tipos
 * y valores correctos. Revisa 5 campos: containerId, destination, weight,
 * unit y hazmat.
 *
 * @param {Object} manifest - Objeto manifiesto a validar.
 * @returns {Object} Objeto de errores. Cada llave es el nombre del campo
 *          con problema, y el valor es 'Missing' (no existe) o 'Invalid'
 *          (existe pero no cumple el formato esperado).
 *          Si el objeto retornado está vacío ({}), el manifiesto es válido.
 */
function validateManifest(manifest) {
  let errorObj = {};

  // --- containerId: debe ser un número entero positivo ---
  if (manifest.containerId === undefined) {
      errorObj.containerId = 'Missing';
  } else if (
    typeof manifest.containerId !== 'number' ||
    !Number.isInteger(manifest.containerId) ||
    manifest.containerId <= 0
  ) {
    // Entra aquí si: no es number, es decimal (no entero), o es <= 0.
    errorObj.containerId = 'Invalid';
  };

  // --- destination: debe ser un string no vacío (ignorando espacios) ---
  if (manifest.destination === undefined) {
    errorObj.destination = 'Missing';
  } else if (
    typeof manifest.destination !== 'string' ||
    manifest.destination.trim() === ""
  ) {
    // trim() quita espacios al inicio/final; así un string de solo
    // espacios (" ") también se considera vacío/inválido.
    errorObj.destination = 'Invalid';
  };
  
  // --- weight: debe ser un número real, no NaN, y mayor a 0 ---
  if (manifest.weight === undefined) {
    errorObj.weight = 'Missing';
  } else if (
    typeof manifest.weight !== 'number' ||
    Number.isNaN(manifest.weight) ||
    manifest.weight <= 0
  ) {
    // Ojo: typeof NaN es 'number', por eso se necesita el chequeo
    // adicional Number.isNaN() para detectar el caso del objeto `mani`.
    errorObj.weight = 'Invalid';
  };
  
  // --- unit: debe ser exactamente el string 'lb' o 'kg' ---
  if (manifest.unit === undefined) {
    errorObj.unit = 'Missing';
  } else if (
    typeof manifest.unit !== 'string' ||
    (manifest.unit !== 'lb' && manifest.unit !== 'kg')
  ) {
    errorObj.unit = 'Invalid';
  };
  
  // --- hazmat: debe ser un booleano (true/false) ---
  if (manifest.hazmat === undefined) {
    errorObj.hazmat = 'Missing';
  } else if (typeof manifest.hazmat !== 'boolean') {
    errorObj.hazmat = 'Invalid';
  };

  return errorObj;
};

/**
 * Procesa un manifiesto completo: lo valida y, si es válido, normaliza
 * sus unidades e imprime el resultado. Si no es válido, imprime los errores.
 *
 * No retorna ningún valor (retorna undefined implícitamente); toda la
 * salida se hace mediante console.log.
 *
 * @param {Object} manifest - Objeto manifiesto a procesar.
 * @returns {undefined}
 */
function processManifest(manifest) {
  const result = validateManifest(manifest);
  
  // Object.keys(result).length === 0 significa que no se encontró
  // ningún error, es decir, el manifiesto pasó todas las validaciones.
  if (Object.keys(result).length === 0) {
    console.log(`Validation success: ${manifest.containerId}`);

    // Convierte el peso a kg si estaba en lb, antes de mostrarlo.
    const convUnit = normalizeUnits(manifest);
    console.log(`Total weight: ${convUnit.weight} ${convUnit.unit}`);
  } else {
    console.log(`Validation error: ${manifest.containerId}`);
    console.log(result);
  };
};


console.log(processManifest(mani));
// Como processManifest no tiene return, esto imprime "undefined"
// DESPUÉS de los console.log internos de la función.

// -- Pruebas --
// Casos de manifiestos para probar validateManifest / processManifest:

//containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false
// -> válido, se espera conversión de 400 lb a kg

//containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true
// -> válido, se espera conversión de 101 lb a kg

//containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false
// -> válido, ya está en kg, no debería convertirse

//containerId: null, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false
// -> inválido: containerId es null (typeof null !== 'number' -> 'Invalid')

//containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" 
// -> inválido en casi todos los campos:
//    containerId: 0 no es > 0 -> 'Invalid'
//    destination: 405 no es string -> 'Invalid'
//    weight: -84 no es > 0 -> 'Invalid'
//    unit: "pounds" no es 'lb' ni 'kg' -> 'Invalid'
//    hazmat: "no" no es boolean -> 'Invalid'