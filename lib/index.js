const pandoc = require("./pandoc")
const convert = require("./conv")

exports.activate = async () => {
  if (!await pandoc.exists()) {
    inkdrop.notifications.addError("Pandoc not found", {
      detail: "'pandoc' plugin requires an existing Pandoc installation to work.",
      dismissable: true
    })

    this.deactivate()
    return
  }

  this.subscription = inkdrop.commands.add(document.body, {
    "pandoc:pdf": () => convert.pdf.pdf(),
  })

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  this.subscription?.dispose()

  console.log("Pandoc integration deactivated")
}
