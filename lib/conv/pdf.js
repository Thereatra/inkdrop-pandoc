const util = require("./util")

const type = "PDF"
const extension = "pdf"

exports.pdf = async() => {
  await util.convert(type, extension)
}

exports.bookPdf = async(event) => {
  await util.convertBook(event, type, extension)
}
