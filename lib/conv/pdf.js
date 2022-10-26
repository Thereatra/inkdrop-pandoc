const util = require("../util")

exports.pdf = async() => { await util.convert("PDF", "pdf", "pdf") }

exports.bookpdf = async(event) => { await util.convertBook(event, "PDF", "pdf", "pdf") }
