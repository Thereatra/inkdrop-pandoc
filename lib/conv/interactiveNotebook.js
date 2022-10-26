const util = require("../util")

exports.jupyter = async() => { await util.convert("Jupyter notebook", "ipynb", "ipynb") }

exports.bookjupyter = async(event) => { await util.convertBook(event, "Jupyter notebook", "ipynb", "ipynb") }
