const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Associate = require('./associate.model')

mongoose.connect("mongodb+srv://praneeth:praneeth@basicnodeconnect.x8dsf.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=BasicNodeConnect")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/getAllAssociates', async (req, res) => {
    const associates = await Associate.find({}).select('-__v -updatedAt -createdAt')
    res.status(200).json({result: true, data: associates})
})

app.get('/associatesById/:id', async (req, res) => {
    const id = req.params.id
    const associate = await Associate.findById(id).select('-__v -updatedAt -createdAt')
    if(!associate) {
        return res.status(404).json({result: false, message: "Associate not found"})
    }
    try {
        res.status(200).json({result: true, data: associate})
    } catch(error) {
        res.status(500).json({result: false, message: error.message})
    }
})

app.post('/addAssociate', async (req, res) => {
    const {name, email, phone, type, address, associateGrp, status} = req.body
    const associate = new Associate({name, email, phone, type, address, associateGrp, status})
    try {
        await associate.save()
        res.status(200).json({result: true, message: "Associate added successfully"})
    } catch(error) {
        res.status(500).json({result: false, message: error.message})
    }
})

app.put('/updateAssociate/:id', async (req, res) => {
    const id = req.params.id
    const {name, email, phone, type, address, associateGrp, status} = req.body
    const associate = await Associate.findByIdAndUpdate(id, {name, email, phone, type, address, associateGrp, status})
    if(!associate) {
        return res.status(404).json({result: false, message: "Associate not found"})
    }
    try {
        await associate.save()
        res.status(200).json({result: true, message: "Associate updated successfully"})
    } catch(error) {
        res.status(500).json({result: false, message: error.message})
    }
})

app.delete('/deleteAssociate/:id', async (req, res) => {
    const id1 = req.params.id
    const associate = await Associate.findByIdAndDelete(id1)
    if(!associate) {
        return res.status(404).json({result: false, message: "Associate not found"})
    }
    try {
        res.status(200).json({result: true, message: "Associate deleted successfully", id: id1})
    } catch(error) {
        res.status(500).json({result: false, message: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
