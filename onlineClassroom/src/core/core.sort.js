== 'function') callback();
          resolve();
        });
      }).catch(reject).finally(mark);
    });
  }
  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(function (mutation) {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }

  function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new picked(function (resolve, reject) {
      if (node.getAttribute(pendingAttribute) !== null) {
        // This node is already being processed
        return resolve();
      }

      var children = toArray(node.children);
      var alreadyProcessedPseudoElement = children.filter(function (c) {
        return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
      })[0];
      var styles = WINDOW.getComputedStyle(node, position);
      var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
      var fontWeight = styles.getPropertyValue('font-weight');

      if (alreadyProcessedPseudoElement && !fontFamily) {
        // If we've already processed it but the current computed style does not result in a font-family,
        // that probably means that a class name that was previously present to make the icon has been
        // removed. So we now should delete the icon.
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamily) {
        var content = styles.getPropertyValue('content');
        var prefix = ~['Light', 'Regular', 'Solid', 'Brands'].indexOf(fontFamily[1]) ? STYLE_TO_PREFIX[fontFamily[1].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[fontWeight];
        var iconName = byUnicode(prefix, toHex(content.length === 3 ? content.substr(1, 1) : content)); // Only convert the pseudo element in this :before/:after position into an icon if we haven't
        // already done so with the same prefix and iconName

        if (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconName) {
          node.setAttribute(pendingAttribute, iconName);

          if (alreadyProcessedPseudoElement) {
            // Delete the old one, since we're replacing it with a new one
            node.removeChild(alreadyProcessedPseudoElement);
          }

          var meta = blankMeta();
          var extra = meta.extra;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(function (main) {
            var abstract = makeInlineSvgAbstract(_objectSpread({}, meta, {
              icons: {
                main: main,
                mask: emptyCanonicalIcon()
              },
              prefix: prefix,
              iconName: iconName,
              extra: extra,
              watchable: true
            }));
            var element = DOCUMENT.createElement('svg');

            if (position === ':before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }

            element.outerHTML = abstract.map(function (a) {
              return toHtml(a);
            }).join('\n');
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  function replace(node) {
    return picked.all([replaceForPosition(node, ':before'), replaceForPosition(node, ':after')]);
  }

  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
  }

  function searchPseudoElements (root) {
    if (!IS_DOM) return;
    return new picked(function (resolve, reject) {
      var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
      var end = perf.begin('searchPseudoElements');
      disableObservation();
      picked.all(operations).then(function () {
        end();
        enableObservation();
        resolve();
      }).catch(function () {
        end();
        enableObservation();
        reject();
      });
    });
  }

  var baseStyles = "svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.3333333333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-both,:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}";

  function css () {
    var dfp = DEFAULT_FAMILY_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.familyPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;

    if (fp !== dfp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
      var rPatt = new RegExp("\\.".concat(drc), 'g');
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }

    return s;
  }

  var Library =
  /*#__PURE__*/
  function () {
    function Library() {
      _classCallCheck(this, Library);

      this.definitions = {};
    }

    _createClass(Library, [{
      key: "add",
      value: function add() {
        var _this = this;

        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }

        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
          _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
          defineIcons(key, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
          var _normalized$key = normalized[key],
              prefix = _normalized$key.prefix,
              iconName = _normalized$key.iconName,
              icon = _normalized$key.icon;
          if (!additions[prefix]) additions[prefix] = {};
          additions[prefix][iconName] = icon;
        });
        return additions;
      }
    }]);

    return Library;
  }();

  function prepIcon(icon) {
    var width = icon[0];
    var height = icon[1];
    var vectorData = icon.slice(4);
    return {
      found: true,
      width: width,
      height: height,
      icon: {
        tag: 'path',
        attributes: {
          fill: 'currentColor',
          d: vectorData[0]
        }
      }
    };
  }

  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());

      _cssInserted = true;
    }
  }

  function apiObject(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
      get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
      get: function get() {
        return val.abstract.map(function (a) {
          return toHtml(a);
        });
      }
    });
    Object.defineProperty(val, 'node', {
      get: function get() {
        if (!IS_DOM) return;
        var container = DOCUMENT.createElement('div');
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }

  function findIconDefinition(iconLookup) {
    var _iconLookup$prefix = iconLookup.prefix,
        prefix = _iconLookup$prefix === void 0 ? 'fa' : _iconLookup$prefix,
        iconName = iconLookup.iconName;
    if (!iconName) return;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }

  function resolveIcons(next) {
    return function (maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask = params.mask;

      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }

      return next(iconDefinition, _objectSpread({}, params, {
        mask: mask
      }));
    };
  }

  var library = new Library();
  var noAuto = function noAuto() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    disconnect();
  };
  var _cssInserted = false;
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (IS_DOM) {
        ensureCss();
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node,
            _params$callback = params.cal