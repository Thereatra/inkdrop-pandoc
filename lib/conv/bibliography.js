const util = require("../util")

exports.bibtex = async() => { await util.convert("BibTeX", "bibtex", "bibtex") }
exports.biblatex = async() => { await util.convert("BibLaTeX", "biblatex", "bib") }
exports.cslJson = async() => { await util.convert("CSL JSON", "csljson", "json") }

exports.bookbibtex = async(event) => { await util.convertBook(event, "BibTeX", "bibtex", "bibtex") }
exports.bookbiblatex = async(event) => { await util.convertBook(event, "BibLaTeX", "biblatex", "bib") }
exports.bookcslJson = async(event) => { await util.convertBook(event, "CSL JSON", "csljson", "json") }
