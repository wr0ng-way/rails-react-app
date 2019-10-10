import React from 'react'
import { Button, Form, Dropdown, Header } from 'semantic-ui-react'
import { UIConstants } from './constants'
import { toast } from 'react-toastify';
toast.configure()

class EditForm extends React.Component {

  constructor(props) {
    super(props)
    let presets = {}
    presets.question = props.question
    this.state = presets
  }

  handleChange = (event, data) => {
    let value = data.type === 'checkbox' ? data.checked : data.value
    const prop_name = data.name
    this.setState(
      { [prop_name]: value }
    )
  }

  questionUpdateHandler = () => {
    let question = this.state.question
    let question_id = question.id
    delete question.id
    fetch(`/api/v1/questions/${question_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({question: question}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {return response.json()})
      .then((question)=>{
        if (question.success === true){
          toast.success("Successfully Updated")
        }else {
          toast.error("Somthing went wrong")
        }
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.formSubmitHandler(this.state)
  }

  render () {
    let params = this.state
    return (
      <Form widths='equal' onSubmit={this.questionUpdateHandler.bind(this)}>
        <Header>New Question</Header>
        <Form.Group widths={2}>
          <Form.Input name='text' value={params.question.text} required label='Text' onChange={this.handleChange} placeholder='Question Description' />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input name='appears' value={params.question.appears} required label='Appears' onChange={this.handleChange} placeholder='Enter appears' />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='type' value={params.question.type} required placeholder='Select Type' onChange={this.handleChange} search selection options={UIConstants.typeOptions} />
          <Dropdown name='teaming_stage' value={params.question.teaming_stage} required placeholder='Teaming Stages' onChange={this.handleChange} search selection options={UIConstants.teamingOptions} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='mapping' value={params.question.mapping} required placeholder='Select Mapping' onChange={this.handleChange} search selection options={UIConstants.mappingOptions} />
          <Dropdown name='role' value={params.question.role} required placeholder='Select Role' onChange={this.handleChange} search selection options={UIConstants.roleOptions} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='required' value={params.question.required} required placeholder='Select Required' onChange={this.handleChange} search selection options={UIConstants.requiredOptions} />
          <Dropdown name='condition' value={params.question.condition} required placeholder='Select Conditions' onChange={this.handleChange} search selection options={UIConstants.conditionOptions} />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input name='frequency' value={params.question.frequency} required label='Frequency' onChange={this.handleChange} placeholder='Enter frequency' />
        </Form.Group>

        <Button type='submit' positive>Submit</Button>
      </Form>
    )
  }

}

export { EditForm }