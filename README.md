# Inkdrop Pandoc Integration ![version](https://inkdrop-plugin-badge.vercel.app/api/version/pandoc) ![downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/pandoc)

**⚠️ Pandoc installation required ⚠️**

This plugin extends the export functionality of [Inkdrop](https://www.inkdrop.app/) by integrating [Pandoc](https://pandoc.org) for file conversion.

Pandoc supports a wide range of different filetypes and the plugin aims to support all the ones that Pandoc can convert to from markdown.

The plugin currently supports basic conversion functionality for all available filetypes, assuming all requirements for the individual Pandoc conversions are met.

## Installation

Install the plugin using one of the two options:

- `ipm install pandoc`
- Search for `Pandoc` in the plugin browser UI and then click install.

## Usage

The plugin adds new export options in the file-, note context- and notebook context-menus.

1. Make sure you have [Pandoc installed](https://pandoc.org/installing.html) and [all requirements](https://pandoc.org/MANUAL.html) are met for the filetype you want to convert to
2. Use the file-, note context-, or notebook context-menu
3. Select `Export using Pandoc`
4. Select your desired output filetype from the list
5. Select the file destination using the dialog

| Export using the file menu                 | Export using the note context menu                   | Export using the notebook context menu                   |
|--------------------------------------------|------------------------------------------------------|----------------------------------------------------------|
| ![File menu export](/docs/images/file.png) | ![Note context export](/docs/images/noteContext.png) | ![Notebook context export](/docs/images/bookContext.png) |

## Compatibility

The compatibility with different systems and Pandoc versions may vary, see the compatibility matrix below for all the known/tested configuration combinations.

- 🔥 Full functionality found
- 🚧 Partial functionality found
- 🚨 No functionality found
- ❓ Compatibility untested

| Pandoc version | Linux         | Windows                                                                                                                | macOS |
|----------------|---------------|------------------------------------------------------------------------------------------------------------------------|-------|
| 3.1.11         | 🚧 Manjaro 23 <br> Broken: slide formats, `.pdf` | 🚧 Windows 11 23H2 <br> Broken: `.pdf`, `.epub`, `.docx`, `.odt`, `.pptx`           | ❓    |
| 2.19.2         | 🔥 Manjaro 22                                    | 🚧 Windows 11 21H2 <br> Broken: `.pdf`, `.epub`, `.docx`, `.odt`, `.pptx`, `.ipynb` | ❓    |

## Version history

See the [GitHub releases](https://github.com/Thereatra/inkdrop-pandoc/releases) page for an overview of changes.
