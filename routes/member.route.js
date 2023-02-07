// load library express
const express = require(`express`)

// initiate object that instance of express
const app = express()

app.use(express.json())

// load member controller
const memberController=
require(`../controllers/member.controller`)

// membuat data route untuk mendapatkan data dengan method "GET"
app.get("/",memberController.getAllMember)

// membuat route untuk menambahkan member baru dengan menggunakan method "post"
app.post("/",memberController.addMember)

// membuat code untuk menentukan route pada proses mencari data member dengan method post
app.post("/find",memberController.findMember)

app.put("/:id",memberController.updateMember)

app.delete("/:id", memberController.deleteMember)

module.exports = app