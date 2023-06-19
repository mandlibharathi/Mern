const router=require('express').Router()
const {getAction,postAction,updateAction,deleteAction, getActionById} =require('../controlers/actioncontroler')
const {protect} =require('../middleware/authMiddleware')
router.get('/getaction',protect,getAction)
router.get('/getactionbyId/:id',getActionById)
router.post('/postaction',protect,postAction)
router.put('/updateacton/:id',protect,updateAction)
router.delete('/deleteaction/:id',protect, deleteAction)



module.exports=router