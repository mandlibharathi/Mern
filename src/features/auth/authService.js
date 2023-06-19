import axios from 'axios'
const API_URL='/user/register'


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }

  // Login user


  const login = async(userData)=>{
    console.log("userData",userData)
    const response =await axios.post('/user/login',userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    
      return response.data
  }


  // Logout user
const logout = () => {
    localStorage.removeItem('user')
  }

  const authService = {
    register,
    login,
    logout,
  }
  
  export default authService