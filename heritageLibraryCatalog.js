const rawCatalogCards = [
  "From a Buick 8 | King, Stephen | 2002 | Shelf K7",
  "The Shining | King, Stephen | 1977 | Shelf K1",
  "The Stand | King, Stephen | 1978 | Shelf K2",
  "It | King, Stephen | 1986 | Shelf K3",
  "Misery | King, Stephen | 1987 | Shelf K4",
  "Do Androids Dream of Electric Sheep? | Dick, Philip K. | 1968 | Shelf D5",
  "I, Robot | Asimov, Isaac | 1950 | Shelf A8",
  "Foundation | Asimov, Isaac | 1951 | Shelf A9",
  "Dune | Herbert, Frank | 1965 | Shelf H3",
  "Neuromancer | Gibson, William | 1984 | Shelf G8",
  "Snow Crash | Stephenson, Neal | 1992 | Shelf S6",
  "The Martian | Weir, Andy | 2011 | Shelf W5",
  "Ender's Game | Card, Orson Scott | 1985 | Shelf C2",
  "The Hitchhiker's Guide to the Galaxy | Adams, Douglas | 1979 | Shelf A1",
  "Ready Player One | Cline, Ernest | 2011 | Shelf C7",
  "The Dark Tower: The Gunslinger | King, Stephen | 1982 | Shelf K5",
  // edge cases: missing data
  "Unknown Title |  | 1975 | Shelf X1",
  "Mysterious Manuscript | Unknown Author |  | Shelf Z9",
  "Ancient Scroll | Anonymous | 850 | ",
];

/**
 * Convierte una sola línea de texto crudo (formato "Title | Author | Year | Location")
 * en un objeto estructurado con esas 4 propiedades.
 *
 * @param {string} rawString - Cadena cruda separada por "|", ej: "Dune | Herbert, Frank | 1965 | Shelf H3"
 * @returns {{title: string, author: string, year: (number|string), location: string}}
 *          Objeto con los campos parseados. Si algún campo falta o está vacío,
 *          se rellena con "Unknown".
 */
function parseCard(rawString) {
  // Divide la cadena en 4 partes usando "|" como separador.
  // Ej: "Dune | Herbert, Frank | 1965 | Shelf H3" -> ["Dune ", " Herbert, Frank ", " 1965 ", " Shelf H3"]
  const parts = rawString.split("|");

  const trimmedParts = [];
  // Recorre cada parte y le quita los espacios sobrantes al inicio/final (trim).
  // Esto es necesario porque split() deja espacios alrededor de cada "|".
  for (let i = 0; i < parts.length; i++) {
    trimmedParts.push(parts[i].trim());
  }

  const title = trimmedParts[0];
  const author = trimmedParts[1];
  const year = trimmedParts[2];
  const location = trimmedParts[3];

  return {
    // El operador "||" usa el valor de la derecha si el de la izquierda es
    // "falsy" (string vacío "", undefined, null, etc). Así se cubren los
    // casos donde el campo vino vacío en el texto original.
    title: title || "Unknown",
    author: author || "Unknown",
    // Si "year" tiene contenido, lo convierte a número con parseInt.
    // Si no, deja el string "Unknown" (por eso year puede ser number O string).
    year: year ? parseInt(year) : "Unknown",
    location: location || "Unknown"
  };
}

/**
 * Convierte un array de líneas crudas del catálogo en un array de objetos
 * estructurados, usando parseCard() en cada una.
 *
 * @param {string[]} rawCards - Array de strings crudos (ver formato en parseCard).
 * @returns {Object[]} Array de objetos {title, author, year, location}.
 */
function parseCatalog(rawCards) {
  const catalog = [];
  for (let i = 0; i < rawCards.length; i++) {
    catalog.push(parseCard(rawCards[i]));
  }
  return catalog;
}

// Catálogo ya parseado y listo para usar en el resto de las funciones.
const catalog = parseCatalog(rawCatalogCards);

/**
 * Busca todas las entradas del catálogo cuyo autor coincida (parcial, sin
 * importar mayúsculas/minúsculas) con el término de búsqueda.
 *
 * @param {Object[]} catalog - Array de libros ya parseados.
 * @param {string} author - Término a buscar dentro del nombre del autor.
 * @returns {Object[]} Array con los libros que coinciden. Vacío si no hay coincidencias.
 */
function findByAuthor(catalog, author) {
  // Normaliza el término de búsqueda a minúsculas para comparación insensible a mayúsculas.
  const searchTerm = author.toLowerCase();
  const results = [];
  for (let i = 0; i < catalog.length; i++) {
    // includes() permite coincidencias parciales, ej: buscar "king" encuentra "King, Stephen".
    if (catalog[i].author.toLowerCase().includes(searchTerm)) {
      results.push(catalog[i]);
    }
  }
  return results;
}

/**
 * Agrupa los libros del catálogo por década de publicación (ej: "1970s", "1980s").
 * Los libros sin año conocido se agrupan bajo la llave "Unknown".
 *
 * @param {Object[]} catalog - Array de libros ya parseados.
 * @returns {Object.<string, Object[]>} Objeto donde cada llave es una década
 *          (o "Unknown") y el valor es un array de libros de esa década.
 */
function groupByDecade(catalog) {
  const grouped = {};
  for (let i = 0; i < catalog.length; i++) {
    const book = catalog[i];

    // Caso especial: libros sin año conocido van a su propio grupo.
    if (book.year === "Unknown") {
      if (!grouped["Unknown"]) {
        grouped["Unknown"] = [];
      }
      grouped["Unknown"].push(book);
      continue; // salta al siguiente libro, no sigue calculando década
    }

    // Calcula la década: divide el año entre 10 (descarta decimales con
    // Math.floor) y vuelve a multiplicar por 10.
    // Ej: 1987 -> 198.7 -> Math.floor -> 198 -> *10 -> 1980
    const decade = Math.floor(book.year / 10) * 10;
    const decadeKey = `${decade}s`; // ej: "1980s"

    // Si esta década todavía no existe como llave en el objeto, la crea
    // con un array vacío antes de poder hacer push.
    if (!grouped[decadeKey]) {
      grouped[decadeKey] = [];
    }
    grouped[decadeKey].push(book);
  }
  return grouped;
}

// Catálogo agrupado por décadas, ej: { "1970s": [...], "1980s": [...], "Unknown": [...] }
const byDecade = groupByDecade(catalog);

/**
 * Genera una representación en texto (tipo "tarjeta") de una sola entrada
 * del catálogo, con separadores de guiones arriba y abajo.
 *
 * @param {Object} entry - Un libro individual del catálogo.
 * @returns {string} Texto formateado listo para mostrar/imprimir.
 */
function renderEntry(entry) {
  const title = entry.title || "Unknown";
  const author = entry.author || "Unknown";
  const year = entry.year || "Unknown";
  const location = entry.location || "Unknown";
  // "-".repeat(25) genera una línea de 25 guiones como separador visual.
  return `${"-".repeat(25)}
Title: ${title}
Author: ${author}
Year: ${year}
Location: ${location}
${"-".repeat(25)}`;
}

console.log(renderEntry(catalog[0]));

/**
 * Verifica si una entrada del catálogo está "completa", es decir, que
 * ninguno de sus 4 campos esté ausente, vacío o marcado como "Unknown".
 *
 * @param {Object} entry - Un libro individual del catálogo.
 * @returns {boolean} true si todos los campos son válidos, false si falta alguno.
 */
function validateEntry(entry) {
  let isValid = true;

  // "in" verifica si la propiedad EXISTE en el objeto (aunque sea undefined o "").
  // Se combina con !entry.title para cubrir también valores vacíos/falsy,
  // y con === "Unknown" para cubrir el caso donde parseCard ya puso ese default.
  if (!("title" in entry) || !entry.title || entry.title === "Unknown") {
    isValid = false;
  }
  if (!("author" in entry) || !entry.author || entry.author === "Unknown") {
    isValid = false;
  }
  if (!("year" in entry) || !entry.year || entry.year === "Unknown") {
    isValid = false;
  }
  if (!("location" in entry) || !entry.location || entry.location === "Unknown") {
    isValid = false;
  }

  return isValid;
}

/**
 * Convierte el catálogo completo a una cadena JSON legible (indentada).
 *
 * @param {Object[]} catalog - Array de libros ya parseados.
 * @returns {string} JSON con indentación de 2 espacios.
 */
function exportToJSON(catalog) {
  // El tercer argumento (2) le dice a JSON.stringify que indente con 2 espacios,
  // haciendo el resultado más legible para humanos (en vez de una sola línea).
  return JSON.stringify(catalog, null, 2);
}

/**
 * Convierte el catálogo completo a formato CSV (valores separados por comas),
 * con encabezado y una fila por libro.
 *
 * @param {Object[]} catalog - Array de libros ya parseados.
 * @returns {string} Texto en formato CSV, con saltos de línea entre filas.
 */
function exportToCSV(catalog) {
  const header = "Title,Author,Year,Location";
  const rows = [];

  for (let i = 0; i < catalog.length; i++) {
    const entry = catalog[i];
    // Envuelve título, autor y ubicación entre comillas dobles por si
    // contienen comas (para no romper el formato CSV). El año no se
    // envuelve porque es numérico.
    rows.push(`"${entry.title}","${entry.author}",${entry.year},"${entry.location}"`);
  }

  let csv = header;
  // Va concatenando cada fila, separada por salto de línea, para armar
  // el texto CSV final completo.
  for (let i = 0; i < rows.length; i++) {
    csv = csv + "\n" + rows[i];
  }
  return csv;
}

console.log(exportToCSV(catalog));

console.log(catalog.length);              // cantidad total de libros en el catálogo
console.log(Object.keys(byDecade).length); // cantidad de décadas distintas encontradas

// --- Cálculo del año más antiguo y más reciente del catálogo ---

let oldestYear = Infinity; // arranca en "infinito" para que cualquier año real sea menor
let newestYear = 0;        // arranca en 0 para que cualquier año real sea mayor

for (let i = 0; i < catalog.length; i++) {
  // Solo compara libros que sí tienen año conocido (ignora los "Unknown").
  if (catalog[i].year !== 'Unknown') {
    if (catalog[i].year < oldestYear) {
      oldestYear = catalog[i].year;
    }
    if (catalog[i].year > newestYear) {
      newestYear = catalog[i].year;
    }
  }
}

console.log(oldestYear); // año de publicación más antiguo del catálogo
console.log(newestYear); // año de publicación más reciente del catálogo