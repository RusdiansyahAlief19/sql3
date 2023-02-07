const { request, response } = require("express")

// load model for 'members' table
const memberModel = require(`../models/index`).member

// load operation from sequelize
const Op = require(`sequelize`).Op

// create function for read all data
exports.getAllMember = async (request, response) => {
    // call all findAll() to get all data
    let members = await memberModel.findAll()
    return response.json({
        succes: true,
        data: members,
        message: `All Members have been loaded`
    })
}
// create function for filter
exports.findMember = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword
    // call findAll() within where clause and operation
    // to find data based on keyword
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        succes: true,
        data: members,
        message: `All members data have been loaded`
    })
}

// create function for add new member
exports.addMember = (request, response) => {
    let newMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }
    // execute inserting data to member's table
    memberModel.create(newMember)
        .then(result => {
            // jika proses memasukkan berhasil
            return response.json({
                succes: true,
                data: result,
                message: `New member has been inserted`
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

// membuat fungsi untuk mengupdate member
exports.updateMember = (request, response) => {
    // prepare data that has been changed
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }
    // define id member that will be update
    let idMember = request.params.id

    // execute update data based on defined id member
    memberModel.update(dataMember, { where: { id: idMember } })
        .then(result => {
            // if update procces succes
            return response.json({
                succes: true,
                message: "Data member has been updated"
            })
        })
        .catch(error => {
            return response.json({
                succes:false,
                message:error.message
            })

        })
}

// membuat fungsi untuk menghapus data
exports.deleteMember = (request, response) => {
    // mendefinisikan id member yang akan di perbarui
    let idMember = request.params.id

    // execute delete data based on defined id member
    memberModel.destroy({ where: { id: idMember } })
        .then(result => {
            // if update procces succes
            return response.json({
                succes: true,
                message: 'Data member has been updated'
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