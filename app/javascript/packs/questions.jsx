import React from 'react'
import { Question } from './question'

const Questions = (props) => {

  var questions = props.questions.map((question) => {
    return(
      <div key={question.id}>
        <Question
          question={question}
          questionDeleteHandler={props.questionDeleteHandler}
          questionUpdateHandler={props.questionUpdateHandler}/>
      </div>
    )
  })

  return(
    <div>
      {questions}
    </div>
  )
}

export { Questions }