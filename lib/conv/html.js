const util = require("./util")

const type = "HTML5"
const extension = "html"

exports.html5 = async() => {
  await util.convert(type, extension)
}

exports.bookHtml5 = async(event) => {
  await util.convertBook(event, type, extension)
}
