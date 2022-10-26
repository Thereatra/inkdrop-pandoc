const util = require("../util")

exports.indesign = async() => { await util.convert("InDesign ICML", "icml", "icml") }

exports.bookindesign = async(event) => { await util.convertBook(event, "InDesign ICML", "icml", "icml") }
