const util = require("../util")

exports.latex = async() => { await util.convert("LaTeX", "latex", "tex") }
exports.context = async() => { await util.convert("ConTeXt", "context", "tex") }

exports.booklatex = async(event) => { await util.convertBook(event, "LaTeX", "latex", "tex") }
exports.bookcontext = async(event) => { await util.convertBook(event, "ConTeXt", "context", "tex") }
