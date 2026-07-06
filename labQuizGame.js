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

function getRandomQuestion (array) {
  const randNum = Math.floor(Math.random() * array.length);
  return array[randNum]
};
const quest = getRandomQuestion(questions)

function getRandomComputerChoice(array) {
  const randNum = Math.floor(Math.random() * array.length);
  return array[randNum]
};
const choi = getRandomComputerChoice(quest.choices)

function getResults(question, choice) {
  if (question.answer === choice) {
    console.log(`computer selection: ${choice}`)
    return `The computer's choice is correct!`
  }else {
    console.log(`computer selection: ${choice}`)
    return `The computer's choice is wrong. The correct answer is: ${question.answer}`
  }
};

console.log(getResults(quest, choi))