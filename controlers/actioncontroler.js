const asyncHandler= require('express-async-handler')

const Action= require('../models/actionmodel')
const user =require('../models/UserModel')


//Get action method GET  route /getaction
const getAction =asyncHandler(async (req,res)=>{
const actions = await Action.find({ user: req.user.id })
res.status(200).json(actions)

})


//Get action method GET  route /getactionbyId/:id
const getActionById =asyncHandler(async (req,res)=>{
  console.log("requser",req.params.id)
  const actions = await Action.findById(req.params.id )
  res.status(200).json(actions)
  
  })
  

//create action method Post  route /postaction

const postAction =asyncHandler(async (req,res)=>{
 if(!req.body.text){
    res.status(400)
    throw new Error('please add fields')
 }
//  res.status(200).json({messae:"set action"})
 const action = await Action.create(
    {
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(action)

})


// UpdateAction Route @ /updateaction
const updateAction =asyncHandler(async (req,res)=>{
    const action = await Action.findById(req.params.id)

    if(!action){
        res.status(400)
        throw new Error('Action not found')  
    }
    // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

// Make sure the logged in user matches the Action user
if (action.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
const updateaction= await Action.findByIdAndUpdate(req.params.id, req.body ,{new :true})
res.status(200).json(updateaction)

})

//delete Action  route @ /deleteaction
const deleteAction =asyncHandler(async (req,res)=>{
const action = await Action.findById(req.params.id)

if(!action){
    res.status(400)
    throw new Error('Action not found')  
}
if(!req.user){
    throw new Error('user not found ')
}
if (action.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await action.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports={
    getAction,
    postAction,
    updateAction,
    deleteAction,
    getActionById 
}