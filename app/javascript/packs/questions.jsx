import React from 'react'
import { Table, Header, Button, Pagination, Modal } from 'semantic-ui-react';
import { FormModal } from './form_modal'
import { EditForm } from './edit_form'

class Questions extends React.Component {
  constructor(props) {
    super(props)
    let presets = {}
    presets.questions = props.questions
    presets.modal_open = false 
    presets.edit_modal_open = false
    presets.question_id = null 
    this.state = presets
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.questions)
    {     
      this.setState(
        { questions: nextProps.questions }
      )
    }
  }

  openModal = () => {
    this.setState({modal_open: true})
  }

  closeModal = () => {
    this.setState({modal_open: false})
  }

  openEditForm = () => {
    this.setState({edit_modal_open: true})
  }

  render() {
  let params = this.state
  return(
    <div>
      <Header as='h1' textAlign='center'>List Of all Questions</Header>
       <Button positive onClick={ this.openModal }>New Question</Button>
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Text</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Teaming Stages</Table.HeaderCell>
            <Table.HeaderCell>Appears</Table.HeaderCell>
            <Table.HeaderCell>Frequency</Table.HeaderCell>
            <Table.HeaderCell>Required?</Table.HeaderCell>
            <Table.HeaderCell>Conditions</Table.HeaderCell>
            <Table.HeaderCell>Mapping</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell colSpan='3'>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {
          params.questions.map((question) => {
            return (
            <Table.Row key={question.id}>
              <Table.Cell>{question.text}</Table.Cell>
              <Table.Cell>{question.type}</Table.Cell>
              <Table.Cell>{question.teaming_stage}</Table.Cell>
              <Table.Cell>{question.appears}</Table.Cell>
              <Table.Cell>{question.frequency}</Table.Cell>
              <Table.Cell>{question.required}</Table.Cell>
              <Table.Cell>{question.condition}</Table.Cell>
              <Table.Cell>{question.mapping}</Table.Cell>
              <Table.Cell>{question.role}</Table.Cell>
              <Table.Cell colSpan='3'>
                <Button onClick={ this.openEditForm } primary>Edit</Button> 
                {params.edit_modal_open ?
                <Modal size='small' open={ params.edit_modal_open } >
                  <Modal.Content>
                    <div>
                      <EditForm question={question}/>
                    </div>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button primary labelPosition='left' content='Cancel' icon='remove' onClick={ this.closeModal } />
                  </Modal.Actions>
                </Modal> : null }
                <Button onClick={ this.deleteQuestion } negative>Delete</Button>
              </Table.Cell>
            </Table.Row>)
          })
        }
        </Table.Body>
      </Table>
        {params.modal_open ?
        <Modal size='small' open={ params.modal_open } >
          <Modal.Content>
            <div>
              <FormModal/>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button primary labelPosition='left' content='Cancel' icon='remove' onClick={ this.closeModal } />
          </Modal.Actions>
        </Modal> : null }
    </div>
  )}
}

export { Questions }