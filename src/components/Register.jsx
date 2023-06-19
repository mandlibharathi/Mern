import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from './Spinner'
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  TextField,
  FormGroup
} from '@mui/material'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      
      <Box style={{textAlign:'center',alignItems:"center"}}>
      <h1>
          {/* <FaUser /> */}
           Register
        </h1>
        <p>Please create an account</p>
        <form onSubmit={onSubmit}>
        <FormGroup>
            <Input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              style={{margin:"auto"}}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              style={{margin:"auto"}}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              style={{margin:"auto"}}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
              style={{margin:"auto"}}
            />
          </FormGroup>
     <div>
      <Button type='submit' >
              Submit
            </Button>
            </div>
            </form>
      </Box>
    </>
  )
}

export default Register