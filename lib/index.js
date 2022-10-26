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
        // Lightweight markup formats
        "pandoc:markdown": () => convert.lightweightMarkup.markdown(),
        "pandoc:reStructuredText": () => convert.lightweightMarkup.reStructuredText(),
        "pandoc:asciiDoc": () => convert.lightweightMarkup.asciiDoc(),
        "pandoc:emacsOrgMode": () => convert.lightweightMarkup.emacsOrgMode(),
        "pandoc:emacsMuse": () => convert.lightweightMarkup.emacsMuse(),
        "pandoc:textile": () => convert.lightweightMarkup.textile(),
        "pandoc:markua": () => convert.lightweightMarkup.markua(),
        // HTML formats
        "pandoc:html4": () => convert.html.html4(),
        "pandoc:html5": () => convert.html.html5(),
        // Ebooks
        "pandoc:epub": () => convert.ebooks.epub(),
        "pandoc:fictionBook2": () => convert.ebooks.fictionBook2(),
        // Documentation formats
        "pandoc:gnuTexInfo": () => convert.documentation.gnuTexInfo(),
        "pandoc:haddockMarkup": () => convert.documentation.haddockMarkup(),
        // Outline formats
        "pandoc:opml": () => convert.outline.opml(),
        // Bibliography formats
        "pandoc:bibtex": () => convert.bibliography.bibtex(),
        "pandoc:biblatex": () => convert.bibliography.biblatex(),
        "pandoc:cslJson": () => convert.bibliography.cslJson(),
        // Interactive notebook formats
        "pandoc:jupyter": () => convert.interactiveNotebook.jupyter(),
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
        // Lightweight markup formats
        "pandoc:book:markdown": (event) => convert.lightweightMarkup.bookmarkdown(event),
        "pandoc:book:reStructuredText": (event) => convert.lightweightMarkup.bookreStructuredText(event),
        "pandoc:book:asciiDoc": (event) => convert.lightweightMarkup.bookasciiDoc(event),
        "pandoc:book:emacsOrgMode": (event) => convert.lightweightMarkup.bookemacsOrgMode(event),
        "pandoc:book:emacsMuse": (event) => convert.lightweightMarkup.bookemacsMuse(event),
        "pandoc:book:textile": (event) => convert.lightweightMarkup.booktextile(event),
        "pandoc:book:markua": (event) => convert.lightweightMarkup.bookmarkua(event),
        // HTML formats
        "pandoc:book:html4": (event) => convert.html.bookhtml4(event),
        "pandoc:book:html5": (event) => convert.html.bookhtml5(event),
        // Ebooks
        "pandoc:book:epub": (event) => convert.ebooks.bookepub(event),
        "pandoc:book:fictionBook2": (event) => convert.ebooks.bookfictionBook2(event),
        // Documentation formats
        "pandoc:book:gnuTexInfo": (event) => convert.documentation.bookgnuTexInfo(event),
        "pandoc:book:haddockMarkup": (event) => convert.documentation.bookhaddockMarkup(event),
        // Outline formats
        "pandoc:book:opml": (event) => convert.outline.bookopml(book),
        // Bibliography formats
        "pandoc:book:bibtex": (event) => convert.bibliography.bookbibtex(event),
        "pandoc:book:biblatex": (event) => convert.bibliography.bookbiblatex(event),
        "pandoc:book:cslJson": (event) => convert.bibliography.bookcslJson(event),
        // Interactive notebook formats
        "pandoc:book:jupyter": (event) => convert.interactiveNotebook.bookjupyter(event),
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
