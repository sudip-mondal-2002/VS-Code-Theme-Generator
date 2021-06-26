let form = document.getElementById('colorTheme');
let result = document.getElementById('result');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	//console.log('submit form');

	let themeName = document.getElementById('themeName').value;
	// Get colors
	let dkBackground = document.getElementById('dkBackground').value;
	let almostDkBackground = document.getElementById('almostDkBackground').value;
	let lighterBackground = document.getElementById('lighterBackground').value;
	let ltForeground = document.getElementById('ltForeground').value;
	let xltForeground = document.getElementById('xltForeground').value;
	let darkerAccent1 = document.getElementById('darkerAccent1').value;
	let lighterAccent1 = document.getElementById('lighterAccent1').value;
	let xltAccent1 = document.getElementById('xltAccent1').value;
	let xxltAccent1 = document.getElementById('xxltAccent1').value;
	let accent2 = document.getElementById('accent2').value;
	let darkerAccent2 = document.getElementById('darkerAccent2').value;
	let accent3 = document.getElementById('accent3').value;
	let statusBarBackground = document.getElementById('statusBarBackground')
		.value;
	let statusBarForeground = document.getElementById('statusBarForeground')
		.value;

	result.innerHTML =
`{
  "name": "` +
  themeName +
  `",
    "$schema": "vscode://schemas/color-theme",
    "type": "dark",
    "colors": {
      "activityBar.background": "` +
  dkBackground +
  `",
      "activityBar.border": "` +
  dkBackground +
  `60",
      "activityBar.foreground": "` +
  ltForeground +
  `",
      "activityBarBadge.background": "` +
  xltAccent1 +
  `",
      "activityBarBadge.foreground": "` +
  dkBackground +
  `",
      "badge.background": "` +
  dkBackground +
  `30",
      "badge.foreground": "` +
  darkerAccent1 +
  `",
      "breadcrumb.activeSelectionForeground": "` +
  darkerAccent1 +
  `",
      "breadcrumb.background": "` +
  dkBackground +
  `",
      "breadcrumb.focusForeground": "` +
  ltForeground +
  `",
      "breadcrumb.foreground": "` +
  lighterAccent1 +
  `",
      "breadcrumbPicker.background": "` +
  dkBackground +
  `",
      "button.background": "` +
  darkerAccent1 +
  `50",
      "contrastBorder": "` +
  darkerAccent1 +
  `40",
      "debugToolBar.background": "` +
  dkBackground +
  `",
      "diffEditor.insertedTextBackground": "` +
  darkerAccent2 +
  `15",
      "diffEditor.removedTextBackground": "` +
  accent3 +
  `20",
      "dropdown.background": "` +
  dkBackground +
  `",
      "dropdown.border": "` +
  xltForeground +
  `10",
      "editor.background": "` +
  dkBackground +
  `",
      "editor.findMatchBackground": "` +
  dkBackground +
  `",
      "editor.findMatchBorder": "` +
  darkerAccent1 +
  `",
      "editor.findMatchHighlightBackground": "` +
  darkerAccent1 +
  `93",
      "editor.findMatchHighlightBorder": "` +
  xltForeground +
  `30",
      "editor.foreground": "` +
  ltForeground +
  `",
      "editor.lineHighlightBackground": "` +
  dkBackground +
  `50",
      "editor.selectionBackground": "` +
  xltAccent1 +
  `30",
      "editor.selectionHighlightBackground": "` +
  darkerAccent1 +
  `6b",
      "editor.selectionHighlightBorder": "` +
  xltAccent1 +
  `f0",
      "editorBracketMatch.background": "` +
  dkBackground +
  `",
      "editorBracketMatch.border": "` +
  accent2 +
  `7f",
      "editorCursor.foreground": "` +
  accent2 +
  `",
      "editorError.foreground": "` +
  accent3 +
  `70",
      "editorGroup.border": "` +
  dkBackground +
  `30",
      "editorGroupHeader.tabsBackground": "` +
  dkBackground +
  `",
      "editorGutter.addedBackground": "` +
  darkerAccent2 +
  `60",
      "editorGutter.deletedBackground": "` +
  accent3 +
  `60",
      "editorGutter.modifiedBackground": "` +
  xltAccent1 +
  `60",
      "editorHoverWidget.background": "` +
  dkBackground +
  `",
      "editorHoverWidget.border": "` +
  xltForeground +
  `10",
      "editorIndentGuide.activeBackground": "` +
  lighterBackground +
  `",
      "editorIndentGuide.background": "` +
  lighterBackground +
  `70",
      "editorInfo.foreground": "` +
  xltAccent1 +
  `70",
      "editorLineNumber.activeForeground": "` +
  xltAccent1 +
  `",
      "editorLineNumber.foreground": "` +
  darkerAccent1 +
  `c0",
      "editorLink.activeForeground": "` +
  ltForeground +
  `",
      "editorMarkerNavigation.background": "` +
  ltForeground +
  `05",
      "editorOverviewRuler.border": "` +
  dkBackground +
  `",
      "editorOverviewRuler.errorForeground": "` +
  accent3 +
  `40",
      "editorOverviewRuler.findMatchForeground": "` +
  darkerAccent1 +
  `",
      "editorOverviewRuler.infoForeground": "` +
  xltAccent1 +
  `40",
      "editorOverviewRuler.warningForeground": "` +
  accent2 +
  `70",
      "editorRuler.foreground": "` +
  lighterBackground +
  `",
      "editorSuggestWidget.background": "` +
  dkBackground +
  `",
      "editorSuggestWidget.border": "` +
  xltForeground +
  `10",
      "editorSuggestWidget.foreground": "` +
  ltForeground +
  `",
      "editorSuggestWidget.highlightForeground": "` +
  accent2 +
  `",
      "editorSuggestWidget.selectedBackground": "` +
  darkerAccent1 +
  `20",
      "editorWarning.foreground": "` +
  darkerAccent2 +
  `",
      "editorWhitespace.foreground": "` +
  ltForeground +
  `40",
      "editorWidget.background": "` +
  dkBackground +
  `",
      "editorWidget.border": "` +
  accent2 +
  `",
      "editorWidget.resizeBorder": "` +
  darkerAccent1 +
  `",
      "extensionButton.prominentBackground": "` +
  darkerAccent2 +
  `90",
      "extensionButton.prominentHoverBackground": "` +
  accent3 +
  `",
      "focusBorder": "` +
  xltForeground +
  `00",
      "gitDecoration.conflictingResourceForeground": "` +
  accent2 +
  `",
      "gitDecoration.deletedResourceForeground": "` +
  accent3 +
  `",
      "gitDecoration.ignoredResourceForeground": "` +
  darkerAccent1 +
  `",
      "gitDecoration.modifiedResourceForeground": "` +
  lighterAccent1 +
  `",
      "gitDecoration.untrackedResourceForeground": "` +
  xltAccent1 +
  `",
      "input.background": "` +
  almostDkBackground +
  `",
      "input.border": "` +
  xltForeground +
  `10",
      "input.foreground": "` +
  ltForeground +
  `",
      "input.placeholderForeground": "` +
  ltForeground +
  `60",
      "inputOption.activeBackground": "` +
  ltForeground +
  `30",
      "inputOption.activeBorder": "` +
  ltForeground +
  `30",
      "inputValidation.errorBorder": "` +
  accent3 +
  `50",
      "inputValidation.infoBorder": "` +
  xltAccent1 +
  `50",
      "inputValidation.warningBorder": "` +
  accent2 +
  `50",
      "list.activeSelectionBackground": "` +
  dkBackground +
  `",
      "list.activeSelectionForeground": "` +
  darkerAccent1 +
  `",
      "list.focusBackground": "` +
  almostDkBackground +
  `",
      "list.focusForeground": "` +
  xltAccent1 +
  `",
      "list.highlightForeground": "` +
  darkerAccent1 +
  `",
      "list.hoverBackground": "` +
  lighterBackground +
  `",
      "list.hoverForeground": "` +
  xltForeground +
  `",
      "list.inactiveSelectionBackground": "` +
  dkBackground +
  `30",
      "list.inactiveSelectionForeground": "` +
  darkerAccent1 +
  `",
      "list.warningForeground": "` +
  accent2 +
  `",
      "listFilterWidget.background": "` +
  dkBackground +
  `30",
      "listFilterWidget.noMatchesOutline": "` +
  dkBackground +
  `30",
      "listFilterWidget.outline": "` +
  dkBackground +
  `30",
      "menu.background": "` +
  dkBackground +
  `f8",
      "menu.border": "` +
  darkerAccent1 +
  `50",
      "menu.foreground": "` +
  ltForeground +
  `",
      "menu.selectionBackground": "` +
  almostDkBackground +
  `",
      "menu.selectionBorder": "` +
  dkBackground +
  `30",
      "menu.selectionForeground": "` +
  ltForeground +
  `",
      "menu.separatorBackground": "` +
  ltForeground +
  `",
      "menubar.selectionBackground": "` +
  almostDkBackground +
  `",
      "menubar.selectionBorder": "` +
  darkerAccent1 +
  `50",
      "menubar.selectionForeground": "` +
  ltForeground +
  `",
      "minimap.background": "` +
  dkBackground +
  `",
      "minimapGutter.addedBackground": "` +
  accent3 +
  `",
      "minimapGutter.deletedBackground": "` +
  accent2 +
  `",
      "minimapGutter.modifiedBackground": "` +
  darkerAccent2 +
  `",
      "minimapSlider.activeBackground": "` +
  darkerAccent2 +
  `b0",
      "minimapSlider.background": "` +
  darkerAccent2 +
  `80",
      "minimapSlider.hoverBackground": "` +
  darkerAccent2 +
  `a0",
      "notificationLink.foreground": "` +
  darkerAccent1 +
  `",
      "notifications.background": "` +
  dkBackground +
  `",
      "notifications.foreground": "` +
  ltForeground +
  `",
      "panel.background": "` +
  dkBackground +
  `",
      "panel.border": "` +
  dkBackground +
  `60",
      "panelTitle.activeBorder": "` +
  darkerAccent1 +
  `",
      "panelTitle.activeForeground": "` +
  xltForeground +
  `",
      "panelTitle.inactiveForeground": "` +
  ltForeground +
  `",
      "peekView.border": "` +
  dkBackground +
  `30",
      "peekViewEditor.background": "` +
  ltForeground +
  `05",
      "peekViewEditor.matchHighlightBackground": "` +
  darkerAccent1 +
  `50",
      "peekViewEditorGutter.background": "` +
  ltForeground +
  `05",
      "peekViewResult.background": "` +
  ltForeground +
  `05",
      "peekViewResult.matchHighlightBackground": "` +
  darkerAccent1 +
  `50",
      "peekViewResult.selectionBackground": "` +
  darkerAccent1 +
  `70",
      "peekViewTitle.background": "` +
  ltForeground +
  `05",
      "peekViewTitleDescription.foreground": "` +
  ltForeground +
  `60",
      "pickerGroup.foreground": "` +
  darkerAccent1 +
  `",
      "progressBar.background": "` +
  darkerAccent1 +
  `",
      "scrollbar.shadow": "` +
  dkBackground +
  `00",
      "scrollbarSlider.activeBackground": "` +
  darkerAccent1 +
  `cc",
      "scrollbarSlider.background": "` +
  darkerAccent1 +
  `bb",
      "scrollbarSlider.hoverBackground": "` +
  darkerAccent1 +
  `ee",
      "selection.background": "` +
  darkerAccent1 +
  `",
      "settings.checkboxBackground": "` +
  dkBackground +
  `",
      "settings.checkboxForeground": "` +
  ltForeground +
  `",
      "settings.dropdownBackground": "` +
  dkBackground +
  `",
      "settings.dropdownForeground": "` +
  ltForeground +
  `",
      "settings.headerForeground": "` +
  darkerAccent1 +
  `",
      "settings.modifiedItemIndicator": "` +
  darkerAccent1 +
  `",
      "settings.numberInputBackground": "` +
  dkBackground +
  `",
      "settings.numberInputForeground": "` +
  ltForeground +
  `",
      "settings.textInputBackground": "` +
  dkBackground +
  `",
      "settings.textInputForeground": "` +
  ltForeground +
  `",
      "sideBar.background": "` +
  dkBackground +
  `",
      "sideBar.border": "` +
  darkerAccent1 +
  `50",
      "sideBar.foreground": "` +
  xltAccent1 +
  `",
      "sideBarSectionHeader.background": "` +
  dkBackground +
  `",
      "sideBarSectionHeader.border": "` +
  dkBackground +
  `60",
      "sideBarSectionHeader.foreground": "` +
  xltAccent1 +
  `",
      "sideBarTitle.foreground": "` +
  ltForeground +
  `",
      "statusBar.background": "` +
  statusBarBackground +
  `",
      "statusBar.border": "` +
  dkBackground +
  `60",
      "statusBar.debuggingBackground": "` +
  accent2 +
  `",
      "statusBar.debuggingForeground": "` +
  xltForeground +
  `",
      "statusBar.foreground": "` +
  statusBarForeground +
  `",
      "statusBar.noFolderBackground": "` +
  dkBackground +
  `",
      "statusBarItem.hoverBackground": "` +
  darkerAccent1 +
  `20",
      "statusBarItem.remoteBackground": "` +
  darkerAccent1 +
  `",
      "statusBarItem.remoteForeground": "` +
  dkBackground +
  `",
      "tab.activeBackground": "` +
  darkerAccent1 +
  `50",
      "tab.activeBorder": "` +
  darkerAccent1 +
  `",
      "tab.activeForeground": "` +
  xltForeground +
  `",
      "tab.activeModifiedBorder": "` +
  darkerAccent1 +
  `",
      "tab.border": "` +
  dkBackground +
  `",
      "tab.inactiveBackground": "` +
  darkerAccent1 +
  `20",
      "tab.inactiveForeground": "` +
  ltForeground +
  `af",
      "tab.unfocusedActiveBorder": "` +
  darkerAccent1 +
  `",
      "tab.unfocusedActiveBackground": "` +
  darkerAccent1 +
  `40",
      "tab.unfocusedActiveForeground": "` +
  ltForeground +
  `",
      "tab.unfocusedInactiveBackground": "` +
  darkerAccent1 +
  `10",
      "tab.unfocusedInactiveForeground": "` +
  ltForeground +
  `7f",
      "terminal.ansiBlack": "` +
  dkBackground +
  `",
      "terminal.ansiBlue": "` +
  xltAccent1 +
  `",
      "terminal.ansiBrightBlack": "` +
  darkerAccent1 +
  `",
      "terminal.ansiBrightBlue": "` +
  xltAccent1 +
  `",
      "terminal.ansiBrightCyan": "` +
  xxltAccent1 +
  `",
      "terminal.ansiBrightGreen": "` +
  darkerAccent2 +
  `",
      "terminal.ansiBrightMagenta": "` +
  accent2 +
  `",
      "terminal.ansiBrightRed": "` +
  accent3 +
  `",
      "terminal.ansiBrightWhite": "` +
  xltForeground +
  `",
      "terminal.ansiBrightYellow": "` +
  accent2 +
  `",
      "terminal.ansiCyan": "` +
  xxltAccent1 +
  `",
      "terminal.ansiGreen": "` +
  darkerAccent2 +
  `",
      "terminal.ansiMagenta": "` +
  accent2 +
  `",
      "terminal.ansiRed": "` +
  accent3 +
  `",
      "terminal.ansiWhite": "` +
  xltForeground +
  `",
      "terminal.ansiYellow": "` +
  accent2 +
  `",
      "terminalCursor.background": "` +
  dkBackground +
  `",
      "terminalCursor.foreground": "` +
  accent2 +
  `",
      "textLink.activeForeground": "` +
  ltForeground +
  `",
      "textLink.foreground": "` +
  darkerAccent1 +
  `",
      "titleBar.activeBackground": "` +
  dkBackground +
  `",
      "titleBar.activeForeground": "` +
  ltForeground +
  `",
      "titleBar.border": "` +
  dkBackground +
  `60",
      "titleBar.inactiveBackground": "` +
  dkBackground +
  `",
      "titleBar.inactiveForeground": "` +
  darkerAccent1 +
  `",
      "tree.indentGuidesStroke": "` +
  lighterBackground +
  `",
      "widget.shadow": "` +
  dkBackground +
  `30",
    },
    "tokenColors": [
      {
        "scope": [
          "variable",
          "string constant.other.placeholder",
          "invalid.deprecated",
          "keyword",
          "storage.type",
          "storage.modifier"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "variable",
          "string constant.other.placeholder",
          "entity.name.function",
          "punctuation.definition.interpolation.end.bracket.curly.scss",
          "punctuation.definition.interpolation.begin.bracket.curly.scss"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "punctuation.definition.interpolation.end.bracket.curly.scss",
          "punctuation.definition.interpolation.begin.bracket.curly.scss"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent2 +
  `"
        }
      },
      {
        "scope": [
          "constant.other.php"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "constant.other.color"
        ],
        "settings": {
          "foreground": "` +
  xltForeground +
  `"
        }
      },
      {
        "scope": [
          "invalid",
          "invalid.illegal"
        ],
        "settings": {
          "foreground": "` +
  accent3 +
  `"
        }
      },
      {
        "scope": [
          "Keyword",
          "Storage"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "keyword.control",
          "constant.other.color",
          "punctuation.definition.tag",
          "punctuation",
          "punctuation.separator.inheritance.php",
          "punctuation.definition.tag.html",
          "punctuation.section.embedded",
          "keyword.other.template",
          "keyword.other.substitution",
          "entity.name.tag.reference.scss"
        ],
        "settings": {
          "foreground": "#A7A8AF"
        }
      },
      {
        "scope": [
          "punctuation.definition.tag.begin.html",
          "punctuation.definition.tag.end.html",
          "entity.name.type.module.js"
        ],
        "settings": {
          "foreground": "` +
  lighterAccent1 +
  `"
        }
      },
      {
        "scope": [
          "keyword.control.at-rule",
          "punctuation.terminator.rule.css",
          "keyword.control.operator",
          "punctuation.definition.entity.css",
          "keyword.operator.assignment.js",
          "punctuation.separator.comma.js",
          "punctuation.definition.string.begin.js",
          "punctuation.definition.string.end.js",
          "punctuation.definition.binding-pattern.object.js"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "punctuation.definition",
          "string.quoted.single.scss"
        ],
        "settings": {
          "foreground": "#A7A8AF"
        }
      },
      {
        "scope": [
          "keyword.control"
        ],
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope": [
          "comment.line.scss",
          "comment.line.double-slash.js",
          "punctuation.definition.comment.scss",
          "punctuation.definition.comment.js",
          "punctuation.definition.comment.html",
          "comment.block.html"
        ],
        "settings": {
          "foreground": "#6D6F7C"
        }
      },
      {
        "scope": [
          "text.html.derivative"
        ],
        "settings": {
          "foreground": "#A7A8AF"
        }
      },
      {
        "scope": [
          "entity.name.tag",
          "meta.tag.sgml",
          "markup.deleted.git_gutter"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "entity.name.tag.html"
        ],
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope": [
          "variable.parameter.js",
          "variable.parameter.keyframe-list.css"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "variable.other.object.js",
          "storage.type.js",
          "string.other.link.title.markdown",
          "variable.other.readwrite.js",
          "variable.other.property.js"
        ],
        "settings": {
          "foreground": "` +
  lighterAccent1 +
  `",
          "fontStyle": ""
        }
      },
      {
        "scope": [
          "string",
          "string.quoted.double.html",
          "variable.other.constant.js",
          "variable.other.object.property.js",
          "string.quoted.double.json",
          "markup.fenced_code.block.markdown",
          "markup.inline.raw.string.markdown",
          "variable.function",
          "keyword.other.special-method",
          "entity.name.function",
          "markup.bold",
          "markup.bold.markdown",
          "markup.italic.markdown",
          "meta.class-method.js entity.name.function.js",
          "variable.function.constructor",
          "entity.name.tag.other.html",
          "entity.name.tag.block.any.html",
          "source.sass keyword.control"
        ],
        "settings": {
          "foreground": "` +
  xltAccent1 +
  `"
        }
      },
      {
        "scope": [
          "punctuation.definition.string.begin.html",
          "punctuation.definition.string.end.html"
        ],
        "settings": {
          "foreground": "` +
  xxltAccent1 +
  `"
        }
      },
      {
        "scope": [
          "support.other.variable",
          "string.other.link",
          "markup.table"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "constant.numeric",
          "constant.language",
          "constant.character",
          "constant.escape",
          "keyword.other.unit",
          "keyword.other",
          "punctuation.separator.key-value.html"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "variable.parameter.function.language.special",
          "variable.parameter"
        ],
        "settings": {
          "foreground": "` +
  accent3 +
  `"
        }
      },
      {
        "scope": [
          "constant.other.symbol",
          "constant.other.key",
          "entity.other.inherited-class",
          "keyword.other.unit",
          "markup.heading",
          "markup.inserted.git_gutter",
          "meta.group.braces.curly",
          "constant.other.object.key.js",
          "string.unquoted.label.js"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent2 +
  `",
          "fontStyle": ""
        }
      },
      {
        "scope": [
          "entity.name",
          "support.type",
          "support.class",
          "support.orther.namespace.use.php",
          "meta.use.php",
          "support.other.namespace.php",
          "markup.changed.git_gutter",
          "support.type.sys-types",
          "entity.other.attribute-name.html"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "support.type"
        ],
        "settings": {
          "foreground": "#B2CCD6"
        }
      },
      {
        "scope": [
          "source.css support.type.property-name",
          "source.sass support.type.property-name",
          "source.scss support.type.property-name",
          "source.less support.type.property-name",
          "source.stylus support.type.property-name",
          "source.postcss support.type.property-name"
        ],
        "settings": {
          "foreground": "` +
  lighterAccent1 +
  `"
        }
      },
      {
        "scope": [
          "entity.name.module.js",
          "variable.import.parameter.js",
          "variable.other.class.js"
        ],
        "settings": {
          "foreground": "` +
  accent3 +
  `"
        }
      },
      {
        "scope": [
          "entity.name.method.js",
          "tag.decorator.js entity.name.tag.js",
          "tag.decorator.js punctuation.definition.tag.js"
        ],
        "settings": {
          "foreground": "` +
  xltAccent1 +
  `",
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "entity.other.attribute-name",
          "support.function"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "entity.other.attribute-name.id",
          "entity.other.attribute-name.class",
          "entity.other.attribute-name.pseudo-class",
          "entity.name.tag.css",
          "keyword.control.conditional.js",
          "support.constant",
          "entity.other.attribute-name.html",
          "string.quoted.single.js",
          "storage.type.function.js",
          "meta.object-literal.key"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "source.scss keyword.control"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "markup.inserted"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent2 +
  `"
        }
      },
      {
        "scope": [
          "markup.deleted"
        ],
        "settings": {
          "foreground": "` +
  accent3 +
  `"
        }
      },
      {
        "scope": [
          "markup.changed"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "string.regexp"
        ],
        "settings": {
          "foreground": "` +
  xxltAccent1 +
  `"
        }
      },
      {
        "scope": [
          "constant.character.escape"
        ],
        "settings": {
          "foreground": "` +
  xxltAccent1 +
  `"
        }
      },
      {
        "scope": [
          "*url*",
          "*link*",
          "*uri*"
        ],
        "settings": {
          "fontStyle": "underline"
        }
      },
      {
        "scope": [
          "source.js constant.other.object.key.js string.unquoted.label.js"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `",
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "support.type.property-name.json"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "text.html.markdown",
          "punctuation.definition.list_item.markdown"
        ],
        "settings": {
          "foreground": "` +
  ltForeground +
  `"
        }
      },
      {
        "scope": [
          "text.html.markdown markup.inline.raw.markdown"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "text.html.markdown markup.inline.raw.markdown",
          "punctuation.definition.raw.markdown"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent1 +
  `50"
        }
      },
      {
        "scope": [
          "text.html.markdown meta.dummy.line-break"
        ],
        "settings": {}
      },
      {
        "scope": [
          "markdown.heading",
          "markup.heading | markup.heading entity.name",
          "markup.heading.markdown punctuation.definition.heading.markdown",
          "entity.name.section.markdown"
        ],
        "settings": {
          "foreground": "` +
  lighterAccent1 +
  `",
          "fontStyle": "bold"
        }
      },
      {
        "scope": [
          "markup.underline"
        ],
        "settings": {
          "foreground": "` +
  xltAccent1 +
  `",
          "fontStyle": "underline"
        }
      },
      {
        "scope": [
          "markup.strike"
        ],
        "settings": {
          "fontStyle": ""
        }
      },
      {
        "scope": [
          "markup.quote punctuation.definition.blockquote.markdown"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent1 +
  `50"
        }
      },
      {
        "scope": [
          "markup.quote"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "string.other.link.description.title.markdown"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "constant.other.reference.link.markdown"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "markup.raw.block"
        ],
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": [
          "punctuation.definition.raw.markdown",
          "punctuation.definition.markdown"
        ],
        "settings": {
          "foreground": "` +
  xxltAccent1 +
  `"
        }
      },
      {
        "scope": [
          "variable.language.fenced.markdown"
        ],
        "settings": {
          "foreground": "` +
  darkerAccent1 +
  `"
        }
      },
      {
        "scope": [
          "meta.separator"
        ],
        "settings": {
          "foreground": "#A7A8AF",
          "fontStyle": "bold"
        }
      },
      {
        "scope": "token.info-token",
        "settings": {
          "foreground": "` +
  darkerAccent1 +
  `"
        }
      },
      {
        "scope": "token.warn-token",
        "settings": {
          "foreground": "` +
  accent2 +
  `"
        }
      },
      {
        "scope": "token.error-token",
        "settings": {
          "foreground": "#FF293B"
        }
      },
      {
        "scope": "token.debug-token",
        "settings": {
          "foreground": "` +
  xxltAccent1 +
  `"
        }
      }
    ]
}`;

  // Show result
  document.getElementById("resultContainer").style.display = "block";

});
