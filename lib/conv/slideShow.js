const util = require("../util")

exports.latexBeamer = async() => { await util.convert("LaTeX beamer", "beamer", "tex") }
exports.microsoftPowerpoint = async() => { await util.convert("Microsoft PowerPoint", "pptx", "pptx") }
exports.slidy = async() => { await util.convert("Slidy", "slidy", "html") }
exports.revealjs = async() => { await util.convert("reveal.js", "revealjs", "html") }
exports.slideous = async() => { await util.convert("Slideous", "slideous", "html") }
exports.s5 = async() => { await util.convert("S5", "s5", "html") }
exports.dzslides = async() => { await util.convert("DZSlides", "dzslides", "html") }

exports.booklatexBeamer = async(event) => { await util.convertBook(event,  "LaTeX beamer", "beamer", "tex") }
exports.bookmicrosoftPowerpoint = async(event) => { await util.convertBook(event,  "Microsoft PowerPoint", "pptx", "pptx") }
exports.bookslidy = async(event) => { await util.convertBook(event, "Slidy", "slidy", "html") }
exports.bookrevealjs = async(event) => { await util.convertBook(event, "reveal..js", "revealjs", "html") }
exports.bookslideous = async(event) => { await util.convertBook(event, "Slideous", "slideous", "html") }
exports.books5 = async(event) => { await util.convertBook(event, "S5", "s5", "html") }
exports.bookdzslides = async(event) => { await util.convertBook(event, "DZSlides", "dzslides", "html") }
