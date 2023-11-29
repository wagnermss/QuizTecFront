import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const url = "http://localhost:3000/perguntas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0 && "pergunta" in data[0]) {
          setPerguntas(data);
          setSelectedOptions(Array(data.length).fill(null));
        } else {
          console.error('Formato de resposta inválido:', data);
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    fetchData();
  }, [url]);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionIndex] = selectedOption;
      return newSelectedOptions;
    });
  };

  const handleSubmitQuiz = () => {
    const allQuestionsAnswered = selectedOptions.every(
      (selectedOption) => selectedOption !== null
    );

    if (allQuestionsAnswered) {
      let score = 0;
      perguntas.forEach((question, index) => {
        if (selectedOptions[index] === question.respostaCorreta) {
          score++;
        }
      });

      setScore(score);
      setQuizCompleted(true);
    } else {
      alert("Responda todas as perguntas antes de enviar o Quiz.");
    }
  };

  return (
    <div>
      <h2>Quiz ReactJS</h2>
      {perguntas.map((question, index) => (
        <div key={index}>
          <h3>{question.pergunta}</h3>
          <ul>
            {Object.entries(question.alternativas).map(([opcao, textoOpcao]) => (
              <li key={opcao}>
                <label>
                  <input
                    type="radio"
                    value={opcao}
                    checked={selectedOptions[index] === opcao}
                    onChange={() => handleOptionSelect(index, opcao)}
                  />
                  {`${opcao}: ${textoOpcao}`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmitQuiz}>Enviar Quiz</button>
      {quizCompleted && score !== null && (
        <div>
          <h2>Quiz completado!</h2>
          <p>Sua pontuação: {score} de {perguntas.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;