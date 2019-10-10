import React from 'react'
import { Button, Form, Dropdown, Header } from 'semantic-ui-react'
import { UIConstants } from './constants'
import { toast } from 'react-toastify';
toast.configure()

class FormModal extends React.Component {

  constructor(props) {
    super(props)
  }

  handleChange = (event, data) => {
    let value = data.type === 'checkbox' ? data.checked : data.value
    const prop_name = data.name
    this.setState(
      { [prop_name]: value }
    )
  }

  formSubmitHandler(data){
    let body = JSON.stringify({question: data })
    fetch('/api/v1/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {
      return response.json()
    })
      .then((question)=>{
        if (question.success === true){
          toast.success("Successfully created")
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
      <Form widths='equal' onSubmit={this.handleSubmit.bind(this)}>
        <Header>New Question</Header>
        <Form.Group widths={2}>
          <Form.Input name='text' required label='Text' onChange={this.handleChange} placeholder='Question Description' />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input name='appears' required label='Appears' onChange={this.handleChange} placeholder='Enter appears' />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='type' required placeholder='Select Type' onChange={this.handleChange} search selection options={UIConstants.typeOptions} />
          <Dropdown name='teaming_stage' required placeholder='Teaming Stages' onChange={this.handleChange} search selection options={UIConstants.teamingOptions} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='mapping' required placeholder='Select Mapping' onChange={this.handleChange} search selection options={UIConstants.mappingOptions} />
          <Dropdown name='role' required placeholder='Select Role' onChange={this.handleChange} search selection options={UIConstants.roleOptions} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Dropdown name='required' required placeholder='Select Required' onChange={this.handleChange} search selection options={UIConstants.requiredOptions} />
          <Dropdown name='condition' required placeholder='Select Conditions' onChange={this.handleChange} search selection options={UIConstants.conditionOptions} />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input name='frequency' required label='Frequency' onChange={this.handleChange} placeholder='Enter frequency' />
        </Form.Group>

        <Button type='submit' positive>Submit</Button>
      </Form>
    )
  }

}

export { FormModal }