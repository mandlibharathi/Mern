import { useDispatch ,useSelector} from 'react-redux'
import { deleteAction ,createAction} from '../features/actions/actionSlice'
import {
   Box ,
   Button,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Typography,
   Input,
   FormGroup
  } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  EditNoteRounded,
  DeleteRounded
} from '@mui/icons-material'

function ActionItem({ action }) {
  const dispatch = useDispatch()
  const [text,seText]= useState('')
  const [open,setOpen]=useState(false)
  const [isUpdate,setIsUpdate]=useState(false)
  const [updateId,setUpdateId]=useState('')
  const[textval,setTextVal]=useState(null)
  const { user } = useSelector((state) => state.auth)

  const { actions, isLoading, isError, message } = useSelector(
    (state) => state.actions
  )

  const onChange = (e) => {
    
    seText(e.target.value)
  }


  const onSubmit = (e) => {
    e.preventDefault()
  
    const userData = {
      text
    }
    dispatch(createAction(userData))
   
    setOpen(false)
  }

  

  return (
    <Box>
      
          <Button onClick={() => setOpen(true)} style={{
            marginRight:"10px",
          float:'right'
          }}>
        Create
      </Button>
      
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">NO</TableCell> */}
            <TableCell align="right">Text</TableCell>
            <TableCell align="right">CreatedAt</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          
              {actions.map((action)=>(
               <TableRow>
        <TableCell align="right">{action.text}</TableCell>
          <TableCell align="right">{new Date(action.createdAt).toLocaleString('en-US')}</TableCell>
          <TableCell align="right">
       <Link to ={`update/${action._id}`}  >
        <EditNoteRounded  fontSize='large' /> </Link>
      
          </TableCell>
          <TableCell align="right">
          <Button onClick={() => dispatch(deleteAction(action._id))} className='close'>
        <DeleteRounded  />
      </Button>
          </TableCell>
          </TableRow> 
           ))}
        </TableBody>
        
        </Table>
       
        {open  ? (<>
          <div>
            <form onSubmit={onSubmit }>
          <FormGroup >
          <Input
              type='text'
              id='text'
              name='text'
              value={text}
              placeholder='Enter user Text '
              onChange={onChange }
              style={{margin:"auto"}}
            />
          </FormGroup>
         
          <Button type='submit'>Add Text</Button>
          </form>
            </div>
      </>):(<></>)}
     
    </Box>
  )
}

export default ActionItem