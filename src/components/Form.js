import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'

// SECTION 1: FORM SCHEMA //
const formSchema=yup.object().shape({
  name: yup.string()
    .required('Your name is required')
    .min(2, 'name must have at least 2 letters'),
  size: yup.string().required('You must choose a size'),
  pepperoni: yup.boolean().defined(),
  bacon: yup.boolean().defined(),
  capicola: yup.boolean().defined(),
  sausage: yup.boolean().defined(),
  specialInstructions:yup.string().notRequired()
})


export default function Form() {

// SECTION 2: STATES (1.form, 2.errors, 3.button, 4.post) // 
  const [formState, setFormState]=useState({
    name: '',
    size: '',
    pepperoni: false,
    bacon: false,
    capicola: false,
    sausage: false,
    specialInstructions: ''
  })
  const [errors, setErrors]=useState({
    name: '',
    size: '',
    pepperoni: '',
    bacon: '',
    capicola: '',
    sausage: '',
    specialInstructions: ''
  })
  const [buttonDisabled, setButtonDisabled]=useState(true)
  const [post, setPost]=useState([])

// SECTION 3: EVENT HANDLERS (1.inputChange, 2.buttonDisabled, 3.validateChange, 4.formSubmit(onSubmit))

//1.inputChange
  const inputChange = e => {
    e.persist()
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }

    validateChange(e);
    setFormState(newFormData);
  }
  //2.buttonDisabled
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);
  //3.validateChange
  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  //4.formSubmit
  const formSubmit = e => {
    e.preventDefault();
    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => {
        setPost(res.data);
        console.log('successful post!', post);
        console.log(res.data.size)
        setFormState({
            name: '',
            size: res.data.size,
            pepperoni: false,
            bacon: false,
            capicola: false,
            sausage: false,
            specialInstructions: ''
        });
      })
      .catch(err => console.log(err.response));
  };

// SECTION 4: RETURN FORM 
  
  return(
    <form onSubmit={formSubmit}>
      
      <h1> Pizza Order Form </h1>
      <p>{errors.name}</p>
      <label htmlFor='name'>
        Your Name
        <br/>
        <input 
          type='text'
          name='name'
          id='nameinput'
          placeholder='Name'
          value={formState.name}
          onChange={inputChange}
          />
      </label>
      <br/>
      <br/>

      <label htmlFor='size'>
        Pizza Size
        <br/>
        <select name = 'size' id = 'sizeinput' onChange = {inputChange}>
          <option name='default' value={null}></option>
          <option name='Small' value='Small'>Small</option>
          <option name='Medium' value='Medium'>Medium</option>
          <option name='Large' value='Large'>Large</option>
        </select>
      </label>
      <br/>
      <br/>

      <div className='toppingsChecklist'>
        <p>Pizza Toppings</p>
      
        <label htmlFor = 'pepperoni'>
          <input
              type='checkbox'
              name='pepperoni'
              id = 'pepperoniCheckBox'
              checked={formState.pepperoni} 
              onChange={inputChange}
          /> 
          Pepperoni
        </label>
        <br/>

        <label htmlFor = 'bacon'>
          <input
            type='checkbox'
            name='bacon'
            id = 'baconCheckBox'
            checked={formState.bacon} 
            onChange={inputChange}
          />
          Bacon
        </label>
        <br/>

        <label htmlFor = 'capicola'>
          <input
            type='checkbox'
            name='capicola'
            id = 'capicolaCheckBox'
            checked={formState.capicola} 
            onChange={inputChange}
          /> 
          Capicola
        </label>
        <br/>

        <label htmlFor = 'sausage'>
          <input
            type='checkbox'
            name='sausage'
            id='sausageCheckBox'
            checked={formState.sausage} 
            onChange={inputChange}
          />
          Sausage
        </label>
        <br/>

      </div>

        <label htmlFor='Special Instructions'>
          <br/>
          Any special instructions?
          <br/>
          <br/>
          <textarea
          name='specialInstructions'
          id='specialInstructionsInput'
          placeholder='Type special instructions here...'
          value={formState.specialInstructions} 
          onChange={inputChange}
          />
        </label>
        <br/>
        <br/>
            
        <button name='submit' disabled={buttonDisabled}>Submit</button>
        <p>{JSON.stringify(post)}</p>

    </form>
  )
} 