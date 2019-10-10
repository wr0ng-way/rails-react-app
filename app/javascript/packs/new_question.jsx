import React from 'react'
// import {NewQuestions} from './new_question'

class NewQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', type: ''};

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  formSubmitHandler(event) {
    this.props.formSubmitHandler(this.state)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        <label>
          text:
          <input type="text" name="text" value={this.state.text} onChange={this.onChangeHandler} />
        </label>
        <label>
          type:
          <input type="text" name="type" value={this.state.type} onChange={this.onChangeHandler} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export { NewQuestions }