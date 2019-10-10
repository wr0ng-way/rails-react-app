import React from 'react'
import { NewQuestions } from './new_question'
import { Questions } from './questions'
import { Header } from 'semantic-ui-react'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.formSubmitHandler = this.formSubmitHandler.bind(this)
    this.questionUpdateHandler = this.questionUpdateHandler.bind(this)
    this.questionDeleteHandler = this.questionDeleteHandler.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/questions.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ questions: data }) });
  }

  formSubmitHandler(data){
    let body = JSON.stringify({question: {text: data.text, type: data.type} })
    fetch('/api/v1/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
      .then((question)=>{
        this.setState({
          questions: this.state.questions.concat(question)
        })
      })
  }

  questionDeleteHandler(id){
    fetch(`/api/v1/questions/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.deleteQuestion(id)
      })
  }

  deleteQuestion(id){
    newQuestions = this.state.questions.filter((question) => question.id !== id)
    this.setState({
      questions: newQuestions
    })
  }

  questionUpdateHandler(question) {
    fetch(`/api/v1/questions/${question.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({question: question}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {return response.json()})
      .then((question)=>{
        this.updateQuestion(question)
      })
  }

  updateQuestion(question) {
    let newQuestions = this.state.questions.filter((f) => f.id !== question.id)
    newQuestions.push(question)
    this.setState({
      questions: newQuestions
    })
  }

  render() {
    return(
      <div>
        <Header as='h1' textAlign='right'>List Of all Questions</Header>
        <NewQuestions formSubmitHandler={this.formSubmitHandler} />
        <Questions
          questions={this.state.questions}
          questionDeleteHandler={this.questionDeleteHandler}
          questionUpdateHandler={this.questionUpdateHandler} />
      </div>
    )
  }
}

export {App};