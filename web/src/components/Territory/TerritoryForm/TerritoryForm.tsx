import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'



const TerritoryForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.territory?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.territory?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="spreadsheetURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Spreadsheet url
        </Label>
        
          <TextField
            name="spreadsheetURL"
            defaultValue={props.territory?.spreadsheetURL}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="spreadsheetURL" className="rw-field-error" />

        <Label
          name="isCompleted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is completed
        </Label>
        
          <CheckboxField
            name="isCompleted"
            defaultChecked={props.territory?.isCompleted}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isCompleted" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <TextField
            name="userId"
            defaultValue={props.territory?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TerritoryForm
