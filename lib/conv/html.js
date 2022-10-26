const util = require("../util")

const extension = "html"

exports.html4 = async() => { await util.convert("XHTML", "html4", extension) }
exports.html5 = async() => { await util.convert("HTML", "html5", extension) }

exports.bookhtml4 = async(event) => { await util.convertBook(event, "XHTML", "html4", extension) }
exports.bookhtml5 = async(event) => { await util.convertBook(event, "HTML", "html5", extension) }
