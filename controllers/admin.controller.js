const { request, response } = require("express")
const md5 = require("md5")

// load model for 'admins' table
const adminModel = require(`../models/index`).admin

// load operation from sequelize
const Op = require(`sequelize`).Op

// create function for read all data
exports.getAlladmin = async (request, response) => {
    // call all findAll() to get all data
    let admins = await adminModel.findAll()
    return response.json({
        succes: true,
        data: admins,
        message: `All admins have been loaded`
    })
}
// create function for filter
exports.findadmin = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword
    // call findAll() within where clause and operation
    // to find data based on keyword
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { contact: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
               
            ]
        }
    })
    return response.json({
        succes: true,
        data: admins,
        message: `All admins data have been loaded`
    })
}

// create function for add new admin
exports.addadmin = (request, response) => {
    let newadmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password)
    }
    // execute inserting data to admin's table
    adminModel.create(newadmin)
        .then(result => {
            // jika proses memasukkan berhasil
            return response.json({
                succes: true,
                data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            // jika proses memasukkan data gagal
            return response.json({
                succes: false,
                message: error.message
            })
        })
}

// membuat fungsi untuk mengupdate admin
exports.updateadmin = (request, response) => {
    // prepare data that has been changed
    let dataadmin = {
        name: request.body.name,
        address: request.body.address,
        contact: request.body.contact,
        username: request.body.username,
        password: md5(request.body.password)
    }
    // define id admin that will be update
    let idAdmin = request.params.id

    // execute update data based on defined id admin
    adminModel.update(dataadmin, { where: { id: idAdmin } })
        .then(result => {
            // if update procces succes
            return response.json({
                succes: true,
                message: "Data admin has been updated"
            })
        })
        .catch(error => {
            return response.json({
                succes: false,
                message: error.message
            })

        })
}

// membuat fungsi untuk menghapus data
exports.deleteadmin = (request, response) => {
    // mendefinisikan id admin yang akan di perbarui
    let idAdmin = request.params.id

    // execute delete data based on defined id admin
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
            // if update procces succes
            return response.json({
                succes: true,
                message: 'Data admin has been updated'
            })
        })
        .catch(error => {
            // if update process fail
            return response.json({
                succes: false,
                message: error.message
            })
        })
}