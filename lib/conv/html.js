const util = require("./util")

const type = "HTML5"
const extension = "html"

exports.html5 = async() => {
  await util.convert(type, extension)
}
