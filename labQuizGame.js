/**
 * Banco de preguntas de trivia. Cada objeto representa una pregunta con
 * su categoría, texto de la pregunta, opciones de respuesta y la respuesta correcta.
 *
 * @type {Array<{category: string, question: string, choices: string[], answer: string}>}
 */
const questions = [
  {
    category: "Historia",
    question: "¿Quién descubrió América en 1492?",
    choices: [
      "Cristóbal Colón",
      "Fernando de Magallanes",
      "Hernán Cortés",
    ],
    answer: "Cristóbal Colón"
  },
  
  {
    category: "Ciencia",
    question: "¿Cuál es el planeta más grande del sistema solar?",
    choices: [
      "Marte",
      "Júpiter",
      "Saturno",
    ],
    answer: "Júpiter"
  },

  {
    category: "Geografía",
    question: "¿Cuál es la capital de Japón?",
    choices: [
      "Pekín",
      "Seúl",
      "Tokio",
    ],
    answer: "Tokio"
  },

  {
    category: "Matemáticas",
    question: "¿Cuánto es 9 × 8?",
    choices: [
      "72",
      "81",
      "69"
    ],
    answer: "72"
  },

  {
    category: "Programación",
    question: "¿Qué lenguaje se ejecuta en el navegador?",
    choices: [
      "Python",
      "Java",
      "JavaScript",
    ],
    answer: "JavaScript"
  }
];

/**
 * Selecciona una pregunta al azar de un array de preguntas.
 *
 * @param {Object[]} array - Array de objetos pregunta (ej: questions).
 * @returns {Object} Un objeto pregunta elegido aleatoriamente.
 */
function getRandomQuestion(array) {
  // Math.random() genera un decimal entre 0 (incluido) y 1 (excluido).
  // Al multiplicarlo por array.length y aplicar Math.floor, se obtiene
  // un índice entero válido y aleatorio dentro del rango del array.
  // Ej: array.length = 5 -> randNum puede ser 0, 1, 2, 3 o 4.
  const randNum = Math.floor(Math.random() * array.length);
  return array[randNum];
}

// Pregunta elegida al azar para esta ronda del juego.
const quest = getRandomQuestion(questions);

/**
 * Simula la elección de una respuesta al azar por parte de "la computadora".
 * Usa la misma lógica de índice aleatorio que getRandomQuestion, pero
 * aplicada al array de opciones (choices) de una pregunta específica.
 *
 * @param {string[]} array - Array de opciones de respuesta (choices de una pregunta).
 * @returns {string} Una opción de respuesta elegida aleatoriamente.
 */
function getRandomComputerChoice(array) {
  const randNum = Math.floor(Math.random() * array.length);
  return array[randNum];
}

// Respuesta que "eligió" la computadora, tomada de las opciones de `quest`.
const choi = getRandomComputerChoice(quest.choices);

/**
 * Compara la elección de la computadora contra la respuesta correcta de
 * la pregunta y genera un mensaje de resultado.
 *
 * @param {Object} question - Objeto pregunta completo (incluye la propiedad `answer`).
 * @param {string} choice - La opción que eligió la computadora.
 * @returns {string} Mensaje indicando si la elección fue correcta o incorrecta
 *          (y en ese caso, cuál era la respuesta correcta).
 */
function getResults(question, choice) {
  if (question.answer === choice) {
    console.log(`computer selection: ${choice}`);
    return `The computer's choice is correct!`;
  } else {
    console.log(`computer selection: ${choice}`);
    return `The computer's choice is wrong. The correct answer is: ${question.answer}`;
  }
}

console.log(getResults(quest, choi));