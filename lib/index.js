const pandoc = require("./pandoc")

exports.activate = async () => {
  if (!await pandoc.exists()) {
    this.deactivate()
    return
  }

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  console.log("Pandoc integration deactivated")
}
