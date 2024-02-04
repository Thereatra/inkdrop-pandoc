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
        // Ebook formats
        "pandoc:epub": () => convert.ebook.epub(),
        "pandoc:fictionBook2": () => convert.ebook.fictionBook2(),
        // Documentation formats
        "pandoc:gnuTexInfo": () => convert.documentation.gnuTexInfo(),
        "pandoc:haddockMarkup": () => convert.documentation.haddockMarkup(),
        // Roff formats
        "pandoc:roffMan": () => convert.roff.roffMan(),
        "pandoc:roffMs": () => convert.roff.roffMs(),
        // TeX formats
        "pandoc:latex": () => convert.tex.latex(),
        "pandoc:context": () => convert.tex.context(),
        // XML formats
        "pandoc:docbook": () => convert.xml.docbook(),
        "pandoc:jats": () => convert.xml.jats(),
        "pandoc:teiSimple": () => convert.xml.teiSimple(),
        "pandoc:openDocumentXml": () => convert.xml.openDocumentXml(),
        // Outline formats
        "pandoc:opml": () => convert.outline.opml(),
        // Word processor formats
        "pandoc:microsoftWord": () => convert.wordProcessor.microsoftWord(),
        "pandoc:rtf": () => convert.wordProcessor.rtf(),
        "pandoc:openoffice": () => convert.wordProcessor.openoffice(),
        // Interactive notebook formats
        "pandoc:jupyter": () => convert.interactiveNotebook.jupyter(),
        // Page layout formats
        "pandoc:indesign": () => convert.pageLayout.indesign(),
        // Wiki markup formats
        "pandoc:mediawiki": () => convert.wikiMarkup.mediawiki(),
        "pandoc:dokuwiki": () => convert.wikiMarkup.dokuwiki(),
        "pandoc:xwiki": () => convert.wikiMarkup.xwiki(),
        "pandoc:zimwiki": () => convert.wikiMarkup.zimwiki(),
        "pandoc:jirawiki": () => convert.wikiMarkup.jirawiki(),
        // Slide show formats
        "pandoc:latexBeamer": () => convert.slideShow.latexBeamer(),
        "pandoc:microsoftPowerpoint": () => convert.slideShow.microsoftPowerpoint(),
        "pandoc:slidy": () => convert.slideShow.slidy(),
        "pandoc:revealjs": () => convert.slideShow.revealjs(),
        "pandoc:slideous": () => convert.slideShow.slideous(),
        "pandoc:s5": () => convert.slideShow.s5(),
        "pandoc:dzslides": () => convert.slideShow.dzslides(),
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
        // Ebook formats
        "pandoc:book:epub": (event) => convert.ebook.bookepub(event),
        "pandoc:book:fictionBook2": (event) => convert.ebook.bookfictionBook2(event),
        // Documentation formats
        "pandoc:book:gnuTexInfo": (event) => convert.documentation.bookgnuTexInfo(event),
        "pandoc:book:haddockMarkup": (event) => convert.documentation.bookhaddockMarkup(event),
        // Roff formats
        "pandoc:book:roffMan": (event) => convert.roff.bookroffMan(event),
        "pandoc:book:roffMs": (event) => convert.roff.bookroffMs(event),
        // TeX formats
        "pandoc:book:latex": (event) => convert.tex.booklatex(event),
        "pandoc:book:context": (event) => convert.tex.bookcontext(event),
        // XML formats
        "pandoc:book:docbook": (event) => convert.xml.bookdocbook(event),
        "pandoc:book:jats": (event) => convert.xml.bookjats(event),
        "pandoc:book:teiSimple": (event) => convert.xml.bookteiSimple(event),
        "pandoc:book:openDocumentXml": (event) => convert.xml.bookopenDocumentXml(event),
        // Outline formats
        "pandoc:book:opml": (event) => convert.outline.bookopml(book),
        // Word processor formats
        "pandoc:book:microsoftWord": (event) => convert.wordProcessor.bookmicrosoftWord(event),
        "pandoc:book:rtf": (event) => convert.wordProcessor.bookrtf(event),
        "pandoc:book:openoffice": (event) => convert.wordProcessor.bookopenoffice(event),
        // Interactive notebook formats
        "pandoc:book:jupyter": (event) => convert.interactiveNotebook.bookjupyter(event),
        // Page layout formats
        "pandoc:book:indesign": (event) => convert.pageLayout.bookindesign(event),
        // Wiki markup formats
        "pandoc:book:mediawiki": (event) => convert.wikiMarkup.bookmediawiki(event),
        "pandoc:book:dokuwiki": (event) => convert.wikiMarkup.bookdokuwiki(event),
        "pandoc:book:xwiki": (event) => convert.wikiMarkup.bookxwiki(event),
        "pandoc:book:zimwiki": (event) => convert.wikiMarkup.bookzimwiki(event),
        "pandoc:book:jirawiki": (event) => convert.wikiMarkup.bookjirawiki(event),
        // Slide show formats
        "pandoc:book:latexBeamer": (event) => convert.slideShow.booklatexBeamer(event),
        "pandoc:book:microsoftPowerpoint": (event) => convert.slideShow.bookmicrosoftPowerpoint(event),
        "pandoc:book:slidy": (event) => convert.slideShow.bookslidy(event),
        "pandoc:book:revealjs": (event) => convert.slideShow.bookrevealjs(event),
        "pandoc:book:slideous": (event) => convert.slideShow.bookslideous(event),
        "pandoc:book:s5": (event) => convert.slideShow.books5(event),
        "pandoc:book:dzslides": (event) => convert.slideShow.bookdzslides(event),
        // PDF
        "pandoc:book:pdf": (event) => convert.pdf.bookpdf(event),
      })
    } else {
      this.subscription2?.dispose()
    }
  })
}

exports.deactivate = async () => {
  this.subscription1?.dispose()
  this.subscription2?.dispose()
}

const CONFIG_KEY_BOOKS = "pandoc.books"
const CONFIG_KEY_NOTES = "pandoc.notes"
exports.config = {
  path: {
    title: "Pandoc path",
    description: "The Pandoc executable path. If the plugin is unable to find Pandoc but you are sure that it is installed then try set this to the full path to the Pandoc executable",
    type: "string",
    default: "pandoc"
  },
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
