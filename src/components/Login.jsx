import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
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
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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
  }, [user, isError, isSuccess, message, navigate,])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  

  return (
    <>
      

      
      <Box style={{textAlign:'center',alignItems:"center"}}>
      <h1>
          {/* <FaSignInAlt />  */}
          Login
        </h1>
        <p>Login and start setting goals</p>
        <form onSubmit={onSubmit}>
          <FormGroup >
          <Input
              type='email'
              // className='form-control'
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
        
     <div>
      <Button type='submit'>
              Submit
            </Button>
            </div>
            </form>
      </Box>
    </>
  )
}

export default Login