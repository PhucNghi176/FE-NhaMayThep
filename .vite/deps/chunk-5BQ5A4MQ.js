import {
  _classCallCheck,
  _createClass,
  _createSuper,
  _inherits,
  _toConsumableArray,
  es_default,
  findDOMNode,
  isDOM,
  raf_default,
  toArray,
  useEvent,
  useLayoutEffect_default,
  useToken
} from "./chunk-77HUS2UZ.js";
import {
  require_react_dom
} from "./chunk-4ASWBRZ3.js";
import {
  _extends,
  _objectSpread2,
  _objectWithoutProperties,
  _slicedToArray,
  _typeof,
  canUseDom,
  composeRef,
  fillRef,
  getShadowRoot,
  removeCSS,
  require_classnames,
  supportRef,
  updateCSS,
  useComposeRef,
  warning,
  warning_default
} from "./chunk-MU5D4VIA.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/antd/es/_util/reactNode.js
var React = __toESM(require_react());
var {
  isValidElement
} = React;
function isFragment(child) {
  return child && isValidElement(child) && child.type === React.Fragment;
}
function replaceElement(element, replacement, props) {
  if (!isValidElement(element)) {
    return replacement;
  }
  return React.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
}
function cloneElement2(element, props) {
  return replaceElement(element, element, props);
}

// node_modules/antd/es/_util/hooks/useZIndex.js
var import_react2 = __toESM(require_react());

// node_modules/antd/es/_util/zindexContext.js
var import_react = __toESM(require_react());
var zIndexContext = import_react.default.createContext(void 0);
if (true) {
  zIndexContext.displayName = "zIndexContext";
}
var zindexContext_default = zIndexContext;

// node_modules/antd/es/_util/hooks/useZIndex.js
var CONTAINER_OFFSET = 100;
var CONTAINER_OFFSET_MAX_COUNT = 10;
var CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT;
var containerBaseZIndexOffset = {
  Modal: CONTAINER_OFFSET,
  Drawer: CONTAINER_OFFSET,
  Popover: CONTAINER_OFFSET,
  Popconfirm: CONTAINER_OFFSET,
  Tooltip: CONTAINER_OFFSET,
  Tour: CONTAINER_OFFSET
};
var consumerBaseZIndexOffset = {
  SelectLike: 50,
  Dropdown: 50,
  DatePicker: 50,
  Menu: 50,
  ImagePreview: 1
};
function isContainerType(type) {
  return type in containerBaseZIndexOffset;
}
function useZIndex(componentType, customZIndex) {
  const [, token] = useToken();
  const parentZIndex = import_react2.default.useContext(zindexContext_default);
  const isContainer = isContainerType(componentType);
  if (customZIndex !== void 0) {
    return [customZIndex, customZIndex];
  }
  let zIndex = parentZIndex !== null && parentZIndex !== void 0 ? parentZIndex : 0;
  if (isContainer) {
    zIndex += // Use preset token zIndex by default but not stack when has parent container
    (parentZIndex ? 0 : token.zIndexPopupBase) + // Container offset
    containerBaseZIndexOffset[componentType];
    zIndex = Math.min(zIndex, token.zIndexPopupBase + CONTAINER_MAX_OFFSET);
  } else {
    zIndex += consumerBaseZIndexOffset[componentType];
  }
  return [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
}

// node_modules/rc-resize-observer/es/index.js
var React7 = __toESM(require_react());

// node_modules/rc-resize-observer/es/SingleObserver/index.js
var React6 = __toESM(require_react());

// node_modules/rc-resize-observer/es/Collection.js
var React4 = __toESM(require_react());
var CollectionContext = React4.createContext(null);
function Collection(_ref) {
  var children = _ref.children, onBatchResize = _ref.onBatchResize;
  var resizeIdRef = React4.useRef(0);
  var resizeInfosRef = React4.useRef([]);
  var onCollectionResize = React4.useContext(CollectionContext);
  var onResize2 = React4.useCallback(function(size, element, data) {
    resizeIdRef.current += 1;
    var currentId = resizeIdRef.current;
    resizeInfosRef.current.push({
      size,
      element,
      data
    });
    Promise.resolve().then(function() {
      if (currentId === resizeIdRef.current) {
        onBatchResize === null || onBatchResize === void 0 || onBatchResize(resizeInfosRef.current);
        resizeInfosRef.current = [];
      }
    });
    onCollectionResize === null || onCollectionResize === void 0 || onCollectionResize(size, element, data);
  }, [onBatchResize, onCollectionResize]);
  return React4.createElement(CollectionContext.Provider, {
    value: onResize2
  }, children);
}

// node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver3(callback) {
      if (!(this instanceof ResizeObserver3)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver3;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
var ResizeObserver_es_default = index;

// node_modules/rc-resize-observer/es/utils/observerUtil.js
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
  entities.forEach(function(entity) {
    var _elementListeners$get;
    var target = entity.target;
    (_elementListeners$get = elementListeners.get(target)) === null || _elementListeners$get === void 0 || _elementListeners$get.forEach(function(listener) {
      return listener(target);
    });
  });
}
var resizeObserver = new ResizeObserver_es_default(onResize);
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, /* @__PURE__ */ new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}

// node_modules/rc-resize-observer/es/SingleObserver/DomWrapper.js
var React5 = __toESM(require_react());
var DomWrapper = function(_React$Component) {
  _inherits(DomWrapper2, _React$Component);
  var _super = _createSuper(DomWrapper2);
  function DomWrapper2() {
    _classCallCheck(this, DomWrapper2);
    return _super.apply(this, arguments);
  }
  _createClass(DomWrapper2, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return DomWrapper2;
}(React5.Component);

// node_modules/rc-resize-observer/es/SingleObserver/index.js
function SingleObserver(props, ref) {
  var children = props.children, disabled = props.disabled;
  var elementRef = React6.useRef(null);
  var wrapperRef = React6.useRef(null);
  var onCollectionResize = React6.useContext(CollectionContext);
  var isRenderProps = typeof children === "function";
  var mergedChildren = isRenderProps ? children(elementRef) : children;
  var sizeRef = React6.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });
  var canRef = !isRenderProps && React6.isValidElement(mergedChildren) && supportRef(mergedChildren);
  var originRef = canRef ? mergedChildren.ref : null;
  var mergedRef = useComposeRef(originRef, elementRef);
  var getDom = function getDom2() {
    var _elementRef$current;
    return findDOMNode(elementRef.current) || // Support `nativeElement` format
    (elementRef.current && _typeof(elementRef.current) === "object" ? findDOMNode((_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 ? void 0 : _elementRef$current.nativeElement) : null) || findDOMNode(wrapperRef.current);
  };
  React6.useImperativeHandle(ref, function() {
    return getDom();
  });
  var propsRef = React6.useRef(props);
  propsRef.current = props;
  var onInternalResize = React6.useCallback(function(target) {
    var _propsRef$current = propsRef.current, onResize2 = _propsRef$current.onResize, data = _propsRef$current.data;
    var _target$getBoundingCl = target.getBoundingClientRect(), width = _target$getBoundingCl.width, height = _target$getBoundingCl.height;
    var offsetWidth = target.offsetWidth, offsetHeight = target.offsetHeight;
    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);
    if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
      var size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight
      };
      sizeRef.current = size;
      var mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      var mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      var sizeInfo = _objectSpread2(_objectSpread2({}, size), {}, {
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight
      });
      onCollectionResize === null || onCollectionResize === void 0 || onCollectionResize(sizeInfo, target, data);
      if (onResize2) {
        Promise.resolve().then(function() {
          onResize2(sizeInfo, target);
        });
      }
    }
  }, []);
  React6.useEffect(function() {
    var currentElement = getDom();
    if (currentElement && !disabled) {
      observe(currentElement, onInternalResize);
    }
    return function() {
      return unobserve(currentElement, onInternalResize);
    };
  }, [elementRef.current, disabled]);
  return React6.createElement(DomWrapper, {
    ref: wrapperRef
  }, canRef ? React6.cloneElement(mergedChildren, {
    ref: mergedRef
  }) : mergedChildren);
}
var RefSingleObserver = React6.forwardRef(SingleObserver);
if (true) {
  RefSingleObserver.displayName = "SingleObserver";
}
var SingleObserver_default = RefSingleObserver;

// node_modules/rc-resize-observer/es/index.js
var INTERNAL_PREFIX_KEY = "rc-observer-key";
function ResizeObserver2(props, ref) {
  var children = props.children;
  var childNodes = typeof children === "function" ? [children] : toArray(children);
  if (true) {
    if (childNodes.length > 1) {
      warning(false, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.");
    } else if (childNodes.length === 0) {
      warning(false, "`children` of ResizeObserver is empty. Nothing is in observe.");
    }
  }
  return childNodes.map(function(child, index2) {
    var key = (child === null || child === void 0 ? void 0 : child.key) || "".concat(INTERNAL_PREFIX_KEY, "-").concat(index2);
    return React7.createElement(SingleObserver_default, _extends({}, props, {
      key,
      ref: index2 === 0 ? ref : void 0
    }), child);
  });
}
var RefResizeObserver = React7.forwardRef(ResizeObserver2);
if (true) {
  RefResizeObserver.displayName = "ResizeObserver";
}
RefResizeObserver.Collection = Collection;
var es_default2 = RefResizeObserver;

// node_modules/rc-util/es/KeyCode.js
var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46,
  // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  // needs localization
  /**
   * DASH
   */
  DASH: 189,
  // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  // needs localization
  /**
   * COMMA
   */
  COMMA: 188,
  // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190,
  // needs localization
  /**
   * SLASH
   */
  SLASH: 191,
  // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};
var KeyCode_default = KeyCode;

// node_modules/rc-util/es/Dom/isVisible.js
var isVisible_default = function(element) {
  if (!element) {
    return false;
  }
  if (element instanceof Element) {
    if (element.offsetParent) {
      return true;
    }
    if (element.getBBox) {
      var _getBBox = element.getBBox(), width = _getBBox.width, height = _getBBox.height;
      if (width || height) {
        return true;
      }
    }
    if (element.getBoundingClientRect) {
      var _element$getBoundingC = element.getBoundingClientRect(), _width = _element$getBoundingC.width, _height = _element$getBoundingC.height;
      if (_width || _height) {
        return true;
      }
    }
  }
  return false;
};

// node_modules/@rc-component/portal/es/Portal.js
var React11 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@rc-component/portal/es/Context.js
var React8 = __toESM(require_react());
var OrderContext = React8.createContext(null);
var Context_default = OrderContext;

// node_modules/@rc-component/portal/es/useDom.js
var React9 = __toESM(require_react());
var EMPTY_LIST = [];
function useDom(render, debug) {
  var _React$useState = React9.useState(function() {
    if (!canUseDom()) {
      return null;
    }
    var defaultEle = document.createElement("div");
    if (debug) {
      defaultEle.setAttribute("data-debug", debug);
    }
    return defaultEle;
  }), _React$useState2 = _slicedToArray(_React$useState, 1), ele = _React$useState2[0];
  var appendedRef = React9.useRef(false);
  var queueCreate = React9.useContext(Context_default);
  var _React$useState3 = React9.useState(EMPTY_LIST), _React$useState4 = _slicedToArray(_React$useState3, 2), queue = _React$useState4[0], setQueue = _React$useState4[1];
  var mergedQueueCreate = queueCreate || (appendedRef.current ? void 0 : function(appendFn) {
    setQueue(function(origin) {
      var newQueue = [appendFn].concat(_toConsumableArray(origin));
      return newQueue;
    });
  });
  function append() {
    if (!ele.parentElement) {
      document.body.appendChild(ele);
    }
    appendedRef.current = true;
  }
  function cleanup() {
    var _ele$parentElement;
    (_ele$parentElement = ele.parentElement) === null || _ele$parentElement === void 0 ? void 0 : _ele$parentElement.removeChild(ele);
    appendedRef.current = false;
  }
  useLayoutEffect_default(function() {
    if (render) {
      if (queueCreate) {
        queueCreate(append);
      } else {
        append();
      }
    } else {
      cleanup();
    }
    return cleanup;
  }, [render]);
  useLayoutEffect_default(function() {
    if (queue.length) {
      queue.forEach(function(appendFn) {
        return appendFn();
      });
      setQueue(EMPTY_LIST);
    }
  }, [queue]);
  return [ele, mergedQueueCreate];
}

// node_modules/@rc-component/portal/es/useScrollLocker.js
var React10 = __toESM(require_react());

// node_modules/rc-util/es/getScrollBarSize.js
var cached;
function getScrollBarSize(fresh) {
  if (typeof document === "undefined") {
    return 0;
  }
  if (fresh || cached === void 0) {
    var inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement("div");
    var outerStyle = outer.style;
    outerStyle.position = "absolute";
    outerStyle.top = "0";
    outerStyle.left = "0";
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    var widthScroll = inner.offsetWidth;
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }
  return cached;
}
function ensureSize(str) {
  var match = str.match(/^(.*)px$/);
  var value = Number(match === null || match === void 0 ? void 0 : match[1]);
  return Number.isNaN(value) ? getScrollBarSize() : value;
}
function getTargetScrollBarSize(target) {
  if (typeof document === "undefined" || !target || !(target instanceof Element)) {
    return {
      width: 0,
      height: 0
    };
  }
  var _getComputedStyle = getComputedStyle(target, "::-webkit-scrollbar"), width = _getComputedStyle.width, height = _getComputedStyle.height;
  return {
    width: ensureSize(width),
    height: ensureSize(height)
  };
}

// node_modules/@rc-component/portal/es/util.js
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}

// node_modules/@rc-component/portal/es/useScrollLocker.js
var UNIQUE_ID = "rc-util-locker-".concat(Date.now());
var uuid = 0;
function useScrollLocker(lock) {
  var mergedLock = !!lock;
  var _React$useState = React10.useState(function() {
    uuid += 1;
    return "".concat(UNIQUE_ID, "_").concat(uuid);
  }), _React$useState2 = _slicedToArray(_React$useState, 1), id = _React$useState2[0];
  useLayoutEffect_default(function() {
    if (mergedLock) {
      var scrollbarSize = getTargetScrollBarSize(document.body).width;
      var isOverflow = isBodyOverflowing();
      updateCSS("\nhtml body {\n  overflow-y: hidden;\n  ".concat(isOverflow ? "width: calc(100% - ".concat(scrollbarSize, "px);") : "", "\n}"), id);
    } else {
      removeCSS(id);
    }
    return function() {
      removeCSS(id);
    };
  }, [mergedLock, id]);
}

// node_modules/@rc-component/portal/es/mock.js
var inline = false;
function inlineMock(nextInline) {
  if (typeof nextInline === "boolean") {
    inline = nextInline;
  }
  return inline;
}

// node_modules/@rc-component/portal/es/Portal.js
var getPortalContainer = function getPortalContainer2(getContainer) {
  if (getContainer === false) {
    return false;
  }
  if (!canUseDom() || !getContainer) {
    return null;
  }
  if (typeof getContainer === "string") {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === "function") {
    return getContainer();
  }
  return getContainer;
};
var Portal = React11.forwardRef(function(props, ref) {
  var open = props.open, autoLock = props.autoLock, getContainer = props.getContainer, debug = props.debug, _props$autoDestroy = props.autoDestroy, autoDestroy = _props$autoDestroy === void 0 ? true : _props$autoDestroy, children = props.children;
  var _React$useState = React11.useState(open), _React$useState2 = _slicedToArray(_React$useState, 2), shouldRender = _React$useState2[0], setShouldRender = _React$useState2[1];
  var mergedRender = shouldRender || open;
  if (true) {
    warning_default(canUseDom() || !open, "Portal only work in client side. Please call 'useEffect' to show Portal instead default render in SSR.");
  }
  React11.useEffect(function() {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);
  var _React$useState3 = React11.useState(function() {
    return getPortalContainer(getContainer);
  }), _React$useState4 = _slicedToArray(_React$useState3, 2), innerContainer = _React$useState4[0], setInnerContainer = _React$useState4[1];
  React11.useEffect(function() {
    var customizeContainer = getPortalContainer(getContainer);
    setInnerContainer(customizeContainer !== null && customizeContainer !== void 0 ? customizeContainer : null);
  });
  var _useDom = useDom(mergedRender && !innerContainer, debug), _useDom2 = _slicedToArray(_useDom, 2), defaultContainer = _useDom2[0], queueCreate = _useDom2[1];
  var mergedContainer = innerContainer !== null && innerContainer !== void 0 ? innerContainer : defaultContainer;
  useScrollLocker(autoLock && open && canUseDom() && (mergedContainer === defaultContainer || mergedContainer === document.body));
  var childRef = null;
  if (children && supportRef(children) && ref) {
    var _ref = children;
    childRef = _ref.ref;
  }
  var mergedRef = useComposeRef(childRef, ref);
  if (!mergedRender || !canUseDom() || innerContainer === void 0) {
    return null;
  }
  var renderInline = mergedContainer === false || inlineMock();
  var reffedChildren = children;
  if (ref) {
    reffedChildren = React11.cloneElement(children, {
      ref: mergedRef
    });
  }
  return React11.createElement(Context_default.Provider, {
    value: queueCreate
  }, renderInline ? reffedChildren : (0, import_react_dom.createPortal)(reffedChildren, mergedContainer));
});
if (true) {
  Portal.displayName = "Portal";
}
var Portal_default = Portal;

// node_modules/@rc-component/portal/es/index.js
var es_default3 = Portal_default;

// node_modules/@rc-component/trigger/es/index.js
var import_classnames4 = __toESM(require_classnames());

// node_modules/rc-util/es/hooks/useId.js
var React12 = __toESM(require_react());
function getUseId() {
  var fullClone = _objectSpread2({}, React12);
  return fullClone.useId;
}
var uuid2 = 0;
var useOriginId = getUseId();
var useId_default = useOriginId ? (
  // Use React `useId`
  function useId(id) {
    var reactId = useOriginId();
    if (id) {
      return id;
    }
    if (false) {
      return "test-id";
    }
    return reactId;
  }
) : (
  // Use compatible of `useId`
  function useCompatId(id) {
    var _React$useState = React12.useState("ssr-id"), _React$useState2 = _slicedToArray(_React$useState, 2), innerId = _React$useState2[0], setInnerId = _React$useState2[1];
    React12.useEffect(function() {
      var nextId = uuid2;
      uuid2 += 1;
      setInnerId("rc_unique_".concat(nextId));
    }, []);
    if (id) {
      return id;
    }
    if (false) {
      return "test-id";
    }
    return innerId;
  }
);

// node_modules/rc-util/es/isMobile.js
var isMobile_default = function() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  var agent = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent === null || agent === void 0 ? void 0 : agent.substr(0, 4));
};

// node_modules/@rc-component/trigger/es/index.js
var React22 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/Popup/index.js
var import_classnames3 = __toESM(require_classnames());
var React16 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/Popup/Arrow.js
var import_classnames = __toESM(require_classnames());
var React13 = __toESM(require_react());
function Arrow(props) {
  var prefixCls = props.prefixCls, align = props.align, arrow = props.arrow, arrowPos = props.arrowPos;
  var _ref = arrow || {}, className = _ref.className, content = _ref.content;
  var _arrowPos$x = arrowPos.x, x = _arrowPos$x === void 0 ? 0 : _arrowPos$x, _arrowPos$y = arrowPos.y, y = _arrowPos$y === void 0 ? 0 : _arrowPos$y;
  var arrowRef = React13.useRef();
  if (!align || !align.points) {
    return null;
  }
  var alignStyle = {
    position: "absolute"
  };
  if (align.autoArrow !== false) {
    var popupPoints = align.points[0];
    var targetPoints = align.points[1];
    var popupTB = popupPoints[0];
    var popupLR = popupPoints[1];
    var targetTB = targetPoints[0];
    var targetLR = targetPoints[1];
    if (popupTB === targetTB || !["t", "b"].includes(popupTB)) {
      alignStyle.top = y;
    } else if (popupTB === "t") {
      alignStyle.top = 0;
    } else {
      alignStyle.bottom = 0;
    }
    if (popupLR === targetLR || !["l", "r"].includes(popupLR)) {
      alignStyle.left = x;
    } else if (popupLR === "l") {
      alignStyle.left = 0;
    } else {
      alignStyle.right = 0;
    }
  }
  return React13.createElement("div", {
    ref: arrowRef,
    className: (0, import_classnames.default)("".concat(prefixCls, "-arrow"), className),
    style: alignStyle
  }, content);
}

// node_modules/@rc-component/trigger/es/Popup/Mask.js
var import_classnames2 = __toESM(require_classnames());
var React14 = __toESM(require_react());
function Mask(props) {
  var prefixCls = props.prefixCls, open = props.open, zIndex = props.zIndex, mask = props.mask, motion = props.motion;
  if (!mask) {
    return null;
  }
  return React14.createElement(es_default, _extends({}, motion, {
    motionAppear: true,
    visible: open,
    removeOnLeave: true
  }), function(_ref) {
    var className = _ref.className;
    return React14.createElement("div", {
      style: {
        zIndex
      },
      className: (0, import_classnames2.default)("".concat(prefixCls, "-mask"), className)
    });
  });
}

// node_modules/@rc-component/trigger/es/Popup/PopupContent.js
var React15 = __toESM(require_react());
var PopupContent = React15.memo(function(_ref) {
  var children = _ref.children;
  return children;
}, function(_, next) {
  return next.cache;
});
if (true) {
  PopupContent.displayName = "PopupContent";
}
var PopupContent_default = PopupContent;

// node_modules/@rc-component/trigger/es/Popup/index.js
var Popup = React16.forwardRef(function(props, ref) {
  var popup = props.popup, className = props.className, prefixCls = props.prefixCls, style = props.style, target = props.target, _onVisibleChanged = props.onVisibleChanged, open = props.open, keepDom = props.keepDom, fresh = props.fresh, onClick = props.onClick, mask = props.mask, arrow = props.arrow, arrowPos = props.arrowPos, align = props.align, motion = props.motion, maskMotion = props.maskMotion, forceRender = props.forceRender, getPopupContainer = props.getPopupContainer, autoDestroy = props.autoDestroy, Portal2 = props.portal, zIndex = props.zIndex, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onPointerEnter = props.onPointerEnter, ready = props.ready, offsetX = props.offsetX, offsetY = props.offsetY, offsetR = props.offsetR, offsetB = props.offsetB, onAlign = props.onAlign, onPrepare = props.onPrepare, stretch = props.stretch, targetWidth = props.targetWidth, targetHeight = props.targetHeight;
  var childNode = typeof popup === "function" ? popup() : popup;
  var isNodeVisible = open || keepDom;
  var getPopupContainerNeedParams = (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.length) > 0;
  var _React$useState = React16.useState(!getPopupContainer || !getPopupContainerNeedParams), _React$useState2 = _slicedToArray(_React$useState, 2), show = _React$useState2[0], setShow = _React$useState2[1];
  useLayoutEffect_default(function() {
    if (!show && getPopupContainerNeedParams && target) {
      setShow(true);
    }
  }, [show, getPopupContainerNeedParams, target]);
  if (!show) {
    return null;
  }
  var AUTO = "auto";
  var offsetStyle = {
    left: "-1000vw",
    top: "-1000vh",
    right: AUTO,
    bottom: AUTO
  };
  if (ready || !open) {
    var _experimental;
    var points = align.points;
    var dynamicInset = align.dynamicInset || ((_experimental = align._experimental) === null || _experimental === void 0 ? void 0 : _experimental.dynamicInset);
    var alignRight = dynamicInset && points[0][1] === "r";
    var alignBottom = dynamicInset && points[0][0] === "b";
    if (alignRight) {
      offsetStyle.right = offsetR;
      offsetStyle.left = AUTO;
    } else {
      offsetStyle.left = offsetX;
      offsetStyle.right = AUTO;
    }
    if (alignBottom) {
      offsetStyle.bottom = offsetB;
      offsetStyle.top = AUTO;
    } else {
      offsetStyle.top = offsetY;
      offsetStyle.bottom = AUTO;
    }
  }
  var miscStyle = {};
  if (stretch) {
    if (stretch.includes("height") && targetHeight) {
      miscStyle.height = targetHeight;
    } else if (stretch.includes("minHeight") && targetHeight) {
      miscStyle.minHeight = targetHeight;
    }
    if (stretch.includes("width") && targetWidth) {
      miscStyle.width = targetWidth;
    } else if (stretch.includes("minWidth") && targetWidth) {
      miscStyle.minWidth = targetWidth;
    }
  }
  if (!open) {
    miscStyle.pointerEvents = "none";
  }
  return React16.createElement(Portal2, {
    open: forceRender || isNodeVisible,
    getContainer: getPopupContainer && function() {
      return getPopupContainer(target);
    },
    autoDestroy
  }, React16.createElement(Mask, {
    prefixCls,
    open,
    zIndex,
    mask,
    motion: maskMotion
  }), React16.createElement(es_default2, {
    onResize: onAlign,
    disabled: !open
  }, function(resizeObserverRef) {
    return React16.createElement(es_default, _extends({
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      removeOnLeave: false,
      forceRender,
      leavedClassName: "".concat(prefixCls, "-hidden")
    }, motion, {
      onAppearPrepare: onPrepare,
      onEnterPrepare: onPrepare,
      visible: open,
      onVisibleChanged: function onVisibleChanged(nextVisible) {
        var _motion$onVisibleChan;
        motion === null || motion === void 0 || (_motion$onVisibleChan = motion.onVisibleChanged) === null || _motion$onVisibleChan === void 0 || _motion$onVisibleChan.call(motion, nextVisible);
        _onVisibleChanged(nextVisible);
      }
    }), function(_ref, motionRef) {
      var motionClassName = _ref.className, motionStyle = _ref.style;
      var cls = (0, import_classnames3.default)(prefixCls, motionClassName, className);
      return React16.createElement("div", {
        ref: composeRef(resizeObserverRef, ref, motionRef),
        className: cls,
        style: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
          "--arrow-x": "".concat(arrowPos.x || 0, "px"),
          "--arrow-y": "".concat(arrowPos.y || 0, "px")
        }, offsetStyle), miscStyle), motionStyle), {}, {
          boxSizing: "border-box",
          zIndex
        }, style),
        onMouseEnter,
        onMouseLeave,
        onPointerEnter,
        onClick
      }, arrow && React16.createElement(Arrow, {
        prefixCls,
        arrow,
        arrowPos,
        align
      }), React16.createElement(PopupContent_default, {
        cache: !open && !fresh
      }, childNode));
    });
  }));
});
if (true) {
  Popup.displayName = "Popup";
}
var Popup_default = Popup;

// node_modules/@rc-component/trigger/es/TriggerWrapper.js
var React17 = __toESM(require_react());
var TriggerWrapper = React17.forwardRef(function(props, ref) {
  var children = props.children, getTriggerDOMNode = props.getTriggerDOMNode;
  var canUseRef = supportRef(children);
  var setRef = React17.useCallback(function(node) {
    fillRef(ref, getTriggerDOMNode ? getTriggerDOMNode(node) : node);
  }, [getTriggerDOMNode]);
  var mergedRef = useComposeRef(setRef, children.ref);
  return canUseRef ? React17.cloneElement(children, {
    ref: mergedRef
  }) : children;
});
if (true) {
  TriggerWrapper.displayName = "TriggerWrapper";
}
var TriggerWrapper_default = TriggerWrapper;

// node_modules/@rc-component/trigger/es/context.js
var React18 = __toESM(require_react());
var TriggerContext = React18.createContext(null);
var context_default = TriggerContext;

// node_modules/@rc-component/trigger/es/hooks/useAction.js
var React19 = __toESM(require_react());
function toArray2(val) {
  return val ? Array.isArray(val) ? val : [val] : [];
}
function useAction(mobile, action, showAction, hideAction) {
  return React19.useMemo(function() {
    var mergedShowAction = toArray2(showAction !== null && showAction !== void 0 ? showAction : action);
    var mergedHideAction = toArray2(hideAction !== null && hideAction !== void 0 ? hideAction : action);
    var showActionSet = new Set(mergedShowAction);
    var hideActionSet = new Set(mergedHideAction);
    if (mobile) {
      if (showActionSet.has("hover")) {
        showActionSet.delete("hover");
        showActionSet.add("click");
      }
      if (hideActionSet.has("hover")) {
        hideActionSet.delete("hover");
        hideActionSet.add("click");
      }
    }
    return [showActionSet, hideActionSet];
  }, [mobile, action, showAction, hideAction]);
}

// node_modules/@rc-component/trigger/es/hooks/useAlign.js
var React20 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/util.js
function isPointsEq() {
  var a1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var a2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var isAlignPoint = arguments.length > 2 ? arguments[2] : void 0;
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  var points = align.points;
  var placements = Object.keys(builtinPlacements);
  for (var i = 0; i < placements.length; i += 1) {
    var _builtinPlacements$pl;
    var placement = placements[i];
    if (isPointsEq((_builtinPlacements$pl = builtinPlacements[placement]) === null || _builtinPlacements$pl === void 0 ? void 0 : _builtinPlacements$pl.points, points, isAlignPoint)) {
      return "".concat(prefixCls, "-placement-").concat(placement);
    }
  }
  return "";
}
function getMotion(prefixCls, motion, animation, transitionName) {
  if (motion) {
    return motion;
  }
  if (animation) {
    return {
      motionName: "".concat(prefixCls, "-").concat(animation)
    };
  }
  if (transitionName) {
    return {
      motionName: transitionName
    };
  }
  return null;
}
function getWin(ele) {
  return ele.ownerDocument.defaultView;
}
function collectScroller(ele) {
  var scrollerList = [];
  var current = ele === null || ele === void 0 ? void 0 : ele.parentElement;
  var scrollStyle = ["hidden", "scroll", "clip", "auto"];
  while (current) {
    var _getWin$getComputedSt = getWin(current).getComputedStyle(current), overflowX = _getWin$getComputedSt.overflowX, overflowY = _getWin$getComputedSt.overflowY, overflow = _getWin$getComputedSt.overflow;
    if ([overflowX, overflowY, overflow].some(function(o) {
      return scrollStyle.includes(o);
    })) {
      scrollerList.push(current);
    }
    current = current.parentElement;
  }
  return scrollerList;
}
function toNum(num) {
  var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return Number.isNaN(num) ? defaultValue : num;
}
function getPxValue(val) {
  return toNum(parseFloat(val), 0);
}
function getVisibleArea(initArea, scrollerList) {
  var visibleArea = _objectSpread2({}, initArea);
  (scrollerList || []).forEach(function(ele) {
    if (ele instanceof HTMLBodyElement || ele instanceof HTMLHtmlElement) {
      return;
    }
    var _getWin$getComputedSt2 = getWin(ele).getComputedStyle(ele), overflow = _getWin$getComputedSt2.overflow, overflowClipMargin = _getWin$getComputedSt2.overflowClipMargin, borderTopWidth = _getWin$getComputedSt2.borderTopWidth, borderBottomWidth = _getWin$getComputedSt2.borderBottomWidth, borderLeftWidth = _getWin$getComputedSt2.borderLeftWidth, borderRightWidth = _getWin$getComputedSt2.borderRightWidth;
    var eleRect = ele.getBoundingClientRect();
    var eleOutHeight = ele.offsetHeight, eleInnerHeight = ele.clientHeight, eleOutWidth = ele.offsetWidth, eleInnerWidth = ele.clientWidth;
    var borderTopNum = getPxValue(borderTopWidth);
    var borderBottomNum = getPxValue(borderBottomWidth);
    var borderLeftNum = getPxValue(borderLeftWidth);
    var borderRightNum = getPxValue(borderRightWidth);
    var scaleX = toNum(Math.round(eleRect.width / eleOutWidth * 1e3) / 1e3);
    var scaleY = toNum(Math.round(eleRect.height / eleOutHeight * 1e3) / 1e3);
    var eleScrollWidth = (eleOutWidth - eleInnerWidth - borderLeftNum - borderRightNum) * scaleX;
    var eleScrollHeight = (eleOutHeight - eleInnerHeight - borderTopNum - borderBottomNum) * scaleY;
    var scaledBorderTopWidth = borderTopNum * scaleY;
    var scaledBorderBottomWidth = borderBottomNum * scaleY;
    var scaledBorderLeftWidth = borderLeftNum * scaleX;
    var scaledBorderRightWidth = borderRightNum * scaleX;
    var clipMarginWidth = 0;
    var clipMarginHeight = 0;
    if (overflow === "clip") {
      var clipNum = getPxValue(overflowClipMargin);
      clipMarginWidth = clipNum * scaleX;
      clipMarginHeight = clipNum * scaleY;
    }
    var eleLeft = eleRect.x + scaledBorderLeftWidth - clipMarginWidth;
    var eleTop = eleRect.y + scaledBorderTopWidth - clipMarginHeight;
    var eleRight = eleLeft + eleRect.width + 2 * clipMarginWidth - scaledBorderLeftWidth - scaledBorderRightWidth - eleScrollWidth;
    var eleBottom = eleTop + eleRect.height + 2 * clipMarginHeight - scaledBorderTopWidth - scaledBorderBottomWidth - eleScrollHeight;
    visibleArea.left = Math.max(visibleArea.left, eleLeft);
    visibleArea.top = Math.max(visibleArea.top, eleTop);
    visibleArea.right = Math.min(visibleArea.right, eleRight);
    visibleArea.bottom = Math.min(visibleArea.bottom, eleBottom);
  });
  return visibleArea;
}

// node_modules/@rc-component/trigger/es/hooks/useAlign.js
function getUnitOffset(size) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var offsetStr = "".concat(offset);
  var cells = offsetStr.match(/^(.*)\%$/);
  if (cells) {
    return size * (parseFloat(cells[1]) / 100);
  }
  return parseFloat(offsetStr);
}
function getNumberOffset(rect, offset) {
  var _ref = offset || [], _ref2 = _slicedToArray(_ref, 2), offsetX = _ref2[0], offsetY = _ref2[1];
  return [getUnitOffset(rect.width, offsetX), getUnitOffset(rect.height, offsetY)];
}
function splitPoints() {
  var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  return [points[0], points[1]];
}
function getAlignPoint(rect, points) {
  var topBottom = points[0];
  var leftRight = points[1];
  var x;
  var y;
  if (topBottom === "t") {
    y = rect.y;
  } else if (topBottom === "b") {
    y = rect.y + rect.height;
  } else {
    y = rect.y + rect.height / 2;
  }
  if (leftRight === "l") {
    x = rect.x;
  } else if (leftRight === "r") {
    x = rect.x + rect.width;
  } else {
    x = rect.x + rect.width / 2;
  }
  return {
    x,
    y
  };
}
function reversePoints(points, index2) {
  var reverseMap = {
    t: "b",
    b: "t",
    l: "r",
    r: "l"
  };
  return points.map(function(point, i) {
    if (i === index2) {
      return reverseMap[point] || "c";
    }
    return point;
  }).join("");
}
function useAlign(open, popupEle, target, placement, builtinPlacements, popupAlign, onPopupAlign) {
  var _React$useState = React20.useState({
    ready: false,
    offsetX: 0,
    offsetY: 0,
    offsetR: 0,
    offsetB: 0,
    arrowX: 0,
    arrowY: 0,
    scaleX: 1,
    scaleY: 1,
    align: builtinPlacements[placement] || {}
  }), _React$useState2 = _slicedToArray(_React$useState, 2), offsetInfo = _React$useState2[0], setOffsetInfo = _React$useState2[1];
  var alignCountRef = React20.useRef(0);
  var scrollerList = React20.useMemo(function() {
    if (!popupEle) {
      return [];
    }
    return collectScroller(popupEle);
  }, [popupEle]);
  var prevFlipRef = React20.useRef({});
  var resetFlipCache = function resetFlipCache2() {
    prevFlipRef.current = {};
  };
  if (!open) {
    resetFlipCache();
  }
  var onAlign = useEvent(function() {
    if (popupEle && target && open) {
      let getIntersectionVisibleArea = function(offsetX, offsetY) {
        var area = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : visibleArea;
        var l = popupRect.x + offsetX;
        var t = popupRect.y + offsetY;
        var r = l + popupWidth;
        var b = t + popupHeight;
        var visibleL = Math.max(l, area.left);
        var visibleT = Math.max(t, area.top);
        var visibleR = Math.min(r, area.right);
        var visibleB = Math.min(b, area.bottom);
        return Math.max(0, (visibleR - visibleL) * (visibleB - visibleT));
      }, syncNextPopupPosition = function() {
        nextPopupY = popupRect.y + nextOffsetY;
        nextPopupBottom = nextPopupY + popupHeight;
        nextPopupX = popupRect.x + nextOffsetX;
        nextPopupRight = nextPopupX + popupWidth;
      };
      var _popupElement$parentE, _popupElement$parentE2;
      var popupElement = popupEle;
      var doc = popupElement.ownerDocument;
      var win = getWin(popupElement);
      var _win$getComputedStyle = win.getComputedStyle(popupElement), width = _win$getComputedStyle.width, height = _win$getComputedStyle.height, popupPosition = _win$getComputedStyle.position;
      var originLeft = popupElement.style.left;
      var originTop = popupElement.style.top;
      var originRight = popupElement.style.right;
      var originBottom = popupElement.style.bottom;
      var originOverflow = popupElement.style.overflow;
      var placementInfo = _objectSpread2(_objectSpread2({}, builtinPlacements[placement]), popupAlign);
      var placeholderElement = doc.createElement("div");
      (_popupElement$parentE = popupElement.parentElement) === null || _popupElement$parentE === void 0 || _popupElement$parentE.appendChild(placeholderElement);
      placeholderElement.style.left = "".concat(popupElement.offsetLeft, "px");
      placeholderElement.style.top = "".concat(popupElement.offsetTop, "px");
      placeholderElement.style.position = popupPosition;
      placeholderElement.style.height = "".concat(popupElement.offsetHeight, "px");
      placeholderElement.style.width = "".concat(popupElement.offsetWidth, "px");
      popupElement.style.left = "0";
      popupElement.style.top = "0";
      popupElement.style.right = "auto";
      popupElement.style.bottom = "auto";
      popupElement.style.overflow = "hidden";
      var targetRect;
      if (Array.isArray(target)) {
        targetRect = {
          x: target[0],
          y: target[1],
          width: 0,
          height: 0
        };
      } else {
        var rect = target.getBoundingClientRect();
        targetRect = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }
      var popupRect = popupElement.getBoundingClientRect();
      var _doc$documentElement = doc.documentElement, clientWidth = _doc$documentElement.clientWidth, clientHeight = _doc$documentElement.clientHeight, scrollWidth = _doc$documentElement.scrollWidth, scrollHeight = _doc$documentElement.scrollHeight, scrollTop = _doc$documentElement.scrollTop, scrollLeft = _doc$documentElement.scrollLeft;
      var popupHeight = popupRect.height;
      var popupWidth = popupRect.width;
      var targetHeight = targetRect.height;
      var targetWidth = targetRect.width;
      var visibleRegion = {
        left: 0,
        top: 0,
        right: clientWidth,
        bottom: clientHeight
      };
      var scrollRegion = {
        left: -scrollLeft,
        top: -scrollTop,
        right: scrollWidth - scrollLeft,
        bottom: scrollHeight - scrollTop
      };
      var htmlRegion = placementInfo.htmlRegion;
      var VISIBLE = "visible";
      var VISIBLE_FIRST = "visibleFirst";
      if (htmlRegion !== "scroll" && htmlRegion !== VISIBLE_FIRST) {
        htmlRegion = VISIBLE;
      }
      var isVisibleFirst = htmlRegion === VISIBLE_FIRST;
      var scrollRegionArea = getVisibleArea(scrollRegion, scrollerList);
      var visibleRegionArea = getVisibleArea(visibleRegion, scrollerList);
      var visibleArea = htmlRegion === VISIBLE ? visibleRegionArea : scrollRegionArea;
      var adjustCheckVisibleArea = isVisibleFirst ? visibleRegionArea : visibleArea;
      popupElement.style.left = "auto";
      popupElement.style.top = "auto";
      popupElement.style.right = "0";
      popupElement.style.bottom = "0";
      var popupMirrorRect = popupElement.getBoundingClientRect();
      popupElement.style.left = originLeft;
      popupElement.style.top = originTop;
      popupElement.style.right = originRight;
      popupElement.style.bottom = originBottom;
      popupElement.style.overflow = originOverflow;
      (_popupElement$parentE2 = popupElement.parentElement) === null || _popupElement$parentE2 === void 0 || _popupElement$parentE2.removeChild(placeholderElement);
      var _scaleX = toNum(Math.round(popupWidth / parseFloat(width) * 1e3) / 1e3);
      var _scaleY = toNum(Math.round(popupHeight / parseFloat(height) * 1e3) / 1e3);
      if (_scaleX === 0 || _scaleY === 0 || isDOM(target) && !isVisible_default(target)) {
        return;
      }
      var offset = placementInfo.offset, targetOffset = placementInfo.targetOffset;
      var _getNumberOffset = getNumberOffset(popupRect, offset), _getNumberOffset2 = _slicedToArray(_getNumberOffset, 2), popupOffsetX = _getNumberOffset2[0], popupOffsetY = _getNumberOffset2[1];
      var _getNumberOffset3 = getNumberOffset(targetRect, targetOffset), _getNumberOffset4 = _slicedToArray(_getNumberOffset3, 2), targetOffsetX = _getNumberOffset4[0], targetOffsetY = _getNumberOffset4[1];
      targetRect.x -= targetOffsetX;
      targetRect.y -= targetOffsetY;
      var _ref3 = placementInfo.points || [], _ref4 = _slicedToArray(_ref3, 2), popupPoint = _ref4[0], targetPoint = _ref4[1];
      var targetPoints = splitPoints(targetPoint);
      var popupPoints = splitPoints(popupPoint);
      var targetAlignPoint = getAlignPoint(targetRect, targetPoints);
      var popupAlignPoint = getAlignPoint(popupRect, popupPoints);
      var nextAlignInfo = _objectSpread2({}, placementInfo);
      var nextOffsetX = targetAlignPoint.x - popupAlignPoint.x + popupOffsetX;
      var nextOffsetY = targetAlignPoint.y - popupAlignPoint.y + popupOffsetY;
      var originIntersectionVisibleArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY);
      var originIntersectionRecommendArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY, visibleRegionArea);
      var targetAlignPointTL = getAlignPoint(targetRect, ["t", "l"]);
      var popupAlignPointTL = getAlignPoint(popupRect, ["t", "l"]);
      var targetAlignPointBR = getAlignPoint(targetRect, ["b", "r"]);
      var popupAlignPointBR = getAlignPoint(popupRect, ["b", "r"]);
      var overflow = placementInfo.overflow || {};
      var adjustX = overflow.adjustX, adjustY = overflow.adjustY, shiftX = overflow.shiftX, shiftY = overflow.shiftY;
      var supportAdjust = function supportAdjust2(val) {
        if (typeof val === "boolean") {
          return val;
        }
        return val >= 0;
      };
      var nextPopupY;
      var nextPopupBottom;
      var nextPopupX;
      var nextPopupRight;
      syncNextPopupPosition();
      var needAdjustY = supportAdjust(adjustY);
      var sameTB = popupPoints[0] === targetPoints[0];
      if (needAdjustY && popupPoints[0] === "t" && (nextPopupBottom > adjustCheckVisibleArea.bottom || prevFlipRef.current.bt)) {
        var tmpNextOffsetY = nextOffsetY;
        if (sameTB) {
          tmpNextOffsetY -= popupHeight - targetHeight;
        } else {
          tmpNextOffsetY = targetAlignPointTL.y - popupAlignPointBR.y - popupOffsetY;
        }
        var newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
        var newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.bt = true;
          nextOffsetY = tmpNextOffsetY;
          popupOffsetY = -popupOffsetY;
          nextAlignInfo.points = [reversePoints(popupPoints, 0), reversePoints(targetPoints, 0)];
        } else {
          prevFlipRef.current.bt = false;
        }
      }
      if (needAdjustY && popupPoints[0] === "b" && (nextPopupY < adjustCheckVisibleArea.top || prevFlipRef.current.tb)) {
        var _tmpNextOffsetY = nextOffsetY;
        if (sameTB) {
          _tmpNextOffsetY += popupHeight - targetHeight;
        } else {
          _tmpNextOffsetY = targetAlignPointBR.y - popupAlignPointTL.y - popupOffsetY;
        }
        var _newVisibleArea = getIntersectionVisibleArea(nextOffsetX, _tmpNextOffsetY);
        var _newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, _tmpNextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          _newVisibleArea > originIntersectionVisibleArea || _newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          _newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.tb = true;
          nextOffsetY = _tmpNextOffsetY;
          popupOffsetY = -popupOffsetY;
          nextAlignInfo.points = [reversePoints(popupPoints, 0), reversePoints(targetPoints, 0)];
        } else {
          prevFlipRef.current.tb = false;
        }
      }
      var needAdjustX = supportAdjust(adjustX);
      var sameLR = popupPoints[1] === targetPoints[1];
      if (needAdjustX && popupPoints[1] === "l" && (nextPopupRight > adjustCheckVisibleArea.right || prevFlipRef.current.rl)) {
        var tmpNextOffsetX = nextOffsetX;
        if (sameLR) {
          tmpNextOffsetX -= popupWidth - targetWidth;
        } else {
          tmpNextOffsetX = targetAlignPointTL.x - popupAlignPointBR.x - popupOffsetX;
        }
        var _newVisibleArea2 = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
        var _newVisibleRecommendArea2 = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          _newVisibleArea2 > originIntersectionVisibleArea || _newVisibleArea2 === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          _newVisibleRecommendArea2 >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.rl = true;
          nextOffsetX = tmpNextOffsetX;
          popupOffsetX = -popupOffsetX;
          nextAlignInfo.points = [reversePoints(popupPoints, 1), reversePoints(targetPoints, 1)];
        } else {
          prevFlipRef.current.rl = false;
        }
      }
      if (needAdjustX && popupPoints[1] === "r" && (nextPopupX < adjustCheckVisibleArea.left || prevFlipRef.current.lr)) {
        var _tmpNextOffsetX = nextOffsetX;
        if (sameLR) {
          _tmpNextOffsetX += popupWidth - targetWidth;
        } else {
          _tmpNextOffsetX = targetAlignPointBR.x - popupAlignPointTL.x - popupOffsetX;
        }
        var _newVisibleArea3 = getIntersectionVisibleArea(_tmpNextOffsetX, nextOffsetY);
        var _newVisibleRecommendArea3 = getIntersectionVisibleArea(_tmpNextOffsetX, nextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          _newVisibleArea3 > originIntersectionVisibleArea || _newVisibleArea3 === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          _newVisibleRecommendArea3 >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.lr = true;
          nextOffsetX = _tmpNextOffsetX;
          popupOffsetX = -popupOffsetX;
          nextAlignInfo.points = [reversePoints(popupPoints, 1), reversePoints(targetPoints, 1)];
        } else {
          prevFlipRef.current.lr = false;
        }
      }
      syncNextPopupPosition();
      var numShiftX = shiftX === true ? 0 : shiftX;
      if (typeof numShiftX === "number") {
        if (nextPopupX < visibleRegionArea.left) {
          nextOffsetX -= nextPopupX - visibleRegionArea.left - popupOffsetX;
          if (targetRect.x + targetWidth < visibleRegionArea.left + numShiftX) {
            nextOffsetX += targetRect.x - visibleRegionArea.left + targetWidth - numShiftX;
          }
        }
        if (nextPopupRight > visibleRegionArea.right) {
          nextOffsetX -= nextPopupRight - visibleRegionArea.right - popupOffsetX;
          if (targetRect.x > visibleRegionArea.right - numShiftX) {
            nextOffsetX += targetRect.x - visibleRegionArea.right + numShiftX;
          }
        }
      }
      var numShiftY = shiftY === true ? 0 : shiftY;
      if (typeof numShiftY === "number") {
        if (nextPopupY < visibleRegionArea.top) {
          nextOffsetY -= nextPopupY - visibleRegionArea.top - popupOffsetY;
          if (targetRect.y + targetHeight < visibleRegionArea.top + numShiftY) {
            nextOffsetY += targetRect.y - visibleRegionArea.top + targetHeight - numShiftY;
          }
        }
        if (nextPopupBottom > visibleRegionArea.bottom) {
          nextOffsetY -= nextPopupBottom - visibleRegionArea.bottom - popupOffsetY;
          if (targetRect.y > visibleRegionArea.bottom - numShiftY) {
            nextOffsetY += targetRect.y - visibleRegionArea.bottom + numShiftY;
          }
        }
      }
      var popupLeft = popupRect.x + nextOffsetX;
      var popupRight = popupLeft + popupWidth;
      var popupTop = popupRect.y + nextOffsetY;
      var popupBottom = popupTop + popupHeight;
      var targetLeft = targetRect.x;
      var targetRight = targetLeft + targetWidth;
      var targetTop = targetRect.y;
      var targetBottom = targetTop + targetHeight;
      var maxLeft = Math.max(popupLeft, targetLeft);
      var minRight = Math.min(popupRight, targetRight);
      var xCenter = (maxLeft + minRight) / 2;
      var nextArrowX = xCenter - popupLeft;
      var maxTop = Math.max(popupTop, targetTop);
      var minBottom = Math.min(popupBottom, targetBottom);
      var yCenter = (maxTop + minBottom) / 2;
      var nextArrowY = yCenter - popupTop;
      onPopupAlign === null || onPopupAlign === void 0 || onPopupAlign(popupEle, nextAlignInfo);
      var offsetX4Right = popupMirrorRect.right - popupRect.x - (nextOffsetX + popupRect.width);
      var offsetY4Bottom = popupMirrorRect.bottom - popupRect.y - (nextOffsetY + popupRect.height);
      setOffsetInfo({
        ready: true,
        offsetX: nextOffsetX / _scaleX,
        offsetY: nextOffsetY / _scaleY,
        offsetR: offsetX4Right / _scaleX,
        offsetB: offsetY4Bottom / _scaleY,
        arrowX: nextArrowX / _scaleX,
        arrowY: nextArrowY / _scaleY,
        scaleX: _scaleX,
        scaleY: _scaleY,
        align: nextAlignInfo
      });
    }
  });
  var triggerAlign = function triggerAlign2() {
    alignCountRef.current += 1;
    var id = alignCountRef.current;
    Promise.resolve().then(function() {
      if (alignCountRef.current === id) {
        onAlign();
      }
    });
  };
  var resetReady = function resetReady2() {
    setOffsetInfo(function(ori) {
      return _objectSpread2(_objectSpread2({}, ori), {}, {
        ready: false
      });
    });
  };
  useLayoutEffect_default(resetReady, [placement]);
  useLayoutEffect_default(function() {
    if (!open) {
      resetReady();
    }
  }, [open]);
  return [offsetInfo.ready, offsetInfo.offsetX, offsetInfo.offsetY, offsetInfo.offsetR, offsetInfo.offsetB, offsetInfo.arrowX, offsetInfo.arrowY, offsetInfo.scaleX, offsetInfo.scaleY, offsetInfo.align, triggerAlign];
}

// node_modules/@rc-component/trigger/es/hooks/useWatch.js
function useWatch(open, target, popup, onAlign, onScroll) {
  useLayoutEffect_default(function() {
    if (open && target && popup) {
      let notifyScroll = function() {
        onAlign();
        onScroll();
      };
      var targetElement = target;
      var popupElement = popup;
      var targetScrollList = collectScroller(targetElement);
      var popupScrollList = collectScroller(popupElement);
      var win = getWin(popupElement);
      var mergedList = new Set([win].concat(_toConsumableArray(targetScrollList), _toConsumableArray(popupScrollList)));
      mergedList.forEach(function(scroller) {
        scroller.addEventListener("scroll", notifyScroll, {
          passive: true
        });
      });
      win.addEventListener("resize", notifyScroll, {
        passive: true
      });
      onAlign();
      return function() {
        mergedList.forEach(function(scroller) {
          scroller.removeEventListener("scroll", notifyScroll);
          win.removeEventListener("resize", notifyScroll);
        });
      };
    }
  }, [open, target, popup]);
}

// node_modules/@rc-component/trigger/es/hooks/useWinClick.js
var React21 = __toESM(require_react());
function useWinClick(open, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen) {
  var openRef = React21.useRef(open);
  var lockRef = React21.useRef(false);
  if (openRef.current !== open) {
    lockRef.current = true;
    openRef.current = open;
  }
  React21.useEffect(function() {
    var id = raf_default(function() {
      lockRef.current = false;
    });
    return function() {
      raf_default.cancel(id);
    };
  }, [open]);
  React21.useEffect(function() {
    if (clickToHide && popupEle && (!mask || maskClosable)) {
      var genClickEvents = function genClickEvents2() {
        var clickInside = false;
        var onWindowMouseDown = function onWindowMouseDown2(_ref) {
          var target = _ref.target;
          clickInside = inPopupOrChild(target);
        };
        var onWindowClick = function onWindowClick2(_ref2) {
          var target = _ref2.target;
          if (!lockRef.current && openRef.current && !clickInside && !inPopupOrChild(target)) {
            triggerOpen(false);
          }
        };
        return [onWindowMouseDown, onWindowClick];
      };
      var _genClickEvents = genClickEvents(), _genClickEvents2 = _slicedToArray(_genClickEvents, 2), onWinMouseDown = _genClickEvents2[0], onWinClick = _genClickEvents2[1];
      var _genClickEvents3 = genClickEvents(), _genClickEvents4 = _slicedToArray(_genClickEvents3, 2), onShadowMouseDown = _genClickEvents4[0], onShadowClick = _genClickEvents4[1];
      var win = getWin(popupEle);
      win.addEventListener("mousedown", onWinMouseDown, true);
      win.addEventListener("click", onWinClick, true);
      win.addEventListener("contextmenu", onWinClick, true);
      var targetShadowRoot = getShadowRoot(targetEle);
      if (targetShadowRoot) {
        targetShadowRoot.addEventListener("mousedown", onShadowMouseDown, true);
        targetShadowRoot.addEventListener("click", onShadowClick, true);
        targetShadowRoot.addEventListener("contextmenu", onShadowClick, true);
      }
      if (true) {
        var _targetEle$getRootNod, _popupEle$getRootNode;
        var targetRoot = targetEle === null || targetEle === void 0 || (_targetEle$getRootNod = targetEle.getRootNode) === null || _targetEle$getRootNod === void 0 ? void 0 : _targetEle$getRootNod.call(targetEle);
        var popupRoot = (_popupEle$getRootNode = popupEle.getRootNode) === null || _popupEle$getRootNode === void 0 ? void 0 : _popupEle$getRootNode.call(popupEle);
        warning(targetRoot === popupRoot, "trigger element and popup element should in same shadow root.");
      }
      return function() {
        win.removeEventListener("mousedown", onWinMouseDown, true);
        win.removeEventListener("click", onWinClick, true);
        win.removeEventListener("contextmenu", onWinClick, true);
        if (targetShadowRoot) {
          targetShadowRoot.removeEventListener("mousedown", onShadowMouseDown, true);
          targetShadowRoot.removeEventListener("click", onShadowClick, true);
          targetShadowRoot.removeEventListener("contextmenu", onShadowClick, true);
        }
      };
    }
  }, [clickToHide, targetEle, popupEle, mask, maskClosable]);
}

// node_modules/@rc-component/trigger/es/index.js
var _excluded = ["prefixCls", "children", "action", "showAction", "hideAction", "popupVisible", "defaultPopupVisible", "onPopupVisibleChange", "afterPopupVisibleChange", "mouseEnterDelay", "mouseLeaveDelay", "focusDelay", "blurDelay", "mask", "maskClosable", "getPopupContainer", "forceRender", "autoDestroy", "destroyPopupOnHide", "popup", "popupClassName", "popupStyle", "popupPlacement", "builtinPlacements", "popupAlign", "zIndex", "stretch", "getPopupClassNameFromAlign", "fresh", "alignPoint", "onPopupClick", "onPopupAlign", "arrow", "popupMotion", "maskMotion", "popupTransitionName", "popupAnimation", "maskTransitionName", "maskAnimation", "className", "getTriggerDOMNode"];
function generateTrigger() {
  var PortalComponent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : es_default3;
  var Trigger = React22.forwardRef(function(props, ref) {
    var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-trigger-popup" : _props$prefixCls, children = props.children, _props$action = props.action, action = _props$action === void 0 ? "hover" : _props$action, showAction = props.showAction, hideAction = props.hideAction, popupVisible = props.popupVisible, defaultPopupVisible = props.defaultPopupVisible, onPopupVisibleChange = props.onPopupVisibleChange, afterPopupVisibleChange = props.afterPopupVisibleChange, mouseEnterDelay = props.mouseEnterDelay, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, focusDelay = props.focusDelay, blurDelay = props.blurDelay, mask = props.mask, _props$maskClosable = props.maskClosable, maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable, getPopupContainer = props.getPopupContainer, forceRender = props.forceRender, autoDestroy = props.autoDestroy, destroyPopupOnHide = props.destroyPopupOnHide, popup = props.popup, popupClassName = props.popupClassName, popupStyle = props.popupStyle, popupPlacement = props.popupPlacement, _props$builtinPlaceme = props.builtinPlacements, builtinPlacements = _props$builtinPlaceme === void 0 ? {} : _props$builtinPlaceme, popupAlign = props.popupAlign, zIndex = props.zIndex, stretch = props.stretch, getPopupClassNameFromAlign = props.getPopupClassNameFromAlign, fresh = props.fresh, alignPoint = props.alignPoint, onPopupClick = props.onPopupClick, onPopupAlign = props.onPopupAlign, arrow = props.arrow, popupMotion = props.popupMotion, maskMotion = props.maskMotion, popupTransitionName = props.popupTransitionName, popupAnimation = props.popupAnimation, maskTransitionName = props.maskTransitionName, maskAnimation = props.maskAnimation, className = props.className, getTriggerDOMNode = props.getTriggerDOMNode, restProps = _objectWithoutProperties(props, _excluded);
    var mergedAutoDestroy = autoDestroy || destroyPopupOnHide || false;
    var _React$useState = React22.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), mobile = _React$useState2[0], setMobile = _React$useState2[1];
    useLayoutEffect_default(function() {
      setMobile(isMobile_default());
    }, []);
    var subPopupElements = React22.useRef({});
    var parentContext = React22.useContext(context_default);
    var context = React22.useMemo(function() {
      return {
        registerSubPopup: function registerSubPopup(id2, subPopupEle) {
          subPopupElements.current[id2] = subPopupEle;
          parentContext === null || parentContext === void 0 || parentContext.registerSubPopup(id2, subPopupEle);
        }
      };
    }, [parentContext]);
    var id = useId_default();
    var _React$useState3 = React22.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), popupEle = _React$useState4[0], setPopupEle = _React$useState4[1];
    var setPopupRef = useEvent(function(node) {
      if (isDOM(node) && popupEle !== node) {
        setPopupEle(node);
      }
      parentContext === null || parentContext === void 0 || parentContext.registerSubPopup(id, node);
    });
    var _React$useState5 = React22.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), targetEle = _React$useState6[0], setTargetEle = _React$useState6[1];
    var externalForwardRef = React22.useRef(null);
    var setTargetRef = useEvent(function(node) {
      if (isDOM(node) && targetEle !== node) {
        setTargetEle(node);
        externalForwardRef.current = node;
      }
    });
    var child = React22.Children.only(children);
    var originChildProps = (child === null || child === void 0 ? void 0 : child.props) || {};
    var cloneProps = {};
    var inPopupOrChild = useEvent(function(ele) {
      var _getShadowRoot, _getShadowRoot2;
      var childDOM = targetEle;
      return (childDOM === null || childDOM === void 0 ? void 0 : childDOM.contains(ele)) || ((_getShadowRoot = getShadowRoot(childDOM)) === null || _getShadowRoot === void 0 ? void 0 : _getShadowRoot.host) === ele || ele === childDOM || (popupEle === null || popupEle === void 0 ? void 0 : popupEle.contains(ele)) || ((_getShadowRoot2 = getShadowRoot(popupEle)) === null || _getShadowRoot2 === void 0 ? void 0 : _getShadowRoot2.host) === ele || ele === popupEle || Object.values(subPopupElements.current).some(function(subPopupEle) {
        return (subPopupEle === null || subPopupEle === void 0 ? void 0 : subPopupEle.contains(ele)) || ele === subPopupEle;
      });
    });
    var mergePopupMotion = getMotion(prefixCls, popupMotion, popupAnimation, popupTransitionName);
    var mergeMaskMotion = getMotion(prefixCls, maskMotion, maskAnimation, maskTransitionName);
    var _React$useState7 = React22.useState(defaultPopupVisible || false), _React$useState8 = _slicedToArray(_React$useState7, 2), internalOpen = _React$useState8[0], setInternalOpen = _React$useState8[1];
    var mergedOpen = popupVisible !== null && popupVisible !== void 0 ? popupVisible : internalOpen;
    var setMergedOpen = useEvent(function(nextOpen) {
      if (popupVisible === void 0) {
        setInternalOpen(nextOpen);
      }
    });
    useLayoutEffect_default(function() {
      setInternalOpen(popupVisible || false);
    }, [popupVisible]);
    var openRef = React22.useRef(mergedOpen);
    openRef.current = mergedOpen;
    var lastTriggerRef = React22.useRef([]);
    lastTriggerRef.current = [];
    var internalTriggerOpen = useEvent(function(nextOpen) {
      var _lastTriggerRef$curre;
      setMergedOpen(nextOpen);
      if (((_lastTriggerRef$curre = lastTriggerRef.current[lastTriggerRef.current.length - 1]) !== null && _lastTriggerRef$curre !== void 0 ? _lastTriggerRef$curre : mergedOpen) !== nextOpen) {
        lastTriggerRef.current.push(nextOpen);
        onPopupVisibleChange === null || onPopupVisibleChange === void 0 || onPopupVisibleChange(nextOpen);
      }
    });
    var delayRef = React22.useRef();
    var clearDelay = function clearDelay2() {
      clearTimeout(delayRef.current);
    };
    var triggerOpen = function triggerOpen2(nextOpen) {
      var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      clearDelay();
      if (delay === 0) {
        internalTriggerOpen(nextOpen);
      } else {
        delayRef.current = setTimeout(function() {
          internalTriggerOpen(nextOpen);
        }, delay * 1e3);
      }
    };
    React22.useEffect(function() {
      return clearDelay;
    }, []);
    var _React$useState9 = React22.useState(false), _React$useState10 = _slicedToArray(_React$useState9, 2), inMotion = _React$useState10[0], setInMotion = _React$useState10[1];
    useLayoutEffect_default(function(firstMount) {
      if (!firstMount || mergedOpen) {
        setInMotion(true);
      }
    }, [mergedOpen]);
    var _React$useState11 = React22.useState(null), _React$useState12 = _slicedToArray(_React$useState11, 2), motionPrepareResolve = _React$useState12[0], setMotionPrepareResolve = _React$useState12[1];
    var _React$useState13 = React22.useState([0, 0]), _React$useState14 = _slicedToArray(_React$useState13, 2), mousePos = _React$useState14[0], setMousePos = _React$useState14[1];
    var setMousePosByEvent = function setMousePosByEvent2(event) {
      setMousePos([event.clientX, event.clientY]);
    };
    var _useAlign = useAlign(mergedOpen, popupEle, alignPoint ? mousePos : targetEle, popupPlacement, builtinPlacements, popupAlign, onPopupAlign), _useAlign2 = _slicedToArray(_useAlign, 11), ready = _useAlign2[0], offsetX = _useAlign2[1], offsetY = _useAlign2[2], offsetR = _useAlign2[3], offsetB = _useAlign2[4], arrowX = _useAlign2[5], arrowY = _useAlign2[6], scaleX = _useAlign2[7], scaleY = _useAlign2[8], alignInfo = _useAlign2[9], onAlign = _useAlign2[10];
    var _useAction = useAction(mobile, action, showAction, hideAction), _useAction2 = _slicedToArray(_useAction, 2), showActions = _useAction2[0], hideActions = _useAction2[1];
    var clickToShow = showActions.has("click");
    var clickToHide = hideActions.has("click") || hideActions.has("contextMenu");
    var triggerAlign = useEvent(function() {
      if (!inMotion) {
        onAlign();
      }
    });
    var onScroll = function onScroll2() {
      if (openRef.current && alignPoint && clickToHide) {
        triggerOpen(false);
      }
    };
    useWatch(mergedOpen, targetEle, popupEle, triggerAlign, onScroll);
    useLayoutEffect_default(function() {
      triggerAlign();
    }, [mousePos, popupPlacement]);
    useLayoutEffect_default(function() {
      if (mergedOpen && !(builtinPlacements !== null && builtinPlacements !== void 0 && builtinPlacements[popupPlacement])) {
        triggerAlign();
      }
    }, [JSON.stringify(popupAlign)]);
    var alignedClassName = React22.useMemo(function() {
      var baseClassName = getAlignPopupClassName(builtinPlacements, prefixCls, alignInfo, alignPoint);
      return (0, import_classnames4.default)(baseClassName, getPopupClassNameFromAlign === null || getPopupClassNameFromAlign === void 0 ? void 0 : getPopupClassNameFromAlign(alignInfo));
    }, [alignInfo, getPopupClassNameFromAlign, builtinPlacements, prefixCls, alignPoint]);
    React22.useImperativeHandle(ref, function() {
      return {
        nativeElement: externalForwardRef.current,
        forceAlign: triggerAlign
      };
    });
    var _React$useState15 = React22.useState(0), _React$useState16 = _slicedToArray(_React$useState15, 2), targetWidth = _React$useState16[0], setTargetWidth = _React$useState16[1];
    var _React$useState17 = React22.useState(0), _React$useState18 = _slicedToArray(_React$useState17, 2), targetHeight = _React$useState18[0], setTargetHeight = _React$useState18[1];
    var syncTargetSize = function syncTargetSize2() {
      if (stretch && targetEle) {
        var rect = targetEle.getBoundingClientRect();
        setTargetWidth(rect.width);
        setTargetHeight(rect.height);
      }
    };
    var onTargetResize = function onTargetResize2() {
      syncTargetSize();
      triggerAlign();
    };
    var onVisibleChanged = function onVisibleChanged2(visible) {
      setInMotion(false);
      onAlign();
      afterPopupVisibleChange === null || afterPopupVisibleChange === void 0 || afterPopupVisibleChange(visible);
    };
    var onPrepare = function onPrepare2() {
      return new Promise(function(resolve) {
        syncTargetSize();
        setMotionPrepareResolve(function() {
          return resolve;
        });
      });
    };
    useLayoutEffect_default(function() {
      if (motionPrepareResolve) {
        onAlign();
        motionPrepareResolve();
        setMotionPrepareResolve(null);
      }
    }, [motionPrepareResolve]);
    function wrapperAction(eventName, nextOpen, delay, preEvent) {
      cloneProps[eventName] = function(event) {
        var _originChildProps$eve;
        preEvent === null || preEvent === void 0 || preEvent(event);
        triggerOpen(nextOpen, delay);
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        (_originChildProps$eve = originChildProps[eventName]) === null || _originChildProps$eve === void 0 || _originChildProps$eve.call.apply(_originChildProps$eve, [originChildProps, event].concat(args));
      };
    }
    if (clickToShow || clickToHide) {
      cloneProps.onClick = function(event) {
        var _originChildProps$onC;
        if (openRef.current && clickToHide) {
          triggerOpen(false);
        } else if (!openRef.current && clickToShow) {
          setMousePosByEvent(event);
          triggerOpen(true);
        }
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        (_originChildProps$onC = originChildProps.onClick) === null || _originChildProps$onC === void 0 || _originChildProps$onC.call.apply(_originChildProps$onC, [originChildProps, event].concat(args));
      };
    }
    useWinClick(mergedOpen, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen);
    var hoverToShow = showActions.has("hover");
    var hoverToHide = hideActions.has("hover");
    var onPopupMouseEnter;
    var onPopupMouseLeave;
    if (hoverToShow) {
      wrapperAction("onMouseEnter", true, mouseEnterDelay, function(event) {
        setMousePosByEvent(event);
      });
      wrapperAction("onPointerEnter", true, mouseEnterDelay, function(event) {
        setMousePosByEvent(event);
      });
      onPopupMouseEnter = function onPopupMouseEnter2() {
        if (mergedOpen || inMotion) {
          triggerOpen(true, mouseEnterDelay);
        }
      };
      if (alignPoint) {
        cloneProps.onMouseMove = function(event) {
          var _originChildProps$onM;
          (_originChildProps$onM = originChildProps.onMouseMove) === null || _originChildProps$onM === void 0 || _originChildProps$onM.call(originChildProps, event);
        };
      }
    }
    if (hoverToHide) {
      wrapperAction("onMouseLeave", false, mouseLeaveDelay);
      wrapperAction("onPointerLeave", false, mouseLeaveDelay);
      onPopupMouseLeave = function onPopupMouseLeave2() {
        triggerOpen(false, mouseLeaveDelay);
      };
    }
    if (showActions.has("focus")) {
      wrapperAction("onFocus", true, focusDelay);
    }
    if (hideActions.has("focus")) {
      wrapperAction("onBlur", false, blurDelay);
    }
    if (showActions.has("contextMenu")) {
      cloneProps.onContextMenu = function(event) {
        var _originChildProps$onC2;
        if (openRef.current && hideActions.has("contextMenu")) {
          triggerOpen(false);
        } else {
          setMousePosByEvent(event);
          triggerOpen(true);
        }
        event.preventDefault();
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        (_originChildProps$onC2 = originChildProps.onContextMenu) === null || _originChildProps$onC2 === void 0 || _originChildProps$onC2.call.apply(_originChildProps$onC2, [originChildProps, event].concat(args));
      };
    }
    if (className) {
      cloneProps.className = (0, import_classnames4.default)(originChildProps.className, className);
    }
    var mergedChildrenProps = _objectSpread2(_objectSpread2({}, originChildProps), cloneProps);
    var passedProps = {};
    var passedEventList = ["onContextMenu", "onClick", "onMouseDown", "onTouchStart", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur"];
    passedEventList.forEach(function(eventName) {
      if (restProps[eventName]) {
        passedProps[eventName] = function() {
          var _mergedChildrenProps$;
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          (_mergedChildrenProps$ = mergedChildrenProps[eventName]) === null || _mergedChildrenProps$ === void 0 || _mergedChildrenProps$.call.apply(_mergedChildrenProps$, [mergedChildrenProps].concat(args));
          restProps[eventName].apply(restProps, args);
        };
      }
    });
    var triggerNode = React22.cloneElement(child, _objectSpread2(_objectSpread2({}, mergedChildrenProps), passedProps));
    var arrowPos = {
      x: arrowX,
      y: arrowY
    };
    var innerArrow = arrow ? _objectSpread2({}, arrow !== true ? arrow : {}) : null;
    return React22.createElement(React22.Fragment, null, React22.createElement(es_default2, {
      disabled: !mergedOpen,
      ref: setTargetRef,
      onResize: onTargetResize
    }, React22.createElement(TriggerWrapper_default, {
      getTriggerDOMNode
    }, triggerNode)), React22.createElement(context_default.Provider, {
      value: context
    }, React22.createElement(Popup_default, {
      portal: PortalComponent,
      ref: setPopupRef,
      prefixCls,
      popup,
      className: (0, import_classnames4.default)(popupClassName, alignedClassName),
      style: popupStyle,
      target: targetEle,
      onMouseEnter: onPopupMouseEnter,
      onMouseLeave: onPopupMouseLeave,
      onPointerEnter: onPopupMouseEnter,
      zIndex,
      open: mergedOpen,
      keepDom: inMotion,
      fresh,
      onClick: onPopupClick,
      mask,
      motion: mergePopupMotion,
      maskMotion: mergeMaskMotion,
      onVisibleChanged,
      onPrepare,
      forceRender,
      autoDestroy: mergedAutoDestroy,
      getPopupContainer,
      align: alignInfo,
      arrow: innerArrow,
      arrowPos,
      ready,
      offsetX,
      offsetY,
      offsetR,
      offsetB,
      onAlign: triggerAlign,
      stretch,
      targetWidth: targetWidth / scaleX,
      targetHeight: targetHeight / scaleY
    })));
  });
  if (true) {
    Trigger.displayName = "Trigger";
  }
  return Trigger;
}
var es_default4 = generateTrigger(es_default3);

export {
  ResizeObserver_es_default,
  es_default2 as es_default,
  isValidElement,
  isFragment,
  replaceElement,
  cloneElement2 as cloneElement,
  KeyCode_default,
  zindexContext_default,
  CONTAINER_MAX_OFFSET,
  useZIndex,
  isVisible_default,
  getScrollBarSize,
  getTargetScrollBarSize,
  es_default3 as es_default2,
  useId_default,
  isMobile_default,
  es_default4 as es_default3
};
//# sourceMappingURL=chunk-5BQ5A4MQ.js.map
