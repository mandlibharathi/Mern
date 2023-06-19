import axios from "axios";


//create action

 const createAction = async (actiondata,token)=>{

const config={
    headers: {
    Authorization: `Bearer ${token}`,
    }
}
const response = await axios.post('/postaction', actiondata, config)

return response.data
 }

 // Get user data
const getActions = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get('/getaction', config)
  
    return response.data
  }

   // Get action  data by action id
const getActionsById = async (id) => {

  const response = await axios.get('/getactionbyId'+'/'+id)

  return response.data
}

  // Delete user data
const deleteAction = async (actionId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete('/deleteaction' +"/" +actionId, config)
  
    return response.data
  }

  const updateAction = async (actionId, actionData,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    }
  
    const response = await axios.put('/updateacton' +"/" +actionId, actionData,config)
  
    return response.data
  }
  

  const actionService={
createAction,
getActions,
deleteAction,
updateAction,
getActionsById,
  }


  export default actionService