const pandoc = require("./pandoc")
const convert = require("./convert")

exports.activate = async () => {
  if (!await pandoc.exists()) {
    this.deactivate()
    return
  }

  this.subscription = inkdrop.commands.add(document.body, {
    "pandoc:pdf": () => convert.pdf(),
  })

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  this.subscription?.dispose()

  console.log("Pandoc integration deactivated")
}
