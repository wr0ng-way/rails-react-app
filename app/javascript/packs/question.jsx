import React from 'react'
class Question extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editable: false
    }
    this.questionEditHandler = this.questionEditHandler.bind(this)
  }

  questionEditHandler(){
   if(this.state.editable){
      let text = this.text.value
      let type = this.type.value
      let id = this.props.question.id
      let question = {id: id, text: text, type: type}
      this.props.questionUpdateHandler(question)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
    let text = this.state.editable ? <input type='text' ref={input => this.text = input} defaultValue={this.props.question.text}/>:<h3>{this.props.question.text}</h3>
    let type = this.state.editable ? <input type='text' ref={input => this.type = input} defaultValue={this.props.question.type}/>:<p>{this.props.question.type}</p>
    return(
      <div>
        {text}
        {type}
        <button onClick={() => this.questionEditHandler()}>{this.state.editable? 'Update' : 'Edit'}</button>
        <button onClick={() => this.props.questionDeleteHandler(this.props.question.id)}>Delete</button>
      </div>
    )
  }
}

export { Question }