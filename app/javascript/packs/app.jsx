import React from 'react'
import { NewQuestions } from './new_question'
import { Questions } from './questions'
import { Pagination } from 'semantic-ui-react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      pagination_data: {},
      activePage: 1
    };
    this.questionDeleteHandler = this.questionDeleteHandler.bind(this)

  }

  componentDidMount(){
    this.fetchQuestions(this.state.activePage)
  }

  handlePaginationChange(e, { activePage }) {
    this.setState({ activePage: activePage })
    this.fetchQuestions(activePage)
  }

  fetchQuestions(activePage){
    fetch(`/api/v1/questions.json?page=${activePage}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({ questions: data.questions, pagination_data: data.meta}) 
    });
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

  updateQuestion(question) {
    let newQuestions = this.state.questions.filter((f) => f.id !== question.id)
    newQuestions.push(question)
    this.setState({
      questions: newQuestions
    })
  }

  render() {
    let params = this.state
    return(
      <div>
        <Questions
          questions={params.questions}
          questionDeleteHandler={this.questionDeleteHandler}
          questionUpdateHandler={this.questionUpdateHandler} />
        { params.questions.length > 0 ? 
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={params.pagination_data.current_page}
                  firstItem={null}
                  lastItem={null}
                  onPageChange={this.handlePaginationChange.bind(this)}
                  siblingRange={1}
                  totalPages={params.pagination_data.total_pages}
                /> : null }
      </div>
    )
  }
}

export {App};