// load library express
const express = require(`express`)

// initiate object that instance of express
const app = express()

app.use(express.json())

app.use(express.urlencoded({extend:true}))

// load admin controller
const adminController=
require(`../controllers/admin.controller`)

// membuat data route untuk mendapatkan data dengan method "GET"
app.get("/",adminController.getAlladmin)

// membuat route untuk menambahkan admin baru dengan menggunakan method "post"
app.post("/",adminController.addadmin)

// membuat code untuk menentukan route pada proses mencari data admin dengan method post
app.post("/find",adminController.findadmin)

app.put("/:id",adminController.updateadmin)

app.delete("/:id", adminController.deleteadmin)

module.exports = app