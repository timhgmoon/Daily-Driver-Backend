const express = require('express')
const router = express.Router()
const Member = require('../models/Member')

// GET all MEMBERs 
router.get('/', (req, res) => {
    Member.find()
        .then(members => res.status(200).json({status: 200, members: members}))
})

// GET a SPECIFIC MEMBER
router.get('/:memberId', (req, res) => {
  Member.find({ _id:  req.params.memberId})
      .then(member => res.status(200).json({status: 200, member: member}))
})

// POST - this will CREATE a MEMBER
router.post('/', (req, res) => {
    Member.create(req.body)
        .then(member => res.status(201).json({ status: 201, member: member}))
})

// POST - this will CREATE a TASK for a SPECIFIC MEMBER
router.post('/:memberId', (req, res) => {
  Member.updateOne(
      {
        _id: req.params.memberId
        }, 
      {
        $push: {tasks: req.body} 
        } 
      )
      .then(member => res.status(201).json({ status: 201, member: member}))
      .catch(error => console.log(error))
})


// DELETE - this will DELETE a SPECIFIC MEMBER 
router.delete('/:memberId', (req, res) => {
    Member.deleteOne({ _id:  req.params.memberId})
    .then(member => {
        res.json({
          status: 204,
          member: member
        })
      })
})

// DELETE - this will DELETE a SPECIFIC TASK for a MEMBER
router.delete('/:memberId/:taskId', (req, res) => {
    Member.updateOne(
        {
          _id: req.params.memberId
          }, 
        {
          $pull: {tasks: {"_id": req.params.taskId}} 
          } 
        )
        .then(member => res.status(201).json({ status: 201, member: member}))
        .catch(error => console.log(error))
})

// PUT by ID - this will UPDATE a MEMBER NAME
router.put('/:id', (req, res) => {
    Member.findOneAndUpdate({ _id: req.params.id}, req.body,  {new: true})
        .then(member => res.status(200).json({status: 200, member: member}))
})

// PUT - this will update a SPECIFIC TASK for a MEMBER
router.put('/:memberId/:taskId', (req, res) => {
    Member.updateOne(
        {
          _id: req.params.memberId, "tasks._id": req.params.taskId
          }, 
        {
            $set: {"tasks.$": req.body}
        },

        )
        .then(member => res.status(201).json({ status: 201, member: member}))
        .catch(error => console.log(error))
  })

module.exports = router