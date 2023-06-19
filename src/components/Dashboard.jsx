import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import { getactions,createAction, reset } from '../features/actions/actionSlice'
import ActionItem from './ActionItem'

import {Box,
  Button ,
  Typography ,
  Paper,
  FormGroup,
  Input

} from '@mui/material'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[openForm, setOpenForm]=useState(false)

  const { user } = useSelector((state) => state.auth)
  const { actions, isLoading, isError, message } = useSelector(
    (state) => state.actions
  )

  const [formData, setFormData] = useState({
    text: '',
  })

  const { text} = formData
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getactions())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate])

  if (isLoading) {
    return <Spinner />
  }
const createNew =()=>{
  if(actions.length === 0 && user){
     setOpenForm(true)
  }
}
const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}
const onSubmit = (e) => {
  e.preventDefault()

  const userData = {
    text
  }
  dispatch(createAction(userData))
  setOpenForm(false)
}

if (isLoading) {
  return <Spinner />
}
  return (
    <Box style={{alignItems:'center',textAlign:"center"}}>
<h1 style={{fontWeight:800,color:'#879696'}}>Welcome {user && user.name}</h1>
        <p>User Dashboard</p>

<div>
{actions.length > 0 ? (
          // <Paper>
          //   <Box>
          //   {actions.map((data) => (
          //     <ActionItem key={data._id} action={data} />
          //   ))}
          //   </Box>
          // </Paper>
          <ActionItem  />
        ) : (
          <>
          <h3>You have not set any goals Create New goal</h3>
           <Button onClick ={createNew}> Create New  </Button>

           <Box>
            {openForm ? (
            <>
            <div>
            <form onSubmit={onSubmit}>
          <FormGroup >
          <Input
              type='text'
              // className='form-control'
              id='text'
              name='text'
              value={text}
              placeholder='Enter user Text '
              onChange={onChange}
              style={{margin:"auto"}}
            />
          </FormGroup>
          <Button type='submit'>Add Text</Button>
          </form>
            </div>
            </>):(<>
            <h1>You don't have any content plz add</h1>
            </>)}
           </Box>
           </>
        )}
        </div>
    </Box>
  )
}

export default Dashboard
