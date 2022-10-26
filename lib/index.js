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
  inkdrop.config.observe(CONFIG_KEY_NOTES, (e) => {
    const state = inkdrop.config.get(CONFIG_KEY_NOTES)

    if (state) {
      this.subscription1 = inkdrop.commands.add(document.body, {
        // HTML formats
        "pandoc:html4": () => convert.html.html4(),
        "pandoc:html5": () => convert.html.html5(),
        // PDF
        "pandoc:pdf": () => convert.pdf.pdf(),
      })
    } else {
      this.subscription1?.dispose()
    }
  })

  inkdrop.config.observe(CONFIG_KEY_BOOKS, (e) => {
    const state = inkdrop.config.get(CONFIG_KEY_BOOKS)

    if (state) {
      this.subscription2 = inkdrop.commands.add(document.body, {
        // HTML formats
        "pandoc:book:html4": (event) => convert.html.bookhtml4(event),
        "pandoc:book:html5": (event) => convert.html.bookhtml5(event),
        // PDF
        "pandoc:book:pdf": (event) => convert.pdf.bookpdf(event),
      })
    } else {
      this.subscription2?.dispose()
    }
  })

  console.log("Pandoc integration activated")
}

exports.deactivate = async () => {
  this.subscription1?.dispose()
  this.subscription2?.dispose()

  console.log("Pandoc integration deactivated")
}

const CONFIG_KEY_BOOKS = "pandoc.books"
const CONFIG_KEY_NOTES = "pandoc.notes"
exports.config = {
  books: {
    title: "Export books",
    description: "Enable option to export notebooks",
    type: "boolean",
    default: true,
  },
  notes: {
    title: "Export notes",
    description: "Enable option to export notes",
    type: "boolean",
    default: true,
  }
}
