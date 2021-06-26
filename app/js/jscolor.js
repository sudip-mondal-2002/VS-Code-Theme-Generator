(function(global, factory) { "use strict"; if (typeof module === "object" && typeof module.exports === "object") { module.exports = global.document ? factory(global) : function(win) { if (!win.document) { throw new Error("jscolor needs a window with document") } return factory(win) }; return }
    factory(global) })(typeof window !== "undefined" ? window : this, function(window) { "use strict"; var jscolor = function() { var jsc = { initialized: false, instances: [], readyQueue: [], register: function() { if (typeof window !== "undefined" && window.document) { window.document.addEventListener("DOMContentLoaded", jsc.pub.init, false) } }, installBySelector: function(selector, rootNode) { rootNode = rootNode ? jsc.node(rootNode) : window.document; if (!rootNode) { throw new Error("Missing root node") } var elms = rootNode.querySelectorAll(selector); var matchClass = new RegExp("(^|\\s)(" + jsc.pub.lookupClass + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i"); for (var i = 0; i < elms.length; i += 1) { if (elms[i].jscolor && elms[i].jscolor instanceof jsc.pub) { continue } if (elms[i].type !== undefined && elms[i].type.toLowerCase() == "color" && jsc.isColorAttrSupported) { continue } var dataOpts, m; if ((dataOpts = jsc.getDataAttr(elms[i], "jscolor")) !== null || elms[i].className && (m = elms[i].className.match(matchClass))) { var targetElm = elms[i]; var optsStr = ""; if (dataOpts !== null) { optsStr = dataOpts } else if (m) { console.warn('Installation using class name is DEPRECATED. Use data-jscolor="" attribute instead.' + jsc.docsRef); if (m[4]) { optsStr = m[4] } } var opts = null; if (optsStr.trim()) { try { opts = jsc.parseOptionsStr(optsStr) } catch (e) { console.warn(e + "\n" + optsStr) } } try { new jsc.pub(targetElm, opts) } catch (e) { console.warn(e) } } } }, parseOptionsStr: function(str) { var opts = null; try { opts = JSON.parse(str) } catch (eParse) { if (!jsc.pub.looseJSON) { throw new Error("Could not parse jscolor options as JSON: " + eParse) } else { try { opts = new Function("var opts = (" + str + '); return typeof opts === "object" ? opts : {};')() } catch (eEval) { throw new Error("Could not evaluate jscolor options: " + eEval) } } } return opts }, getInstances: function() { var inst = []; for (var i = 0; i < jsc.instances.length; i += 1) { if (jsc.instances[i] && jsc.instances[i].targetElement) { inst.push(jsc.instances[i]) } } return inst }, createEl: function(tagName) { var el = window.document.createElement(tagName);
                jsc.setData(el, "gui", true); return el }, node: function(nodeOrSelector) { if (!nodeOrSelector) { return null } if (typeof nodeOrSelector === "string") { var sel = nodeOrSelector; var el = null; try { el = window.document.querySelector(sel) } catch (e) { console.warn(e); return null } if (!el) { console.warn("No element matches the selector: %s", sel) } return el } if (jsc.isNode(nodeOrSelector)) { return nodeOrSelector }
                console.warn("Invalid node of type %s: %s", typeof nodeOrSelector, nodeOrSelector); return null }, isNode: function(val) { if (typeof Node === "object") { return val instanceof Node } return val && typeof val === "object" && typeof val.nodeType === "number" && typeof val.nodeName === "string" }, nodeName: function(node) { if (node && node.nodeName) { return node.nodeName.toLowerCase() } return false }, removeChildren: function(node) { while (node.firstChild) { node.removeChild(node.firstChild) } }, isTextInput: function(el) { return el && jsc.nodeName(el) === "input" && el.type.toLowerCase() === "text" }, isButton: function(el) { if (!el) { return false } var n = jsc.nodeName(el); return n === "button" || n === "input" && ["button", "submit", "reset"].indexOf(el.type.toLowerCase()) > -1 }, isButtonEmpty: function(el) { switch (jsc.nodeName(el)) {
                    case "input":
                        return !el.value || el.value.trim() === "";
                    case "button":
                        return el.textContent.trim() === "" } return null }, isPassiveEventSupported: function() { var supported = false; try { var opts = Object.defineProperty({}, "passive", { get: function() { supported = true } });
                    window.addEventListener("testPassive", null, opts);
                    window.removeEventListener("testPassive", null, opts) } catch (e) {} return supported }(), isColorAttrSupported: function() { var elm = window.document.createElement("input"); if (elm.setAttribute) { elm.setAttribute("type", "color"); if (elm.type.toLowerCase() == "color") { return true } } return false }(), dataProp: "_data_jscolor", setData: function() { var obj = arguments[0]; if (arguments.length === 3) { var data = obj.hasOwnProperty(jsc.dataProp) ? obj[jsc.dataProp] : obj[jsc.dataProp] = {}; var prop = arguments[1]; var value = arguments[2];
                    data[prop] = value; return true } else if (arguments.length === 2 && typeof arguments[1] === "object") { var data = obj.hasOwnProperty(jsc.dataProp) ? obj[jsc.dataProp] : obj[jsc.dataProp] = {}; var map = arguments[1]; for (var prop in map) { if (map.hasOwnProperty(prop)) { data[prop] = map[prop] } } return true } throw new Error("Invalid arguments") }, removeData: function() { var obj = arguments[0]; if (!obj.hasOwnProperty(jsc.dataProp)) { return true } for (var i = 1; i < arguments.length; i += 1) { var prop = arguments[i];
                    delete obj[jsc.dataProp][prop] } return true }, getData: function(obj, prop, setDefault) { if (!obj.hasOwnProperty(jsc.dataProp)) { if (setDefault !== undefined) { obj[jsc.dataProp] = {} } else { return undefined } } var data = obj[jsc.dataProp]; if (!data.hasOwnProperty(prop) && setDefault !== undefined) { data[prop] = setDefault } return data[prop] }, getDataAttr: function(el, name) { var attrName = "data-" + name; var attrValue = el.getAttribute(attrName); return attrValue }, setDataAttr: function(el, name, value) { var attrName = "data-" + name;
                el.setAttribute(attrName, value) }, _attachedGroupEvents: {}, attachGroupEvent: function(groupName, el, evnt, func) { if (!jsc._attachedGroupEvents.hasOwnProperty(groupName)) { jsc._attachedGroupEvents[groupName] = [] }
                jsc._attachedGroupEvents[groupName].push([el, evnt, func]);
                el.addEventListener(evnt, func, false) }, detachGroupEvents: function(groupName) { if (jsc._attachedGroupEvents.hasOwnProperty(groupName)) { for (var i = 0; i < jsc._attachedGroupEvents[groupName].length; i += 1) { var evt = jsc._attachedGroupEvents[groupName][i];
                        evt[0].removeEventListener(evt[1], evt[2], false) }
                    delete jsc._attachedGroupEvents[groupName] } }, preventDefault: function(e) { if (e.preventDefault) { e.preventDefault() }
                e.returnValue = false }, captureTarget: function(target) { if (target.setCapture) { jsc._capturedTarget = target;
                    jsc._capturedTarget.setCapture() } }, releaseTarget: function() { if (jsc._capturedTarget) { jsc._capturedTarget.releaseCapture();
                    jsc._capturedTarget = null } }, triggerEvent: function(el, eventName, bubbles, cancelable) { if (!el) { return } var ev = null; if (typeof Event === "function") { ev = new Event(eventName, { bubbles: bubbles, cancelable: cancelable }) } else { ev = window.document.createEvent("Event");
                    ev.initEvent(eventName, bubbles, cancelable) } if (!ev) { return false }
                jsc.setData(ev, "internal", true);
                el.dispatchEvent(ev); return true }, triggerInputEvent: function(el, eventName, bubbles, cancelable) { if (!el) { return } if (jsc.isTextInput(el)) { jsc.triggerEvent(el, eventName, bubbles, cancelable) } }, eventKey: function(ev) { var keys = { 9: "Tab", 13: "Enter", 27: "Escape" }; if (typeof ev.code === "string") { return ev.code } else if (ev.keyCode !== undefined && keys.hasOwnProperty(ev.keyCode)) { return keys[ev.keyCode] } return null }, strList: function(str) { if (!str) { return [] } return str.replace(/^\s+|\s+$/g, "").split(/\s+/) }, hasClass: function(elm, className) { if (!className) { return false } if (elm.classList !== undefined) { return elm.classList.contains(className) } return -1 != (" " + elm.className.replace(/\s+/g, " ") + " ").indexOf(" " + className + " ") }, addClass: function(elm, className) { var classNames = jsc.strList(className); if (elm.classList !== undefined) { for (var i = 0; i < classNames.length; i += 1) { elm.classList.add(classNames[i]) } return } for (var i = 0; i < classNames.length; i += 1) { if (!jsc.hasClass(elm, classNames[i])) { elm.className += (elm.className ? " " : "") + classNames[i] } } }, removeClass: function(elm, className) { var classNames = jsc.strList(className); if (elm.classList !== undefined) { for (var i = 0; i < classNames.length; i += 1) { elm.classList.remove(classNames[i]) } return } for (var i = 0; i < classNames.length; i += 1) { var repl = new RegExp("^\\s*" + classNames[i] + "\\s*|" + "\\s*" + classNames[i] + "\\s*$|" + "\\s+" + classNames[i] + "(\\s+)", "g");
                    elm.className = elm.className.replace(repl, "$1") } }, getCompStyle: function(elm) { var compStyle = window.getComputedStyle ? window.getComputedStyle(elm) : elm.currentStyle; if (!compStyle) { return {} } return compStyle }, setStyle: function(elm, styles, important, reversible) { var priority = important ? "important" : ""; var origStyle = null; for (var prop in styles) { if (styles.hasOwnProperty(prop)) { var setVal = null; if (styles[prop] === null) { if (!origStyle) { origStyle = jsc.getData(elm, "origStyle") } if (origStyle && origStyle.hasOwnProperty(prop)) { setVal = origStyle[prop] } } else { if (reversible) { if (!origStyle) { origStyle = jsc.getData(elm, "origStyle", {}) } if (!origStyle.hasOwnProperty(prop)) { origStyle[prop] = elm.style[prop] } }
                            setVal = styles[prop] } if (setVal !== null) { elm.style.setProperty(prop, setVal, priority) } } } }, hexColor: function(r, g, b) { return "#" + (("0" + Math.round(r).toString(16)).substr(-2) + ("0" + Math.round(g).toString(16)).substr(-2) + ("0" + Math.round(b).toString(16)).substr(-2)).toUpperCase() }, hexaColor: function(r, g, b, a) { return "#" + (("0" + Math.round(r).toString(16)).substr(-2) + ("0" + Math.round(g).toString(16)).substr(-2) + ("0" + Math.round(b).toString(16)).substr(-2) + ("0" + Math.round(a * 255).toString(16)).substr(-2)).toUpperCase() }, rgbColor: function(r, g, b) { return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")" }, rgbaColor: function(r, g, b, a) { return "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + Math.round((a === undefined || a === null ? 1 : a) * 100) / 100 + ")" }, linearGradient: function() {
                function getFuncName() { var stdName = "linear-gradient"; var prefixes = ["", "-webkit-", "-moz-", "-o-", "-ms-"]; var helper = window.document.createElement("div"); for (var i = 0; i < prefixes.length; i += 1) { var tryFunc = prefixes[i] + stdName; var tryVal = tryFunc + "(to right, rgba(0,0,0,0), rgba(0,0,0,0))";
                        helper.style.background = tryVal; if (helper.style.background) { return tryFunc } } return stdName } var funcName = getFuncName(); return function() { return funcName + "(" + Array.prototype.join.call(arguments, ", ") + ")" } }(), setBorderRadius: function(elm, value) { jsc.setStyle(elm, { "border-radius": value || "0" }) }, setBoxShadow: function(elm, value) { jsc.setStyle(elm, { "box-shadow": value || "none" }) }, getElementPos: function(e, relativeToViewport) { var x = 0,
                    y = 0; var rect = e.getBoundingClientRect();
                x = rect.left;
                y = rect.top; if (!relativeToViewport) { var viewPos = jsc.getViewPos();
                    x += viewPos[0];
                    y += viewPos[1] } return [x, y] }, getElementSize: function(e) { return [e.offsetWidth, e.offsetHeight] }, getAbsPointerPos: function(e) { var x = 0,
                    y = 0; if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) { x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY } else if (typeof e.clientX === "number") { x = e.clientX;
                    y = e.clientY } return { x: x, y: y } }, getRelPointerPos: function(e) { var target = e.target || e.srcElement; var targetRect = target.getBoundingClientRect(); var x = 0,
                    y = 0; var clientX = 0,
                    clientY = 0; if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) { clientX = e.changedTouches[0].clientX;
                    clientY = e.changedTouches[0].clientY } else if (typeof e.clientX === "number") { clientX = e.clientX;
                    clientY = e.clientY }
                x = clientX - targetRect.left;
                y = clientY - targetRect.top; return { x: x, y: y } }, getViewPos: function() { var doc = window.document.documentElement; return [(window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0), (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)] }, getViewSize: function() { var doc = window.document.documentElement; return [window.innerWidth || doc.clientWidth, window.innerHeight || doc.clientHeight] }, RGB_HSV: function(r, g, b) { r /= 255;
                g /= 255;
                b /= 255; var n = Math.min(Math.min(r, g), b); var v = Math.max(Math.max(r, g), b); var m = v - n; if (m === 0) { return [null, 0, 100 * v] } var h = r === n ? 3 + (b - g) / m : g === n ? 5 + (r - b) / m : 1 + (g - r) / m; return [60 * (h === 6 ? 0 : h), 100 * (m / v), 100 * v] }, HSV_RGB: function(h, s, v) { var u = 255 * (v / 100); if (h === null) { return [u, u, u] }
                h /= 60;
                s /= 100; var i = Math.floor(h); var f = i % 2 ? h - i : 1 - (h - i); var m = u * (1 - s); var n = u * (1 - s * f); switch (i) {
                    case 6:
                    case 0:
                        return [u, n, m];
                    case 1:
                        return [n, u, m];
                    case 2:
                        return [m, u, n];
                    case 3:
                        return [m, n, u];
                    case 4:
                        return [n, m, u];
                    case 5:
                        return [u, m, n] } }, parseColorString: function(str) { var ret = { rgba: null, format: null }; var m; if (m = str.match(/^\W*([0-9A-F]{3,8})\W*$/i)) { if (m[1].length === 8) { ret.format = "hexa";
                        ret.rgba = [parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16), parseInt(m[1].substr(6, 2), 16) / 255] } else if (m[1].length === 6) { ret.format = "hex";
                        ret.rgba = [parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16), null] } else if (m[1].length === 3) { ret.format = "hex";
                        ret.rgba = [parseInt(m[1].charAt(0) + m[1].charAt(0), 16), parseInt(m[1].charAt(1) + m[1].charAt(1), 16), parseInt(m[1].charAt(2) + m[1].charAt(2), 16), null] } else { return false } return ret } if (m = str.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) { var par = m[1].split(","); var re = /^\s*(\d+|\d*\.\d+|\d+\.\d*)\s*$/; var mR, mG, mB, mA; if (par.length >= 3 && (mR = par[0].match(re)) && (mG = par[1].match(re)) && (mB = par[2].match(re))) { ret.format = "rgb";
                        ret.rgba = [parseFloat(mR[1]) || 0, parseFloat(mG[1]) || 0, parseFloat(mB[1]) || 0, null]; if (par.length >= 4 && (mA = par[3].match(re))) { ret.format = "rgba";
                            ret.rgba[3] = parseFloat(mA[1]) || 0 } return ret } } return false }, parsePaletteValue: function(mixed) { var vals = []; if (typeof mixed === "string") { mixed.replace(/#[0-9A-F]{3}([0-9A-F]{3})?|rgba?\(([^)]*)\)/gi, function(val) { vals.push(val) }) } else if (Array.isArray(mixed)) { vals = mixed } var colors = []; for (var i = 0; i < vals.length; i++) { var color = jsc.parseColorString(vals[i]); if (color) { colors.push(color) } } return colors }, containsTranparentColor: function(colors) { for (var i = 0; i < colors.length; i++) { var a = colors[i].rgba[3]; if (a !== null && a < 1) { return true } } return false }, isAlphaFormat: function(format) { switch (format.toLowerCase()) {
                    case "hexa":
                    case "rgba":
                        return true } return false }, scaleCanvasForHighDPR: function(canvas) { var dpr = window.devicePixelRatio || 1;
                canvas.width *= dpr;
                canvas.height *= dpr; var ctx = canvas.getContext("2d");
                ctx.scale(dpr, dpr) }, genColorPreviewCanvas: function(color, separatorPos, specWidth, scaleForHighDPR) { var sepW = Math.round(jsc.pub.previewSeparator.length); var sqSize = jsc.pub.chessboardSize; var sqColor1 = jsc.pub.chessboardColor1; var sqColor2 = jsc.pub.chessboardColor2; var cWidth = specWidth ? specWidth : sqSize * 2; var cHeight = sqSize * 2; var canvas = jsc.createEl("canvas"); var ctx = canvas.getContext("2d");
                canvas.width = cWidth;
                canvas.height = cHeight; if (scaleForHighDPR) { jsc.scaleCanvasForHighDPR(canvas) }
                ctx.fillStyle = sqColor1;
                ctx.fillRect(0, 0, cWidth, cHeight);
                ctx.fillStyle = sqColor2; for (var x = 0; x < cWidth; x += sqSize * 2) { ctx.fillRect(x, 0, sqSize, sqSize);
                    ctx.fillRect(x + sqSize, sqSize, sqSize, sqSize) } if (color) { ctx.fillStyle = color;
                    ctx.fillRect(0, 0, cWidth, cHeight) } var start = null; switch (separatorPos) {
                    case "left":
                        start = 0;
                        ctx.clearRect(0, 0, sepW / 2, cHeight); break;
                    case "right":
                        start = cWidth - sepW;
                        ctx.clearRect(cWidth - sepW / 2, 0, sepW / 2, cHeight); break } if (start !== null) { ctx.lineWidth = 1; for (var i = 0; i < jsc.pub.previewSeparator.length; i += 1) { ctx.beginPath();
                        ctx.strokeStyle = jsc.pub.previewSeparator[i];
                        ctx.moveTo(.5 + start + i, 0);
                        ctx.lineTo(.5 + start + i, cHeight);
                        ctx.stroke() } } return { canvas: canvas, width: cWidth, height: cHeight } }, genColorPreviewGradient: function(color, position, width) { var params = []; if (position && width) { params = ["to " + { left: "right", right: "left" }[position], color + " 0%", color + " " + width + "px", "rgba(0,0,0,0) " + (width + 1) + "px", "rgba(0,0,0,0) 100%"] } else { params = ["to right", color + " 0%", color + " 100%"] } return jsc.linearGradient.apply(this, params) }, redrawPosition: function() { if (!jsc.picker || !jsc.picker.owner) { return } var thisObj = jsc.picker.owner; var tp, vp; if (thisObj.fixed) { tp = jsc.getElementPos(thisObj.targetElement, true);
                    vp = [0, 0] } else { tp = jsc.getElementPos(thisObj.targetElement);
                    vp = jsc.getViewPos() } var ts = jsc.getElementSize(thisObj.targetElement); var vs = jsc.getViewSize(); var pd = jsc.getPickerDims(thisObj); var ps = [pd.borderW, pd.borderH]; var a, b, c; switch (thisObj.position.toLowerCase()) {
                    case "left":
                        a = 1;
                        b = 0;
                        c = -1; break;
                    case "right":
                        a = 1;
                        b = 0;
                        c = 1; break;
                    case "top":
                        a = 0;
                        b = 1;
                        c = -1; break;
                    default:
                        a = 0;
                        b = 1;
                        c = 1; break } var l = (ts[b] + ps[b]) / 2; if (!thisObj.smartPosition) { var pp = [tp[a], tp[b] + ts[b] - l + l * c] } else { var pp = [-vp[a] + tp[a] + ps[a] > vs[a] ? -vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ? tp[a] + ts[a] - ps[a] : tp[a] : tp[a], -vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ? -vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c] } var x = pp[a]; var y = pp[b]; var positionValue = thisObj.fixed ? "fixed" : "absolute"; var contractShadow = (pp[0] + ps[0] > tp[0] || pp[0] < tp[0] + ts[0]) && pp[1] + ps[1] < tp[1] + ts[1];
                jsc._drawPosition(thisObj, x, y, positionValue, contractShadow) }, _drawPosition: function(thisObj, x, y, positionValue, contractShadow) { var vShadow = contractShadow ? 0 : thisObj.shadowBlur;
                jsc.picker.wrap.style.position = positionValue;
                jsc.picker.wrap.style.left = x + "px";
                jsc.picker.wrap.style.top = y + "px";
                jsc.setBoxShadow(jsc.picker.boxS, thisObj.shadow ? new jsc.BoxShadow(0, vShadow, thisObj.shadowBlur, 0, thisObj.shadowColor) : null) }, getPickerDims: function(thisObj) { var w = 2 * thisObj.controlBorderWidth + thisObj.width; var h = 2 * thisObj.controlBorderWidth + thisObj.height; var sliderSpace = 2 * thisObj.controlBorderWidth + 2 * jsc.getControlPadding(thisObj) + thisObj.sliderSize; if (jsc.getSliderChannel(thisObj)) { w += sliderSpace } if (thisObj.hasAlphaChannel()) { w += sliderSpace } var pal = jsc.getPaletteDims(thisObj, w); if (pal.height) { h += pal.height + thisObj.padding } if (thisObj.closeButton) { h += 2 * thisObj.controlBorderWidth + thisObj.padding + thisObj.buttonHeight } var pW = w + 2 * thisObj.padding; var pH = h + 2 * thisObj.padding; return { contentW: w, contentH: h, paddedW: pW, paddedH: pH, borderW: pW + 2 * thisObj.borderWidth, borderH: pH + 2 * thisObj.borderWidth, palette: pal } }, getPaletteDims: function(thisObj, width) { var cols = 0,
                    rows = 0,
                    cellW = 0,
                    cellH = 0,
                    height = 0; var sampleCount = thisObj._palette ? thisObj._palette.length : 0; if (sampleCount) { cols = thisObj.paletteCols;
                    rows = cols > 0 ? Math.ceil(sampleCount / cols) : 0;
                    cellW = Math.max(1, Math.floor((width - (cols - 1) * thisObj.paletteSpacing) / cols));
                    cellH = thisObj.paletteHeight ? Math.min(thisObj.paletteHeight, cellW) : cellW } if (rows) { height = rows * cellH + (rows - 1) * thisObj.paletteSpacing } return { cols: cols, rows: rows, cellW: cellW, cellH: cellH, width: width, height: height } }, getControlPadding: function(thisObj) { return Math.max(thisObj.padding / 2, 2 * thisObj.pointerBorderWidth + thisObj.pointerThickness - thisObj.controlBorderWidth) }, getPadYChannel: function(thisObj) { switch (thisObj.mode.charAt(1).toLowerCase()) {
                    case "v":
                        return "v"; break } return "s" }, getSliderChannel: function(thisObj) { if (thisObj.mode.length > 2) { switch (thisObj.mode.charAt(2).toLowerCase()) {
                        case "s":
                            return "s"; break;
                        case "v":
                            return "v"; break } } return null }, triggerCallback: function(thisObj, prop) { if (!thisObj[prop]) { return } var callback = null; if (typeof thisObj[prop] === "string") { try { callback = new Function(thisObj[prop]) } catch (e) { console.error(e) } } else { callback = thisObj[prop] } if (callback) { callback.call(thisObj) } }, triggerGlobal: function(eventNames) { var inst = jsc.getInstances(); for (var i = 0; i < inst.length; i += 1) { inst[i].trigger(eventNames) } }, _pointerMoveEvent: { mouse: "mousemove", touch: "touchmove" }, _pointerEndEvent: { mouse: "mouseup", touch: "touchend" }, _pointerOrigin: null, _capturedTarget: null, onDocumentKeyUp: function(e) { if (["Tab", "Escape"].indexOf(jsc.eventKey(e)) !== -1) { if (jsc.picker && jsc.picker.owner) { jsc.picker.owner.tryHide() } } }, onWindowResize: function(e) { jsc.redrawPosition() }, onWindowScroll: function(e) { jsc.redrawPosition() }, onParentScroll: function(e) { if (jsc.picker && jsc.picker.owner) { jsc.picker.owner.tryHide() } }, onDocumentMouseDown: function(e) { var target = e.target || e.srcElement; if (target.jscolor && target.jscolor instanceof jsc.pub) { if (target.jscolor.showOnClick && !target.disabled) { target.jscolor.show() } } else if (jsc.getData(target, "gui")) { var control = jsc.getData(target, "control"); if (control) { jsc.onControlPointerStart(e, target, jsc.getData(target, "control"), "mouse") } } else { if (jsc.picker && jsc.picker.owner) { jsc.picker.owner.tryHide() } } }, onPickerTouchStart: function(e) { var target = e.target || e.srcElement; if (jsc.getData(target, "control")) { jsc.onControlPointerStart(e, target, jsc.getData(target, "control"), "touch") } }, onControlPointerStart: function(e, target, controlName, pointerType) { var thisObj = jsc.getData(target, "instance");
                jsc.preventDefault(e);
                jsc.captureTarget(target); var registerDragEvents = function(doc, offset) { jsc.attachGroupEvent("drag", doc, jsc._pointerMoveEvent[pointerType], jsc.onDocumentPointerMove(e, target, controlName, pointerType, offset));
                    jsc.attachGroupEvent("drag", doc, jsc._pointerEndEvent[pointerType], jsc.onDocumentPointerEnd(e, target, controlName, pointerType)) };
                registerDragEvents(window.document, [0, 0]); if (window.parent && window.frameElement) { var rect = window.frameElement.getBoundingClientRect(); var ofs = [-rect.left, -rect.top];
                    registerDragEvents(window.parent.window.document, ofs) } var abs = jsc.getAbsPointerPos(e); var rel = jsc.getRelPointerPos(e);
                jsc._pointerOrigin = { x: abs.x - rel.x, y: abs.y - rel.y }; switch (controlName) {
                    case "pad":
                        if (jsc.getSliderChannel(thisObj) === "v" && thisObj.channels.v === 0) { thisObj.fromHSVA(null, null, 100, null) }
                        jsc.setPad(thisObj, e, 0, 0); break;
                    case "sld":
                        jsc.setSld(thisObj, e, 0); break;
                    case "asld":
                        jsc.setASld(thisObj, e, 0); break }
                thisObj.trigger("input") }, onDocumentPointerMove: function(e, target, controlName, pointerType, offset) { return function(e) { var thisObj = jsc.getData(target, "instance"); switch (controlName) {
                        case "pad":
                            jsc.setPad(thisObj, e, offset[0], offset[1]); break;
                        case "sld":
                            jsc.setSld(thisObj, e, offset[1]); break;
                        case "asld":
                            jsc.setASld(thisObj, e, offset[1]); break }
                    thisObj.trigger("input") } }, onDocumentPointerEnd: function(e, target, controlName, pointerType) { return function(e) { var thisObj = jsc.getData(target, "instance");
                    jsc.detachGroupEvents("drag");
                    jsc.releaseTarget();
                    thisObj.trigger("input");
                    thisObj.trigger("change") } }, onPaletteSampleClick: function(e) { var target = e.currentTarget; var thisObj = jsc.getData(target, "instance"); var color = jsc.getData(target, "color"); if (thisObj.format.toLowerCase() === "any") { thisObj._setFormat(color.format); if (!jsc.isAlphaFormat(thisObj.getFormat())) { color.rgba[3] = 1 } } if (color.rgba[3] === null) { if (thisObj.paletteSetsAlpha === true || thisObj.paletteSetsAlpha === "auto" && thisObj._paletteHasTransparency) { color.rgba[3] = 1 } }
                thisObj.fromRGBA.apply(thisObj, color.rgba);
                thisObj.trigger("input");
                thisObj.trigger("change"); if (thisObj.hideOnPaletteClick) { thisObj.hide() } }, setPad: function(thisObj, e, ofsX, ofsY) { var pointerAbs = jsc.getAbsPointerPos(e); var x = ofsX + pointerAbs.x - jsc._pointerOrigin.x - thisObj.padding - thisObj.controlBorderWidth; var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth; var xVal = x * (360 / (thisObj.width - 1)); var yVal = 100 - y * (100 / (thisObj.height - 1)); switch (jsc.getPadYChannel(thisObj)) {
                    case "s":
                        thisObj.fromHSVA(xVal, yVal, null, null); break;
                    case "v":
                        thisObj.fromHSVA(xVal, null, yVal, null); break } }, setSld: function(thisObj, e, ofsY) { var pointerAbs = jsc.getAbsPointerPos(e); var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth; var yVal = 100 - y * (100 / (thisObj.height - 1)); switch (jsc.getSliderChannel(thisObj)) {
                    case "s":
                        thisObj.fromHSVA(null, yVal, null, null); break;
                    case "v":
                        thisObj.fromHSVA(null, null, yVal, null); break } }, setASld: function(thisObj, e, ofsY) { var pointerAbs = jsc.getAbsPointerPos(e); var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth; var yVal = 1 - y * (1 / (thisObj.height - 1)); if (yVal < 1) { var fmt = thisObj.getFormat(); if (thisObj.format.toLowerCase() === "any" && !jsc.isAlphaFormat(fmt)) { thisObj._setFormat(fmt === "hex" ? "hexa" : "rgba") } }
                thisObj.fromHSVA(null, null, null, yVal) }, createPadCanvas: function() { var ret = { elm: null, draw: null }; var canvas = jsc.createEl("canvas"); var ctx = canvas.getContext("2d"); var drawFunc = function(width, height, type) { canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height); var hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                    hGrad.addColorStop(0 / 6, "#F00");
                    hGrad.addColorStop(1 / 6, "#FF0");
                    hGrad.addColorStop(2 / 6, "#0F0");
                    hGrad.addColorStop(3 / 6, "#0FF");
                    hGrad.addColorStop(4 / 6, "#00F");
                    hGrad.addColorStop(5 / 6, "#F0F");
                    hGrad.addColorStop(6 / 6, "#F00");
                    ctx.fillStyle = hGrad;
                    ctx.fillRect(0, 0, canvas.width, canvas.height); var vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height); switch (type.toLowerCase()) {
                        case "s":
                            vGrad.addColorStop(0, "rgba(255,255,255,0)");
                            vGrad.addColorStop(1, "rgba(255,255,255,1)"); break;
                        case "v":
                            vGrad.addColorStop(0, "rgba(0,0,0,0)");
                            vGrad.addColorStop(1, "rgba(0,0,0,1)"); break }
                    ctx.fillStyle = vGrad;
                    ctx.fillRect(0, 0, canvas.width, canvas.height) };
                ret.elm = canvas;
                ret.draw = drawFunc; return ret }, createSliderGradient: function() { var ret = { elm: null, draw: null }; var canvas = jsc.createEl("canvas"); var ctx = canvas.getContext("2d"); var drawFunc = function(width, height, color1, color2) { canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height); var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    grad.addColorStop(0, color1);
                    grad.addColorStop(1, color2);
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, canvas.width, canvas.height) };
                ret.elm = canvas;
                ret.draw = drawFunc; return ret }, createASliderGradient: function() { var ret = { elm: null, draw: null }; var canvas = jsc.createEl("canvas"); var ctx = canvas.getContext("2d"); var drawFunc = function(width, height, color) { canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height); var sqSize = canvas.width / 2; var sqColor1 = jsc.pub.chessboardColor1; var sqColor2 = jsc.pub.chessboardColor2;
                    ctx.fillStyle = sqColor1;
                    ctx.fillRect(0, 0, canvas.width, canvas.height); if (sqSize > 0) { for (var y = 0; y < canvas.height; y += sqSize * 2) { ctx.fillStyle = sqColor2;
                            ctx.fillRect(0, y, sqSize, sqSize);
                            ctx.fillRect(sqSize, y + sqSize, sqSize, sqSize) } } var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    grad.addColorStop(0, color);
                    grad.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, canvas.width, canvas.height) };
                ret.elm = canvas;
                ret.draw = drawFunc; return ret }, BoxShadow: function() { var BoxShadow = function(hShadow, vShadow, blur, spread, color, inset) { this.hShadow = hShadow;
                    this.vShadow = vShadow;
                    this.blur = blur;
                    this.spread = spread;
                    this.color = color;
                    this.inset = !!inset };
                BoxShadow.prototype.toString = function() { var vals = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color]; if (this.inset) { vals.push("inset") } return vals.join(" ") }; return BoxShadow }(), flags: { leaveValue: 1 << 0, leaveAlpha: 1 << 1, leavePreview: 1 << 2 }, enumOpts: { format: ["auto", "any", "hex", "hexa", "rgb", "rgba"], previewPosition: ["left", "right"], mode: ["hsv", "hvs", "hs", "hv"], position: ["left", "right", "top", "bottom"], alphaChannel: ["auto", true, false], paletteSetsAlpha: ["auto", true, false] }, deprecatedOpts: { styleElement: "previewElement", onFineChange: "onInput", overwriteImportant: "forceStyle", closable: "closeButton", insetWidth: "controlBorderWidth", insetColor: "controlBorderColor", refine: null }, docsRef: " " + "See https://jscolor.com/docs/", pub: function(targetElement, opts) { var THIS = this; if (!opts) { opts = {} }
                this.channels = { r: 255, g: 255, b: 255, h: 0, s: 0, v: 100, a: 1 };
                this.format = "auto";
                this.value = undefined;
                this.alpha = undefined;
                this.onChange = undefined;
                this.onInput = undefined;
                this.valueElement = undefined;
                this.alphaElement = undefined;
                this.previewElement = undefined;
                this.previewPosition = "left";
                this.previewSize = 32;
                this.previewPadding = 8;
                this.required = true;
                this.hash = true;
                this.uppercase = true;
                this.forceStyle = true;
                this.width = 181;
                this.height = 101;
                this.mode = "HSV";
                this.alphaChannel = "auto";
                this.position = "bottom";
                this.smartPosition = true;
                this.showOnClick = true;
                this.hideOnLeave = true;
                this.palette = [];
                this.paletteCols = 10;
                this.paletteSetsAlpha = "auto";
                this.paletteHeight = 16;
                this.paletteSpacing = 4;
                this.hideOnPaletteClick = false;
                this.sliderSize = 16;
                this.crossSize = 8;
                this.closeButton = false;
                this.closeText = "Close";
                this.buttonColor = "rgba(0,0,0,1)";
                this.buttonHeight = 18;
                this.padding = 12;
                this.backgroundColor = "rgba(255,255,255,1)";
                this.borderWidth = 1;
                this.borderColor = "rgba(187,187,187,1)";
                this.borderRadius = 8;
                this.controlBorderWidth = 1;
                this.controlBorderColor = "rgba(187,187,187,1)";
                this.shadow = true;
                this.shadowBlur = 15;
                this.shadowColor = "rgba(0,0,0,0.2)";
                this.pointerColor = "rgba(76,76,76,1)";
                this.pointerBorderWidth = 1;
                this.pointerBorderColor = "rgba(255,255,255,1)";
                this.pointerThickness = 2;
                this.zIndex = 5e3;
                this.container = undefined;
                this.minS = 0;
                this.maxS = 100;
                this.minV = 0;
                this.maxV = 100;
                this.minA = 0;
                this.maxA = 1;
                this.option = function() { if (!arguments.length) { throw new Error("No option specified") } if (arguments.length === 1 && typeof arguments[0] === "string") { try { return getOption(arguments[0]) } catch (e) { console.warn(e) } return false } else if (arguments.length >= 2 && typeof arguments[0] === "string") { try { if (!setOption(arguments[0], arguments[1])) { return false } } catch (e) { console.warn(e); return false }
                        this.redraw();
                        this.exposeColor(); return true } else if (arguments.length === 1 && typeof arguments[0] === "object") { var opts = arguments[0]; var success = true; for (var opt in opts) { if (opts.hasOwnProperty(opt)) { try { if (!setOption(opt, opts[opt])) { success = false } } catch (e) { console.warn(e);
                                    success = false } } }
                        this.redraw();
                        this.exposeColor(); return success } throw new Error("Invalid arguments") };
                this.channel = function(name, value) { if (typeof name !== "string") { throw new Error("Invalid value for channel name: " + name) } if (value === undefined) { if (!this.channels.hasOwnProperty(name.toLowerCase())) { console.warn("Getting unknown channel: " + name); return false } return this.channels[name.toLowerCase()] } else { var res = false; switch (name.toLowerCase()) {
                            case "r":
                                res = this.fromRGBA(value, null, null, null); break;
                            case "g":
                                res = this.fromRGBA(null, value, null, null); break;
                            case "b":
                                res = this.fromRGBA(null, null, value, null); break;
                            case "h":
                                res = this.fromHSVA(value, null, null, null); break;
                            case "s":
                                res = this.fromHSVA(null, value, null, null); break;
                            case "v":
                                res = this.fromHSVA(null, null, value, null); break;
                            case "a":
                                res = this.fromHSVA(null, null, null, value); break;
                            default:
                                console.warn("Setting unknown channel: " + name); return false } if (res) { this.redraw(); return true } } return false };
                this.trigger = function(eventNames) { var evs = jsc.strList(eventNames); for (var i = 0; i < evs.length; i += 1) { var ev = evs[i].toLowerCase(); var callbackProp = null; switch (ev) {
                            case "input":
                                callbackProp = "onInput"; break;
                            case "change":
                                callbackProp = "onChange"; break } if (callbackProp) { jsc.triggerCallback(this, callbackProp) }
                        jsc.triggerInputEvent(this.valueElement, ev, true, true) } };
                this.fromHSVA = function(h, s, v, a, flags) { if (h === undefined) { h = null } if (s === undefined) { s = null } if (v === undefined) { v = null } if (a === undefined) { a = null } if (h !== null) { if (isNaN(h)) { return false }
                        this.channels.h = Math.max(0, Math.min(360, h)) } if (s !== null) { if (isNaN(s)) { return false }
                        this.channels.s = Math.max(0, Math.min(100, this.maxS, s), this.minS) } if (v !== null) { if (isNaN(v)) { return false }
                        this.channels.v = Math.max(0, Math.min(100, this.maxV, v), this.minV) } if (a !== null) { if (isNaN(a)) { return false }
                        this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, a), this.minA) : 1 } var rgb = jsc.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                    this.channels.r = rgb[0];
                    this.channels.g = rgb[1];
                    this.channels.b = rgb[2];
                    this.exposeColor(flags); return true };
                this.fromRGBA = function(r, g, b, a, flags) { if (r === undefined) { r = null } if (g === undefined) { g = null } if (b === undefined) { b = null } if (a === undefined) { a = null } if (r !== null) { if (isNaN(r)) { return false }
                        r = Math.max(0, Math.min(255, r)) } if (g !== null) { if (isNaN(g)) { return false }
                        g = Math.max(0, Math.min(255, g)) } if (b !== null) { if (isNaN(b)) { return false }
                        b = Math.max(0, Math.min(255, b)) } if (a !== null) { if (isNaN(a)) { return false }
                        this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, a), this.minA) : 1 } var hsv = jsc.RGB_HSV(r === null ? this.channels.r : r, g === null ? this.channels.g : g, b === null ? this.channels.b : b); if (hsv[0] !== null) { this.channels.h = Math.max(0, Math.min(360, hsv[0])) } if (hsv[2] !== 0) { this.channels.s = Math.max(0, this.minS, Math.min(100, this.maxS, hsv[1])) }
                    this.channels.v = Math.max(0, this.minV, Math.min(100, this.maxV, hsv[2])); var rgb = jsc.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                    this.channels.r = rgb[0];
                    this.channels.g = rgb[1];
                    this.channels.b = rgb[2];
                    this.exposeColor(flags); return true };
                this.fromHSV = function(h, s, v, flags) { console.warn("fromHSV() method is DEPRECATED. Using fromHSVA() instead." + jsc.docsRef); return this.fromHSVA(h, s, v, null, flags) };
                this.fromRGB = function(r, g, b, flags) { console.warn("fromRGB() method is DEPRECATED. Using fromRGBA() instead." + jsc.docsRef); return this.fromRGBA(r, g, b, null, flags) };
                this.fromString = function(str, flags) { if (!this.required && str.trim() === "") { this.setPreviewElementBg(null);
                        this.setValueElementValue(""); return true } var color = jsc.parseColorString(str); if (!color) { return false } if (this.format.toLowerCase() === "any") { this._setFormat(color.format); if (!jsc.isAlphaFormat(this.getFormat())) { color.rgba[3] = 1 } }
                    this.fromRGBA(color.rgba[0], color.rgba[1], color.rgba[2], color.rgba[3], flags); return true };
                this.toString = function(format) { if (format === undefined) { format = this.getFormat() } switch (format.toLowerCase()) {
                        case "hex":
                            return this.toHEXString(); break;
                        case "hexa":
                            return this.toHEXAString(); break;
                        case "rgb":
                            return this.toRGBString(); break;
                        case "rgba":
                            return this.toRGBAString(); break } return false };
                this.toHEXString = function() { return jsc.hexColor(this.channels.r, this.channels.g, this.channels.b) };
                this.toHEXAString = function() { return jsc.hexaColor(this.channels.r, this.channels.g, this.channels.b, this.channels.a) };
                this.toRGBString = function() { return jsc.rgbColor(this.channels.r, this.channels.g, this.channels.b) };
                this.toRGBAString = function() { return jsc.rgbaColor(this.channels.r, this.channels.g, this.channels.b, this.channels.a) };
                this.toGrayscale = function() { return .213 * this.channels.r + .715 * this.channels.g + .072 * this.channels.b };
                this.toCanvas = function() { return jsc.genColorPreviewCanvas(this.toRGBAString()).canvas };
                this.toDataURL = function() { return this.toCanvas().toDataURL() };
                this.toBackground = function() { return jsc.pub.background(this.toRGBAString()) };
                this.isLight = function() { return this.toGrayscale() > 255 / 2 };
                this.hide = function() { if (isPickerOwner()) { detachPicker() } };
                this.show = function() { drawPicker() };
                this.redraw = function() { if (isPickerOwner()) { drawPicker() } };
                this.getFormat = function() { return this._currentFormat };
                this._setFormat = function(format) { this._currentFormat = format.toLowerCase() };
                this.hasAlphaChannel = function() { if (this.alphaChannel === "auto") { return this.format.toLowerCase() === "any" || jsc.isAlphaFormat(this.getFormat()) || this.alpha !== undefined || this.alphaElement !== undefined } return this.alphaChannel };
                this.processValueInput = function(str) { if (!this.fromString(str)) { this.exposeColor() } };
                this.processAlphaInput = function(str) { if (!this.fromHSVA(null, null, null, parseFloat(str))) { this.exposeColor() } };
                this.exposeColor = function(flags) { var colorStr = this.toString(); var fmt = this.getFormat();
                    jsc.setDataAttr(this.targetElement, "current-color", colorStr); if (!(flags & jsc.flags.leaveValue) && this.valueElement) { if (fmt === "hex" || fmt === "hexa") { if (!this.uppercase) { colorStr = colorStr.toLowerCase() } if (!this.hash) { colorStr = colorStr.replace(/^#/, "") } }
                        this.setValueElementValue(colorStr) } if (!(flags & jsc.flags.leaveAlpha) && this.alphaElement) { var alphaVal = Math.round(this.channels.a * 100) / 100;
                        this.setAlphaElementValue(alphaVal) } if (!(flags & jsc.flags.leavePreview) && this.previewElement) { var previewPos = null; if (jsc.isTextInput(this.previewElement) || jsc.isButton(this.previewElement) && !jsc.isButtonEmpty(this.previewElement)) { previewPos = this.previewPosition }
                        this.setPreviewElementBg(this.toRGBAString()) } if (isPickerOwner()) { redrawPad();
                        redrawSld();
                        redrawASld() } };
                this.setPreviewElementBg = function(color) { if (!this.previewElement) { return } var position = null; var width = null; if (jsc.isTextInput(this.previewElement) || jsc.isButton(this.previewElement) && !jsc.isButtonEmpty(this.previewElement)) { position = this.previewPosition;
                        width = this.previewSize } var backgrounds = []; if (!color) { backgrounds.push({ image: "none", position: "left top", size: "auto", repeat: "no-repeat", origin: "padding-box" }) } else { backgrounds.push({ image: jsc.genColorPreviewGradient(color, position, width ? width - jsc.pub.previewSeparator.length : null), position: "left top", size: "auto", repeat: position ? "repeat-y" : "repeat", origin: "padding-box" }); var preview = jsc.genColorPreviewCanvas("rgba(0,0,0,0)", position ? { left: "right", right: "left" }[position] : null, width, true);
                        backgrounds.push({ image: "url('" + preview.canvas.toDataURL() + "')", position: (position || "left") + " top", size: preview.width + "px " + preview.height + "px", repeat: position ? "repeat-y" : "repeat", origin: "padding-box" }) } var bg = { image: [], position: [], size: [], repeat: [], origin: [] }; for (var i = 0; i < backgrounds.length; i += 1) { bg.image.push(backgrounds[i].image);
                        bg.position.push(backgrounds[i].position);
                        bg.size.push(backgrounds[i].size);
                        bg.repeat.push(backgrounds[i].repeat);
                        bg.origin.push(backgrounds[i].origin) } var sty = { "background-image": bg.image.join(", "), "background-position": bg.position.join(", "), "background-size": bg.size.join(", "), "background-repeat": bg.repeat.join(", "), "background-origin": bg.origin.join(", ") };
                    jsc.setStyle(this.previewElement, sty, this.forceStyle); var padding = { left: null, right: null }; if (position) { padding[position] = this.previewSize + this.previewPadding + "px" } var sty = { "padding-left": padding.left, "padding-right": padding.right };
                    jsc.setStyle(this.previewElement, sty, this.forceStyle, true) };
                this.setValueElementValue = function(str) { if (this.valueElement) { if (jsc.nodeName(this.valueElement) === "input") { this.valueElement.value = str } else { this.valueElement.innerHTML = str } } };
                this.setAlphaElementValue = function(str) { if (this.alphaElement) { if (jsc.nodeName(this.alphaElement) === "input") { this.alphaElement.value = str } else { this.alphaElement.innerHTML = str } } };
                this._processParentElementsInDOM = function() { if (this._parentElementsProcessed) { return }
                    this._parentElementsProcessed = true; var elm = this.targetElement;
                    do { var compStyle = jsc.getCompStyle(elm); if (compStyle.position && compStyle.position.toLowerCase() === "fixed") { this.fixed = true } if (elm !== this.targetElement) { if (!jsc.getData(elm, "hasScrollListener")) { elm.addEventListener("scroll", jsc.onParentScroll, false);
                                jsc.setData(elm, "hasScrollListener", true) } } } while ((elm = elm.parentNode) && jsc.nodeName(elm) !== "body") };
                this.tryHide = function() { if (this.hideOnLeave) { this.hide() } };
                this.set__palette = function(val) { this.palette = val;
                    this._palette = jsc.parsePaletteValue(val);
                    this._paletteHasTransparency = jsc.containsTranparentColor(this._palette) };

                function setOption(option, value) { if (typeof option !== "string") { throw new Error("Invalid value for option name: " + option) } if (jsc.enumOpts.hasOwnProperty(option)) { if (typeof value === "string") { value = value.toLowerCase() } if (jsc.enumOpts[option].indexOf(value) === -1) { throw new Error("Option '" + option + "' has invalid value: " + value) } } if (jsc.deprecatedOpts.hasOwnProperty(option)) { var oldOpt = option; var newOpt = jsc.deprecatedOpts[option]; if (newOpt) { console.warn("Option '%s' is DEPRECATED, using '%s' instead." + jsc.docsRef, oldOpt, newOpt);
                            option = newOpt } else { throw new Error("Option '" + option + "' is DEPRECATED") } } var setter = "set__" + option; if (typeof THIS[setter] === "function") { THIS[setter](value); return true } else if (option in THIS) { THIS[option] = value; return true } throw new Error("Unrecognized configuration option: " + option) }

                function getOption(option) { if (typeof option !== "string") { throw new Error("Invalid value for option name: " + option) } if (jsc.deprecatedOpts.hasOwnProperty(option)) { var oldOpt = option; var newOpt = jsc.deprecatedOpts[option]; if (newOpt) { console.warn("Option '%s' is DEPRECATED, using '%s' instead." + jsc.docsRef, oldOpt, newOpt);
                            option = newOpt } else { throw new Error("Option '" + option + "' is DEPRECATED") } } var getter = "get__" + option; if (typeof THIS[getter] === "function") { return THIS[getter](value) } else if (option in THIS) { return THIS[option] } throw new Error("Unrecognized configuration option: " + option) }

                function detachPicker() { jsc.removeClass(THIS.targetElement, jsc.pub.activeClassName);
                    jsc.picker.wrap.parentNode.removeChild(jsc.picker.wrap);
                    delete jsc.picker.owner }

                function drawPicker() { THIS._processParentElementsInDOM(); if (!jsc.picker) { jsc.picker = { owner: null, wrap: jsc.createEl("div"), box: jsc.createEl("div"), boxS: jsc.createEl("div"), boxB: jsc.createEl("div"), pad: jsc.createEl("div"), padB: jsc.createEl("div"), padM: jsc.createEl("div"), padCanvas: jsc.createPadCanvas(), cross: jsc.createEl("div"), crossBY: jsc.createEl("div"), crossBX: jsc.createEl("div"), crossLY: jsc.createEl("div"), crossLX: jsc.createEl("div"), sld: jsc.createEl("div"), sldB: jsc.createEl("div"), sldM: jsc.createEl("div"), sldGrad: jsc.createSliderGradient(), sldPtrS: jsc.createEl("div"), sldPtrIB: jsc.createEl("div"), sldPtrMB: jsc.createEl("div"), sldPtrOB: jsc.createEl("div"), asld: jsc.createEl("div"), asldB: jsc.createEl("div"), asldM: jsc.createEl("div"), asldGrad: jsc.createASliderGradient(), asldPtrS: jsc.createEl("div"), asldPtrIB: jsc.createEl("div"), asldPtrMB: jsc.createEl("div"), asldPtrOB: jsc.createEl("div"), pal: jsc.createEl("div"), btn: jsc.createEl("div"), btnT: jsc.createEl("span") };
                        jsc.picker.pad.appendChild(jsc.picker.padCanvas.elm);
                        jsc.picker.padB.appendChild(jsc.picker.pad);
                        jsc.picker.cross.appendChild(jsc.picker.crossBY);
                        jsc.picker.cross.appendChild(jsc.picker.crossBX);
                        jsc.picker.cross.appendChild(jsc.picker.crossLY);
                        jsc.picker.cross.appendChild(jsc.picker.crossLX);
                        jsc.picker.padB.appendChild(jsc.picker.cross);
                        jsc.picker.box.appendChild(jsc.picker.padB);
                        jsc.picker.box.appendChild(jsc.picker.padM);
                        jsc.picker.sld.appendChild(jsc.picker.sldGrad.elm);
                        jsc.picker.sldB.appendChild(jsc.picker.sld);
                        jsc.picker.sldB.appendChild(jsc.picker.sldPtrOB);
                        jsc.picker.sldPtrOB.appendChild(jsc.picker.sldPtrMB);
                        jsc.picker.sldPtrMB.appendChild(jsc.picker.sldPtrIB);
                        jsc.picker.sldPtrIB.appendChild(jsc.picker.sldPtrS);
                        jsc.picker.box.appendChild(jsc.picker.sldB);
                        jsc.picker.box.appendChild(jsc.picker.sldM);
                        jsc.picker.asld.appendChild(jsc.picker.asldGrad.elm);
                        jsc.picker.asldB.appendChild(jsc.picker.asld);
                        jsc.picker.asldB.appendChild(jsc.picker.asldPtrOB);
                        jsc.picker.asldPtrOB.appendChild(jsc.picker.asldPtrMB);
                        jsc.picker.asldPtrMB.appendChild(jsc.picker.asldPtrIB);
                        jsc.picker.asldPtrIB.appendChild(jsc.picker.asldPtrS);
                        jsc.picker.box.appendChild(jsc.picker.asldB);
                        jsc.picker.box.appendChild(jsc.picker.asldM);
                        jsc.picker.box.appendChild(jsc.picker.pal);
                        jsc.picker.btn.appendChild(jsc.picker.btnT);
                        jsc.picker.box.appendChild(jsc.picker.btn);
                        jsc.picker.boxB.appendChild(jsc.picker.box);
                        jsc.picker.wrap.appendChild(jsc.picker.boxS);
                        jsc.picker.wrap.appendChild(jsc.picker.boxB);
                        jsc.picker.wrap.addEventListener("touchstart", jsc.onPickerTouchStart, jsc.isPassiveEventSupported ? { passive: false } : false) } var p = jsc.picker; var displaySlider = !!jsc.getSliderChannel(THIS); var displayAlphaSlider = THIS.hasAlphaChannel(); var pickerDims = jsc.getPickerDims(THIS); var crossOuterSize = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize; var controlPadding = jsc.getControlPadding(THIS); var borderRadius = Math.min(THIS.borderRadius, Math.round(THIS.padding * Math.PI)); var padCursor = "crosshair";
                    p.wrap.className = "jscolor-picker-wrap";
                    p.wrap.style.clear = "both";
                    p.wrap.style.width = pickerDims.borderW + "px";
                    p.wrap.style.height = pickerDims.borderH + "px";
                    p.wrap.style.zIndex = THIS.zIndex;
                    p.box.className = "jscolor-picker";
                    p.box.style.width = pickerDims.paddedW + "px";
                    p.box.style.height = pickerDims.paddedH + "px";
                    p.box.style.position = "relative";
                    p.boxS.className = "jscolor-picker-shadow";
                    p.boxS.style.position = "absolute";
                    p.boxS.style.left = "0";
                    p.boxS.style.top = "0";
                    p.boxS.style.width = "100%";
                    p.boxS.style.height = "100%";
                    jsc.setBorderRadius(p.boxS, borderRadius + "px");
                    p.boxB.className = "jscolor-picker-border";
                    p.boxB.style.position = "relative";
                    p.boxB.style.border = THIS.borderWidth + "px solid";
                    p.boxB.style.borderColor = THIS.borderColor;
                    p.boxB.style.background = THIS.backgroundColor;
                    jsc.setBorderRadius(p.boxB, borderRadius + "px");
                    p.padM.style.background = "rgba(255,0,0,.2)";
                    p.sldM.style.background = "rgba(0,255,0,.2)";
                    p.asldM.style.background = "rgba(0,0,255,.2)";
                    p.padM.style.opacity = p.sldM.style.opacity = p.asldM.style.opacity = "0";
                    p.pad.style.position = "relative";
                    p.pad.style.width = THIS.width + "px";
                    p.pad.style.height = THIS.height + "px";
                    p.padCanvas.draw(THIS.width, THIS.height, jsc.getPadYChannel(THIS));
                    p.padB.style.position = "absolute";
                    p.padB.style.left = THIS.padding + "px";
                    p.padB.style.top = THIS.padding + "px";
                    p.padB.style.border = THIS.controlBorderWidth + "px solid";
                    p.padB.style.borderColor = THIS.controlBorderColor;
                    p.padM.style.position = "absolute";
                    p.padM.style.left = 0 + "px";
                    p.padM.style.top = 0 + "px";
                    p.padM.style.width = THIS.padding + 2 * THIS.controlBorderWidth + THIS.width + controlPadding + "px";
                    p.padM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
                    p.padM.style.cursor = padCursor;
                    jsc.setData(p.padM, { instance: THIS, control: "pad" });
                    p.cross.style.position = "absolute";
                    p.cross.style.left = p.cross.style.top = "0";
                    p.cross.style.width = p.cross.style.height = crossOuterSize + "px";
                    p.crossBY.style.position = p.crossBX.style.position = "absolute";
                    p.crossBY.style.background = p.crossBX.style.background = THIS.pointerBorderColor;
                    p.crossBY.style.width = p.crossBX.style.height = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + "px";
                    p.crossBY.style.height = p.crossBX.style.width = crossOuterSize + "px";
                    p.crossBY.style.left = p.crossBX.style.top = Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) - THIS.pointerBorderWidth + "px";
                    p.crossBY.style.top = p.crossBX.style.left = "0";
                    p.crossLY.style.position = p.crossLX.style.position = "absolute";
                    p.crossLY.style.background = p.crossLX.style.background = THIS.pointerColor;
                    p.crossLY.style.height = p.crossLX.style.width = crossOuterSize - 2 * THIS.pointerBorderWidth + "px";
                    p.crossLY.style.width = p.crossLX.style.height = THIS.pointerThickness + "px";
                    p.crossLY.style.left = p.crossLX.style.top = Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) + "px";
                    p.crossLY.style.top = p.crossLX.style.left = THIS.pointerBorderWidth + "px";
                    p.sld.style.overflow = "hidden";
                    p.sld.style.width = THIS.sliderSize + "px";
                    p.sld.style.height = THIS.height + "px";
                    p.sldGrad.draw(THIS.sliderSize, THIS.height, "#000", "#000");
                    p.sldB.style.display = displaySlider ? "block" : "none";
                    p.sldB.style.position = "absolute";
                    p.sldB.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + 2 * controlPadding + "px";
                    p.sldB.style.top = THIS.padding + "px";
                    p.sldB.style.border = THIS.controlBorderWidth + "px solid";
                    p.sldB.style.borderColor = THIS.controlBorderColor;
                    p.sldM.style.display = displaySlider ? "block" : "none";
                    p.sldM.style.position = "absolute";
                    p.sldM.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + "px";
                    p.sldM.style.top = 0 + "px";
                    p.sldM.style.width = THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth + (displayAlphaSlider ? 0 : Math.max(0, THIS.padding - controlPadding)) + "px";
                    p.sldM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
                    p.sldM.style.cursor = "default";
                    jsc.setData(p.sldM, { instance: THIS, control: "sld" });
                    p.sldPtrIB.style.border = p.sldPtrOB.style.border = THIS.pointerBorderWidth + "px solid " + THIS.pointerBorderColor;
                    p.sldPtrOB.style.position = "absolute";
                    p.sldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + "px";
                    p.sldPtrOB.style.top = "0";
                    p.sldPtrMB.style.border = THIS.pointerThickness + "px solid " + THIS.pointerColor;
                    p.sldPtrS.style.width = THIS.sliderSize + "px";
                    p.sldPtrS.style.height = jsc.pub.sliderInnerSpace + "px";
                    p.asld.style.overflow = "hidden";
                    p.asld.style.width = THIS.sliderSize + "px";
                    p.asld.style.height = THIS.height + "px";
                    p.asldGrad.draw(THIS.sliderSize, THIS.height, "#000");
                    p.asldB.style.display = displayAlphaSlider ? "block" : "none";
                    p.asldB.style.position = "absolute";
                    p.asldB.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + (displaySlider ? THIS.sliderSize + 3 * controlPadding + 2 * THIS.controlBorderWidth : 0) + "px";
                    p.asldB.style.top = THIS.padding + "px";
                    p.asldB.style.border = THIS.controlBorderWidth + "px solid";
                    p.asldB.style.borderColor = THIS.controlBorderColor;
                    p.asldM.style.display = displayAlphaSlider ? "block" : "none";
                    p.asldM.style.position = "absolute";
                    p.asldM.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + (displaySlider ? THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth : 0) + "px";
                    p.asldM.style.top = 0 + "px";
                    p.asldM.style.width = THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth + Math.max(0, THIS.padding - controlPadding) + "px";
                    p.asldM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
                    p.asldM.style.cursor = "default";
                    jsc.setData(p.asldM, { instance: THIS, control: "asld" });
                    p.asldPtrIB.style.border = p.asldPtrOB.style.border = THIS.pointerBorderWidth + "px solid " + THIS.pointerBorderColor;
                    p.asldPtrOB.style.position = "absolute";
                    p.asldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + "px";
                    p.asldPtrOB.style.top = "0";
                    p.asldPtrMB.style.border = THIS.pointerThickness + "px solid " + THIS.pointerColor;
                    p.asldPtrS.style.width = THIS.sliderSize + "px";
                    p.asldPtrS.style.height = jsc.pub.sliderInnerSpace + "px";
                    p.pal.className = "jscolor-palette";
                    p.pal.style.display = pickerDims.palette.rows ? "block" : "none";
                    p.pal.style.position = "absolute";
                    p.pal.style.left = THIS.padding + "px";
                    p.pal.style.top = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
                    p.pal.innerHTML = ""; var chessboard = jsc.genColorPreviewCanvas("rgba(0,0,0,0)"); var si = 0; for (var r = 0; r < pickerDims.palette.rows; r++) { for (var c = 0; c < pickerDims.palette.cols && si < THIS._palette.length; c++, si++) { var sampleColor = THIS._palette[si]; var sampleCssColor = jsc.rgbaColor.apply(null, sampleColor.rgba); var sc = jsc.createEl("div");
                            sc.style.width = pickerDims.palette.cellW - 2 * THIS.controlBorderWidth + "px";
                            sc.style.height = pickerDims.palette.cellH - 2 * THIS.controlBorderWidth + "px";
                            sc.style.backgroundColor = sampleCssColor; var sw = jsc.createEl("div");
                            sw.className = "jscolor-palette-sample";
                            sw.style.display = "block";
                            sw.style.position = "absolute";
                            sw.style.left = (pickerDims.palette.cols <= 1 ? 0 : Math.round(10 * (c * ((pickerDims.contentW - pickerDims.palette.cellW) / (pickerDims.palette.cols - 1)))) / 10) + "px";
                            sw.style.top = r * (pickerDims.palette.cellH + THIS.paletteSpacing) + "px";
                            sw.style.border = THIS.controlBorderWidth + "px solid";
                            sw.style.borderColor = THIS.controlBorderColor;
                            sw.style.cursor = "pointer"; if (sampleColor.rgba[3] !== null && sampleColor.rgba[3] < 1) { sw.style.backgroundImage = "url('" + chessboard.canvas.toDataURL() + "')";
                                sw.style.backgroundRepeat = "repeat";
                                sw.style.backgroundPosition = "center center" }
                            jsc.setData(sw, { instance: THIS, control: "palette-sample", color: sampleColor });
                            sw.addEventListener("click", jsc.onPaletteSampleClick, false);
                            sw.appendChild(sc);
                            p.pal.appendChild(sw) } }

                    function setBtnBorder() { var insetColors = THIS.controlBorderColor.split(/\s+/); var outsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + " " + insetColors[0] + " " + insetColors[0] + " " + insetColors[1];
                        p.btn.style.borderColor = outsetColor } var btnPadding = 15;
                    p.btn.className = "jscolor-btn-close";
                    p.btn.style.display = THIS.closeButton ? "block" : "none";
                    p.btn.style.position = "absolute";
                    p.btn.style.left = THIS.padding + "px";
                    p.btn.style.bottom = THIS.padding + "px";
                    p.btn.style.padding = "0 " + btnPadding + "px";
                    p.btn.style.maxWidth = pickerDims.contentW - 2 * THIS.controlBorderWidth - 2 * btnPadding + "px";
                    p.btn.style.overflow = "hidden";
                    p.btn.style.height = THIS.buttonHeight + "px";
                    p.btn.style.whiteSpace = "nowrap";
                    p.btn.style.border = THIS.controlBorderWidth + "px solid";
                    setBtnBorder();
                    p.btn.style.color = THIS.buttonColor;
                    p.btn.style.font = "12px sans-serif";
                    p.btn.style.textAlign = "center";
                    p.btn.style.cursor = "pointer";
                    p.btn.onmousedown = function() { THIS.hide() };
                    p.btnT.style.lineHeight = THIS.buttonHeight + "px";
                    p.btnT.innerHTML = "";
                    p.btnT.appendChild(window.document.createTextNode(THIS.closeText));
                    redrawPad();
                    redrawSld();
                    redrawASld(); if (jsc.picker.owner && jsc.picker.owner !== THIS) { jsc.removeClass(jsc.picker.owner.targetElement, jsc.pub.activeClassName) }
                    jsc.picker.owner = THIS; if (THIS.container === window.document.body) { jsc.redrawPosition() } else { jsc._drawPosition(THIS, 0, 0, "relative", false) } if (p.wrap.parentNode !== THIS.container) { THIS.container.appendChild(p.wrap) }
                    jsc.addClass(THIS.targetElement, jsc.pub.activeClassName) }

                function redrawPad() { var yChannel = jsc.getPadYChannel(THIS); var x = Math.round(THIS.channels.h / 360 * (THIS.width - 1)); var y = Math.round((1 - THIS.channels[yChannel] / 100) * (THIS.height - 1)); var crossOuterSize = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize; var ofs = -Math.floor(crossOuterSize / 2);
                    jsc.picker.cross.style.left = x + ofs + "px";
                    jsc.picker.cross.style.top = y + ofs + "px"; switch (jsc.getSliderChannel(THIS)) {
                        case "s":
                            var rgb1 = jsc.HSV_RGB(THIS.channels.h, 100, THIS.channels.v); var rgb2 = jsc.HSV_RGB(THIS.channels.h, 0, THIS.channels.v); var color1 = "rgb(" + Math.round(rgb1[0]) + "," + Math.round(rgb1[1]) + "," + Math.round(rgb1[2]) + ")"; var color2 = "rgb(" + Math.round(rgb2[0]) + "," + Math.round(rgb2[1]) + "," + Math.round(rgb2[2]) + ")";
                            jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2); break;
                        case "v":
                            var rgb = jsc.HSV_RGB(THIS.channels.h, THIS.channels.s, 100); var color1 = "rgb(" + Math.round(rgb[0]) + "," + Math.round(rgb[1]) + "," + Math.round(rgb[2]) + ")"; var color2 = "#000";
                            jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2); break }
                    jsc.picker.asldGrad.draw(THIS.sliderSize, THIS.height, THIS.toHEXString()) }

                function redrawSld() { var sldChannel = jsc.getSliderChannel(THIS); if (sldChannel) { var y = Math.round((1 - THIS.channels[sldChannel] / 100) * (THIS.height - 1));
                        jsc.picker.sldPtrOB.style.top = y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(jsc.pub.sliderInnerSpace / 2) + "px" }
                    jsc.picker.asldGrad.draw(THIS.sliderSize, THIS.height, THIS.toHEXString()) }

                function redrawASld() { var y = Math.round((1 - THIS.channels.a) * (THIS.height - 1));
                    jsc.picker.asldPtrOB.style.top = y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(jsc.pub.sliderInnerSpace / 2) + "px" }

                function isPickerOwner() { return jsc.picker && jsc.picker.owner === THIS }

                function onValueKeyDown(ev) { if (jsc.eventKey(ev) === "Enter") { if (THIS.valueElement) { THIS.processValueInput(THIS.valueElement.value) }
                        THIS.tryHide() } }

                function onAlphaKeyDown(ev) { if (jsc.eventKey(ev) === "Enter") { if (THIS.alphaElement) { THIS.processAlphaInput(THIS.alphaElement.value) }
                        THIS.tryHide() } }

                function onValueChange(ev) { if (jsc.getData(ev, "internal")) { return } var oldVal = THIS.valueElement.value;
                    THIS.processValueInput(THIS.valueElement.value);
                    jsc.triggerCallback(THIS, "onChange"); if (THIS.valueElement.value !== oldVal) { jsc.triggerInputEvent(THIS.valueElement, "change", true, true) } }

                function onAlphaChange(ev) { if (jsc.getData(ev, "internal")) { return } var oldVal = THIS.alphaElement.value;
                    THIS.processAlphaInput(THIS.alphaElement.value);
                    jsc.triggerCallback(THIS, "onChange");
                    jsc.triggerInputEvent(THIS.valueElement, "change", true, true); if (THIS.alphaElement.value !== oldVal) { jsc.triggerInputEvent(THIS.alphaElement, "change", true, true) } }

                function onValueInput(ev) { if (jsc.getData(ev, "internal")) { return } if (THIS.valueElement) { THIS.fromString(THIS.valueElement.value, jsc.flags.leaveValue) }
                    jsc.triggerCallback(THIS, "onInput") }

                function onAlphaInput(ev) { if (jsc.getData(ev, "internal")) { return } if (THIS.alphaElement) { THIS.fromHSVA(null, null, null, parseFloat(THIS.alphaElement.value), jsc.flags.leaveAlpha) }
                    jsc.triggerCallback(THIS, "onInput");
                    jsc.triggerInputEvent(THIS.valueElement, "input", true, true) } if (jsc.pub.options) { for (var opt in jsc.pub.options) { if (jsc.pub.options.hasOwnProperty(opt)) { try { setOption(opt, jsc.pub.options[opt]) } catch (e) { console.warn(e) } } } } var presetsArr = []; if (opts.preset) { if (typeof opts.preset === "string") { presetsArr = opts.preset.split(/\s+/) } else if (Array.isArray(opts.preset)) { presetsArr = opts.preset.slice() } else { console.warn("Unrecognized preset value") } } if (presetsArr.indexOf("default") === -1) { presetsArr.push("default") } for (var i = presetsArr.length - 1; i >= 0; i -= 1) { var pres = presetsArr[i]; if (!pres) { continue } if (!jsc.pub.presets.hasOwnProperty(pres)) { console.warn("Unknown preset: %s", pres); continue } for (var opt in jsc.pub.presets[pres]) { if (jsc.pub.presets[pres].hasOwnProperty(opt)) { try { setOption(opt, jsc.pub.presets[pres][opt]) } catch (e) { console.warn(e) } } } } var nonProperties = ["preset"]; for (var opt in opts) { if (opts.hasOwnProperty(opt)) { if (nonProperties.indexOf(opt) === -1) { try { setOption(opt, opts[opt]) } catch (e) { console.warn(e) } } } } if (this.container === undefined) { this.container = window.document.body } else { this.container = jsc.node(this.container) } if (!this.container) { throw new Error("Cannot instantiate color picker without a container element") }
                this.targetElement = jsc.node(targetElement); if (!this.targetElement) { if (typeof targetElement === "string" && /^[a-zA-Z][\w:.-]*$/.test(targetElement)) { var possiblyId = targetElement; throw new Error("If '" + possiblyId + "' is supposed to be an ID, please use '#" + possiblyId + "' or any valid CSS selector.") } throw new Error("Cannot instantiate color picker without a target element") } if (this.targetElement.jscolor && this.targetElement.jscolor instanceof jsc.pub) { throw new Error("Color picker already installed on this element") }
                this.targetElement.jscolor = this;
                jsc.addClass(this.targetElement, jsc.pub.className);
                jsc.instances.push(this); if (jsc.isButton(this.targetElement)) { if (this.targetElement.type.toLowerCase() !== "button") { this.targetElement.type = "button" } if (jsc.isButtonEmpty(this.targetElement)) { jsc.removeChildren(this.targetElement);
                        this.targetElement.appendChild(window.document.createTextNode(" ")); var compStyle = jsc.getCompStyle(this.targetElement); var currMinWidth = parseFloat(compStyle["min-width"]) || 0; if (currMinWidth < this.previewSize) { jsc.setStyle(this.targetElement, { "min-width": this.previewSize + "px" }, this.forceStyle) } } } if (this.valueElement === undefined) { if (jsc.isTextInput(this.targetElement)) { this.valueElement = this.targetElement } else {} } else if (this.valueElement === null) {} else { this.valueElement = jsc.node(this.valueElement) } if (this.alphaElement) { this.alphaElement = jsc.node(this.alphaElement) } if (this.previewElement === undefined) { this.previewElement = this.targetElement } else if (this.previewElement === null) {} else { this.previewElement = jsc.node(this.previewElement) } if (this.valueElement && jsc.isTextInput(this.valueElement)) { var valueElementOrigEvents = { onInput: this.valueElement.oninput };
                    this.valueElement.oninput = null;
                    this.valueElement.addEventListener("keydown", onValueKeyDown, false);
                    this.valueElement.addEventListener("change", onValueChange, false);
                    this.valueElement.addEventListener("input", onValueInput, false); if (valueElementOrigEvents.onInput) { this.valueElement.addEventListener("input", valueElementOrigEvents.onInput, false) }
                    this.valueElement.setAttribute("autocomplete", "off");
                    this.valueElement.setAttribute("autocorrect", "off");
                    this.valueElement.setAttribute("autocapitalize", "off");
                    this.valueElement.setAttribute("spellcheck", false) } if (this.alphaElement && jsc.isTextInput(this.alphaElement)) { this.alphaElement.addEventListener("keydown", onAlphaKeyDown, false);
                    this.alphaElement.addEventListener("change", onAlphaChange, false);
                    this.alphaElement.addEventListener("input", onAlphaInput, false);
                    this.alphaElement.setAttribute("autocomplete", "off");
                    this.alphaElement.setAttribute("autocorrect", "off");
                    this.alphaElement.setAttribute("autocapitalize", "off");
                    this.alphaElement.setAttribute("spellcheck", false) } var initValue = "FFFFFF"; if (this.value !== undefined) { initValue = this.value } else if (this.valueElement && this.valueElement.value !== undefined) { initValue = this.valueElement.value } var initAlpha = undefined; if (this.alpha !== undefined) { initAlpha = "" + this.alpha } else if (this.alphaElement && this.alphaElement.value !== undefined) { initAlpha = this.alphaElement.value }
                this._currentFormat = null; if (["auto", "any"].indexOf(this.format.toLowerCase()) > -1) { var color = jsc.parseColorString(initValue);
                    this._currentFormat = color ? color.format : "hex" } else { this._currentFormat = this.format.toLowerCase() }
                this.processValueInput(initValue); if (initAlpha !== undefined) { this.processAlphaInput(initAlpha) } } };
        jsc.pub.className = "jscolor";
        jsc.pub.activeClassName = "jscolor-active";
        jsc.pub.looseJSON = true;
        jsc.pub.presets = {};
        jsc.pub.presets["default"] = {};
        jsc.pub.presets["light"] = { backgroundColor: "rgba(255,255,255,1)", controlBorderColor: "rgba(187,187,187,1)", buttonColor: "rgba(0,0,0,1)" };
        jsc.pub.presets["dark"] = { backgroundColor: "rgba(51,51,51,1)", controlBorderColor: "rgba(153,153,153,1)", buttonColor: "rgba(240,240,240,1)" };
        jsc.pub.presets["small"] = { width: 101, height: 101, padding: 10, sliderSize: 14, paletteCols: 8 };
        jsc.pub.presets["medium"] = { width: 181, height: 101, padding: 12, sliderSize: 16, paletteCols: 10 };
        jsc.pub.presets["large"] = { width: 271, height: 151, padding: 12, sliderSize: 24, paletteCols: 15 };
        jsc.pub.presets["thin"] = { borderWidth: 1, controlBorderWidth: 1, pointerBorderWidth: 1 };
        jsc.pub.presets["thick"] = { borderWidth: 2, controlBorderWidth: 2, pointerBorderWidth: 2 };
        jsc.pub.sliderInnerSpace = 3;
        jsc.pub.chessboardSize = 8;
        jsc.pub.chessboardColor1 = "#666666";
        jsc.pub.chessboardColor2 = "#999999";
        jsc.pub.previewSeparator = ["rgba(255,255,255,.65)", "rgba(128,128,128,.65)"];
        jsc.pub.init = function() { if (jsc.initialized) { return }
            window.document.addEventListener("mousedown", jsc.onDocumentMouseDown, false);
            window.document.addEventListener("keyup", jsc.onDocumentKeyUp, false);
            window.addEventListener("resize", jsc.onWindowResize, false);
            window.addEventListener("scroll", jsc.onWindowScroll, false);
            jsc.pub.install();
            jsc.initialized = true; while (jsc.readyQueue.length) { var func = jsc.readyQueue.shift();
                func() } };
        jsc.pub.install = function(rootNode) { var success = true; try { jsc.installBySelector("[data-jscolor]", rootNode) } catch (e) { success = false;
                console.warn(e) } if (jsc.pub.lookupClass) { try { jsc.installBySelector("input." + jsc.pub.lookupClass + ", " + "button." + jsc.pub.lookupClass, rootNode) } catch (e) {} } return success };
        jsc.pub.ready = function(func) { if (typeof func !== "function") { console.warn("Passed value is not a function"); return false } if (jsc.initialized) { func() } else { jsc.readyQueue.push(func) } return true };
        jsc.pub.trigger = function(eventNames) { var triggerNow = function() { jsc.triggerGlobal(eventNames) }; if (jsc.initialized) { triggerNow() } else { jsc.pub.ready(triggerNow) } };
        jsc.pub.hide = function() { if (jsc.picker && jsc.picker.owner) { jsc.picker.owner.hide() } };
        jsc.pub.chessboard = function(color) { if (!color) { color = "rgba(0,0,0,0)" } var preview = jsc.genColorPreviewCanvas(color); return preview.canvas.toDataURL() };
        jsc.pub.background = function(color) { var backgrounds = [];
            backgrounds.push(jsc.genColorPreviewGradient(color)); var preview = jsc.genColorPreviewCanvas();
            backgrounds.push(["url('" + preview.canvas.toDataURL() + "')", "left top", "repeat"].join(" ")); return backgrounds.join(", ") };
        jsc.pub.options = {};
        jsc.pub.lookupClass = "jscolor";
        jsc.pub.installByClassName = function() { console.error('jscolor.installByClassName() is DEPRECATED. Use data-jscolor="" attribute instead of a class name.' + jsc.docsRef); return false };
        jsc.register(); return jsc.pub }(); if (typeof window.jscolor === "undefined") { window.jscolor = window.JSColor = jscolor } return jscolor });