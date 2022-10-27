# Inkdrop Pandoc Integration ![version](https://inkdrop-plugin-badge.vercel.app/api/version/pandoc) ![downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/pandoc)

**⚠️ Pandoc installation required ⚠️**

This plugins extends the export functionality of [Inkdrop](https://www.inkdrop.app/) by integrating [Pandoc](https://pandoc.org) for file conversion.

Pandoc supports a wide range of different filetypes and the plugin aims to support all the ones that Pandoc can convert to from markdown.

The plugin currently supports basic conversion functionality for all available filetypes, assuming all requirements for the individual Pandoc conversions are met.

## Installation

Install the plugin using one of the two options:

- `ipm install pandoc`
- Search for `Pandoc` in the plugin browser UI and then click install.

## Usage

The plugin adds new export options in the file menu, as well as in the note and notebook context menus.

## Pandoc conversion compatability

The plugin has had limited testing on the following systems, your mileage may vary.

🔥 Full functionality found  
🚧 Partial functionality found  
🚨 No functionality found

| Pandoc version | Linux             | Windows                                                                             | macOS |
|----------------|-------------------|-------------------------------------------------------------------------------------|-------|
| 2.19.2         | 🔥 Manjaro 22.0.0 | 🚧 Windows 11 21H2 <br> Broken: `.pdf`, `.epub`, `.docx`, `.odt`, `.ipynb`, `.pptx` |       |

## Version history

See the [GitHub releases](https://github.com/Thereatra/inkdrop-pandoc/releases) page for an overview of changes.
