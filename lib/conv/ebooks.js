const util = require("../util")

exports.epub = async() => { await util.convert("EPUB", "epub", "epub") }
exports.fictionBook2 = async() => { await util.convert("FictionBook2", "fb2", "fb2") }

exports.bookepub = async(event) => { await util.convertBook(event, "EPUB", "epub", "epub") }
exports.bookfictionBook2 = async(event) => { await util.convertBook(event, "FictionBook2", "fb2", "fb2") }
