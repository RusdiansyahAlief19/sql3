// load library express
const express = require(`express`)

// initiatte object that instance of express
const app = express()

// allow to read 'request' with json type 
app.use(express.json())

// load book controller
const bookController = require(`../controllers/book.controller`)
const upload = require("../controllers/upload-cover")

// create route to get data with method get
app.get("/", bookController.getAllBooks)

// create route to find book using method "POST" and path "find"
app.post("/find", bookController.findBook)

/**create route to add new book using method "POST"
 * 
 */
app.post(`/`, bookController.addBook)

/**create route to update book
 * using method "PUT"
 * and define parameter for "id"
 */
app.put("/:id", bookController.updateBook)

/**
 * create route to delete book
 * using method "DELETE" and define parameter for "id"
 */
app.delete(`/:id`, bookController.deleteBook)

// exports app in order to load in another file
module.exports = app