const util = require("../util")

const extension = "html"

exports.html4 = async() => { await util.convert("HTML4", "html4", extension) }
exports.html5 = async() => { await util.convert("HTML5", "html5", extension) }

exports.bookhtml4 = async(event) => { await util.convertBook(event, "HTML4", "html4", extension) }
exports.bookhtml5 = async(event) => { await util.convertBook(event, "HTML5", "html5", extension) }
