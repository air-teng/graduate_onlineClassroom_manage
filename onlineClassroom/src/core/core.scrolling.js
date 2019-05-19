bol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread({}, attributes, {
          id: id
        }),
        children: children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons,
        main = _params$icons.main,
        mask = _params$icons.mask,
        prefix = params.prefix,
        iconName = params.iconName,
        transform = params.transform,
        symbol = params.symbol,
        title = params.title,
        extra = params.extra,
        _params$watchable = params.watchable,
        watchable = _params$watchable === void 0 ? false : _params$watchable;

    var _ref = mask.found ? mask : main,
        width = _ref.width,
        height = _ref.height;

    var widthClass = "fa-w-".concat(Math.ceil(width / height * 16));
    var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {
      return extra.classes.indexOf(c) === -1;
    }).concat(extra.classes).join(' ');
    var content = {
      children: [],
      attributes: _objectSpread({}, extra.attributes, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': 'img',
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };

    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(nextUniqueId())
      },
      children: [title]
    });

    var args = _objectSpread({}, content, {
      prefix: prefix,
      iconName: iconName,
      main: main,
      mask: mask,
      transform: transform,
      symbol: symbol,
      styles: extra.styles
    });

    var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
        children = _ref2.children,
        attributes = _ref2.attributes;

    args.children = children;
    args.attributes = attributes;

    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }

    var styles = _objectSpread({}, extra.styles);

    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform: transform,
        startCentered: true,
        width: width,
        height: height
      });
      styles['-webkit-transform'] = styles['transform'];
    }

    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content,
        title = params.title,
        extra = params.extra;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    var styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = "FA \"5.7.0\"";

  var begin = function begin(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function () {
      return end(name);
    };
  };

  var end = function end(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };

  var perf = {
    begin: begin,
    end: end
  };

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var styles = namespace.styles,
      shims = namespace.shims;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }

      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      var ligatures = icon[2];
      acc[iconName] = iconName;
      ligatures.forEach(function (ligature) {
        acc[ligature] = iconName;
      });
      return acc;
    });
    var hasRegular = 'far' in styles;
    _byOldName = reduce(shims, function (acc, shim) {
      var oldName = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      acc[oldName] = {
        prefix: prefix,
        iconName: iconName
      };
      return acc;
    }, {});
  };
  build();
  function byUnicode(prefix, unicode) {
    return _byUnicode[prefix][unicode];
  }
  function byLigature(prefix, ligature) {
    return _byLigature[prefix][ligature];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }

  var styles$1 = namespace.styles;
  var emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalIcon(values) {
    return values.reduce(function (acc, cls) {
      var iconName = getIconName(config.familyPrefix, cls);

      if (styles$1[cls]) {
        acc.prefix = cls;
      } else if (config.autoFetchSvg && ['fas', 'far', 'fal', 'fab', 'fa'].indexOf(cls) > -1) {
        acc.prefix = cls;
      } else if (iconName) {
        var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};
        acc.iconName = shim.iconName || iconName;
        acc.prefix = shim.prefix || acc.prefix;
      } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
        acc.rest.push(cls);
      }

      return acc;
    }, emptyCanonicalIcon());
  }
  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix: prefix,
        iconName: iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  var noop$2 = function noop() {};

  function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }

  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }

    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }

  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];
      var abstract = mutation[1];
      var newOuterHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');

      if (node.parentNode && node.outerHTML) {
        node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? "<!-- ".concat(node.outerHTML, " -->") : '');
      } else if (node.parentNode) {
        var newNode = document.createElement('span');
        node.parentNode.replaceChild(newNode, node);
        newNode.outerHTML = newOuterHTML;
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement

      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }

      var forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));
      delete abstract[0].attributes.style;
      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }

        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');
      var newInnerHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');
      node.setAttribute('class', splitClasses.toNode.join(' '));
      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };
  function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = WINDOW.requestAnimationFrame || function (op) {
        return op();
      };

      frame(function () {
        var mutator = getMutator();
        var mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }

    if (!config.observeMutations) {
      return;
    }

    var treeCallback = options.treeCallback,
        nodeCallback = options.nodeCallback,
        pseudoElementsCallback = options.pseudoElementsCallback,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
      if (disabled) return;
      toArray(objects).forEach(function (mutationRecord) {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }

          treeCallback(mutationRecord.target);
        }

        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }

        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class') {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                prefix = _getCanonicalIcon.prefix,
                iconName = _getCanonicalIcon.iconName;

            if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
            if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
          } else {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    var style = node.getAttribute('style');
    var val = [];

    if (style) {
      val = style.split(';').reduce(function (acc, style) {
        var styles = style.split(':');
        var prop = styles[0];
        var value = styles.slice(1);

        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }

        return acc;
      }, {});
    }

    return val;
  }

  function toHex(unicode) {
    var result = '';

    for (var i = 0; i < unicode.length; i++) {
      var hex = unicode.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }

    return result;
  }

  function classParser (node) {
    var existingPrefix = node.getAtt