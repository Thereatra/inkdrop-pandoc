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
    "pandoc:book:pdf": (event) => convert.pdf.bookPdf(event),
    "pandoc:html5": () => convert.html.html5(),
    "pandoc:book:html5": (event) => convert.html.bookHtml5(event),
  })

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  this.subscription?.dispose()

  console.log("Pandoc integration deactivated")
}
