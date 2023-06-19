import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Menu,
    Button,
    Typography,
    Container,
     

} from '@mui/material'
import { HomeRounded,ExitToAppRounded } from '@mui/icons-material'
const Header = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const handleClick =()=>{
    navigate('/')
  }

  
  return (
    // <div>
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position='static' >
        <Container maxWidth="xl">
            <Toolbar>
            <HomeRounded />
          <Typography variant="h6"
           
          component="div" sx={{ flexGrow: 1 , cursor:'pointer'}}  >
            
            <Link to='/' style={{color:'inherit',textDecoration:'none'}}>DashBoard</Link>
          
          </Typography>
          {/* <Button color="inherit"  onClick={() =>{navigate('/login')}}>Login</Button>
          <Button color="inherit"onClick={() =>{navigate('/register')}}>Register</Button> */}

        <div>
        {user ? (
          <>
            <Button style={{color:'inherit'}} onClick={onLogout}>
              {/* <FaSignOutAlt />  */}
              Logout
            </Button>
          </>
        ) : (
          
            <>
              <Link to='/login' style={{textDecoration:'none',color:'inherit'}}>
              <Button color="inherit"  >Login</Button>
              </Link>
            
            
              <Link to='/register'  style={{textDecoration:'none',color:'inherit'}}>
                {/* <FaUser />  */}
                <Button color="inherit"  >Register</Button>
              </Link>
        
          </>
        )}
      </div>
            </Toolbar>

        </Container>
      </AppBar>
      </Box>
    // </div>
  )
}

export default Header
