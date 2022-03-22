const express = require('express')
const router = express.Router()
const User = require('../models/userModels')

router.post('/register', async (req, res) => {
    const { name,
        email,
        age,
        mobile,
        work,
        add,
        desc } = req.body

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(404).json("plz fill the data");
    } else {
        try {
            const preuser = await User.findOne({ email });
            if (preuser) {
                res.status(404).json({ message: "this is user is already present" });
            }
            const addUser = await User.create({
                name,
                email,
                age,
                mobile,
                work,
                add,
                desc
            })
            if (addUser) {
                res.status(200).json({
                    addUser
                })
            }
            console.log(addUser);
        } catch (error) {
            console.log(error);
        }
    }
})

router.get('/getdata', async (req, res) => {
    try {
        const userData = await User.find()
        console.log(userData);

        res.status(200).json(userData)
    } catch (error) {

    }
})

router.get('/getuser/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const getuserData = await User.findById(_id)
        console.log(getuserData);
        res.status(200).json(getuserData)
    } catch (error) {
        console.log(error);
    }
})

router.patch('/updateuser/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const updateuserData = await User.findByIdAndUpdate(_id, req.body, { new: true })
        console.log(updateuserData);
        res.status(200).json(updateuserData)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const deleteuserData = await User.findByIdAndDelete(_id)
        console.log(deleteuserData);
        res.status(200).json(deleteuserData)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router