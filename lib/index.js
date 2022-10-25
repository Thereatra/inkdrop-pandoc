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
    "pandoc:html5": () => convert.html.html5(),
  })

  inkdrop.config.observe(CONFIG_KEY_BOOKS, (e) => {
    const state = inkdrop.config.get(CONFIG_KEY_BOOKS)

    if (state) {
      this.subscription2 = inkdrop.commands.add(document.body, {
        "pandoc:book:pdf": (event) => convert.pdf.bookPdf(event),
        "pandoc:book:html5": (event) => convert.html.bookHtml5(event),
      })
    } else {
      this.subscription2?.dispose()
    }
  })

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  this.subscription?.dispose()
  this.subscription2?.dispose()

  console.log("Pandoc integration deactivated")
}

const CONFIG_KEY_BOOKS = "pandoc.books"
exports.config = {
  books: {
    title: "Export books",
    description: "Enable option to export notebooks",
    type: "boolean",
    default: true,
  },
}
