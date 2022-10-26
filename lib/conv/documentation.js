const util = require("../util")

exports.gnuTexInfo = async() => { await util.convert("GNU Texinfo", "texinfo", "texi") }
exports.haddockMarkup = async() => { await util.convert("Haddock markup", "haddock", "txt") }

exports.bookgnuTexInfo = async(event) => { await util.convertBook(event, "GNU Texinfo", "texinfo", "texi") }
exports.bookhaddockMarkup = async(event) => { await util.convertBook(event, "Haddock markup", "haddock", "txt") }
