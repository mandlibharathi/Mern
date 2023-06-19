const router=require('express').Router()
const {registerUser,loginUser,getMe} =require('../controlers/usercontroler')

const { protect } = require('../middleware/authMiddleware')

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/me', protect, getMe)


module.exports=router