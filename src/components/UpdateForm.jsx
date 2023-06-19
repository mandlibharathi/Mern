import React, { useState ,useEffect} from 'react'
import { useDispatch ,useSelector,} from 'react-redux'
import { redirect, useParams,useNavigate } from 'react-router-dom'

import actionService from '../features/actions/actionService'

import{
    Box,
    Button,
    FormGroup,
    Input,} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

const UpdateForm = () => {
 const navigate = useNavigate()

 const [text,setText]=useState('')
 const { user } = useSelector((state) => state.auth)

const id=useParams()
const getTextbyId = async(id)=>{
    const res = await actionService.getActionsById(Object.values(id))
    // setTextVal(res?.text)
    if(id !==" "){
    setText(res?.text)
    }
    }
useEffect(()=>{
    if(id){
      getTextbyId(Object.values(id))
    }
 
  },[id])


    const onChange = (e) => {
    
        setText(e.target.value)
      }


      const updateActions =async()=>{
       const userData={
       text
        }
        const res = await actionService.updateAction(Object.values(id),userData,user?.token)
    

        toast.success('Updateed successful!')
        setTimeout(()=>{
            navigate('/');

        },2000)
      }
    const onUpdate=(e)=>{
        
        e.preventDefault()
        const userData = {
          text
        }
updateActions()
        }
  return (
    <Box style={{alignItems:'center',textAlign:"center"}}>
        <h1>Here u can update your form</h1>
        <div>
            <form onSubmit={onUpdate}>
          <FormGroup >
          <Input
              type='text'
              // className='form-control'
              id='text'
              name='text'
              value={text}
              placeholder='Enter user Text '
              onChange={onChange }
              style={{margin:"auto"}}
            />
          </FormGroup>
         
          <Button type='submit'>Update</Button>
          </form>
            </div>
    </Box>
  )
}

export default UpdateForm
