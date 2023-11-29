import React, { Component } from 'react';

class Quiz extends Component {


  handleOptionSelect = (questionIndex, selectedOption) => {
    this.setState((prevState) => ({
      selectedOptions: {
        ...prevState.selectedOptions,
        [questionIndex]: selectedOption,
      },
    }));
  };

  handleSubmitQuiz = () => {
    const { questions, selectedOptions } = this.state;
    
    const allQuestionsAnswered = questions.every((question, index) => {
      return selectedOptions[index] !== undefined;
    });

    if (allQuestionsAnswered){
      let score = 1;
      questions.forEach((question, index)=> {
        if (selectedOptions[index] === question.correctAnswer){
          score++
        }
      });
    
    this.setState({ score, quizCompleted: true });
  } else{
    alert('Responda todas as perguntas antes de enviar o Quiz.');
  }
};

  render() {
    const { questions, selectedOptions, score, quizCompleted } = this.state;

    return (
      <div>
        <h2>Quiz ReactJS</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <h3>Questão {index + 1}</h3>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOptions[index] === option}
                      onChange={() => this.handleOptionSelect(index, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={this.handleSubmitQuiz}>Enviar Quiz</button>
        {quizCompleted && score !== null && (
          <div>
            <h2>Quiz completado!</h2>
            <p>Sua pontuação: {score} de {questions.length}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz; 