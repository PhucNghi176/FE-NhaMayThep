import {
  KeyCode_default,
  cloneElement,
  es_default,
  es_default3 as es_default2,
  isFragment,
  isValidElement,
  useZIndex,
  zindexContext_default
} from "./chunk-5BQ5A4MQ.js";
import {
  ConfigContext,
  DisabledContext_default,
  PresetColors,
  SizeContext_default,
  clearFix,
  devUseWarning,
  genPresetColor,
  genStyleHooks,
  get,
  merge,
  merge2,
  operationUnit,
  resetComponent,
  set,
  useLocale_default
} from "./chunk-6EUW25GY.js";
import {
  Keyframes_default,
  _assertThisInitialized,
  _classCallCheck,
  _createClass,
  _createSuper,
  _inherits,
  _toConsumableArray,
  isEqual_default,
  omit,
  raf_default,
  toArray,
  unit,
  useLayoutEffect_default,
  useMergedState,
  useToken
} from "./chunk-77HUS2UZ.js";
import {
  CheckOutlined_default,
  CloseCircleFilled_default,
  CopyOutlined_default,
  EditOutlined_default,
  EnterOutlined_default
} from "./chunk-NVIHSGN7.js";
import {
  _defineProperty,
  _extends,
  _objectSpread2,
  _objectWithoutProperties,
  _slicedToArray,
  _typeof,
  canUseDom,
  composeRef,
  gold,
  require_classnames,
  warning_default
} from "./chunk-MU5D4VIA.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
  "node_modules/toggle-selection/index.js"(exports, module) {
    module.exports = function() {
      var selection = document.getSelection();
      if (!selection.rangeCount) {
        return function() {
        };
      }
      var active = document.activeElement;
      var ranges = [];
      for (var i = 0; i < selection.rangeCount; i++) {
        ranges.push(selection.getRangeAt(i));
      }
      switch (active.tagName.toUpperCase()) {
        case "INPUT":
        case "TEXTAREA":
          active.blur();
          break;
        default:
          active = null;
          break;
      }
      selection.removeAllRanges();
      return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) {
          ranges.forEach(function(range3) {
            selection.addRange(range3);
          });
        }
        active && active.focus();
      };
    };
  }
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
  "node_modules/copy-to-clipboard/index.js"(exports, module) {
    "use strict";
    var deselectCurrent = require_toggle_selection();
    var clipboardToIE11Formatting = {
      "text/plain": "Text",
      "text/html": "Url",
      "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format2(message) {
      var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
      return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy2(text, options) {
      var debug, message, reselectPrevious, range3, selection, mark, success = false;
      if (!options) {
        options = {};
      }
      debug = options.debug || false;
      try {
        reselectPrevious = deselectCurrent();
        range3 = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        mark.ariaHidden = "true";
        mark.style.all = "unset";
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e) {
          e.stopPropagation();
          if (options.format) {
            e.preventDefault();
            if (typeof e.clipboardData === "undefined") {
              debug && console.warn("unable to use e.clipboardData");
              debug && console.warn("trying IE specific stuff");
              window.clipboardData.clearData();
              var format3 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
              window.clipboardData.setData(format3, text);
            } else {
              e.clipboardData.clearData();
              e.clipboardData.setData(options.format, text);
            }
          }
          if (options.onCopy) {
            e.preventDefault();
            options.onCopy(e.clipboardData);
          }
        });
        document.body.appendChild(mark);
        range3.selectNodeContents(mark);
        selection.addRange(range3);
        var successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("copy command was unsuccessful");
        }
        success = true;
      } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
          window.clipboardData.setData(options.format || "text", text);
          options.onCopy && options.onCopy(window.clipboardData);
          success = true;
        } catch (err2) {
          debug && console.error("unable to copy using clipboardData: ", err2);
          debug && console.error("falling back to prompt");
          message = format2("message" in options ? options.message : defaultMessage);
          window.prompt(message, text);
        }
      } finally {
        if (selection) {
          if (typeof selection.removeRange == "function") {
            selection.removeRange(range3);
          } else {
            selection.removeAllRanges();
          }
        }
        if (mark) {
          document.body.removeChild(mark);
        }
        reselectPrevious();
      }
      return success;
    }
    module.exports = copy2;
  }
});

// node_modules/antd/es/typography/Link.js
var React32 = __toESM(require_react());

// node_modules/antd/es/typography/Base/index.js
var import_classnames15 = __toESM(require_classnames());
var import_copy_to_clipboard = __toESM(require_copy_to_clipboard());
var React31 = __toESM(require_react());

// node_modules/rc-util/es/Dom/styleChecker.js
var isStyleNameSupport = function isStyleNameSupport2(styleName) {
  if (canUseDom() && window.document.documentElement) {
    var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    var documentElement = window.document.documentElement;
    return styleNameList.some(function(name) {
      return name in documentElement.style;
    });
  }
  return false;
};
var isStyleValueSupport = function isStyleValueSupport2(styleName, value) {
  if (!isStyleNameSupport(styleName)) {
    return false;
  }
  var ele = document.createElement("div");
  var origin = ele.style[styleName];
  ele.style[styleName] = value;
  return ele.style[styleName] !== origin;
};
function isStyleSupport(styleName, styleValue) {
  if (!Array.isArray(styleName) && styleValue !== void 0) {
    return isStyleValueSupport(styleName, styleValue);
  }
  return isStyleNameSupport(styleName);
}

// node_modules/antd/es/_util/styleChecker.js
var canUseDocElement = () => canUseDom() && window.document.documentElement;

// node_modules/antd/es/_util/transButton.js
var React = __toESM(require_react());
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var inlineStyle = {
  border: 0,
  background: "transparent",
  padding: 0,
  lineHeight: "inherit",
  display: "inline-block"
};
var TransButton = React.forwardRef((props, ref) => {
  const onKeyDown = (event) => {
    const {
      keyCode
    } = event;
    if (keyCode === KeyCode_default.ENTER) {
      event.preventDefault();
    }
  };
  const onKeyUp = (event) => {
    const {
      keyCode
    } = event;
    const {
      onClick
    } = props;
    if (keyCode === KeyCode_default.ENTER && onClick) {
      onClick();
    }
  };
  const {
    style,
    noStyle,
    disabled
  } = props, restProps = __rest(props, ["style", "noStyle", "disabled"]);
  let mergedStyle = {};
  if (!noStyle) {
    mergedStyle = Object.assign({}, inlineStyle);
  }
  if (disabled) {
    mergedStyle.pointerEvents = "none";
  }
  mergedStyle = Object.assign(Object.assign({}, mergedStyle), style);
  return React.createElement("div", Object.assign({
    role: "button",
    tabIndex: 0,
    ref
  }, restProps, {
    onKeyDown,
    onKeyUp,
    style: mergedStyle
  }));
});
var transButton_default = TransButton;

// node_modules/antd/es/tooltip/index.js
var React7 = __toESM(require_react());
var import_classnames5 = __toESM(require_classnames());

// node_modules/rc-tooltip/es/Popup.js
var import_classnames = __toESM(require_classnames());
var React2 = __toESM(require_react());
function Popup(props) {
  var children = props.children, prefixCls = props.prefixCls, id = props.id, overlayInnerStyle = props.overlayInnerStyle, className = props.className, style = props.style;
  return React2.createElement("div", {
    className: (0, import_classnames.default)("".concat(prefixCls, "-content"), className),
    style
  }, React2.createElement("div", {
    className: "".concat(prefixCls, "-inner"),
    id,
    role: "tooltip",
    style: overlayInnerStyle
  }, typeof children === "function" ? children() : children));
}

// node_modules/rc-tooltip/es/Tooltip.js
var React3 = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/rc-tooltip/es/placements.js
var autoAdjustOverflowTopBottom = {
  shiftX: 64,
  adjustY: 1
};
var autoAdjustOverflowLeftRight = {
  adjustX: 1,
  shiftY: true
};
var targetOffset = [0, 0];
var placements = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  }
};

// node_modules/rc-tooltip/es/Tooltip.js
var _excluded = ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "motion", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer", "overlayInnerStyle", "arrowContent", "overlay", "id", "showArrow"];
var Tooltip = function Tooltip2(props, ref) {
  var overlayClassName = props.overlayClassName, _props$trigger = props.trigger, trigger = _props$trigger === void 0 ? ["hover"] : _props$trigger, _props$mouseEnterDela = props.mouseEnterDelay, mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0 : _props$mouseEnterDela, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, overlayStyle = props.overlayStyle, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tooltip" : _props$prefixCls, children = props.children, onVisibleChange = props.onVisibleChange, afterVisibleChange = props.afterVisibleChange, transitionName = props.transitionName, animation = props.animation, motion = props.motion, _props$placement = props.placement, placement = _props$placement === void 0 ? "right" : _props$placement, _props$align = props.align, align = _props$align === void 0 ? {} : _props$align, _props$destroyTooltip = props.destroyTooltipOnHide, destroyTooltipOnHide = _props$destroyTooltip === void 0 ? false : _props$destroyTooltip, defaultVisible = props.defaultVisible, getTooltipContainer = props.getTooltipContainer, overlayInnerStyle = props.overlayInnerStyle, arrowContent = props.arrowContent, overlay = props.overlay, id = props.id, _props$showArrow = props.showArrow, showArrow = _props$showArrow === void 0 ? true : _props$showArrow, restProps = _objectWithoutProperties(props, _excluded);
  var triggerRef = (0, import_react.useRef)(null);
  (0, import_react.useImperativeHandle)(ref, function() {
    return triggerRef.current;
  });
  var extraProps = _objectSpread2({}, restProps);
  if ("visible" in props) {
    extraProps.popupVisible = props.visible;
  }
  var getPopupElement = function getPopupElement2() {
    return React3.createElement(Popup, {
      key: "content",
      prefixCls,
      id,
      overlayInnerStyle
    }, overlay);
  };
  return React3.createElement(es_default2, _extends({
    popupClassName: overlayClassName,
    prefixCls,
    popup: getPopupElement,
    action: trigger,
    builtinPlacements: placements,
    popupPlacement: placement,
    ref: triggerRef,
    popupAlign: align,
    getPopupContainer: getTooltipContainer,
    onPopupVisibleChange: onVisibleChange,
    afterPopupVisibleChange: afterVisibleChange,
    popupTransitionName: transitionName,
    popupAnimation: animation,
    popupMotion: motion,
    defaultPopupVisible: defaultVisible,
    autoDestroy: destroyTooltipOnHide,
    mouseLeaveDelay,
    popupStyle: overlayStyle,
    mouseEnterDelay,
    arrow: showArrow
  }, extraProps), children);
};
var Tooltip_default = (0, import_react.forwardRef)(Tooltip);

// node_modules/rc-tooltip/es/index.js
var es_default3 = Tooltip_default;

// node_modules/antd/es/_util/motion.js
var getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});
var getRealHeight = (node) => {
  const {
    scrollHeight
  } = node;
  return {
    height: scrollHeight,
    opacity: 1
  };
};
var getCurrentHeight = (node) => ({
  height: node ? node.offsetHeight : 0
});
var skipOpacityTransition = (_, event) => (event === null || event === void 0 ? void 0 : event.deadline) === true || event.propertyName === "height";
var initCollapseMotion = function() {
  let rootCls = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ant";
  return {
    motionName: `${rootCls}-motion-collapse`,
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
    onAppearEnd: skipOpacityTransition,
    onEnterEnd: skipOpacityTransition,
    onLeaveEnd: skipOpacityTransition,
    motionDeadline: 500
  };
};
var getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
var motion_default = initCollapseMotion;

// node_modules/antd/es/style/roundedArrow.js
function getArrowToken(token) {
  const {
    sizePopupArrow,
    borderRadiusXS,
    borderRadiusOuter
  } = token;
  const unitWidth = sizePopupArrow / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = borderRadiusOuter * 1 / Math.sqrt(2);
  const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
  const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
  const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
  const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
  const arrowPath = `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`;
  return {
    arrowShadowWidth: shadowWidth,
    arrowPath,
    arrowPolygon
  };
}
var genRoundedArrow = (token, bgColor, boxShadow) => {
  const {
    sizePopupArrow,
    arrowPolygon,
    arrowPath,
    arrowShadowWidth,
    borderRadiusXS,
    calc
  } = token;
  return {
    pointerEvents: "none",
    width: sizePopupArrow,
    height: sizePopupArrow,
    overflow: "hidden",
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width: sizePopupArrow,
      height: calc(sizePopupArrow).div(2).equal(),
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [arrowPolygon, arrowPath]
      },
      content: '""'
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: arrowShadowWidth,
      height: arrowShadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${unit(borderRadiusXS)} 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    }
  };
};

// node_modules/antd/es/style/placementArrow.js
var MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffsetToken(options) {
  const {
    contentRadius,
    limitVerticalRadius
  } = options;
  const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
  const arrowOffsetVertical = limitVerticalRadius ? MAX_VERTICAL_CONTENT_RADIUS : arrowOffset;
  return {
    arrowOffsetHorizontal: arrowOffset,
    arrowOffsetVertical
  };
}
function isInject(valid, code) {
  if (!valid)
    return {};
  return code;
}
function getArrowStyle(token, colorBg, options) {
  const {
    componentCls,
    boxShadowPopoverArrow,
    arrowOffsetVertical,
    arrowOffsetHorizontal
  } = token;
  const {
    arrowDistance = 0,
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true
    }
  } = options || {};
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [Object.assign(Object.assign({
        position: "absolute",
        zIndex: 1,
        display: "block"
      }, genRoundedArrow(token, colorBg, boxShadowPopoverArrow)), {
        "&:before": {
          background: colorBg
        }
      })]
    }, isInject(!!arrowPlacement.top, {
      [[`&-placement-top ${componentCls}-arrow`, `&-placement-topLeft ${componentCls}-arrow`, `&-placement-topRight ${componentCls}-arrow`].join(",")]: {
        bottom: arrowDistance,
        transform: "translateY(100%) rotate(180deg)"
      },
      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateX(-50%) translateY(100%) rotate(180deg)"
      },
      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: arrowOffsetHorizontal
        }
      },
      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: arrowOffsetHorizontal
        }
      }
    })), isInject(!!arrowPlacement.bottom, {
      [[`&-placement-bottom ${componentCls}-arrow`, `&-placement-bottomLeft ${componentCls}-arrow`, `&-placement-bottomRight ${componentCls}-arrow`].join(",")]: {
        top: arrowDistance,
        transform: `translateY(-100%)`
      },
      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: `translateX(-50%) translateY(-100%)`
      },
      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: arrowOffsetHorizontal
        }
      },
      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: arrowOffsetHorizontal
        }
      }
    })), isInject(!!arrowPlacement.left, {
      [[`&-placement-left ${componentCls}-arrow`, `&-placement-leftTop ${componentCls}-arrow`, `&-placement-leftBottom ${componentCls}-arrow`].join(",")]: {
        right: {
          _skip_check_: true,
          value: arrowDistance
        },
        transform: "translateX(100%) rotate(90deg)"
      },
      [`&-placement-left ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(100%) rotate(90deg)"
      },
      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: arrowOffsetVertical
      },
      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: arrowOffsetVertical
      }
    })), isInject(!!arrowPlacement.right, {
      [[`&-placement-right ${componentCls}-arrow`, `&-placement-rightTop ${componentCls}-arrow`, `&-placement-rightBottom ${componentCls}-arrow`].join(",")]: {
        left: {
          _skip_check_: true,
          value: arrowDistance
        },
        transform: "translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-right ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: arrowOffsetVertical
      },
      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: arrowOffsetVertical
      }
    }))
  };
}

// node_modules/antd/es/_util/placements.js
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
  if (autoAdjustOverflow === false) {
    return {
      adjustX: false,
      adjustY: false
    };
  }
  const overflow = autoAdjustOverflow && typeof autoAdjustOverflow === "object" ? autoAdjustOverflow : {};
  const baseOverflow = {};
  switch (placement) {
    case "top":
    case "bottom":
      baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
      baseOverflow.shiftY = true;
      baseOverflow.adjustY = true;
      break;
    case "left":
    case "right":
      baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
      baseOverflow.shiftX = true;
      baseOverflow.adjustX = true;
      break;
  }
  const mergedOverflow = Object.assign(Object.assign({}, baseOverflow), overflow);
  if (!mergedOverflow.shiftX) {
    mergedOverflow.adjustX = true;
  }
  if (!mergedOverflow.shiftY) {
    mergedOverflow.adjustY = true;
  }
  return mergedOverflow;
}
var PlacementAlignMap = {
  left: {
    points: ["cr", "cl"]
  },
  right: {
    points: ["cl", "cr"]
  },
  top: {
    points: ["bc", "tc"]
  },
  bottom: {
    points: ["tc", "bc"]
  },
  topLeft: {
    points: ["bl", "tl"]
  },
  leftTop: {
    points: ["tr", "tl"]
  },
  topRight: {
    points: ["br", "tr"]
  },
  rightTop: {
    points: ["tl", "tr"]
  },
  bottomRight: {
    points: ["tr", "br"]
  },
  rightBottom: {
    points: ["bl", "br"]
  },
  bottomLeft: {
    points: ["tl", "bl"]
  },
  leftBottom: {
    points: ["br", "bl"]
  }
};
var ArrowCenterPlacementAlignMap = {
  topLeft: {
    points: ["bl", "tc"]
  },
  leftTop: {
    points: ["tr", "cl"]
  },
  topRight: {
    points: ["br", "tc"]
  },
  rightTop: {
    points: ["tl", "cr"]
  },
  bottomRight: {
    points: ["tr", "bc"]
  },
  rightBottom: {
    points: ["bl", "cr"]
  },
  bottomLeft: {
    points: ["tl", "bc"]
  },
  leftBottom: {
    points: ["br", "cl"]
  }
};
var DisableAutoArrowList = /* @__PURE__ */ new Set(["topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]);
function getPlacements(config) {
  const {
    arrowWidth,
    autoAdjustOverflow,
    arrowPointAtCenter,
    offset,
    borderRadius,
    visibleFirst
  } = config;
  const halfArrowWidth = arrowWidth / 2;
  const placementMap = {};
  Object.keys(PlacementAlignMap).forEach((key) => {
    const template = arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key];
    const placementInfo = Object.assign(Object.assign({}, template), {
      offset: [0, 0],
      dynamicInset: true
    });
    placementMap[key] = placementInfo;
    if (DisableAutoArrowList.has(key)) {
      placementInfo.autoArrow = false;
    }
    switch (key) {
      case "top":
      case "topLeft":
      case "topRight":
        placementInfo.offset[1] = -halfArrowWidth - offset;
        break;
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        placementInfo.offset[1] = halfArrowWidth + offset;
        break;
      case "left":
      case "leftTop":
      case "leftBottom":
        placementInfo.offset[0] = -halfArrowWidth - offset;
        break;
      case "right":
      case "rightTop":
      case "rightBottom":
        placementInfo.offset[0] = halfArrowWidth + offset;
        break;
    }
    const arrowOffset = getArrowOffsetToken({
      contentRadius: borderRadius,
      limitVerticalRadius: true
    });
    if (arrowPointAtCenter) {
      switch (key) {
        case "topLeft":
        case "bottomLeft":
          placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;
        case "topRight":
        case "bottomRight":
          placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;
        case "leftTop":
        case "rightTop":
          placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;
        case "leftBottom":
        case "rightBottom":
          placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;
      }
    }
    placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
    if (visibleFirst) {
      placementInfo.htmlRegion = "visibleFirst";
    }
  });
  return placementMap;
}

// node_modules/antd/es/space/Compact.js
var import_classnames2 = __toESM(require_classnames());
var React5 = __toESM(require_react());

// node_modules/antd/es/config-provider/hooks/useSize.js
var import_react2 = __toESM(require_react());
var useSize = (customSize) => {
  const size = import_react2.default.useContext(SizeContext_default);
  const mergedSize = import_react2.default.useMemo(() => {
    if (!customSize) {
      return size;
    }
    if (typeof customSize === "string") {
      return customSize !== null && customSize !== void 0 ? customSize : size;
    }
    if (customSize instanceof Function) {
      return customSize(size);
    }
    return size;
  }, [customSize, size]);
  return mergedSize;
};
var useSize_default = useSize;

// node_modules/antd/es/space/style/compact.js
var genSpaceCompactStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-block": {
        display: "flex",
        width: "100%"
      },
      "&-vertical": {
        flexDirection: "column"
      }
    }
  };
};
var compact_default = genSpaceCompactStyle;

// node_modules/antd/es/space/style/index.js
var genSpaceStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-rtl": {
        direction: "rtl"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-align": {
        flexDirection: "column",
        "&-center": {
          alignItems: "center"
        },
        "&-start": {
          alignItems: "flex-start"
        },
        "&-end": {
          alignItems: "flex-end"
        },
        "&-baseline": {
          alignItems: "baseline"
        }
      },
      [`${componentCls}-item:empty`]: {
        display: "none"
      }
    }
  };
};
var genSpaceGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-row-small": {
        rowGap: token.spaceGapSmallSize
      },
      "&-gap-row-middle": {
        rowGap: token.spaceGapMiddleSize
      },
      "&-gap-row-large": {
        rowGap: token.spaceGapLargeSize
      },
      "&-gap-col-small": {
        columnGap: token.spaceGapSmallSize
      },
      "&-gap-col-middle": {
        columnGap: token.spaceGapMiddleSize
      },
      "&-gap-col-large": {
        columnGap: token.spaceGapLargeSize
      }
    }
  };
};
var style_default = genStyleHooks("Space", (token) => {
  const spaceToken = merge2(token, {
    spaceGapSmallSize: token.paddingXS,
    spaceGapMiddleSize: token.padding,
    spaceGapLargeSize: token.paddingLG
  });
  return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken), compact_default(spaceToken)];
}, () => ({}), {
  // Space component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/40315
  resetStyle: false
});

// node_modules/antd/es/space/Compact.js
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var SpaceCompactItemContext = React5.createContext(null);
var useCompactItemContext = (prefixCls, direction) => {
  const compactItemContext = React5.useContext(SpaceCompactItemContext);
  const compactItemClassnames = React5.useMemo(() => {
    if (!compactItemContext) {
      return "";
    }
    const {
      compactDirection,
      isFirstItem,
      isLastItem
    } = compactItemContext;
    const separator = compactDirection === "vertical" ? "-vertical-" : "-";
    return (0, import_classnames2.default)(`${prefixCls}-compact${separator}item`, {
      [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls}-compact${separator}item-rtl`]: direction === "rtl"
    });
  }, [prefixCls, direction, compactItemContext]);
  return {
    compactSize: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize,
    compactDirection: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection,
    compactItemClassnames
  };
};
var NoCompactStyle = (_ref) => {
  let {
    children
  } = _ref;
  return React5.createElement(SpaceCompactItemContext.Provider, {
    value: null
  }, children);
};
var CompactItem = (_a) => {
  var {
    children
  } = _a, otherProps = __rest2(_a, ["children"]);
  return React5.createElement(SpaceCompactItemContext.Provider, {
    value: otherProps
  }, children);
};
var Compact = (props) => {
  const {
    getPrefixCls,
    direction: directionConfig
  } = React5.useContext(ConfigContext);
  const {
    size,
    direction,
    block,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children
  } = props, restProps = __rest2(props, ["size", "direction", "block", "prefixCls", "className", "rootClassName", "children"]);
  const mergedSize = useSize_default((ctx) => size !== null && size !== void 0 ? size : ctx);
  const prefixCls = getPrefixCls("space-compact", customizePrefixCls);
  const [wrapCSSVar, hashId] = style_default(prefixCls);
  const clx = (0, import_classnames2.default)(prefixCls, hashId, {
    [`${prefixCls}-rtl`]: directionConfig === "rtl",
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-vertical`]: direction === "vertical"
  }, className, rootClassName);
  const compactItemContext = React5.useContext(SpaceCompactItemContext);
  const childNodes = toArray(children);
  const nodes = React5.useMemo(() => childNodes.map((child, i) => {
    const key = child && child.key || `${prefixCls}-item-${i}`;
    return React5.createElement(CompactItem, {
      key,
      compactSize: mergedSize,
      compactDirection: direction,
      isFirstItem: i === 0 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
      isLastItem: i === childNodes.length - 1 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
    }, child);
  }), [size, childNodes, compactItemContext]);
  if (childNodes.length === 0) {
    return null;
  }
  return wrapCSSVar(React5.createElement("div", Object.assign({
    className: clx
  }, restProps), nodes));
};
var Compact_default = Compact;

// node_modules/antd/es/tooltip/PurePanel.js
var import_classnames4 = __toESM(require_classnames());
var React6 = __toESM(require_react());

// node_modules/antd/es/style/motion/motion.js
var initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
var initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
var initMotion = function(motionCls, inKeyframes, outKeyframes, duration) {
  let sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return {
    [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: Object.assign(Object.assign({}, initMotionCommon(duration)), {
      animationPlayState: "paused"
    }),
    [`${sameLevelPrefix}${motionCls}-leave`]: Object.assign(Object.assign({}, initMotionCommonLeave(duration)), {
      animationPlayState: "paused"
    }),
    [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes,
      animationPlayState: "running"
    },
    [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
};

// node_modules/antd/es/style/motion/fade.js
var fadeIn = new Keyframes_default("antFadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
var fadeOut = new Keyframes_default("antFadeOut", {
  "0%": {
    opacity: 1
  },
  "100%": {
    opacity: 0
  }
});
var initFadeMotion = function(token) {
  let sameLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-fade`;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel), {
    [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: "linear"
    },
    [`${sameLevelPrefix}${motionCls}-leave`]: {
      animationTimingFunction: "linear"
    }
  }];
};

// node_modules/antd/es/style/motion/move.js
var moveDownIn = new Keyframes_default("antMoveDownIn", {
  "0%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
var moveDownOut = new Keyframes_default("antMoveDownOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
var moveLeftIn = new Keyframes_default("antMoveLeftIn", {
  "0%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
var moveLeftOut = new Keyframes_default("antMoveLeftOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
var moveRightIn = new Keyframes_default("antMoveRightIn", {
  "0%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
var moveRightOut = new Keyframes_default("antMoveRightOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
var moveUpIn = new Keyframes_default("antMoveUpIn", {
  "0%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
var moveUpOut = new Keyframes_default("antMoveUpOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
var moveMotion = {
  "move-up": {
    inKeyframes: moveUpIn,
    outKeyframes: moveUpOut
  },
  "move-down": {
    inKeyframes: moveDownIn,
    outKeyframes: moveDownOut
  },
  "move-left": {
    inKeyframes: moveLeftIn,
    outKeyframes: moveLeftOut
  },
  "move-right": {
    inKeyframes: moveRightIn,
    outKeyframes: moveRightOut
  }
};
var initMoveMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = moveMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};

// node_modules/antd/es/style/motion/slide.js
var slideUpIn = new Keyframes_default("antSlideUpIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
var slideUpOut = new Keyframes_default("antSlideUpOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
var slideDownIn = new Keyframes_default("antSlideDownIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  }
});
var slideDownOut = new Keyframes_default("antSlideDownOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  }
});
var slideLeftIn = new Keyframes_default("antSlideLeftIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
var slideLeftOut = new Keyframes_default("antSlideLeftOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
var slideRightIn = new Keyframes_default("antSlideRightIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  }
});
var slideRightOut = new Keyframes_default("antSlideRightOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  }
});
var slideMotion = {
  "slide-up": {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut
  },
  "slide-down": {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut
  },
  "slide-left": {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut
  },
  "slide-right": {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut
  }
};
var initSlideMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = slideMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      transform: "scale(0)",
      transformOrigin: "0% 0%",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutQuint,
      [`&-prepare`]: {
        transform: "scale(1)"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInQuint
    }
  }];
};

// node_modules/antd/es/style/motion/zoom.js
var zoomIn = new Keyframes_default("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
var zoomOut = new Keyframes_default("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
var zoomBigIn = new Keyframes_default("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
var zoomBigOut = new Keyframes_default("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
var zoomUpIn = new Keyframes_default("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
var zoomUpOut = new Keyframes_default("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
var zoomLeftIn = new Keyframes_default("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
var zoomLeftOut = new Keyframes_default("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
var zoomRightIn = new Keyframes_default("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
var zoomRightOut = new Keyframes_default("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
var zoomDownIn = new Keyframes_default("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
var zoomDownOut = new Keyframes_default("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
var zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
var initZoomMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};

// node_modules/antd/es/style/motion/collapse.js
var genCollapseMotion = (token) => ({
  [token.componentCls]: {
    // For common/openAnimation
    [`${token.antCls}-motion-collapse-legacy`]: {
      overflow: "hidden",
      "&-active": {
        transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
      }
    },
    [`${token.antCls}-motion-collapse`]: {
      overflow: "hidden",
      transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
    }
  }
});
var collapse_default = genCollapseMotion;

// node_modules/antd/es/tooltip/style/index.js
var genTooltipStyle = (token) => {
  const {
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        width: "max-content",
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        transformOrigin: `var(--arrow-x, 50%) var(--arrow-y, 50%)`,
        "&-hidden": {
          display: "none"
        },
        "--antd-arrow-background-color": tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
          color: tooltipColor,
          textAlign: "start",
          textDecoration: "none",
          wordWrap: "break-word",
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary,
          boxSizing: "border-box"
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: token.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        }
      }), genPresetColor(token, (colorKey, _ref) => {
        let {
          darkColor
        } = _ref;
        return {
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor
            },
            [`${componentCls}-arrow`]: {
              "--antd-arrow-background-color": darkColor
            }
          }
        };
      })), {
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      })
    },
    // Arrow Style
    getArrowStyle(token, "var(--antd-arrow-background-color)"),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        margin: token.sizePopupArrow
      }
    }
  ];
};
var prepareComponentToken = (token) => Object.assign(Object.assign({
  zIndexPopup: token.zIndexPopupBase + 70
}, getArrowOffsetToken({
  contentRadius: token.borderRadius,
  limitVerticalRadius: true
})), getArrowToken(merge2(token, {
  borderRadiusOuter: Math.min(token.borderRadiusOuter, 4)
})));
var style_default2 = function(prefixCls) {
  let injectStyle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const useStyle = genStyleHooks("Tooltip", (token) => {
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgSpotlight
    } = token;
    const TooltipToken = merge2(token, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgSpotlight
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token, "zoom-big-fast")];
  }, prepareComponentToken, {
    resetStyle: false,
    // Popover use Tooltip as internal component. We do not need to handle this.
    injectStyle
  });
  return useStyle(prefixCls);
};

// node_modules/antd/es/tooltip/util.js
var import_classnames3 = __toESM(require_classnames());

// node_modules/antd/es/_util/colors.js
var inverseColors = PresetColors.map((color) => `${color}-inverse`);
var PresetStatusColorTypes = ["success", "processing", "error", "default", "warning"];
function isPresetColor(color) {
  let includeInverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (includeInverse) {
    return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color);
  }
  return PresetColors.includes(color);
}
function isPresetStatusColor(color) {
  return PresetStatusColorTypes.includes(color);
}

// node_modules/antd/es/tooltip/util.js
function parseColor(prefixCls, color) {
  const isInternalColor = isPresetColor(color);
  const className = (0, import_classnames3.default)({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    arrowStyle["--antd-arrow-background-color"] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}

// node_modules/antd/es/tooltip/PurePanel.js
var PurePanel = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = "top",
    title,
    color,
    overlayInnerStyle
  } = props;
  const {
    getPrefixCls
  } = React6.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const [wrapCSSVar, hashId] = style_default2(prefixCls);
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const cls = (0, import_classnames4.default)(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
  return wrapCSSVar(React6.createElement("div", {
    className: cls,
    style: arrowContentStyle
  }, React6.createElement("div", {
    className: `${prefixCls}-arrow`
  }), React6.createElement(Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls,
    overlayInnerStyle: formattedOverlayInnerStyle
  }), title)));
};
var PurePanel_default = PurePanel;

// node_modules/antd/es/tooltip/index.js
var __rest3 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Tooltip3 = React7.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    afterVisibleChange,
    destroyTooltipOnHide,
    arrow = true,
    title,
    overlay,
    builtinPlacements,
    arrowPointAtCenter = false,
    autoAdjustOverflow = true
  } = props;
  const mergedShowArrow = !!arrow;
  const [, token] = useToken();
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React7.useContext(ConfigContext);
  const warning3 = devUseWarning("Tooltip");
  const tooltipRef = React7.useRef(null);
  const forceAlign = () => {
    var _a2;
    (_a2 = tooltipRef.current) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
  };
  React7.useImperativeHandle(ref, () => ({
    forceAlign,
    forcePopupAlign: () => {
      warning3.deprecated(false, "forcePopupAlign", "forceAlign");
      forceAlign();
    }
  }));
  if (true) {
    [["visible", "open"], ["defaultVisible", "defaultOpen"], ["onVisibleChange", "onOpenChange"], ["afterVisibleChange", "afterOpenChange"], ["arrowPointAtCenter", "arrow={{ pointAtCenter: true }}"]].forEach((_ref) => {
      let [deprecatedName, newName] = _ref;
      warning3.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
    true ? warning3(!destroyTooltipOnHide || typeof destroyTooltipOnHide === "boolean", "usage", "`destroyTooltipOnHide` no need config `keepParent` anymore. Please use `boolean` value directly.") : void 0;
    true ? warning3(!arrow || typeof arrow === "boolean" || !("arrowPointAtCenter" in arrow), "deprecated", "`arrowPointAtCenter` in `arrow` is deprecated. Please use `pointAtCenter` instead.") : void 0;
  }
  const [open, setOpen] = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const noTitle = !title && !overlay && title !== 0;
  const onOpenChange = (vis) => {
    var _a2, _b2;
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, vis);
      (_b2 = props.onVisibleChange) === null || _b2 === void 0 ? void 0 : _b2.call(props, vis);
    }
  };
  const tooltipPlacements = React7.useMemo(() => {
    var _a2, _b2;
    let mergedArrowPointAtCenter = arrowPointAtCenter;
    if (typeof arrow === "object") {
      mergedArrowPointAtCenter = (_b2 = (_a2 = arrow.pointAtCenter) !== null && _a2 !== void 0 ? _a2 : arrow.arrowPointAtCenter) !== null && _b2 !== void 0 ? _b2 : arrowPointAtCenter;
    }
    return builtinPlacements || getPlacements({
      arrowPointAtCenter: mergedArrowPointAtCenter,
      autoAdjustOverflow,
      arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
      borderRadius: token.borderRadius,
      offset: token.marginXXS,
      visibleFirst: true
    });
  }, [arrowPointAtCenter, arrow, builtinPlacements, token]);
  const memoOverlay = React7.useMemo(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || "";
  }, [overlay, title]);
  const memoOverlayWrapper = React7.createElement(NoCompactStyle, null, typeof memoOverlay === "function" ? memoOverlay() : memoOverlay);
  const {
    getPopupContainer,
    placement = "top",
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    rootClassName
  } = props, otherProps = __rest3(props, ["getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "rootClassName"]);
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const injectFromPopover = props["data-popover-inject"];
  let tempOpen = open;
  if (!("open" in props) && !("visible" in props) && noTitle) {
    tempOpen = false;
  }
  const child = isValidElement(children) && !isFragment(children) ? children : React7.createElement("span", null, children);
  const childProps = child.props;
  const childCls = !childProps.className || typeof childProps.className === "string" ? (0, import_classnames5.default)(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
  const [wrapCSSVar, hashId] = style_default2(prefixCls, !injectFromPopover);
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const customOverlayClassName = (0, import_classnames5.default)(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, colorInfo.className, rootClassName, hashId);
  const [zIndex, contextZIndex] = useZIndex("Tooltip", otherProps.zIndex);
  const content = React7.createElement(es_default3, Object.assign({}, otherProps, {
    zIndex,
    showArrow: mergedShowArrow,
    placement,
    mouseEnterDelay,
    mouseLeaveDelay,
    prefixCls,
    overlayClassName: customOverlayClassName,
    overlayStyle: Object.assign(Object.assign({}, arrowContentStyle), overlayStyle),
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: tooltipRef,
    builtinPlacements: tooltipPlacements,
    overlay: memoOverlayWrapper,
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
    overlayInnerStyle: formattedOverlayInnerStyle,
    arrowContent: React7.createElement("span", {
      className: `${prefixCls}-arrow-content`
    }),
    motion: {
      motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", props.transitionName),
      motionDeadline: 1e3
    },
    destroyTooltipOnHide: !!destroyTooltipOnHide
  }), tempOpen ? cloneElement(child, {
    className: childCls
  }) : child);
  return wrapCSSVar(React7.createElement(zindexContext_default.Provider, {
    value: contextZIndex
  }, content));
});
if (true) {
  Tooltip3.displayName = "Tooltip";
}
Tooltip3._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
var tooltip_default = Tooltip3;

// node_modules/antd/es/typography/Editable.js
var import_classnames13 = __toESM(require_classnames());
var React25 = __toESM(require_react());

// node_modules/antd/es/input/TextArea.js
var React24 = __toESM(require_react());
var import_react10 = __toESM(require_react());
var import_classnames12 = __toESM(require_classnames());

// node_modules/rc-textarea/es/TextArea.js
var import_classnames9 = __toESM(require_classnames());

// node_modules/rc-input/es/BaseInput.js
var import_classnames6 = __toESM(require_classnames());
var import_react3 = __toESM(require_react());

// node_modules/rc-input/es/utils/commonUtils.js
function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  var event = e;
  if (e.type === "click") {
    var currentTarget = target.cloneNode(true);
    event = Object.create(e, {
      target: {
        value: currentTarget
      },
      currentTarget: {
        value: currentTarget
      }
    });
    currentTarget.value = "";
    onChange(event);
    return;
  }
  if (targetValue !== void 0) {
    var _currentTarget = target.cloneNode(true);
    event = Object.create(e, {
      target: {
        value: _currentTarget
      },
      currentTarget: {
        value: _currentTarget
      }
    });
    if (_currentTarget.type !== "file") {
      _currentTarget.value = targetValue;
    }
    onChange(event);
    return;
  }
  onChange(event);
}
function triggerFocus(element, option) {
  if (!element)
    return;
  element.focus(option);
  var _ref = option || {}, cursor = _ref.cursor;
  if (cursor) {
    var len = element.value.length;
    switch (cursor) {
      case "start":
        element.setSelectionRange(0, 0);
        break;
      case "end":
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
    }
  }
}

// node_modules/rc-input/es/BaseInput.js
var BaseInput = function BaseInput2(props) {
  var _inputElement$props, _inputElement$props2;
  var inputElement = props.inputElement, prefixCls = props.prefixCls, prefix = props.prefix, suffix = props.suffix, addonBefore = props.addonBefore, addonAfter = props.addonAfter, className = props.className, style = props.style, disabled = props.disabled, readOnly = props.readOnly, focused = props.focused, triggerFocus3 = props.triggerFocus, allowClear = props.allowClear, value = props.value, handleReset = props.handleReset, hidden = props.hidden, classes = props.classes, classNames13 = props.classNames, dataAttrs = props.dataAttrs, styles = props.styles, components = props.components;
  var AffixWrapperComponent = (components === null || components === void 0 ? void 0 : components.affixWrapper) || "span";
  var GroupWrapperComponent = (components === null || components === void 0 ? void 0 : components.groupWrapper) || "span";
  var WrapperComponent = (components === null || components === void 0 ? void 0 : components.wrapper) || "span";
  var GroupAddonComponent = (components === null || components === void 0 ? void 0 : components.groupAddon) || "span";
  var containerRef = (0, import_react3.useRef)(null);
  var onInputClick = function onInputClick2(e) {
    var _containerRef$current;
    if ((_containerRef$current = containerRef.current) !== null && _containerRef$current !== void 0 && _containerRef$current.contains(e.target)) {
      triggerFocus3 === null || triggerFocus3 === void 0 || triggerFocus3();
    }
  };
  var getClearIcon = function getClearIcon2() {
    var _clsx;
    if (!allowClear) {
      return null;
    }
    var needClear = !disabled && !readOnly && value;
    var clearIconCls = "".concat(prefixCls, "-clear-icon");
    var iconNode = _typeof(allowClear) === "object" && allowClear !== null && allowClear !== void 0 && allowClear.clearIcon ? allowClear.clearIcon : "✖";
    return import_react3.default.createElement("span", {
      onClick: handleReset,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      className: (0, import_classnames6.default)(clearIconCls, (_clsx = {}, _defineProperty(_clsx, "".concat(clearIconCls, "-hidden"), !needClear), _defineProperty(_clsx, "".concat(clearIconCls, "-has-suffix"), !!suffix), _clsx)),
      role: "button",
      tabIndex: -1
    }, iconNode);
  };
  var element = (0, import_react3.cloneElement)(inputElement, {
    value,
    hidden,
    className: (0, import_classnames6.default)((_inputElement$props = inputElement.props) === null || _inputElement$props === void 0 ? void 0 : _inputElement$props.className, !hasPrefixSuffix(props) && !hasAddon(props) && className) || null,
    style: _objectSpread2(_objectSpread2({}, (_inputElement$props2 = inputElement.props) === null || _inputElement$props2 === void 0 ? void 0 : _inputElement$props2.style), !hasPrefixSuffix(props) && !hasAddon(props) ? style : {})
  });
  if (hasPrefixSuffix(props)) {
    var _clsx2;
    var affixWrapperPrefixCls = "".concat(prefixCls, "-affix-wrapper");
    var affixWrapperCls = (0, import_classnames6.default)(affixWrapperPrefixCls, (_clsx2 = {}, _defineProperty(_clsx2, "".concat(affixWrapperPrefixCls, "-disabled"), disabled), _defineProperty(_clsx2, "".concat(affixWrapperPrefixCls, "-focused"), focused), _defineProperty(_clsx2, "".concat(affixWrapperPrefixCls, "-readonly"), readOnly), _defineProperty(_clsx2, "".concat(affixWrapperPrefixCls, "-input-with-clear-btn"), suffix && allowClear && value), _clsx2), !hasAddon(props) && className, classes === null || classes === void 0 ? void 0 : classes.affixWrapper, classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.affixWrapper);
    var suffixNode = (suffix || allowClear) && import_react3.default.createElement("span", {
      className: (0, import_classnames6.default)("".concat(prefixCls, "-suffix"), classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.suffix),
      style: styles === null || styles === void 0 ? void 0 : styles.suffix
    }, getClearIcon(), suffix);
    element = import_react3.default.createElement(AffixWrapperComponent, _extends({
      className: affixWrapperCls,
      style: _objectSpread2(_objectSpread2({}, !hasAddon(props) ? style : void 0), styles === null || styles === void 0 ? void 0 : styles.affixWrapper),
      hidden: !hasAddon(props) && hidden,
      onClick: onInputClick
    }, dataAttrs === null || dataAttrs === void 0 ? void 0 : dataAttrs.affixWrapper, {
      ref: containerRef
    }), prefix && import_react3.default.createElement("span", {
      className: (0, import_classnames6.default)("".concat(prefixCls, "-prefix"), classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.prefix),
      style: styles === null || styles === void 0 ? void 0 : styles.prefix
    }, prefix), (0, import_react3.cloneElement)(inputElement, {
      value,
      hidden: null
    }), suffixNode);
  }
  if (hasAddon(props)) {
    var wrapperCls = "".concat(prefixCls, "-group");
    var addonCls = "".concat(wrapperCls, "-addon");
    var mergedWrapperClassName = (0, import_classnames6.default)("".concat(prefixCls, "-wrapper"), wrapperCls, classes === null || classes === void 0 ? void 0 : classes.wrapper);
    var mergedGroupClassName = (0, import_classnames6.default)("".concat(prefixCls, "-group-wrapper"), className, classes === null || classes === void 0 ? void 0 : classes.group);
    return import_react3.default.createElement(GroupWrapperComponent, {
      className: mergedGroupClassName,
      style,
      hidden
    }, import_react3.default.createElement(WrapperComponent, {
      className: mergedWrapperClassName
    }, addonBefore && import_react3.default.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonBefore), (0, import_react3.cloneElement)(element, {
      hidden: null
    }), addonAfter && import_react3.default.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonAfter)));
  }
  return element;
};
var BaseInput_default = BaseInput;

// node_modules/rc-input/es/Input.js
var import_classnames7 = __toESM(require_classnames());
var import_react4 = __toESM(require_react());

// node_modules/rc-input/es/hooks/useCount.js
var React9 = __toESM(require_react());
var _excluded2 = ["show"];
function useCount(count, showCount) {
  return React9.useMemo(function() {
    var mergedConfig = {};
    if (showCount) {
      mergedConfig.show = _typeof(showCount) === "object" && showCount.formatter ? showCount.formatter : !!showCount;
    }
    mergedConfig = _objectSpread2(_objectSpread2({}, mergedConfig), count);
    var _ref = mergedConfig, show = _ref.show, rest = _objectWithoutProperties(_ref, _excluded2);
    return _objectSpread2(_objectSpread2({}, rest), {}, {
      show: !!show,
      showFormatter: typeof show === "function" ? show : void 0,
      strategy: rest.strategy || function(value) {
        return value.length;
      }
    });
  }, [count, showCount]);
}

// node_modules/rc-input/es/Input.js
var _excluded3 = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"];
var Input = (0, import_react4.forwardRef)(function(props, ref) {
  var autoComplete = props.autoComplete, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, onPressEnter = props.onPressEnter, onKeyDown = props.onKeyDown, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-input" : _props$prefixCls, disabled = props.disabled, htmlSize = props.htmlSize, className = props.className, maxLength = props.maxLength, suffix = props.suffix, showCount = props.showCount, count = props.count, _props$type = props.type, type4 = _props$type === void 0 ? "text" : _props$type, classes = props.classes, classNames13 = props.classNames, styles = props.styles, _onCompositionStart = props.onCompositionStart, onCompositionEnd = props.onCompositionEnd, rest = _objectWithoutProperties(props, _excluded3);
  var _useState = (0, import_react4.useState)(false), _useState2 = _slicedToArray(_useState, 2), focused = _useState2[0], setFocused = _useState2[1];
  var compositionRef = import_react4.default.useRef(false);
  var inputRef = (0, import_react4.useRef)(null);
  var focus = function focus2(option) {
    if (inputRef.current) {
      triggerFocus(inputRef.current, option);
    }
  };
  var _useMergedState = useMergedState(props.defaultValue, {
    value: props.value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
  var formatValue = value === void 0 || value === null ? "" : String(value);
  var _React$useState = import_react4.default.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), selection = _React$useState2[0], setSelection = _React$useState2[1];
  var countConfig = useCount(count, showCount);
  var mergedMax = countConfig.max || maxLength;
  var valueLength = countConfig.strategy(formatValue);
  var isOutOfRange = !!mergedMax && valueLength > mergedMax;
  (0, import_react4.useImperativeHandle)(ref, function() {
    return {
      focus,
      blur: function blur() {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.blur();
      },
      setSelectionRange: function setSelectionRange(start, end, direction) {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.setSelectionRange(start, end, direction);
      },
      select: function select() {
        var _inputRef$current3;
        (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 || _inputRef$current3.select();
      },
      input: inputRef.current
    };
  });
  (0, import_react4.useEffect)(function() {
    setFocused(function(prev) {
      return prev && disabled ? false : prev;
    });
  }, [disabled]);
  var triggerChange = function triggerChange2(e, currentValue) {
    var cutValue = currentValue;
    if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max
      });
      if (currentValue !== cutValue) {
        var _inputRef$current4, _inputRef$current5;
        setSelection([((_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 ? void 0 : _inputRef$current4.selectionStart) || 0, ((_inputRef$current5 = inputRef.current) === null || _inputRef$current5 === void 0 ? void 0 : _inputRef$current5.selectionEnd) || 0]);
      }
    }
    setValue(cutValue);
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange, cutValue);
    }
  };
  import_react4.default.useEffect(function() {
    if (selection) {
      var _inputRef$current6;
      (_inputRef$current6 = inputRef.current) === null || _inputRef$current6 === void 0 || _inputRef$current6.setSelectionRange.apply(_inputRef$current6, _toConsumableArray(selection));
    }
  }, [selection]);
  var onInternalChange = function onInternalChange2(e) {
    triggerChange(e, e.target.value);
  };
  var onInternalCompositionEnd = function onInternalCompositionEnd2(e) {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value);
    onCompositionEnd === null || onCompositionEnd === void 0 || onCompositionEnd(e);
  };
  var handleKeyDown = function handleKeyDown2(e) {
    if (onPressEnter && e.key === "Enter") {
      onPressEnter(e);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  };
  var handleFocus = function handleFocus2(e) {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var handleBlur = function handleBlur2(e) {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(e);
  };
  var handleReset = function handleReset2(e) {
    setValue("");
    focus();
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange);
    }
  };
  var outOfRangeCls = isOutOfRange && "".concat(prefixCls, "-out-of-range");
  var getInputElement = function getInputElement2() {
    var otherProps = omit(props, [
      "prefixCls",
      "onPressEnter",
      "addonBefore",
      "addonAfter",
      "prefix",
      "suffix",
      "allowClear",
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      "defaultValue",
      "showCount",
      "count",
      "classes",
      "htmlSize",
      "styles",
      "classNames"
    ]);
    return import_react4.default.createElement("input", _extends({
      autoComplete
    }, otherProps, {
      onChange: onInternalChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      className: (0, import_classnames7.default)(prefixCls, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.input),
      style: styles === null || styles === void 0 ? void 0 : styles.input,
      ref: inputRef,
      size: htmlSize,
      type: type4,
      onCompositionStart: function onCompositionStart(e) {
        compositionRef.current = true;
        _onCompositionStart === null || _onCompositionStart === void 0 || _onCompositionStart(e);
      },
      onCompositionEnd: onInternalCompositionEnd
    }));
  };
  var getSuffix = function getSuffix2() {
    var hasMaxLength = Number(mergedMax) > 0;
    if (suffix || countConfig.show) {
      var dataCount = countConfig.showFormatter ? countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax
      }) : "".concat(valueLength).concat(hasMaxLength ? " / ".concat(mergedMax) : "");
      return import_react4.default.createElement(import_react4.default.Fragment, null, countConfig.show && import_react4.default.createElement("span", {
        className: (0, import_classnames7.default)("".concat(prefixCls, "-show-count-suffix"), _defineProperty({}, "".concat(prefixCls, "-show-count-has-suffix"), !!suffix), classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.count),
        style: _objectSpread2({}, styles === null || styles === void 0 ? void 0 : styles.count)
      }, dataCount), suffix);
    }
    return null;
  };
  return import_react4.default.createElement(BaseInput_default, _extends({}, rest, {
    prefixCls,
    className: (0, import_classnames7.default)(className, outOfRangeCls),
    inputElement: getInputElement(),
    handleReset,
    value: formatValue,
    focused,
    triggerFocus: focus,
    suffix: getSuffix(),
    disabled,
    classes,
    classNames: classNames13,
    styles
  }));
});
var Input_default = Input;

// node_modules/rc-input/es/index.js
var es_default4 = Input_default;

// node_modules/rc-textarea/es/TextArea.js
var import_react5 = __toESM(require_react());

// node_modules/rc-textarea/es/ResizableTextArea.js
var import_classnames8 = __toESM(require_classnames());
var React11 = __toESM(require_react());

// node_modules/rc-textarea/es/calculateNodeHeight.js
var HIDDEN_TEXTAREA_STYLE = "\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important;\n  pointer-events: none !important;\n";
var SIZING_STYLE = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }
  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
  var paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  var borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  var sizingStyle = SIZING_STYLE.map(function(name) {
    return "".concat(name, ":").concat(style.getPropertyValue(name));
  }).join(";");
  var nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var minRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    document.body.appendChild(hiddenTextarea);
  }
  if (uiTextNode.getAttribute("wrap")) {
    hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
  } else {
    hiddenTextarea.removeAttribute("wrap");
  }
  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache), paddingSize = _calculateNodeStyling.paddingSize, borderSize = _calculateNodeStyling.borderSize, boxSizing = _calculateNodeStyling.boxSizing, sizingStyle = _calculateNodeStyling.sizingStyle;
  hiddenTextarea.setAttribute("style", "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
  var minHeight = void 0;
  var maxHeight = void 0;
  var overflowY;
  var height = hiddenTextarea.scrollHeight;
  if (boxSizing === "border-box") {
    height += borderSize;
  } else if (boxSizing === "content-box") {
    height -= paddingSize;
  }
  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = " ";
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? "" : "hidden";
      height = Math.min(maxHeight, height);
    }
  }
  var style = {
    height,
    overflowY,
    resize: "none"
  };
  if (minHeight) {
    style.minHeight = minHeight;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
  }
  return style;
}

// node_modules/rc-textarea/es/ResizableTextArea.js
var _excluded4 = ["prefixCls", "onPressEnter", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"];
var RESIZE_START = 0;
var RESIZE_MEASURING = 1;
var RESIZE_STABLE = 2;
var ResizableTextArea = React11.forwardRef(function(props, ref) {
  var _ref = props, prefixCls = _ref.prefixCls, onPressEnter = _ref.onPressEnter, defaultValue = _ref.defaultValue, value = _ref.value, autoSize = _ref.autoSize, onResize = _ref.onResize, className = _ref.className, style = _ref.style, disabled = _ref.disabled, onChange = _ref.onChange, onInternalAutoSize = _ref.onInternalAutoSize, restProps = _objectWithoutProperties(_ref, _excluded4);
  var _useMergedState = useMergedState(defaultValue, {
    value,
    postState: function postState(val) {
      return val !== null && val !== void 0 ? val : "";
    }
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setMergedValue = _useMergedState2[1];
  var onInternalChange = function onInternalChange2(event) {
    setMergedValue(event.target.value);
    onChange === null || onChange === void 0 || onChange(event);
  };
  var textareaRef = React11.useRef();
  React11.useImperativeHandle(ref, function() {
    return {
      textArea: textareaRef.current
    };
  });
  var _React$useMemo = React11.useMemo(function() {
    if (autoSize && _typeof(autoSize) === "object") {
      return [autoSize.minRows, autoSize.maxRows];
    }
    return [];
  }, [autoSize]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), minRows = _React$useMemo2[0], maxRows = _React$useMemo2[1];
  var needAutoSize = !!autoSize;
  var fixFirefoxAutoScroll = function fixFirefoxAutoScroll2() {
    try {
      if (document.activeElement === textareaRef.current) {
        var _textareaRef$current = textareaRef.current, selectionStart = _textareaRef$current.selectionStart, selectionEnd = _textareaRef$current.selectionEnd, scrollTop = _textareaRef$current.scrollTop;
        textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    } catch (e) {
    }
  };
  var _React$useState = React11.useState(RESIZE_STABLE), _React$useState2 = _slicedToArray(_React$useState, 2), resizeState = _React$useState2[0], setResizeState = _React$useState2[1];
  var _React$useState3 = React11.useState(), _React$useState4 = _slicedToArray(_React$useState3, 2), autoSizeStyle = _React$useState4[0], setAutoSizeStyle = _React$useState4[1];
  var startResize = function startResize2() {
    setResizeState(RESIZE_START);
    if (false) {
      onInternalAutoSize === null || onInternalAutoSize === void 0 || onInternalAutoSize();
    }
  };
  useLayoutEffect_default(function() {
    if (needAutoSize) {
      startResize();
    }
  }, [value, minRows, maxRows, needAutoSize]);
  useLayoutEffect_default(function() {
    if (resizeState === RESIZE_START) {
      setResizeState(RESIZE_MEASURING);
    } else if (resizeState === RESIZE_MEASURING) {
      var textareaStyles = calculateAutoSizeStyle(textareaRef.current, false, minRows, maxRows);
      setResizeState(RESIZE_STABLE);
      setAutoSizeStyle(textareaStyles);
    } else {
      fixFirefoxAutoScroll();
    }
  }, [resizeState]);
  var resizeRafRef = React11.useRef();
  var cleanRaf = function cleanRaf2() {
    raf_default.cancel(resizeRafRef.current);
  };
  var onInternalResize = function onInternalResize2(size) {
    if (resizeState === RESIZE_STABLE) {
      onResize === null || onResize === void 0 || onResize(size);
      if (autoSize) {
        cleanRaf();
        resizeRafRef.current = raf_default(function() {
          startResize();
        });
      }
    }
  };
  React11.useEffect(function() {
    return cleanRaf;
  }, []);
  var mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
  var mergedStyle = _objectSpread2(_objectSpread2({}, style), mergedAutoSizeStyle);
  if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
    mergedStyle.overflowY = "hidden";
    mergedStyle.overflowX = "hidden";
  }
  return React11.createElement(es_default, {
    onResize: onInternalResize,
    disabled: !(autoSize || onResize)
  }, React11.createElement("textarea", _extends({}, restProps, {
    ref: textareaRef,
    style: mergedStyle,
    className: (0, import_classnames8.default)(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled)),
    disabled,
    value: mergedValue,
    onChange: onInternalChange
  })));
});
var ResizableTextArea_default = ResizableTextArea;

// node_modules/rc-textarea/es/TextArea.js
var _excluded5 = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "classes", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize"];
var TextArea = import_react5.default.forwardRef(function(_ref, ref) {
  var _countConfig$max, _clsx;
  var defaultValue = _ref.defaultValue, customValue = _ref.value, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onChange = _ref.onChange, allowClear = _ref.allowClear, maxLength = _ref.maxLength, onCompositionStart = _ref.onCompositionStart, onCompositionEnd = _ref.onCompositionEnd, suffix = _ref.suffix, _ref$prefixCls = _ref.prefixCls, prefixCls = _ref$prefixCls === void 0 ? "rc-textarea" : _ref$prefixCls, classes = _ref.classes, showCount = _ref.showCount, count = _ref.count, className = _ref.className, style = _ref.style, disabled = _ref.disabled, hidden = _ref.hidden, classNames13 = _ref.classNames, styles = _ref.styles, onResize = _ref.onResize, rest = _objectWithoutProperties(_ref, _excluded5);
  var _useMergedState = useMergedState(defaultValue, {
    value: customValue,
    defaultValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
  var formatValue = value === void 0 || value === null ? "" : String(value);
  var _React$useState = import_react5.default.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var compositionRef = import_react5.default.useRef(false);
  var _React$useState3 = import_react5.default.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), textareaResized = _React$useState4[0], setTextareaResized = _React$useState4[1];
  var resizableTextAreaRef = (0, import_react5.useRef)(null);
  var getTextArea = function getTextArea2() {
    var _resizableTextAreaRef;
    return (_resizableTextAreaRef = resizableTextAreaRef.current) === null || _resizableTextAreaRef === void 0 ? void 0 : _resizableTextAreaRef.textArea;
  };
  var focus = function focus2() {
    getTextArea().focus();
  };
  (0, import_react5.useImperativeHandle)(ref, function() {
    return {
      resizableTextArea: resizableTextAreaRef.current,
      focus,
      blur: function blur() {
        getTextArea().blur();
      }
    };
  });
  (0, import_react5.useEffect)(function() {
    setFocused(function(prev) {
      return !disabled && prev;
    });
  }, [disabled]);
  var _React$useState5 = import_react5.default.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), selection = _React$useState6[0], setSelection = _React$useState6[1];
  import_react5.default.useEffect(function() {
    if (selection) {
      var _getTextArea;
      (_getTextArea = getTextArea()).setSelectionRange.apply(_getTextArea, _toConsumableArray(selection));
    }
  }, [selection]);
  var countConfig = useCount(count, showCount);
  var mergedMax = (_countConfig$max = countConfig.max) !== null && _countConfig$max !== void 0 ? _countConfig$max : maxLength;
  var hasMaxLength = Number(mergedMax) > 0;
  var valueLength = countConfig.strategy(formatValue);
  var isOutOfRange = !!mergedMax && valueLength > mergedMax;
  var triggerChange = function triggerChange2(e, currentValue) {
    var cutValue = currentValue;
    if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max
      });
      if (currentValue !== cutValue) {
        setSelection([getTextArea().selectionStart || 0, getTextArea().selectionEnd || 0]);
      }
    }
    setValue(cutValue);
    resolveOnChange(e.currentTarget, e, onChange, cutValue);
  };
  var onInternalCompositionStart = function onInternalCompositionStart2(e) {
    compositionRef.current = true;
    onCompositionStart === null || onCompositionStart === void 0 || onCompositionStart(e);
  };
  var onInternalCompositionEnd = function onInternalCompositionEnd2(e) {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value);
    onCompositionEnd === null || onCompositionEnd === void 0 || onCompositionEnd(e);
  };
  var onInternalChange = function onInternalChange2(e) {
    triggerChange(e, e.target.value);
  };
  var handleKeyDown = function handleKeyDown2(e) {
    var onPressEnter = rest.onPressEnter, onKeyDown = rest.onKeyDown;
    if (e.key === "Enter" && onPressEnter) {
      onPressEnter(e);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  };
  var handleFocus = function handleFocus2(e) {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var handleBlur = function handleBlur2(e) {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(e);
  };
  var handleReset = function handleReset2(e) {
    setValue("");
    focus();
    resolveOnChange(getTextArea(), e, onChange);
  };
  var suffixNode = suffix;
  var dataCount;
  if (countConfig.show) {
    if (countConfig.showFormatter) {
      dataCount = countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax
      });
    } else {
      dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(mergedMax) : "");
    }
    suffixNode = import_react5.default.createElement(import_react5.default.Fragment, null, suffixNode, import_react5.default.createElement("span", {
      className: (0, import_classnames9.default)("".concat(prefixCls, "-data-count"), classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.count),
      style: styles === null || styles === void 0 ? void 0 : styles.count
    }, dataCount));
  }
  var handleResize = function handleResize2(size) {
    var _getTextArea2;
    onResize === null || onResize === void 0 || onResize(size);
    if ((_getTextArea2 = getTextArea()) !== null && _getTextArea2 !== void 0 && _getTextArea2.style.height) {
      setTextareaResized(true);
    }
  };
  var isPureTextArea = !rest.autoSize && !showCount && !allowClear;
  var textarea = import_react5.default.createElement(BaseInput_default, {
    value: formatValue,
    allowClear,
    handleReset,
    suffix: suffixNode,
    prefixCls,
    classes: {
      affixWrapper: (0, import_classnames9.default)(classes === null || classes === void 0 ? void 0 : classes.affixWrapper, (_clsx = {}, _defineProperty(_clsx, "".concat(prefixCls, "-show-count"), showCount), _defineProperty(_clsx, "".concat(prefixCls, "-textarea-allow-clear"), allowClear), _clsx))
    },
    disabled,
    focused,
    className: (0, import_classnames9.default)(className, isOutOfRange && "".concat(prefixCls, "-out-of-range")),
    style: _objectSpread2(_objectSpread2({}, style), textareaResized && !isPureTextArea ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof dataCount === "string" ? dataCount : void 0
      }
    },
    hidden,
    inputElement: import_react5.default.createElement(ResizableTextArea_default, _extends({}, rest, {
      maxLength,
      onKeyDown: handleKeyDown,
      onChange: onInternalChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onCompositionStart: onInternalCompositionStart,
      onCompositionEnd: onInternalCompositionEnd,
      className: (0, import_classnames9.default)(classNames13 === null || classNames13 === void 0 ? void 0 : classNames13.textarea),
      style: _objectSpread2(_objectSpread2({}, styles === null || styles === void 0 ? void 0 : styles.textarea), {}, {
        resize: style === null || style === void 0 ? void 0 : style.resize
      }),
      disabled,
      prefixCls,
      onResize: handleResize,
      ref: resizableTextAreaRef
    }))
  });
  return textarea;
});
var TextArea_default = TextArea;

// node_modules/rc-textarea/es/index.js
var es_default5 = TextArea_default;

// node_modules/antd/es/_util/statusUtils.js
var import_classnames10 = __toESM(require_classnames());
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return (0, import_classnames10.default)({
    [`${prefixCls}-status-success`]: status === "success",
    [`${prefixCls}-status-warning`]: status === "warning",
    [`${prefixCls}-status-error`]: status === "error",
    [`${prefixCls}-status-validating`]: status === "validating",
    [`${prefixCls}-has-feedback`]: hasFeedback
  });
}
var getMergedStatus = (contextStatus, customStatus) => customStatus || contextStatus;

// node_modules/antd/es/form/context.js
var React22 = __toESM(require_react());
var import_react7 = __toESM(require_react());

// node_modules/rc-field-form/es/index.js
var React21 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
function _regeneratorRuntime() {
  "use strict";
  _regeneratorRuntime = function _regeneratorRuntime2() {
    return e;
  };
  var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
    t2[e2] = r2.value;
  }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
  function define(t2, e2, r2) {
    return Object.defineProperty(t2, e2, {
      value: r2,
      enumerable: true,
      configurable: true,
      writable: true
    }), t2[e2];
  }
  try {
    define({}, "");
  } catch (t2) {
    define = function define2(t3, e2, r2) {
      return t3[e2] = r2;
    };
  }
  function wrap(t2, e2, r2, n2) {
    var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context2(n2 || []);
    return o(a2, "_invoke", {
      value: makeInvokeMethod(t2, r2, c2)
    }), a2;
  }
  function tryCatch(t2, e2, r2) {
    try {
      return {
        type: "normal",
        arg: t2.call(e2, r2)
      };
    } catch (t3) {
      return {
        type: "throw",
        arg: t3
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf, v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t2) {
    ["next", "throw", "return"].forEach(function(e2) {
      define(t2, e2, function(t3) {
        return this._invoke(e2, t3);
      });
    });
  }
  function AsyncIterator(t2, e2) {
    function invoke(r3, o2, i2, a2) {
      var c2 = tryCatch(t2[r3], t2, o2);
      if ("throw" !== c2.type) {
        var u2 = c2.arg, h2 = u2.value;
        return h2 && "object" == _typeof(h2) && n.call(h2, "__await") ? e2.resolve(h2.__await).then(function(t3) {
          invoke("next", t3, i2, a2);
        }, function(t3) {
          invoke("throw", t3, i2, a2);
        }) : e2.resolve(h2).then(function(t3) {
          u2.value = t3, i2(u2);
        }, function(t3) {
          return invoke("throw", t3, i2, a2);
        });
      }
      a2(c2.arg);
    }
    var r2;
    o(this, "_invoke", {
      value: function value(t3, n2) {
        function callInvokeWithMethodAndArg() {
          return new e2(function(e3, r3) {
            invoke(t3, n2, e3, r3);
          });
        }
        return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e2, r2, n2) {
    var o2 = h;
    return function(i2, a2) {
      if (o2 === f)
        throw new Error("Generator is already running");
      if (o2 === s) {
        if ("throw" === i2)
          throw a2;
        return {
          value: t,
          done: true
        };
      }
      for (n2.method = i2, n2.arg = a2; ; ) {
        var c2 = n2.delegate;
        if (c2) {
          var u2 = maybeInvokeDelegate(c2, n2);
          if (u2) {
            if (u2 === y)
              continue;
            return u2;
          }
        }
        if ("next" === n2.method)
          n2.sent = n2._sent = n2.arg;
        else if ("throw" === n2.method) {
          if (o2 === h)
            throw o2 = s, n2.arg;
          n2.dispatchException(n2.arg);
        } else
          "return" === n2.method && n2.abrupt("return", n2.arg);
        o2 = f;
        var p2 = tryCatch(e2, r2, n2);
        if ("normal" === p2.type) {
          if (o2 = n2.done ? s : l, p2.arg === y)
            continue;
          return {
            value: p2.arg,
            done: n2.done
          };
        }
        "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
      }
    };
  }
  function maybeInvokeDelegate(e2, r2) {
    var n2 = r2.method, o2 = e2.iterator[n2];
    if (o2 === t)
      return r2.delegate = null, "throw" === n2 && e2.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
    var i2 = tryCatch(o2, e2.iterator, r2.arg);
    if ("throw" === i2.type)
      return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
    var a2 = i2.arg;
    return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
  }
  function pushTryEntry(t2) {
    var e2 = {
      tryLoc: t2[0]
    };
    1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
  }
  function resetTryEntry(t2) {
    var e2 = t2.completion || {};
    e2.type = "normal", delete e2.arg, t2.completion = e2;
  }
  function Context2(t2) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t2.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e2) {
    if (e2 || "" === e2) {
      var r2 = e2[a];
      if (r2)
        return r2.call(e2);
      if ("function" == typeof e2.next)
        return e2;
      if (!isNaN(e2.length)) {
        var o2 = -1, i2 = function next() {
          for (; ++o2 < e2.length; )
            if (n.call(e2, o2))
              return next.value = e2[o2], next.done = false, next;
          return next.value = t, next.done = true, next;
        };
        return i2.next = i2;
      }
    }
    throw new TypeError(_typeof(e2) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
    var e2 = "function" == typeof t2 && t2.constructor;
    return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
  }, e.mark = function(t2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
  }, e.awrap = function(t2) {
    return {
      __await: t2
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
    void 0 === i2 && (i2 = Promise);
    var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
    return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
      return t3.done ? t3.value : a2.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
    return this;
  }), define(g, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(t2) {
    var e2 = Object(t2), r2 = [];
    for (var n2 in e2)
      r2.push(n2);
    return r2.reverse(), function next() {
      for (; r2.length; ) {
        var t3 = r2.pop();
        if (t3 in e2)
          return next.value = t3, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context2.prototype = {
    constructor: Context2,
    reset: function reset(e2) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2)
        for (var r2 in this)
          "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
    },
    stop: function stop() {
      this.done = true;
      var t2 = this.tryEntries[0].completion;
      if ("throw" === t2.type)
        throw t2.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e2) {
      if (this.done)
        throw e2;
      var r2 = this;
      function handle(n2, o3) {
        return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
      }
      for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
        var i2 = this.tryEntries[o2], a2 = i2.completion;
        if ("root" === i2.tryLoc)
          return handle("end");
        if (i2.tryLoc <= this.prev) {
          var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
          if (c2 && u2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          } else if (c2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
          } else {
            if (!u2)
              throw new Error("try statement without catch or finally");
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t2, e2) {
      for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
        var o2 = this.tryEntries[r2];
        if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
          var i2 = o2;
          break;
        }
      }
      i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
      var a2 = i2 ? i2.completion : {};
      return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
    },
    complete: function complete(t2, e2) {
      if ("throw" === t2.type)
        throw t2.arg;
      return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
    },
    finish: function finish(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.finallyLoc === t2)
          return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
      }
    },
    "catch": function _catch(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.tryLoc === t2) {
          var n2 = r2.completion;
          if ("throw" === n2.type) {
            var o2 = n2.arg;
            resetTryEntry(r2);
          }
          return o2;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e2, r2, n2) {
      return this.delegate = {
        iterator: values(e2),
        resultName: r2,
        nextLoc: n2
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

// node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}

// node_modules/rc-field-form/es/Field.js
var React16 = __toESM(require_react());

// node_modules/rc-field-form/es/FieldContext.js
var React13 = __toESM(require_react());
var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
var warningFunc = function warningFunc2() {
  warning_default(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
};
var Context = React13.createContext({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldError: warningFunc,
  getFieldWarning: warningFunc,
  getFieldsError: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldValue: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,
  getInternalHooks: function getInternalHooks() {
    warningFunc();
    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      destroyForm: warningFunc,
      setCallbacks: warningFunc,
      registerWatch: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
      getInitialValue: warningFunc
    };
  }
});
var FieldContext_default = Context;

// node_modules/rc-field-form/es/ListContext.js
var React14 = __toESM(require_react());
var ListContext = React14.createContext(null);
var ListContext_default = ListContext;

// node_modules/rc-field-form/es/utils/typeUtil.js
function toArray2(value) {
  if (value === void 0 || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function isFormInstance(form) {
  return form && !!form._init;
}

// node_modules/async-validator/dist-web/index.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
  warning = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e) {
        return typeof e === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
}(_wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v = value;
  for (var i = 0; i < path.length; i++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if (typeof value === "object" && typeof target[s] === "object") {
          target[s] = _extends2({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var urlReg;
var getUrlRegex = function() {
  if (urlReg) {
    return urlReg;
  }
  var word = "[a-fA-F\\d:]";
  var b = function b2(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
  };
  var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  var v6seg = "[a-fA-F\\d]{1,4}";
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");
  var ip = function ip2(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
  };
  ip.v4 = function(options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
  };
  ip.v6 = function(options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
  };
  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = "(?:\\S+(?::\\S*)?@)?";
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = "(?::\\d{2,5})?";
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", "i");
  return urlReg;
};
var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source, errors, options) {
  var len = typeof rule.len === "number";
  var min = typeof rule.min === "number";
  var max = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends2({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends2({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key, schema) {
        return _extends2({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends2({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          if (!options.suppressValidatorError) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;

// node_modules/rc-field-form/es/utils/validateUtil.js
var React15 = __toESM(require_react());

// node_modules/rc-field-form/es/utils/messages.js
var typeTemplate = "'${name}' is not a valid ${type}";
var defaultValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};

// node_modules/rc-field-form/es/utils/validateUtil.js
var AsyncValidator = Schema;
function replaceMessage(template, kv) {
  return template.replace(/\$\{\w+\}/g, function(str) {
    var key = str.slice(2, -1);
    return kv[key];
  });
}
var CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
function validateRule(_x, _x2, _x3, _x4, _x5) {
  return _validateRule.apply(this, arguments);
}
function _validateRule() {
  _validateRule = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2(name, value, rule, options, messageVariables) {
    var cloneRule, originValidator, subRuleField, validator, messages2, result, subResults, kv, fillVariableResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1)
        switch (_context2.prev = _context2.next) {
          case 0:
            cloneRule = _objectSpread2({}, rule);
            delete cloneRule.ruleIndex;
            AsyncValidator.warning = function() {
              return void 0;
            };
            if (cloneRule.validator) {
              originValidator = cloneRule.validator;
              cloneRule.validator = function() {
                try {
                  return originValidator.apply(void 0, arguments);
                } catch (error) {
                  console.error(error);
                  return Promise.reject(CODE_LOGIC_ERROR);
                }
              };
            }
            subRuleField = null;
            if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
              subRuleField = cloneRule.defaultField;
              delete cloneRule.defaultField;
            }
            validator = new AsyncValidator(_defineProperty({}, name, [cloneRule]));
            messages2 = merge(defaultValidateMessages, options.validateMessages);
            validator.messages(messages2);
            result = [];
            _context2.prev = 10;
            _context2.next = 13;
            return Promise.resolve(validator.validate(_defineProperty({}, name, value), _objectSpread2({}, options)));
          case 13:
            _context2.next = 18;
            break;
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](10);
            if (_context2.t0.errors) {
              result = _context2.t0.errors.map(function(_ref4, index) {
                var message = _ref4.message;
                var mergedMessage = message === CODE_LOGIC_ERROR ? messages2.default : message;
                return React15.isValidElement(mergedMessage) ? (
                  // Wrap ReactNode with `key`
                  React15.cloneElement(mergedMessage, {
                    key: "error_".concat(index)
                  })
                ) : mergedMessage;
              });
            }
          case 18:
            if (!(!result.length && subRuleField)) {
              _context2.next = 23;
              break;
            }
            _context2.next = 21;
            return Promise.all(value.map(function(subValue, i) {
              return validateRule("".concat(name, ".").concat(i), subValue, subRuleField, options, messageVariables);
            }));
          case 21:
            subResults = _context2.sent;
            return _context2.abrupt("return", subResults.reduce(function(prev, errors) {
              return [].concat(_toConsumableArray(prev), _toConsumableArray(errors));
            }, []));
          case 23:
            kv = _objectSpread2(_objectSpread2({}, rule), {}, {
              name,
              enum: (rule.enum || []).join(", ")
            }, messageVariables);
            fillVariableResult = result.map(function(error) {
              if (typeof error === "string") {
                return replaceMessage(error, kv);
              }
              return error;
            });
            return _context2.abrupt("return", fillVariableResult);
          case 26:
          case "end":
            return _context2.stop();
        }
    }, _callee2, null, [[10, 15]]);
  }));
  return _validateRule.apply(this, arguments);
}
function validateRules(namePath, value, rules2, options, validateFirst, messageVariables) {
  var name = namePath.join(".");
  var filledRules = rules2.map(function(currentRule, ruleIndex) {
    var originValidatorFunc = currentRule.validator;
    var cloneRule = _objectSpread2(_objectSpread2({}, currentRule), {}, {
      ruleIndex
    });
    if (originValidatorFunc) {
      cloneRule.validator = function(rule, val, callback) {
        var hasPromise = false;
        var wrappedCallback = function wrappedCallback2() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          Promise.resolve().then(function() {
            warning_default(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
            if (!hasPromise) {
              callback.apply(void 0, args);
            }
          });
        };
        var promise = originValidatorFunc(rule, val, wrappedCallback);
        hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
        warning_default(hasPromise, "`callback` is deprecated. Please return a promise instead.");
        if (hasPromise) {
          promise.then(function() {
            callback();
          }).catch(function(err) {
            callback(err || " ");
          });
        }
      };
    }
    return cloneRule;
  }).sort(function(_ref, _ref2) {
    var w1 = _ref.warningOnly, i1 = _ref.ruleIndex;
    var w2 = _ref2.warningOnly, i2 = _ref2.ruleIndex;
    if (!!w1 === !!w2) {
      return i1 - i2;
    }
    if (w1) {
      return 1;
    }
    return -1;
  });
  var summaryPromise;
  if (validateFirst === true) {
    summaryPromise = new Promise(function() {
      var _ref3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(resolve, reject) {
        var i, rule, errors;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;
              case 1:
                if (!(i < filledRules.length)) {
                  _context.next = 12;
                  break;
                }
                rule = filledRules[i];
                _context.next = 5;
                return validateRule(name, value, rule, options, messageVariables);
              case 5:
                errors = _context.sent;
                if (!errors.length) {
                  _context.next = 9;
                  break;
                }
                reject([{
                  errors,
                  rule
                }]);
                return _context.abrupt("return");
              case 9:
                i += 1;
                _context.next = 1;
                break;
              case 12:
                resolve([]);
              case 13:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }));
      return function(_x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());
  } else {
    var rulePromises = filledRules.map(function(rule) {
      return validateRule(name, value, rule, options, messageVariables).then(function(errors) {
        return {
          errors,
          rule
        };
      });
    });
    summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then(function(errors) {
      return Promise.reject(errors);
    });
  }
  summaryPromise.catch(function(e) {
    return e;
  });
  return summaryPromise;
}
function finishOnAllFailed(_x8) {
  return _finishOnAllFailed.apply(this, arguments);
}
function _finishOnAllFailed() {
  _finishOnAllFailed = _asyncToGenerator(_regeneratorRuntime().mark(function _callee3(rulePromises) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1)
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", Promise.all(rulePromises).then(function(errorsList) {
              var _ref5;
              var errors = (_ref5 = []).concat.apply(_ref5, _toConsumableArray(errorsList));
              return errors;
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
    }, _callee3);
  }));
  return _finishOnAllFailed.apply(this, arguments);
}
function finishOnFirstFailed(_x9) {
  return _finishOnFirstFailed.apply(this, arguments);
}
function _finishOnFirstFailed() {
  _finishOnFirstFailed = _asyncToGenerator(_regeneratorRuntime().mark(function _callee4(rulePromises) {
    var count;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1)
        switch (_context4.prev = _context4.next) {
          case 0:
            count = 0;
            return _context4.abrupt("return", new Promise(function(resolve) {
              rulePromises.forEach(function(promise) {
                promise.then(function(ruleError) {
                  if (ruleError.errors.length) {
                    resolve([ruleError]);
                  }
                  count += 1;
                  if (count === rulePromises.length) {
                    resolve([]);
                  }
                });
              });
            }));
          case 2:
          case "end":
            return _context4.stop();
        }
    }, _callee4);
  }));
  return _finishOnFirstFailed.apply(this, arguments);
}

// node_modules/rc-field-form/es/utils/valueUtil.js
function getNamePath(path) {
  return toArray2(path);
}
function cloneByNamePathList(store, namePathList) {
  var newStore = {};
  namePathList.forEach(function(namePath) {
    var value = get(store, namePath);
    newStore = set(newStore, namePath, value);
  });
  return newStore;
}
function containsNamePath(namePathList, namePath) {
  var partialMatch = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  return namePathList && namePathList.some(function(path) {
    return matchNamePath(namePath, path, partialMatch);
  });
}
function matchNamePath(namePath, subNamePath) {
  var partialMatch = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (!namePath || !subNamePath) {
    return false;
  }
  if (!partialMatch && namePath.length !== subNamePath.length) {
    return false;
  }
  return subNamePath.every(function(nameUnit, i) {
    return namePath[i] === nameUnit;
  });
}
function isSimilar(source, target) {
  if (source === target) {
    return true;
  }
  if (!source && target || source && !target) {
    return false;
  }
  if (!source || !target || _typeof(source) !== "object" || _typeof(target) !== "object") {
    return false;
  }
  var sourceKeys = Object.keys(source);
  var targetKeys = Object.keys(target);
  var keys = new Set([].concat(sourceKeys, targetKeys));
  return _toConsumableArray(keys).every(function(key) {
    var sourceValue = source[key];
    var targetValue = target[key];
    if (typeof sourceValue === "function" && typeof targetValue === "function") {
      return true;
    }
    return sourceValue === targetValue;
  });
}
function defaultGetValueFromEvent(valuePropName) {
  var event = arguments.length <= 1 ? void 0 : arguments[1];
  if (event && event.target && _typeof(event.target) === "object" && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}
function move(array4, moveIndex, toIndex) {
  var length = array4.length;
  if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
    return array4;
  }
  var item = array4[moveIndex];
  var diff = moveIndex - toIndex;
  if (diff > 0) {
    return [].concat(_toConsumableArray(array4.slice(0, toIndex)), [item], _toConsumableArray(array4.slice(toIndex, moveIndex)), _toConsumableArray(array4.slice(moveIndex + 1, length)));
  }
  if (diff < 0) {
    return [].concat(_toConsumableArray(array4.slice(0, moveIndex)), _toConsumableArray(array4.slice(moveIndex + 1, toIndex + 1)), [item], _toConsumableArray(array4.slice(toIndex + 1, length)));
  }
  return array4;
}

// node_modules/rc-field-form/es/Field.js
var _excluded6 = ["name"];
var EMPTY_ERRORS = [];
function requireUpdate(shouldUpdate, prev, next, prevValue, nextValue, info) {
  if (typeof shouldUpdate === "function") {
    return shouldUpdate(prev, next, "source" in info ? {
      source: info.source
    } : {});
  }
  return prevValue !== nextValue;
}
var Field = function(_React$Component) {
  _inherits(Field2, _React$Component);
  var _super = _createSuper(Field2);
  function Field2(props) {
    var _this;
    _classCallCheck(this, Field2);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "state", {
      resetCount: 0
    });
    _defineProperty(_assertThisInitialized(_this), "cancelRegisterFunc", null);
    _defineProperty(_assertThisInitialized(_this), "mounted", false);
    _defineProperty(_assertThisInitialized(_this), "touched", false);
    _defineProperty(_assertThisInitialized(_this), "dirty", false);
    _defineProperty(_assertThisInitialized(_this), "validatePromise", void 0);
    _defineProperty(_assertThisInitialized(_this), "prevValidating", void 0);
    _defineProperty(_assertThisInitialized(_this), "errors", EMPTY_ERRORS);
    _defineProperty(_assertThisInitialized(_this), "warnings", EMPTY_ERRORS);
    _defineProperty(_assertThisInitialized(_this), "cancelRegister", function() {
      var _this$props = _this.props, preserve = _this$props.preserve, isListField = _this$props.isListField, name = _this$props.name;
      if (_this.cancelRegisterFunc) {
        _this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
      }
      _this.cancelRegisterFunc = null;
    });
    _defineProperty(_assertThisInitialized(_this), "getNamePath", function() {
      var _this$props2 = _this.props, name = _this$props2.name, fieldContext = _this$props2.fieldContext;
      var _fieldContext$prefixN = fieldContext.prefixName, prefixName = _fieldContext$prefixN === void 0 ? [] : _fieldContext$prefixN;
      return name !== void 0 ? [].concat(_toConsumableArray(prefixName), _toConsumableArray(name)) : [];
    });
    _defineProperty(_assertThisInitialized(_this), "getRules", function() {
      var _this$props3 = _this.props, _this$props3$rules = _this$props3.rules, rules2 = _this$props3$rules === void 0 ? [] : _this$props3$rules, fieldContext = _this$props3.fieldContext;
      return rules2.map(function(rule) {
        if (typeof rule === "function") {
          return rule(fieldContext);
        }
        return rule;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "refresh", function() {
      if (!_this.mounted)
        return;
      _this.setState(function(_ref) {
        var resetCount = _ref.resetCount;
        return {
          resetCount: resetCount + 1
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "metaCache", null);
    _defineProperty(_assertThisInitialized(_this), "triggerMetaEvent", function(destroy) {
      var onMetaChange = _this.props.onMetaChange;
      if (onMetaChange) {
        var _meta = _objectSpread2(_objectSpread2({}, _this.getMeta()), {}, {
          destroy
        });
        if (!isEqual_default(_this.metaCache, _meta)) {
          onMetaChange(_meta);
        }
        _this.metaCache = _meta;
      } else {
        _this.metaCache = null;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onStoreChange", function(prevStore, namePathList, info) {
      var _this$props4 = _this.props, shouldUpdate = _this$props4.shouldUpdate, _this$props4$dependen = _this$props4.dependencies, dependencies = _this$props4$dependen === void 0 ? [] : _this$props4$dependen, onReset = _this$props4.onReset;
      var store = info.store;
      var namePath = _this.getNamePath();
      var prevValue = _this.getValue(prevStore);
      var curValue = _this.getValue(store);
      var namePathMatch = namePathList && containsNamePath(namePathList, namePath);
      if (info.type === "valueUpdate" && info.source === "external" && prevValue !== curValue) {
        _this.touched = true;
        _this.dirty = true;
        _this.validatePromise = null;
        _this.errors = EMPTY_ERRORS;
        _this.warnings = EMPTY_ERRORS;
        _this.triggerMetaEvent();
      }
      switch (info.type) {
        case "reset":
          if (!namePathList || namePathMatch) {
            _this.touched = false;
            _this.dirty = false;
            _this.validatePromise = void 0;
            _this.errors = EMPTY_ERRORS;
            _this.warnings = EMPTY_ERRORS;
            _this.triggerMetaEvent();
            onReset === null || onReset === void 0 || onReset();
            _this.refresh();
            return;
          }
          break;
        case "remove": {
          if (shouldUpdate) {
            _this.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var data = info.data;
          if (namePathMatch) {
            if ("touched" in data) {
              _this.touched = data.touched;
            }
            if ("validating" in data && !("originRCField" in data)) {
              _this.validatePromise = data.validating ? Promise.resolve([]) : null;
            }
            if ("errors" in data) {
              _this.errors = data.errors || EMPTY_ERRORS;
            }
            if ("warnings" in data) {
              _this.warnings = data.warnings || EMPTY_ERRORS;
            }
            _this.dirty = true;
            _this.triggerMetaEvent();
            _this.reRender();
            return;
          } else if ("value" in data && containsNamePath(namePathList, namePath, true)) {
            _this.reRender();
            return;
          }
          if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var dependencyList = dependencies.map(getNamePath);
          if (dependencyList.some(function(dependency) {
            return containsNamePath(info.relatedFields, dependency);
          })) {
            _this.reRender();
            return;
          }
          break;
        }
        default:
          if (namePathMatch || (!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this.reRender();
            return;
          }
          break;
      }
      if (shouldUpdate === true) {
        _this.reRender();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "validateRules", function(options) {
      var namePath = _this.getNamePath();
      var currentValue = _this.getValue();
      var _ref2 = options || {}, triggerName = _ref2.triggerName, _ref2$validateOnly = _ref2.validateOnly, validateOnly = _ref2$validateOnly === void 0 ? false : _ref2$validateOnly;
      var rootPromise = Promise.resolve().then(_asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
        var _this$props5, _this$props5$validate, validateFirst, messageVariables, validateDebounce, filteredRules, promise;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.mounted) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", []);
              case 2:
                _this$props5 = _this.props, _this$props5$validate = _this$props5.validateFirst, validateFirst = _this$props5$validate === void 0 ? false : _this$props5$validate, messageVariables = _this$props5.messageVariables, validateDebounce = _this$props5.validateDebounce;
                filteredRules = _this.getRules();
                if (triggerName) {
                  filteredRules = filteredRules.filter(function(rule) {
                    return rule;
                  }).filter(function(rule) {
                    var validateTrigger = rule.validateTrigger;
                    if (!validateTrigger) {
                      return true;
                    }
                    var triggerList = toArray2(validateTrigger);
                    return triggerList.includes(triggerName);
                  });
                }
                if (!(validateDebounce && triggerName)) {
                  _context.next = 10;
                  break;
                }
                _context.next = 8;
                return new Promise(function(resolve) {
                  setTimeout(resolve, validateDebounce);
                });
              case 8:
                if (!(_this.validatePromise !== rootPromise)) {
                  _context.next = 10;
                  break;
                }
                return _context.abrupt("return", []);
              case 10:
                promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);
                promise.catch(function(e) {
                  return e;
                }).then(function() {
                  var ruleErrors = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : EMPTY_ERRORS;
                  if (_this.validatePromise === rootPromise) {
                    var _ruleErrors$forEach;
                    _this.validatePromise = null;
                    var nextErrors = [];
                    var nextWarnings = [];
                    (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 || _ruleErrors$forEach.call(ruleErrors, function(_ref4) {
                      var warningOnly = _ref4.rule.warningOnly, _ref4$errors = _ref4.errors, errors = _ref4$errors === void 0 ? EMPTY_ERRORS : _ref4$errors;
                      if (warningOnly) {
                        nextWarnings.push.apply(nextWarnings, _toConsumableArray(errors));
                      } else {
                        nextErrors.push.apply(nextErrors, _toConsumableArray(errors));
                      }
                    });
                    _this.errors = nextErrors;
                    _this.warnings = nextWarnings;
                    _this.triggerMetaEvent();
                    _this.reRender();
                  }
                });
                return _context.abrupt("return", promise);
              case 13:
              case "end":
                return _context.stop();
            }
        }, _callee);
      })));
      if (validateOnly) {
        return rootPromise;
      }
      _this.validatePromise = rootPromise;
      _this.dirty = true;
      _this.errors = EMPTY_ERRORS;
      _this.warnings = EMPTY_ERRORS;
      _this.triggerMetaEvent();
      _this.reRender();
      return rootPromise;
    });
    _defineProperty(_assertThisInitialized(_this), "isFieldValidating", function() {
      return !!_this.validatePromise;
    });
    _defineProperty(_assertThisInitialized(_this), "isFieldTouched", function() {
      return _this.touched;
    });
    _defineProperty(_assertThisInitialized(_this), "isFieldDirty", function() {
      if (_this.dirty || _this.props.initialValue !== void 0) {
        return true;
      }
      var fieldContext = _this.props.fieldContext;
      var _fieldContext$getInte = fieldContext.getInternalHooks(HOOK_MARK), getInitialValue = _fieldContext$getInte.getInitialValue;
      if (getInitialValue(_this.getNamePath()) !== void 0) {
        return true;
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "getErrors", function() {
      return _this.errors;
    });
    _defineProperty(_assertThisInitialized(_this), "getWarnings", function() {
      return _this.warnings;
    });
    _defineProperty(_assertThisInitialized(_this), "isListField", function() {
      return _this.props.isListField;
    });
    _defineProperty(_assertThisInitialized(_this), "isList", function() {
      return _this.props.isList;
    });
    _defineProperty(_assertThisInitialized(_this), "isPreserve", function() {
      return _this.props.preserve;
    });
    _defineProperty(_assertThisInitialized(_this), "getMeta", function() {
      _this.prevValidating = _this.isFieldValidating();
      var meta = {
        touched: _this.isFieldTouched(),
        validating: _this.prevValidating,
        errors: _this.errors,
        warnings: _this.warnings,
        name: _this.getNamePath(),
        validated: _this.validatePromise === null
      };
      return meta;
    });
    _defineProperty(_assertThisInitialized(_this), "getOnlyChild", function(children) {
      if (typeof children === "function") {
        var _meta2 = _this.getMeta();
        return _objectSpread2(_objectSpread2({}, _this.getOnlyChild(children(_this.getControlled(), _meta2, _this.props.fieldContext))), {}, {
          isFunction: true
        });
      }
      var childList = toArray(children);
      if (childList.length !== 1 || !React16.isValidElement(childList[0])) {
        return {
          child: childList,
          isFunction: false
        };
      }
      return {
        child: childList[0],
        isFunction: false
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getValue", function(store) {
      var getFieldsValue = _this.props.fieldContext.getFieldsValue;
      var namePath = _this.getNamePath();
      return get(store || getFieldsValue(true), namePath);
    });
    _defineProperty(_assertThisInitialized(_this), "getControlled", function() {
      var childProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var _this$props6 = _this.props, trigger = _this$props6.trigger, validateTrigger = _this$props6.validateTrigger, getValueFromEvent = _this$props6.getValueFromEvent, normalize2 = _this$props6.normalize, valuePropName = _this$props6.valuePropName, getValueProps = _this$props6.getValueProps, fieldContext = _this$props6.fieldContext;
      var mergedValidateTrigger = validateTrigger !== void 0 ? validateTrigger : fieldContext.validateTrigger;
      var namePath = _this.getNamePath();
      var getInternalHooks3 = fieldContext.getInternalHooks, getFieldsValue = fieldContext.getFieldsValue;
      var _getInternalHooks = getInternalHooks3(HOOK_MARK), dispatch = _getInternalHooks.dispatch;
      var value = _this.getValue();
      var mergedGetValueProps = getValueProps || function(val) {
        return _defineProperty({}, valuePropName, val);
      };
      var originTriggerFunc = childProps[trigger];
      var control = _objectSpread2(_objectSpread2({}, childProps), mergedGetValueProps(value));
      control[trigger] = function() {
        _this.touched = true;
        _this.dirty = true;
        _this.triggerMetaEvent();
        var newValue;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (getValueFromEvent) {
          newValue = getValueFromEvent.apply(void 0, args);
        } else {
          newValue = defaultGetValueFromEvent.apply(void 0, [valuePropName].concat(args));
        }
        if (normalize2) {
          newValue = normalize2(newValue, value, getFieldsValue(true));
        }
        dispatch({
          type: "updateValue",
          namePath,
          value: newValue
        });
        if (originTriggerFunc) {
          originTriggerFunc.apply(void 0, args);
        }
      };
      var validateTriggerList = toArray2(mergedValidateTrigger || []);
      validateTriggerList.forEach(function(triggerName) {
        var originTrigger = control[triggerName];
        control[triggerName] = function() {
          if (originTrigger) {
            originTrigger.apply(void 0, arguments);
          }
          var rules2 = _this.props.rules;
          if (rules2 && rules2.length) {
            dispatch({
              type: "validateField",
              namePath,
              triggerName
            });
          }
        };
      });
      return control;
    });
    if (props.fieldContext) {
      var getInternalHooks2 = props.fieldContext.getInternalHooks;
      var _getInternalHooks2 = getInternalHooks2(HOOK_MARK), initEntityValue = _getInternalHooks2.initEntityValue;
      initEntityValue(_assertThisInitialized(_this));
    }
    return _this;
  }
  _createClass(Field2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props, shouldUpdate = _this$props7.shouldUpdate, fieldContext = _this$props7.fieldContext;
      this.mounted = true;
      if (fieldContext) {
        var getInternalHooks2 = fieldContext.getInternalHooks;
        var _getInternalHooks3 = getInternalHooks2(HOOK_MARK), registerField = _getInternalHooks3.registerField;
        this.cancelRegisterFunc = registerField(this);
      }
      if (shouldUpdate === true) {
        this.reRender();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRegister();
      this.triggerMetaEvent(true);
      this.mounted = false;
    }
  }, {
    key: "reRender",
    value: function reRender() {
      if (!this.mounted)
        return;
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var resetCount = this.state.resetCount;
      var children = this.props.children;
      var _this$getOnlyChild = this.getOnlyChild(children), child = _this$getOnlyChild.child, isFunction = _this$getOnlyChild.isFunction;
      var returnChildNode;
      if (isFunction) {
        returnChildNode = child;
      } else if (React16.isValidElement(child)) {
        returnChildNode = React16.cloneElement(child, this.getControlled(child.props));
      } else {
        warning_default(!child, "`children` of Field is not validate ReactElement.");
        returnChildNode = child;
      }
      return React16.createElement(React16.Fragment, {
        key: resetCount
      }, returnChildNode);
    }
  }]);
  return Field2;
}(React16.Component);
_defineProperty(Field, "contextType", FieldContext_default);
_defineProperty(Field, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function WrapperField(_ref6) {
  var name = _ref6.name, restProps = _objectWithoutProperties(_ref6, _excluded6);
  var fieldContext = React16.useContext(FieldContext_default);
  var listContext = React16.useContext(ListContext_default);
  var namePath = name !== void 0 ? getNamePath(name) : void 0;
  var key = "keep";
  if (!restProps.isListField) {
    key = "_".concat((namePath || []).join("_"));
  }
  if (restProps.preserve === false && restProps.isListField && namePath.length <= 1) {
    warning_default(false, "`preserve` should not apply on Form.List fields.");
  }
  return React16.createElement(Field, _extends({
    key,
    name: namePath,
    isListField: !!listContext
  }, restProps, {
    fieldContext
  }));
}
var Field_default = WrapperField;

// node_modules/rc-field-form/es/List.js
var React17 = __toESM(require_react());
function List(_ref) {
  var name = _ref.name, initialValue = _ref.initialValue, children = _ref.children, rules2 = _ref.rules, validateTrigger = _ref.validateTrigger, isListField = _ref.isListField;
  var context = React17.useContext(FieldContext_default);
  var wrapperListContext = React17.useContext(ListContext_default);
  var keyRef = React17.useRef({
    keys: [],
    id: 0
  });
  var keyManager = keyRef.current;
  var prefixName = React17.useMemo(function() {
    var parentPrefixName = getNamePath(context.prefixName) || [];
    return [].concat(_toConsumableArray(parentPrefixName), _toConsumableArray(getNamePath(name)));
  }, [context.prefixName, name]);
  var fieldContext = React17.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, context), {}, {
      prefixName
    });
  }, [context, prefixName]);
  var listContext = React17.useMemo(function() {
    return {
      getKey: function getKey(namePath) {
        var len = prefixName.length;
        var pathName = namePath[len];
        return [keyManager.keys[pathName], namePath.slice(len + 1)];
      }
    };
  }, [prefixName]);
  if (typeof children !== "function") {
    warning_default(false, "Form.List only accepts function as children.");
    return null;
  }
  var shouldUpdate = function shouldUpdate2(prevValue, nextValue, _ref2) {
    var source = _ref2.source;
    if (source === "internal") {
      return false;
    }
    return prevValue !== nextValue;
  };
  return React17.createElement(ListContext_default.Provider, {
    value: listContext
  }, React17.createElement(FieldContext_default.Provider, {
    value: fieldContext
  }, React17.createElement(Field_default, {
    name: [],
    shouldUpdate,
    rules: rules2,
    validateTrigger,
    initialValue,
    isList: true,
    isListField: isListField !== null && isListField !== void 0 ? isListField : !!wrapperListContext
  }, function(_ref3, meta) {
    var _ref3$value = _ref3.value, value = _ref3$value === void 0 ? [] : _ref3$value, onChange = _ref3.onChange;
    var getFieldValue = context.getFieldValue;
    var getNewValue = function getNewValue2() {
      var values = getFieldValue(prefixName || []);
      return values || [];
    };
    var operations = {
      add: function add(defaultValue, index) {
        var newValue = getNewValue();
        if (index >= 0 && index <= newValue.length) {
          keyManager.keys = [].concat(_toConsumableArray(keyManager.keys.slice(0, index)), [keyManager.id], _toConsumableArray(keyManager.keys.slice(index)));
          onChange([].concat(_toConsumableArray(newValue.slice(0, index)), [defaultValue], _toConsumableArray(newValue.slice(index))));
        } else {
          if (index < 0 || index > newValue.length) {
            warning_default(false, "The second parameter of the add function should be a valid positive number.");
          }
          keyManager.keys = [].concat(_toConsumableArray(keyManager.keys), [keyManager.id]);
          onChange([].concat(_toConsumableArray(newValue), [defaultValue]));
        }
        keyManager.id += 1;
      },
      remove: function remove(index) {
        var newValue = getNewValue();
        var indexSet = new Set(Array.isArray(index) ? index : [index]);
        if (indexSet.size <= 0) {
          return;
        }
        keyManager.keys = keyManager.keys.filter(function(_, keysIndex) {
          return !indexSet.has(keysIndex);
        });
        onChange(newValue.filter(function(_, valueIndex) {
          return !indexSet.has(valueIndex);
        }));
      },
      move: function move2(from, to) {
        if (from === to) {
          return;
        }
        var newValue = getNewValue();
        if (from < 0 || from >= newValue.length || to < 0 || to >= newValue.length) {
          return;
        }
        keyManager.keys = move(keyManager.keys, from, to);
        onChange(move(newValue, from, to));
      }
    };
    var listValue = value || [];
    if (!Array.isArray(listValue)) {
      listValue = [];
      if (true) {
        warning_default(false, "Current value of '".concat(prefixName.join(" > "), "' is not an array type."));
      }
    }
    return children(listValue.map(function(__, index) {
      var key = keyManager.keys[index];
      if (key === void 0) {
        keyManager.keys[index] = keyManager.id;
        key = keyManager.keys[index];
        keyManager.id += 1;
      }
      return {
        name: index,
        key,
        isListField: true
      };
    }), operations, meta);
  })));
}
var List_default = List;

// node_modules/rc-field-form/es/useForm.js
var React18 = __toESM(require_react());

// node_modules/rc-field-form/es/utils/asyncUtil.js
function allPromiseFinish(promiseList) {
  var hasError = false;
  var count = promiseList.length;
  var results = [];
  if (!promiseList.length) {
    return Promise.resolve([]);
  }
  return new Promise(function(resolve, reject) {
    promiseList.forEach(function(promise, index) {
      promise.catch(function(e) {
        hasError = true;
        return e;
      }).then(function(result) {
        count -= 1;
        results[index] = result;
        if (count > 0) {
          return;
        }
        if (hasError) {
          reject(results);
        }
        resolve(results);
      });
    });
  });
}

// node_modules/rc-field-form/es/utils/NameMap.js
var SPLIT = "__@field_split__";
function normalize(namePath) {
  return namePath.map(function(cell) {
    return "".concat(_typeof(cell), ":").concat(cell);
  }).join(SPLIT);
}
var NameMap = function() {
  function NameMap2() {
    _classCallCheck(this, NameMap2);
    _defineProperty(this, "kvs", /* @__PURE__ */ new Map());
  }
  _createClass(NameMap2, [{
    key: "set",
    value: function set2(key, value) {
      this.kvs.set(normalize(key), value);
    }
  }, {
    key: "get",
    value: function get2(key) {
      return this.kvs.get(normalize(key));
    }
  }, {
    key: "update",
    value: function update(key, updater) {
      var origin = this.get(key);
      var next = updater(origin);
      if (!next) {
        this.delete(key);
      } else {
        this.set(key, next);
      }
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.kvs.delete(normalize(key));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function map(callback) {
      return _toConsumableArray(this.kvs.entries()).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
        var cells = key.split(SPLIT);
        return callback({
          key: cells.map(function(cell) {
            var _cell$match = cell.match(/^([^:]*):(.*)$/), _cell$match2 = _slicedToArray(_cell$match, 3), type4 = _cell$match2[1], unit2 = _cell$match2[2];
            return type4 === "number" ? Number(unit2) : unit2;
          }),
          value
        });
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      this.map(function(_ref3) {
        var key = _ref3.key, value = _ref3.value;
        json[key.join(".")] = value;
        return null;
      });
      return json;
    }
  }]);
  return NameMap2;
}();
var NameMap_default = NameMap;

// node_modules/rc-field-form/es/useForm.js
var _excluded7 = ["name"];
var FormStore = _createClass(function FormStore2(forceRootUpdate) {
  var _this = this;
  _classCallCheck(this, FormStore2);
  _defineProperty(this, "formHooked", false);
  _defineProperty(this, "forceRootUpdate", void 0);
  _defineProperty(this, "subscribable", true);
  _defineProperty(this, "store", {});
  _defineProperty(this, "fieldEntities", []);
  _defineProperty(this, "initialValues", {});
  _defineProperty(this, "callbacks", {});
  _defineProperty(this, "validateMessages", null);
  _defineProperty(this, "preserve", null);
  _defineProperty(this, "lastValidatePromise", null);
  _defineProperty(this, "getForm", function() {
    return {
      getFieldValue: _this.getFieldValue,
      getFieldsValue: _this.getFieldsValue,
      getFieldError: _this.getFieldError,
      getFieldWarning: _this.getFieldWarning,
      getFieldsError: _this.getFieldsError,
      isFieldsTouched: _this.isFieldsTouched,
      isFieldTouched: _this.isFieldTouched,
      isFieldValidating: _this.isFieldValidating,
      isFieldsValidating: _this.isFieldsValidating,
      resetFields: _this.resetFields,
      setFields: _this.setFields,
      setFieldValue: _this.setFieldValue,
      setFieldsValue: _this.setFieldsValue,
      validateFields: _this.validateFields,
      submit: _this.submit,
      _init: true,
      getInternalHooks: _this.getInternalHooks
    };
  });
  _defineProperty(this, "getInternalHooks", function(key) {
    if (key === HOOK_MARK) {
      _this.formHooked = true;
      return {
        dispatch: _this.dispatch,
        initEntityValue: _this.initEntityValue,
        registerField: _this.registerField,
        useSubscribe: _this.useSubscribe,
        setInitialValues: _this.setInitialValues,
        destroyForm: _this.destroyForm,
        setCallbacks: _this.setCallbacks,
        setValidateMessages: _this.setValidateMessages,
        getFields: _this.getFields,
        setPreserve: _this.setPreserve,
        getInitialValue: _this.getInitialValue,
        registerWatch: _this.registerWatch
      };
    }
    warning_default(false, "`getInternalHooks` is internal usage. Should not call directly.");
    return null;
  });
  _defineProperty(this, "useSubscribe", function(subscribable) {
    _this.subscribable = subscribable;
  });
  _defineProperty(this, "prevWithoutPreserves", null);
  _defineProperty(this, "setInitialValues", function(initialValues, init) {
    _this.initialValues = initialValues || {};
    if (init) {
      var _this$prevWithoutPres;
      var nextStore = merge(initialValues, _this.store);
      (_this$prevWithoutPres = _this.prevWithoutPreserves) === null || _this$prevWithoutPres === void 0 || _this$prevWithoutPres.map(function(_ref) {
        var namePath = _ref.key;
        nextStore = set(nextStore, namePath, get(initialValues, namePath));
      });
      _this.prevWithoutPreserves = null;
      _this.updateStore(nextStore);
    }
  });
  _defineProperty(this, "destroyForm", function() {
    var prevWithoutPreserves = new NameMap_default();
    _this.getFieldEntities(true).forEach(function(entity) {
      if (!_this.isMergedPreserve(entity.isPreserve())) {
        prevWithoutPreserves.set(entity.getNamePath(), true);
      }
    });
    _this.prevWithoutPreserves = prevWithoutPreserves;
  });
  _defineProperty(this, "getInitialValue", function(namePath) {
    var initValue = get(_this.initialValues, namePath);
    return namePath.length ? merge(initValue) : initValue;
  });
  _defineProperty(this, "setCallbacks", function(callbacks) {
    _this.callbacks = callbacks;
  });
  _defineProperty(this, "setValidateMessages", function(validateMessages) {
    _this.validateMessages = validateMessages;
  });
  _defineProperty(this, "setPreserve", function(preserve) {
    _this.preserve = preserve;
  });
  _defineProperty(this, "watchList", []);
  _defineProperty(this, "registerWatch", function(callback) {
    _this.watchList.push(callback);
    return function() {
      _this.watchList = _this.watchList.filter(function(fn) {
        return fn !== callback;
      });
    };
  });
  _defineProperty(this, "notifyWatch", function() {
    var namePath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (_this.watchList.length) {
      var values = _this.getFieldsValue();
      var allValues = _this.getFieldsValue(true);
      _this.watchList.forEach(function(callback) {
        callback(values, allValues, namePath);
      });
    }
  });
  _defineProperty(this, "timeoutId", null);
  _defineProperty(this, "warningUnhooked", function() {
    if (!_this.timeoutId && typeof window !== "undefined") {
      _this.timeoutId = setTimeout(function() {
        _this.timeoutId = null;
        if (!_this.formHooked) {
          warning_default(false, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
        }
      });
    }
  });
  _defineProperty(this, "updateStore", function(nextStore) {
    _this.store = nextStore;
  });
  _defineProperty(this, "getFieldEntities", function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!pure) {
      return _this.fieldEntities;
    }
    return _this.fieldEntities.filter(function(field) {
      return field.getNamePath().length;
    });
  });
  _defineProperty(this, "getFieldsMap", function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var cache = new NameMap_default();
    _this.getFieldEntities(pure).forEach(function(field) {
      var namePath = field.getNamePath();
      cache.set(namePath, field);
    });
    return cache;
  });
  _defineProperty(this, "getFieldEntitiesForNamePathList", function(nameList) {
    if (!nameList) {
      return _this.getFieldEntities(true);
    }
    var cache = _this.getFieldsMap(true);
    return nameList.map(function(name) {
      var namePath = getNamePath(name);
      return cache.get(namePath) || {
        INVALIDATE_NAME_PATH: getNamePath(name)
      };
    });
  });
  _defineProperty(this, "getFieldsValue", function(nameList, filterFunc) {
    _this.warningUnhooked();
    var mergedNameList;
    var mergedFilterFunc;
    var mergedStrict;
    if (nameList === true || Array.isArray(nameList)) {
      mergedNameList = nameList;
      mergedFilterFunc = filterFunc;
    } else if (nameList && _typeof(nameList) === "object") {
      mergedStrict = nameList.strict;
      mergedFilterFunc = nameList.filter;
    }
    if (mergedNameList === true && !mergedFilterFunc) {
      return _this.store;
    }
    var fieldEntities = _this.getFieldEntitiesForNamePathList(Array.isArray(mergedNameList) ? mergedNameList : null);
    var filteredNameList = [];
    fieldEntities.forEach(function(entity) {
      var _isListField, _ref3;
      var namePath = "INVALIDATE_NAME_PATH" in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();
      if (mergedStrict) {
        var _isList, _ref2;
        if ((_isList = (_ref2 = entity).isList) !== null && _isList !== void 0 && _isList.call(_ref2)) {
          return;
        }
      } else if (!mergedNameList && (_isListField = (_ref3 = entity).isListField) !== null && _isListField !== void 0 && _isListField.call(_ref3)) {
        return;
      }
      if (!mergedFilterFunc) {
        filteredNameList.push(namePath);
      } else {
        var meta = "getMeta" in entity ? entity.getMeta() : null;
        if (mergedFilterFunc(meta)) {
          filteredNameList.push(namePath);
        }
      }
    });
    return cloneByNamePathList(_this.store, filteredNameList.map(getNamePath));
  });
  _defineProperty(this, "getFieldValue", function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    return get(_this.store, namePath);
  });
  _defineProperty(this, "getFieldsError", function(nameList) {
    _this.warningUnhooked();
    var fieldEntities = _this.getFieldEntitiesForNamePathList(nameList);
    return fieldEntities.map(function(entity, index) {
      if (entity && !("INVALIDATE_NAME_PATH" in entity)) {
        return {
          name: entity.getNamePath(),
          errors: entity.getErrors(),
          warnings: entity.getWarnings()
        };
      }
      return {
        name: getNamePath(nameList[index]),
        errors: [],
        warnings: []
      };
    });
  });
  _defineProperty(this, "getFieldError", function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this.getFieldsError([namePath])[0];
    return fieldError.errors;
  });
  _defineProperty(this, "getFieldWarning", function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this.getFieldsError([namePath])[0];
    return fieldError.warnings;
  });
  _defineProperty(this, "isFieldsTouched", function() {
    _this.warningUnhooked();
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var arg0 = args[0], arg1 = args[1];
    var namePathList;
    var isAllFieldsTouched = false;
    if (args.length === 0) {
      namePathList = null;
    } else if (args.length === 1) {
      if (Array.isArray(arg0)) {
        namePathList = arg0.map(getNamePath);
        isAllFieldsTouched = false;
      } else {
        namePathList = null;
        isAllFieldsTouched = arg0;
      }
    } else {
      namePathList = arg0.map(getNamePath);
      isAllFieldsTouched = arg1;
    }
    var fieldEntities = _this.getFieldEntities(true);
    var isFieldTouched = function isFieldTouched2(field) {
      return field.isFieldTouched();
    };
    if (!namePathList) {
      return isAllFieldsTouched ? fieldEntities.every(isFieldTouched) : fieldEntities.some(isFieldTouched);
    }
    var map = new NameMap_default();
    namePathList.forEach(function(shortNamePath) {
      map.set(shortNamePath, []);
    });
    fieldEntities.forEach(function(field) {
      var fieldNamePath = field.getNamePath();
      namePathList.forEach(function(shortNamePath) {
        if (shortNamePath.every(function(nameUnit, i) {
          return fieldNamePath[i] === nameUnit;
        })) {
          map.update(shortNamePath, function(list) {
            return [].concat(_toConsumableArray(list), [field]);
          });
        }
      });
    });
    var isNamePathListTouched = function isNamePathListTouched2(entities) {
      return entities.some(isFieldTouched);
    };
    var namePathListEntities = map.map(function(_ref4) {
      var value = _ref4.value;
      return value;
    });
    return isAllFieldsTouched ? namePathListEntities.every(isNamePathListTouched) : namePathListEntities.some(isNamePathListTouched);
  });
  _defineProperty(this, "isFieldTouched", function(name) {
    _this.warningUnhooked();
    return _this.isFieldsTouched([name]);
  });
  _defineProperty(this, "isFieldsValidating", function(nameList) {
    _this.warningUnhooked();
    var fieldEntities = _this.getFieldEntities();
    if (!nameList) {
      return fieldEntities.some(function(testField) {
        return testField.isFieldValidating();
      });
    }
    var namePathList = nameList.map(getNamePath);
    return fieldEntities.some(function(testField) {
      var fieldNamePath = testField.getNamePath();
      return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
    });
  });
  _defineProperty(this, "isFieldValidating", function(name) {
    _this.warningUnhooked();
    return _this.isFieldsValidating([name]);
  });
  _defineProperty(this, "resetWithFieldInitialValue", function() {
    var info = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var cache = new NameMap_default();
    var fieldEntities = _this.getFieldEntities(true);
    fieldEntities.forEach(function(field) {
      var initialValue = field.props.initialValue;
      var namePath = field.getNamePath();
      if (initialValue !== void 0) {
        var records = cache.get(namePath) || /* @__PURE__ */ new Set();
        records.add({
          entity: field,
          value: initialValue
        });
        cache.set(namePath, records);
      }
    });
    var resetWithFields = function resetWithFields2(entities) {
      entities.forEach(function(field) {
        var initialValue = field.props.initialValue;
        if (initialValue !== void 0) {
          var namePath = field.getNamePath();
          var formInitialValue = _this.getInitialValue(namePath);
          if (formInitialValue !== void 0) {
            warning_default(false, "Form already set 'initialValues' with path '".concat(namePath.join("."), "'. Field can not overwrite it."));
          } else {
            var records = cache.get(namePath);
            if (records && records.size > 1) {
              warning_default(false, "Multiple Field with path '".concat(namePath.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            } else if (records) {
              var originValue = _this.getFieldValue(namePath);
              var isListField = field.isListField();
              if (!isListField && (!info.skipExist || originValue === void 0)) {
                _this.updateStore(set(_this.store, namePath, _toConsumableArray(records)[0].value));
              }
            }
          }
        }
      });
    };
    var requiredFieldEntities;
    if (info.entities) {
      requiredFieldEntities = info.entities;
    } else if (info.namePathList) {
      requiredFieldEntities = [];
      info.namePathList.forEach(function(namePath) {
        var records = cache.get(namePath);
        if (records) {
          var _requiredFieldEntitie;
          (_requiredFieldEntitie = requiredFieldEntities).push.apply(_requiredFieldEntitie, _toConsumableArray(_toConsumableArray(records).map(function(r) {
            return r.entity;
          })));
        }
      });
    } else {
      requiredFieldEntities = fieldEntities;
    }
    resetWithFields(requiredFieldEntities);
  });
  _defineProperty(this, "resetFields", function(nameList) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    if (!nameList) {
      _this.updateStore(merge(_this.initialValues));
      _this.resetWithFieldInitialValue();
      _this.notifyObservers(prevStore, null, {
        type: "reset"
      });
      _this.notifyWatch();
      return;
    }
    var namePathList = nameList.map(getNamePath);
    namePathList.forEach(function(namePath) {
      var initialValue = _this.getInitialValue(namePath);
      _this.updateStore(set(_this.store, namePath, initialValue));
    });
    _this.resetWithFieldInitialValue({
      namePathList
    });
    _this.notifyObservers(prevStore, namePathList, {
      type: "reset"
    });
    _this.notifyWatch(namePathList);
  });
  _defineProperty(this, "setFields", function(fields) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    var namePathList = [];
    fields.forEach(function(fieldData) {
      var name = fieldData.name, data = _objectWithoutProperties(fieldData, _excluded7);
      var namePath = getNamePath(name);
      namePathList.push(namePath);
      if ("value" in data) {
        _this.updateStore(set(_this.store, namePath, data.value));
      }
      _this.notifyObservers(prevStore, [namePath], {
        type: "setField",
        data: fieldData
      });
    });
    _this.notifyWatch(namePathList);
  });
  _defineProperty(this, "getFields", function() {
    var entities = _this.getFieldEntities(true);
    var fields = entities.map(function(field) {
      var namePath = field.getNamePath();
      var meta = field.getMeta();
      var fieldData = _objectSpread2(_objectSpread2({}, meta), {}, {
        name: namePath,
        value: _this.getFieldValue(namePath)
      });
      Object.defineProperty(fieldData, "originRCField", {
        value: true
      });
      return fieldData;
    });
    return fields;
  });
  _defineProperty(this, "initEntityValue", function(entity) {
    var initialValue = entity.props.initialValue;
    if (initialValue !== void 0) {
      var namePath = entity.getNamePath();
      var prevValue = get(_this.store, namePath);
      if (prevValue === void 0) {
        _this.updateStore(set(_this.store, namePath, initialValue));
      }
    }
  });
  _defineProperty(this, "isMergedPreserve", function(fieldPreserve) {
    var mergedPreserve = fieldPreserve !== void 0 ? fieldPreserve : _this.preserve;
    return mergedPreserve !== null && mergedPreserve !== void 0 ? mergedPreserve : true;
  });
  _defineProperty(this, "registerField", function(entity) {
    _this.fieldEntities.push(entity);
    var namePath = entity.getNamePath();
    _this.notifyWatch([namePath]);
    if (entity.props.initialValue !== void 0) {
      var prevStore = _this.store;
      _this.resetWithFieldInitialValue({
        entities: [entity],
        skipExist: true
      });
      _this.notifyObservers(prevStore, [entity.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(isListField, preserve) {
      var subNamePath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      _this.fieldEntities = _this.fieldEntities.filter(function(item) {
        return item !== entity;
      });
      if (!_this.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
        var defaultValue = isListField ? void 0 : _this.getInitialValue(namePath);
        if (namePath.length && _this.getFieldValue(namePath) !== defaultValue && _this.fieldEntities.every(function(field) {
          return (
            // Only reset when no namePath exist
            !matchNamePath(field.getNamePath(), namePath)
          );
        })) {
          var _prevStore = _this.store;
          _this.updateStore(set(_prevStore, namePath, defaultValue, true));
          _this.notifyObservers(_prevStore, [namePath], {
            type: "remove"
          });
          _this.triggerDependenciesUpdate(_prevStore, namePath);
        }
      }
      _this.notifyWatch([namePath]);
    };
  });
  _defineProperty(this, "dispatch", function(action) {
    switch (action.type) {
      case "updateValue": {
        var namePath = action.namePath, value = action.value;
        _this.updateValue(namePath, value);
        break;
      }
      case "validateField": {
        var _namePath = action.namePath, triggerName = action.triggerName;
        _this.validateFields([_namePath], {
          triggerName
        });
        break;
      }
      default:
    }
  });
  _defineProperty(this, "notifyObservers", function(prevStore, namePathList, info) {
    if (_this.subscribable) {
      var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, {
        store: _this.getFieldsValue(true)
      });
      _this.getFieldEntities().forEach(function(_ref5) {
        var onStoreChange = _ref5.onStoreChange;
        onStoreChange(prevStore, namePathList, mergedInfo);
      });
    } else {
      _this.forceRootUpdate();
    }
  });
  _defineProperty(this, "triggerDependenciesUpdate", function(prevStore, namePath) {
    var childrenFields = _this.getDependencyChildrenFields(namePath);
    if (childrenFields.length) {
      _this.validateFields(childrenFields);
    }
    _this.notifyObservers(prevStore, childrenFields, {
      type: "dependenciesUpdate",
      relatedFields: [namePath].concat(_toConsumableArray(childrenFields))
    });
    return childrenFields;
  });
  _defineProperty(this, "updateValue", function(name, value) {
    var namePath = getNamePath(name);
    var prevStore = _this.store;
    _this.updateStore(set(_this.store, namePath, value));
    _this.notifyObservers(prevStore, [namePath], {
      type: "valueUpdate",
      source: "internal"
    });
    _this.notifyWatch([namePath]);
    var childrenFields = _this.triggerDependenciesUpdate(prevStore, namePath);
    var onValuesChange = _this.callbacks.onValuesChange;
    if (onValuesChange) {
      var changedValues = cloneByNamePathList(_this.store, [namePath]);
      onValuesChange(changedValues, _this.getFieldsValue());
    }
    _this.triggerOnFieldsChange([namePath].concat(_toConsumableArray(childrenFields)));
  });
  _defineProperty(this, "setFieldsValue", function(store) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    if (store) {
      var nextStore = merge(_this.store, store);
      _this.updateStore(nextStore);
    }
    _this.notifyObservers(prevStore, null, {
      type: "valueUpdate",
      source: "external"
    });
    _this.notifyWatch();
  });
  _defineProperty(this, "setFieldValue", function(name, value) {
    _this.setFields([{
      name,
      value
    }]);
  });
  _defineProperty(this, "getDependencyChildrenFields", function(rootNamePath) {
    var children = /* @__PURE__ */ new Set();
    var childrenFields = [];
    var dependencies2fields = new NameMap_default();
    _this.getFieldEntities().forEach(function(field) {
      var dependencies = field.props.dependencies;
      (dependencies || []).forEach(function(dependency) {
        var dependencyNamePath = getNamePath(dependency);
        dependencies2fields.update(dependencyNamePath, function() {
          var fields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          fields.add(field);
          return fields;
        });
      });
    });
    var fillChildren = function fillChildren2(namePath) {
      var fields = dependencies2fields.get(namePath) || /* @__PURE__ */ new Set();
      fields.forEach(function(field) {
        if (!children.has(field)) {
          children.add(field);
          var fieldNamePath = field.getNamePath();
          if (field.isFieldDirty() && fieldNamePath.length) {
            childrenFields.push(fieldNamePath);
            fillChildren2(fieldNamePath);
          }
        }
      });
    };
    fillChildren(rootNamePath);
    return childrenFields;
  });
  _defineProperty(this, "triggerOnFieldsChange", function(namePathList, filedErrors) {
    var onFieldsChange = _this.callbacks.onFieldsChange;
    if (onFieldsChange) {
      var fields = _this.getFields();
      if (filedErrors) {
        var cache = new NameMap_default();
        filedErrors.forEach(function(_ref6) {
          var name = _ref6.name, errors = _ref6.errors;
          cache.set(name, errors);
        });
        fields.forEach(function(field) {
          field.errors = cache.get(field.name) || field.errors;
        });
      }
      var changedFields = fields.filter(function(_ref7) {
        var fieldName = _ref7.name;
        return containsNamePath(namePathList, fieldName);
      });
      if (changedFields.length) {
        onFieldsChange(changedFields, fields);
      }
    }
  });
  _defineProperty(this, "validateFields", function(arg1, arg2) {
    _this.warningUnhooked();
    var nameList;
    var options;
    if (Array.isArray(arg1) || typeof arg1 === "string" || typeof arg2 === "string") {
      nameList = arg1;
      options = arg2;
    } else {
      options = arg1;
    }
    var provideNameList = !!nameList;
    var namePathList = provideNameList ? nameList.map(getNamePath) : [];
    var promiseList = [];
    var TMP_SPLIT = String(Date.now());
    var validateNamePathList = /* @__PURE__ */ new Set();
    var _ref8 = options || {}, recursive = _ref8.recursive, dirty = _ref8.dirty;
    _this.getFieldEntities(true).forEach(function(field) {
      if (!provideNameList) {
        namePathList.push(field.getNamePath());
      }
      if (!field.props.rules || !field.props.rules.length) {
        return;
      }
      if (dirty && !field.isFieldDirty()) {
        return;
      }
      var fieldNamePath = field.getNamePath();
      validateNamePathList.add(fieldNamePath.join(TMP_SPLIT));
      if (!provideNameList || containsNamePath(namePathList, fieldNamePath, recursive)) {
        var promise = field.validateRules(_objectSpread2({
          validateMessages: _objectSpread2(_objectSpread2({}, defaultValidateMessages), _this.validateMessages)
        }, options));
        promiseList.push(promise.then(function() {
          return {
            name: fieldNamePath,
            errors: [],
            warnings: []
          };
        }).catch(function(ruleErrors) {
          var _ruleErrors$forEach;
          var mergedErrors = [];
          var mergedWarnings = [];
          (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 || _ruleErrors$forEach.call(ruleErrors, function(_ref9) {
            var warningOnly = _ref9.rule.warningOnly, errors = _ref9.errors;
            if (warningOnly) {
              mergedWarnings.push.apply(mergedWarnings, _toConsumableArray(errors));
            } else {
              mergedErrors.push.apply(mergedErrors, _toConsumableArray(errors));
            }
          });
          if (mergedErrors.length) {
            return Promise.reject({
              name: fieldNamePath,
              errors: mergedErrors,
              warnings: mergedWarnings
            });
          }
          return {
            name: fieldNamePath,
            errors: mergedErrors,
            warnings: mergedWarnings
          };
        }));
      }
    });
    var summaryPromise = allPromiseFinish(promiseList);
    _this.lastValidatePromise = summaryPromise;
    summaryPromise.catch(function(results) {
      return results;
    }).then(function(results) {
      var resultNamePathList = results.map(function(_ref10) {
        var name = _ref10.name;
        return name;
      });
      _this.notifyObservers(_this.store, resultNamePathList, {
        type: "validateFinish"
      });
      _this.triggerOnFieldsChange(resultNamePathList, results);
    });
    var returnPromise = summaryPromise.then(function() {
      if (_this.lastValidatePromise === summaryPromise) {
        return Promise.resolve(_this.getFieldsValue(namePathList));
      }
      return Promise.reject([]);
    }).catch(function(results) {
      var errorList = results.filter(function(result) {
        return result && result.errors.length;
      });
      return Promise.reject({
        values: _this.getFieldsValue(namePathList),
        errorFields: errorList,
        outOfDate: _this.lastValidatePromise !== summaryPromise
      });
    });
    returnPromise.catch(function(e) {
      return e;
    });
    var triggerNamePathList = namePathList.filter(function(namePath) {
      return validateNamePathList.has(namePath.join(TMP_SPLIT));
    });
    _this.triggerOnFieldsChange(triggerNamePathList);
    return returnPromise;
  });
  _defineProperty(this, "submit", function() {
    _this.warningUnhooked();
    _this.validateFields().then(function(values) {
      var onFinish = _this.callbacks.onFinish;
      if (onFinish) {
        try {
          onFinish(values);
        } catch (err) {
          console.error(err);
        }
      }
    }).catch(function(e) {
      var onFinishFailed = _this.callbacks.onFinishFailed;
      if (onFinishFailed) {
        onFinishFailed(e);
      }
    });
  });
  this.forceRootUpdate = forceRootUpdate;
});
function useForm(form) {
  var formRef = React18.useRef();
  var _React$useState = React18.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      var forceReRender = function forceReRender2() {
        forceUpdate({});
      };
      var formStore = new FormStore(forceReRender);
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
var useForm_default = useForm;

// node_modules/rc-field-form/es/Form.js
var React20 = __toESM(require_react());

// node_modules/rc-field-form/es/FormContext.js
var React19 = __toESM(require_react());
var FormContext = React19.createContext({
  triggerFormChange: function triggerFormChange() {
  },
  triggerFormFinish: function triggerFormFinish() {
  },
  registerForm: function registerForm() {
  },
  unregisterForm: function unregisterForm() {
  }
});
var FormProvider = function FormProvider2(_ref) {
  var validateMessages = _ref.validateMessages, onFormChange = _ref.onFormChange, onFormFinish = _ref.onFormFinish, children = _ref.children;
  var formContext = React19.useContext(FormContext);
  var formsRef = React19.useRef({});
  return React19.createElement(FormContext.Provider, {
    value: _objectSpread2(_objectSpread2({}, formContext), {}, {
      validateMessages: _objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function triggerFormChange2(name, changedFields) {
        if (onFormChange) {
          onFormChange(name, {
            changedFields,
            forms: formsRef.current
          });
        }
        formContext.triggerFormChange(name, changedFields);
      },
      triggerFormFinish: function triggerFormFinish2(name, values) {
        if (onFormFinish) {
          onFormFinish(name, {
            values,
            forms: formsRef.current
          });
        }
        formContext.triggerFormFinish(name, values);
      },
      registerForm: function registerForm2(name, form) {
        if (name) {
          formsRef.current = _objectSpread2(_objectSpread2({}, formsRef.current), {}, _defineProperty({}, name, form));
        }
        formContext.registerForm(name, form);
      },
      unregisterForm: function unregisterForm2(name) {
        var newForms = _objectSpread2({}, formsRef.current);
        delete newForms[name];
        formsRef.current = newForms;
        formContext.unregisterForm(name);
      }
    })
  }, children);
};
var FormContext_default = FormContext;

// node_modules/rc-field-form/es/Form.js
var _excluded8 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"];
var Form = function Form2(_ref, ref) {
  var name = _ref.name, initialValues = _ref.initialValues, fields = _ref.fields, form = _ref.form, preserve = _ref.preserve, children = _ref.children, _ref$component = _ref.component, Component2 = _ref$component === void 0 ? "form" : _ref$component, validateMessages = _ref.validateMessages, _ref$validateTrigger = _ref.validateTrigger, validateTrigger = _ref$validateTrigger === void 0 ? "onChange" : _ref$validateTrigger, onValuesChange = _ref.onValuesChange, _onFieldsChange = _ref.onFieldsChange, _onFinish = _ref.onFinish, onFinishFailed = _ref.onFinishFailed, restProps = _objectWithoutProperties(_ref, _excluded8);
  var formContext = React20.useContext(FormContext_default);
  var _useForm = useForm_default(form), _useForm2 = _slicedToArray(_useForm, 1), formInstance = _useForm2[0];
  var _getInternalHooks = formInstance.getInternalHooks(HOOK_MARK), useSubscribe = _getInternalHooks.useSubscribe, setInitialValues = _getInternalHooks.setInitialValues, setCallbacks = _getInternalHooks.setCallbacks, setValidateMessages = _getInternalHooks.setValidateMessages, setPreserve = _getInternalHooks.setPreserve, destroyForm = _getInternalHooks.destroyForm;
  React20.useImperativeHandle(ref, function() {
    return formInstance;
  });
  React20.useEffect(function() {
    formContext.registerForm(name, formInstance);
    return function() {
      formContext.unregisterForm(name);
    };
  }, [formContext, formInstance, name]);
  setValidateMessages(_objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages));
  setCallbacks({
    onValuesChange,
    onFieldsChange: function onFieldsChange(changedFields) {
      formContext.triggerFormChange(name, changedFields);
      if (_onFieldsChange) {
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        _onFieldsChange.apply(void 0, [changedFields].concat(rest));
      }
    },
    onFinish: function onFinish(values) {
      formContext.triggerFormFinish(name, values);
      if (_onFinish) {
        _onFinish(values);
      }
    },
    onFinishFailed
  });
  setPreserve(preserve);
  var mountRef = React20.useRef(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }
  React20.useEffect(
    function() {
      return destroyForm;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var childrenNode;
  var childrenRenderProps = typeof children === "function";
  if (childrenRenderProps) {
    var _values = formInstance.getFieldsValue(true);
    childrenNode = children(_values, formInstance);
  } else {
    childrenNode = children;
  }
  useSubscribe(!childrenRenderProps);
  var prevFieldsRef = React20.useRef();
  React20.useEffect(function() {
    if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
      formInstance.setFields(fields || []);
    }
    prevFieldsRef.current = fields;
  }, [fields, formInstance]);
  var formContextValue = React20.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, formInstance), {}, {
      validateTrigger
    });
  }, [formInstance, validateTrigger]);
  var wrapperNode = React20.createElement(ListContext_default.Provider, {
    value: null
  }, React20.createElement(FieldContext_default.Provider, {
    value: formContextValue
  }, childrenNode));
  if (Component2 === false) {
    return wrapperNode;
  }
  return React20.createElement(Component2, _extends({}, restProps, {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      formInstance.submit();
    },
    onReset: function onReset(event) {
      var _restProps$onReset;
      event.preventDefault();
      formInstance.resetFields();
      (_restProps$onReset = restProps.onReset) === null || _restProps$onReset === void 0 || _restProps$onReset.call(restProps, event);
    }
  }), wrapperNode);
};
var Form_default = Form;

// node_modules/rc-field-form/es/useWatch.js
var import_react6 = __toESM(require_react());
function stringify(value) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    return Math.random();
  }
}
var useWatchWarning = true ? function(namePath) {
  var fullyStr = namePath.join("__RC_FIELD_FORM_SPLIT__");
  var nameStrRef = (0, import_react6.useRef)(fullyStr);
  warning_default(nameStrRef.current === fullyStr, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function useWatch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var dependencies = args[0], _args$ = args[1], _form = _args$ === void 0 ? {} : _args$;
  var options = isFormInstance(_form) ? {
    form: _form
  } : _form;
  var form = options.form;
  var _useState = (0, import_react6.useState)(), _useState2 = _slicedToArray(_useState, 2), value = _useState2[0], setValue = _useState2[1];
  var valueStr = (0, import_react6.useMemo)(function() {
    return stringify(value);
  }, [value]);
  var valueStrRef = (0, import_react6.useRef)(valueStr);
  valueStrRef.current = valueStr;
  var fieldContext = (0, import_react6.useContext)(FieldContext_default);
  var formInstance = form || fieldContext;
  var isValidForm = formInstance && formInstance._init;
  if (true) {
    warning_default(args.length === 2 ? form ? isValidForm : true : isValidForm, "useWatch requires a form instance since it can not auto detect from context.");
  }
  var namePath = getNamePath(dependencies);
  var namePathRef = (0, import_react6.useRef)(namePath);
  namePathRef.current = namePath;
  useWatchWarning(namePath);
  (0, import_react6.useEffect)(
    function() {
      if (!isValidForm) {
        return;
      }
      var getFieldsValue = formInstance.getFieldsValue, getInternalHooks2 = formInstance.getInternalHooks;
      var _getInternalHooks = getInternalHooks2(HOOK_MARK), registerWatch = _getInternalHooks.registerWatch;
      var getWatchValue = function getWatchValue2(values, allValues) {
        var watchValue = options.preserve ? allValues : values;
        return typeof dependencies === "function" ? dependencies(watchValue) : get(watchValue, namePathRef.current);
      };
      var cancelRegister = registerWatch(function(values, allValues) {
        var newValue = getWatchValue(values, allValues);
        var nextValueStr = stringify(newValue);
        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr;
          setValue(newValue);
        }
      });
      var initialValue = getWatchValue(getFieldsValue(), getFieldsValue(true));
      if (value !== initialValue) {
        setValue(initialValue);
      }
      return cancelRegister;
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidForm]
  );
  return value;
}
var useWatch_default = useWatch;

// node_modules/rc-field-form/es/index.js
var InternalForm = React21.forwardRef(Form_default);
var RefForm = InternalForm;
RefForm.FormProvider = FormProvider;
RefForm.Field = Field_default;
RefForm.List = List_default;
RefForm.useForm = useForm_default;
RefForm.useWatch = useWatch_default;
var es_default6 = RefForm;

// node_modules/antd/es/form/context.js
var FormContext2 = React22.createContext({
  labelAlign: "right",
  vertical: false,
  itemRef: () => {
  }
});
var NoStyleItemContext = React22.createContext(null);
var FormProvider3 = (props) => {
  const providerProps = omit(props, ["prefixCls"]);
  return React22.createElement(FormProvider, Object.assign({}, providerProps));
};
var FormItemPrefixContext = React22.createContext({
  prefixCls: ""
});
var FormItemInputContext = React22.createContext({});
if (true) {
  FormItemInputContext.displayName = "FormItemInputContext";
}
var NoFormStyle = (_ref) => {
  let {
    children,
    status,
    override
  } = _ref;
  const formItemInputContext = (0, import_react7.useContext)(FormItemInputContext);
  const newFormItemInputContext = (0, import_react7.useMemo)(() => {
    const newContext = Object.assign({}, formItemInputContext);
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);
  return React22.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};

// node_modules/antd/es/input/Input.js
var import_react9 = __toESM(require_react());
var import_classnames11 = __toESM(require_classnames());

// node_modules/antd/es/input/hooks/useRemovePasswordTimeout.js
var import_react8 = __toESM(require_react());
function useRemovePasswordTimeout(inputRef, triggerOnMount) {
  const removePasswordTimeoutRef = (0, import_react8.useRef)([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(setTimeout(() => {
      var _a, _b, _c, _d;
      if (((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input) && ((_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.input.getAttribute("type")) === "password" && ((_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.input.hasAttribute("value"))) {
        (_d = inputRef.current) === null || _d === void 0 ? void 0 : _d.input.removeAttribute("value");
      }
    }));
  };
  (0, import_react8.useEffect)(() => {
    if (triggerOnMount) {
      removePasswordTimeout();
    }
    return () => removePasswordTimeoutRef.current.forEach((timer) => {
      if (timer) {
        clearTimeout(timer);
      }
    });
  }, []);
  return removePasswordTimeout;
}

// node_modules/antd/es/style/compact-item.js
function compactItemBorder(token, parentCls, options) {
  const {
    focusElCls,
    focus,
    borderElCls
  } = options;
  const childCombinator = borderElCls ? "> *" : "";
  const hoverEffects = ["hover", focus ? "focus" : null, "active"].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal()
    },
    "&-item": Object.assign(Object.assign({
      [hoverEffects]: {
        zIndex: 2
      }
    }, focusElCls ? {
      [`&${focusElCls}`]: {
        zIndex: 2
      }
    } : {}), {
      [`&[disabled] ${childCombinator}`]: {
        zIndex: 0
      }
    })
  };
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
  const {
    borderElCls
  } = options;
  const childCombinator = borderElCls ? `> ${borderElCls}` : "";
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
      borderRadius: 0
    },
    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function genCompactItemStyle(token) {
  let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: true
  };
  const {
    componentCls
  } = token;
  const compactCls = `${componentCls}-compact`;
  return {
    [compactCls]: Object.assign(Object.assign({}, compactItemBorder(token, compactCls, options)), compactItemBorderRadius(componentCls, compactCls, options))
  };
}

// node_modules/antd/es/input/style/index.js
var genPlaceholderStyle = (color) => ({
  // Firefox
  "&::-moz-placeholder": {
    opacity: 1
  },
  "&::placeholder": {
    color,
    userSelect: "none"
    // https://github.com/ant-design/ant-design/pull/32639
  },
  "&:placeholder-shown": {
    textOverflow: "ellipsis"
  }
});
var genHoverStyle = (token) => ({
  borderColor: token.hoverBorderColor,
  backgroundColor: token.hoverBg
});
var genActiveStyle = (token) => ({
  borderColor: token.activeBorderColor,
  boxShadow: token.activeShadow,
  outline: 0,
  backgroundColor: token.activeBg
});
var genDisabledStyle = (token) => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "&:hover:not([disabled])": Object.assign({}, genHoverStyle(merge2(token, {
    hoverBorderColor: token.colorBorder,
    hoverBg: token.colorBgContainerDisabled
  })))
});
var genInputLargeStyle = (token) => {
  const {
    paddingBlockLG,
    fontSizeLG,
    lineHeightLG,
    borderRadiusLG,
    paddingInlineLG
  } = token;
  return {
    padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG
  };
};
var genInputSmallStyle = (token) => ({
  padding: `${unit(token.paddingBlockSM)} ${unit(token.paddingInlineSM)}`,
  borderRadius: token.borderRadiusSM
});
var genStatusStyle = (token, parentCls) => {
  const {
    componentCls,
    colorError,
    colorWarning,
    errorActiveShadow,
    warningActiveShadow,
    colorErrorBorderHover,
    colorWarningBorderHover
  } = token;
  return {
    [`&-status-error:not(${parentCls}-disabled):not(${parentCls}-borderless)${parentCls}`]: {
      borderColor: colorError,
      "&:hover": {
        borderColor: colorErrorBorderHover
      },
      "&:focus, &:focus-within": Object.assign({}, genActiveStyle(merge2(token, {
        activeBorderColor: colorError,
        activeShadow: errorActiveShadow
      }))),
      [`${componentCls}-prefix, ${componentCls}-suffix`]: {
        color: colorError
      }
    },
    [`&-status-warning:not(${parentCls}-disabled):not(${parentCls}-borderless)${parentCls}`]: {
      borderColor: colorWarning,
      "&:hover": {
        borderColor: colorWarningBorderHover
      },
      "&:focus, &:focus-within": Object.assign({}, genActiveStyle(merge2(token, {
        activeBorderColor: colorWarning,
        activeShadow: warningActiveShadow
      }))),
      [`${componentCls}-prefix, ${componentCls}-suffix`]: {
        color: colorWarning
      }
    }
  };
};
var genBasicInputStyle = (token) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${unit(token.paddingBlock)} ${unit(token.paddingInline)}`,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.colorBgContainer,
  backgroundImage: "none",
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: token.colorBorder,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`
}, genPlaceholderStyle(token.colorTextPlaceholder)), {
  "&:hover": Object.assign({}, genHoverStyle(token)),
  "&:focus, &:focus-within": Object.assign({}, genActiveStyle(token)),
  "&-disabled, &[disabled]": Object.assign({}, genDisabledStyle(token)),
  "&-borderless": {
    "&, &:hover, &:focus, &-focused, &-disabled, &[disabled]": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none"
    }
  },
  // Reset height for `textarea`s
  "textarea&": {
    maxWidth: "100%",
    // prevent textarea resize from coming out of its container
    height: "auto",
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: "bottom",
    transition: `all ${token.motionDurationSlow}, height 0s`,
    resize: "vertical"
  },
  // Size
  "&-lg": Object.assign({}, genInputLargeStyle(token)),
  "&-sm": Object.assign({}, genInputSmallStyle(token)),
  // RTL
  "&-rtl": {
    direction: "rtl"
  },
  "&-textarea-rtl": {
    direction: "rtl"
  }
});
var genInputGroupStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    position: "relative",
    display: "table",
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    // Undo padding and float of grid classes
    [`&[class*='col-']`]: {
      paddingInlineEnd: token.paddingXS,
      "&:last-child": {
        paddingInlineEnd: 0
      }
    },
    // Sizing options
    [`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: Object.assign({}, genInputLargeStyle(token)),
    [`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: Object.assign({}, genInputSmallStyle(token)),
    // Fix https://github.com/ant-design/ant-design/issues/5754
    [`&-lg ${antCls}-select-single ${antCls}-select-selector`]: {
      height: token.controlHeightLG
    },
    [`&-sm ${antCls}-select-single ${antCls}-select-selector`]: {
      height: token.controlHeightSM
    },
    [`> ${componentCls}`]: {
      display: "table-cell",
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0
      }
    },
    [`${componentCls}-group`]: {
      [`&-addon, &-wrap`]: {
        display: "table-cell",
        width: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        "&:not(:first-child):not(:last-child)": {
          borderRadius: 0
        }
      },
      "&-wrap > *": {
        display: "block !important"
      },
      "&-addon": {
        position: "relative",
        padding: `0 ${unit(token.paddingInline)}`,
        color: token.colorText,
        fontWeight: "normal",
        fontSize: token.fontSize,
        textAlign: "center",
        backgroundColor: token.addonBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        transition: `all ${token.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${antCls}-select`]: {
          margin: `${unit(token.calc(token.paddingBlock).add(1).mul(-1).equal())} ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
          [`&${antCls}-select-single:not(${antCls}-select-customize-input):not(${antCls}-pagination-size-changer)`]: {
            [`${antCls}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
              boxShadow: "none"
            }
          },
          "&-open, &-focused": {
            [`${antCls}-select-selector`]: {
              color: token.colorPrimary
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${antCls}-cascader-picker`]: {
          margin: `-9px ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
          backgroundColor: "transparent",
          [`${antCls}-cascader-input`]: {
            textAlign: "start",
            border: 0,
            boxShadow: "none"
          }
        }
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    },
    [`${componentCls}`]: {
      width: "100%",
      marginBottom: 0,
      textAlign: "inherit",
      "&:focus": {
        zIndex: 1,
        // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1
      },
      "&:hover": {
        zIndex: 1,
        borderInlineEndWidth: 1,
        [`${componentCls}-search-with-button &`]: {
          zIndex: 0
        }
      }
    },
    // Reset rounded corners
    [`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
      // Reset Select's style in addon
      [`${antCls}-select ${antCls}-select-selector`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${componentCls}-affix-wrapper`]: {
      [`&:not(:first-child) ${componentCls}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      },
      [`&:not(:last-child) ${componentCls}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      // Reset Select's style in addon
      [`${antCls}-select ${antCls}-select-selector`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`${componentCls}-affix-wrapper`]: {
      "&:not(:last-child)": {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${componentCls}-search &`]: {
          borderStartStartRadius: token.borderRadius,
          borderEndStartRadius: token.borderRadius
        }
      },
      [`&:not(:first-child), ${componentCls}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&${componentCls}-group-compact`]: Object.assign(Object.assign({
      display: "block"
    }, clearFix()), {
      [`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: {
        "&:not(:first-child):not(:last-child)": {
          borderInlineEndWidth: token.lineWidth,
          "&:hover": {
            zIndex: 1
          },
          "&:focus": {
            zIndex: 1
          }
        }
      },
      "& > *": {
        display: "inline-block",
        float: "none",
        verticalAlign: "top",
        // https://github.com/ant-design/ant-design-pro/issues/139
        borderRadius: 0
      },
      [`
        & > ${componentCls}-affix-wrapper,
        & > ${componentCls}-number-affix-wrapper,
        & > ${antCls}-picker-range
      `]: {
        display: "inline-flex"
      },
      "& > *:not(:last-child)": {
        marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
        borderInlineEndWidth: token.lineWidth
      },
      // Undo float for .ant-input-group .ant-input
      [`${componentCls}`]: {
        float: "none"
      },
      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${antCls}-select > ${antCls}-select-selector,
      & > ${antCls}-select-auto-complete ${componentCls},
      & > ${antCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderRadius: 0,
        "&:hover": {
          zIndex: 1
        },
        "&:focus": {
          zIndex: 1
        }
      },
      [`& > ${antCls}-select-focused`]: {
        zIndex: 1
      },
      // update z-index for arrow icon
      [`& > ${antCls}-select > ${antCls}-select-arrow`]: {
        zIndex: 1
        // https://github.com/ant-design/ant-design/issues/20371
      },
      [`& > *:first-child,
      & > ${antCls}-select:first-child > ${antCls}-select-selector,
      & > ${antCls}-select-auto-complete:first-child ${componentCls},
      & > ${antCls}-cascader-picker:first-child ${componentCls}`]: {
        borderStartStartRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius
      },
      [`& > *:last-child,
      & > ${antCls}-select:last-child > ${antCls}-select-selector,
      & > ${antCls}-cascader-picker:last-child ${componentCls},
      & > ${antCls}-cascader-picker-focused:last-child ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderStartEndRadius: token.borderRadius,
        borderEndEndRadius: token.borderRadius
      },
      // https://github.com/ant-design/ant-design/issues/12493
      [`& > ${antCls}-select-auto-complete ${componentCls}`]: {
        verticalAlign: "top"
      },
      [`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
        marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
        [`${componentCls}-affix-wrapper`]: {
          borderRadius: 0
        }
      },
      [`${componentCls}-group-wrapper:not(:last-child)`]: {
        [`&${componentCls}-search > ${componentCls}-group`]: {
          [`& > ${componentCls}-group-addon > ${componentCls}-search-button`]: {
            borderRadius: 0
          },
          [`& > ${componentCls}`]: {
            borderStartStartRadius: token.borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: token.borderRadius
          }
        }
      }
    })
  };
};
var genInputStyle = (token) => {
  const {
    componentCls,
    controlHeightSM,
    lineWidth,
    calc
  } = token;
  const FIXED_CHROME_COLOR_HEIGHT = 16;
  const colorSmallPadding = calc(controlHeightSM).sub(calc(lineWidth).mul(2)).sub(FIXED_CHROME_COLOR_HEIGHT).div(2).equal();
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genBasicInputStyle(token)), genStatusStyle(token, componentCls)), {
      '&[type="color"]': {
        height: token.controlHeight,
        [`&${componentCls}-lg`]: {
          height: token.controlHeightLG
        },
        [`&${componentCls}-sm`]: {
          height: controlHeightSM,
          paddingTop: colorSmallPadding,
          paddingBottom: colorSmallPadding
        }
      },
      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration': {
        "-webkit-appearance": "none"
      }
    })
  };
};
var genAllowClearStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // ========================= Input =========================
    [`${componentCls}-clear-icon`]: {
      margin: 0,
      color: token.colorTextQuaternary,
      fontSize: token.fontSizeIcon,
      verticalAlign: -1,
      // https://github.com/ant-design/ant-design/pull/18151
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: "pointer",
      transition: `color ${token.motionDurationSlow}`,
      "&:hover": {
        color: token.colorTextTertiary
      },
      "&:active": {
        color: token.colorText
      },
      "&-hidden": {
        visibility: "hidden"
      },
      "&-has-suffix": {
        margin: `0 ${unit(token.inputAffixPadding)}`
      }
    }
  };
};
var genAffixStyle = (token) => {
  const {
    componentCls,
    inputAffixPadding,
    colorTextDescription,
    motionDurationSlow,
    colorIcon,
    colorIconHover,
    iconCls
  } = token;
  return {
    [`${componentCls}-affix-wrapper`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, genBasicInputStyle(token)), {
      display: "inline-flex",
      [`&:not(${componentCls}-affix-wrapper-disabled):hover`]: {
        zIndex: 1,
        [`${componentCls}-search-with-button &`]: {
          zIndex: 0
        }
      },
      "&-focused, &:focus": {
        zIndex: 1
      },
      "&-disabled": {
        [`${componentCls}[disabled]`]: {
          background: "transparent"
        }
      },
      [`> input${componentCls}`]: {
        padding: 0,
        fontSize: "inherit",
        border: "none",
        borderRadius: 0,
        outline: "none",
        "&::-ms-reveal": {
          display: "none"
        },
        "&:focus": {
          boxShadow: "none !important"
        }
      },
      "&::before": {
        display: "inline-block",
        width: 0,
        visibility: "hidden",
        content: '"\\a0"'
      },
      [`${componentCls}`]: {
        "&-prefix, &-suffix": {
          display: "flex",
          flex: "none",
          alignItems: "center",
          "> *:not(:last-child)": {
            marginInlineEnd: token.paddingXS
          }
        },
        "&-show-count-suffix": {
          color: colorTextDescription
        },
        "&-show-count-has-suffix": {
          marginInlineEnd: token.paddingXXS
        },
        "&-prefix": {
          marginInlineEnd: inputAffixPadding
        },
        "&-suffix": {
          marginInlineStart: inputAffixPadding
        }
      }
    }), genAllowClearStyle(token)), {
      // password
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: "pointer",
        transition: `all ${motionDurationSlow}`,
        "&:hover": {
          color: colorIconHover
        }
      }
    }), genStatusStyle(token, `${componentCls}-affix-wrapper`))
  };
};
var genGroupStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning,
    borderRadiusLG,
    borderRadiusSM
  } = token;
  return {
    [`${componentCls}-group`]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genInputGroupStyle(token)), {
      "&-rtl": {
        direction: "rtl"
      },
      "&-wrapper": {
        display: "inline-block",
        width: "100%",
        textAlign: "start",
        verticalAlign: "top",
        // https://github.com/ant-design/ant-design/issues/6403
        "&-rtl": {
          direction: "rtl"
        },
        // Size
        "&-lg": {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusLG,
            fontSize: token.fontSizeLG
          }
        },
        "&-sm": {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusSM
          }
        },
        // Status
        "&-status-error": {
          [`${componentCls}-group-addon`]: {
            color: colorError,
            borderColor: colorError
          }
        },
        "&-status-warning": {
          [`${componentCls}-group-addon`]: {
            color: colorWarning,
            borderColor: colorWarning
          }
        },
        "&-disabled": {
          [`${componentCls}-group-addon`]: Object.assign({}, genDisabledStyle(token))
        },
        // Fix the issue of using icons in Space Compact mode
        // https://github.com/ant-design/ant-design/issues/42122
        [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderRadius: 0
          }
        },
        [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        }
      }
    })
  };
};
var genSearchInputStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const searchPrefixCls = `${componentCls}-search`;
  return {
    [searchPrefixCls]: {
      [`${componentCls}`]: {
        "&:hover, &:focus": {
          borderColor: token.colorPrimaryHover,
          [`+ ${componentCls}-group-addon ${searchPrefixCls}-button:not(${antCls}-btn-primary)`]: {
            borderInlineStartColor: token.colorPrimaryHover
          }
        }
      },
      [`${componentCls}-affix-wrapper`]: {
        borderRadius: 0
      },
      // fix slight height diff in Firefox:
      // https://ant.design/components/auto-complete-cn/#components-auto-complete-demo-certain-category
      [`${componentCls}-lg`]: {
        lineHeight: token.calc(token.lineHeightLG).sub(2e-4).equal({
          unit: false
        })
      },
      [`> ${componentCls}-group`]: {
        [`> ${componentCls}-group-addon:last-child`]: {
          insetInlineStart: -1,
          padding: 0,
          border: 0,
          [`${searchPrefixCls}-button`]: {
            paddingTop: 0,
            paddingBottom: 0,
            borderStartStartRadius: 0,
            borderStartEndRadius: token.borderRadius,
            borderEndEndRadius: token.borderRadius,
            borderEndStartRadius: 0,
            boxShadow: "none"
          },
          [`${searchPrefixCls}-button:not(${antCls}-btn-primary)`]: {
            color: token.colorTextDescription,
            "&:hover": {
              color: token.colorPrimaryHover
            },
            "&:active": {
              color: token.colorPrimaryActive
            },
            [`&${antCls}-btn-loading::before`]: {
              insetInlineStart: 0,
              insetInlineEnd: 0,
              insetBlockStart: 0,
              insetBlockEnd: 0
            }
          }
        }
      },
      [`${searchPrefixCls}-button`]: {
        height: token.controlHeight,
        "&:hover, &:focus": {
          zIndex: 1
        }
      },
      [`&-large ${searchPrefixCls}-button`]: {
        height: token.controlHeightLG
      },
      [`&-small ${searchPrefixCls}-button`]: {
        height: token.controlHeightSM
      },
      "&-rtl": {
        direction: "rtl"
      },
      // ===================== Compact Item Customized Styles =====================
      [`&${componentCls}-compact-item`]: {
        [`&:not(${componentCls}-compact-last-item)`]: {
          [`${componentCls}-group-addon`]: {
            [`${componentCls}-search-button`]: {
              marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
              borderRadius: 0
            }
          }
        },
        [`&:not(${componentCls}-compact-first-item)`]: {
          [`${componentCls},${componentCls}-affix-wrapper`]: {
            borderRadius: 0
          }
        },
        [`> ${componentCls}-group-addon ${componentCls}-search-button,
        > ${componentCls},
        ${componentCls}-affix-wrapper`]: {
          "&:hover,&:focus,&:active": {
            zIndex: 2
          }
        },
        [`> ${componentCls}-affix-wrapper-focused`]: {
          zIndex: 2
        }
      }
    }
  };
};
var genTextAreaStyle = (token) => {
  const {
    componentCls,
    paddingLG
  } = token;
  const textareaPrefixCls = `${componentCls}-textarea`;
  return {
    [textareaPrefixCls]: {
      position: "relative",
      "&-show-count": {
        // https://github.com/ant-design/ant-design/issues/33049
        [`> ${componentCls}`]: {
          height: "100%"
        },
        [`${componentCls}-data-count`]: {
          position: "absolute",
          bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        }
      },
      "&-allow-clear": {
        [`> ${componentCls}`]: {
          paddingInlineEnd: paddingLG
        }
      },
      [`&-affix-wrapper${textareaPrefixCls}-has-feedback`]: {
        [`${componentCls}`]: {
          paddingInlineEnd: paddingLG
        }
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,
        [`> textarea${componentCls}`]: {
          fontSize: "inherit",
          border: "none",
          outline: "none",
          "&:focus": {
            boxShadow: "none !important"
          }
        },
        [`${componentCls}-suffix`]: {
          margin: 0,
          "> *:not(:last-child)": {
            marginInline: 0
          },
          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: "absolute",
            insetInlineEnd: token.paddingXS,
            insetBlockStart: token.paddingXS
          },
          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            margin: "auto",
            pointerEvents: "none"
          }
        }
      }
    }
  };
};
var genRangeStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-out-of-range`]: {
      [`&, & input, & textarea, ${componentCls}-show-count-suffix, ${componentCls}-data-count`]: {
        color: token.colorError
      }
    }
  };
};
function initInputToken(token) {
  return merge2(token, {
    inputAffixPadding: token.paddingXXS
  });
}
var initComponentToken = (token) => {
  const {
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightSM,
    controlHeightLG,
    fontSizeLG,
    lineHeightLG,
    paddingSM,
    controlPaddingHorizontalSM,
    controlPaddingHorizontal,
    colorFillAlter,
    colorPrimaryHover,
    colorPrimary,
    controlOutlineWidth,
    controlOutline,
    colorErrorOutline,
    colorWarningOutline
  } = token;
  return {
    paddingBlock: Math.max(Math.round((controlHeight - fontSize * lineHeight) / 2 * 10) / 10 - lineWidth, 0),
    paddingBlockSM: Math.max(Math.round((controlHeightSM - fontSize * lineHeight) / 2 * 10) / 10 - lineWidth, 0),
    paddingBlockLG: Math.ceil((controlHeightLG - fontSizeLG * lineHeightLG) / 2 * 10) / 10 - lineWidth,
    paddingInline: paddingSM - lineWidth,
    paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
    paddingInlineLG: controlPaddingHorizontal - lineWidth,
    addonBg: colorFillAlter,
    activeBorderColor: colorPrimary,
    hoverBorderColor: colorPrimaryHover,
    activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
    errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
    warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
    hoverBg: "",
    activeBg: ""
  };
};
var style_default3 = genStyleHooks("Input", (token) => {
  const inputToken = merge2(token, initInputToken(token));
  return [
    genInputStyle(inputToken),
    genTextAreaStyle(inputToken),
    genAffixStyle(inputToken),
    genGroupStyle(inputToken),
    genSearchInputStyle(inputToken),
    genRangeStyle(inputToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(inputToken)
  ];
}, initComponentToken);

// node_modules/antd/es/input/utils.js
function hasPrefixSuffix2(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

// node_modules/antd/es/config-provider/hooks/useCSSVarCls.js
var useCSSVarCls = (prefixCls) => {
  const [, , , , cssVar] = useToken();
  return cssVar ? `${prefixCls}-css-var` : "";
};
var useCSSVarCls_default = useCSSVarCls;

// node_modules/antd/es/input/Input.js
var __rest4 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function triggerFocus2(element, option) {
  if (!element) {
    return;
  }
  element.focus(option);
  const {
    cursor
  } = option || {};
  if (cursor) {
    const len = element.value.length;
    switch (cursor) {
      case "start":
        element.setSelectionRange(0, 0);
        break;
      case "end":
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
        break;
    }
  }
}
var Input2 = (0, import_react9.forwardRef)((props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    status: customStatus,
    size: customSize,
    disabled: customDisabled,
    onBlur,
    onFocus,
    suffix,
    allowClear,
    addonAfter,
    addonBefore,
    className,
    style,
    styles,
    rootClassName,
    onChange,
    classNames: classes
  } = props, rest = __rest4(props, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames"]);
  const {
    getPrefixCls,
    direction,
    input
  } = import_react9.default.useContext(ConfigContext);
  const prefixCls = getPrefixCls("input", customizePrefixCls);
  const inputRef = (0, import_react9.useRef)(null);
  const cssVarCls = useCSSVarCls_default(prefixCls);
  const [wrapCSSVar, hashId] = style_default3(prefixCls, cssVarCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize_default((ctx) => {
    var _a2;
    return (_a2 = customSize !== null && customSize !== void 0 ? customSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
  });
  const disabled = import_react9.default.useContext(DisabledContext_default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = (0, import_react9.useContext)(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const inputHasPrefixSuffix = hasPrefixSuffix2(props) || !!hasFeedback;
  const prevHasPrefixSuffix = (0, import_react9.useRef)(inputHasPrefixSuffix);
  if (true) {
    const warning3 = devUseWarning("Input");
    (0, import_react9.useEffect)(() => {
      var _a2;
      if (inputHasPrefixSuffix && !prevHasPrefixSuffix.current) {
        true ? warning3(document.activeElement === ((_a2 = inputRef.current) === null || _a2 === void 0 ? void 0 : _a2.input), "usage", `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`) : void 0;
      }
      prevHasPrefixSuffix.current = inputHasPrefixSuffix;
    }, [inputHasPrefixSuffix]);
  }
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
  const handleBlur = (e) => {
    removePasswordTimeout();
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  };
  const handleFocus = (e) => {
    removePasswordTimeout();
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
  };
  const handleChange = (e) => {
    removePasswordTimeout();
    onChange === null || onChange === void 0 ? void 0 : onChange(e);
  };
  const suffixNode = (hasFeedback || suffix) && import_react9.default.createElement(import_react9.default.Fragment, null, suffix, hasFeedback && feedbackIcon);
  let mergedAllowClear;
  if (typeof allowClear === "object" && (allowClear === null || allowClear === void 0 ? void 0 : allowClear.clearIcon)) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: import_react9.default.createElement(CloseCircleFilled_default, null)
    };
  }
  return wrapCSSVar(import_react9.default.createElement(es_default4, Object.assign({
    ref: composeRef(ref, inputRef),
    prefixCls,
    autoComplete: input === null || input === void 0 ? void 0 : input.autoComplete
  }, rest, {
    disabled: mergedDisabled,
    onBlur: handleBlur,
    onFocus: handleFocus,
    style: Object.assign(Object.assign({}, input === null || input === void 0 ? void 0 : input.style), style),
    styles: Object.assign(Object.assign({}, input === null || input === void 0 ? void 0 : input.styles), styles),
    suffix: suffixNode,
    allowClear: mergedAllowClear,
    className: (0, import_classnames11.default)(className, rootClassName, cssVarCls, hashId, compactItemClassnames, input === null || input === void 0 ? void 0 : input.className),
    onChange: handleChange,
    addonAfter: addonAfter && import_react9.default.createElement(NoCompactStyle, null, import_react9.default.createElement(NoFormStyle, {
      override: true,
      status: true
    }, addonAfter)),
    addonBefore: addonBefore && import_react9.default.createElement(NoCompactStyle, null, import_react9.default.createElement(NoFormStyle, {
      override: true,
      status: true
    }, addonBefore)),
    classNames: Object.assign(Object.assign(Object.assign({}, classes), input === null || input === void 0 ? void 0 : input.classNames), {
      input: (0, import_classnames11.default)({
        [`${prefixCls}-sm`]: mergedSize === "small",
        [`${prefixCls}-lg`]: mergedSize === "large",
        [`${prefixCls}-rtl`]: direction === "rtl",
        [`${prefixCls}-borderless`]: !bordered
      }, !inputHasPrefixSuffix && getStatusClassNames(prefixCls, mergedStatus), classes === null || classes === void 0 ? void 0 : classes.input, (_a = input === null || input === void 0 ? void 0 : input.classNames) === null || _a === void 0 ? void 0 : _a.input, hashId)
    }),
    classes: {
      affixWrapper: (0, import_classnames11.default)({
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered
      }, getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus, hasFeedback), hashId),
      wrapper: (0, import_classnames11.default)({
        [`${prefixCls}-group-rtl`]: direction === "rtl"
      }, hashId),
      group: (0, import_classnames11.default)({
        [`${prefixCls}-group-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-group-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-group-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-group-wrapper-disabled`]: mergedDisabled
      }, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId)
    }
  })));
});
var Input_default2 = Input2;

// node_modules/antd/es/input/TextArea.js
var __rest5 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var TextArea2 = (0, import_react10.forwardRef)((props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    size: customizeSize,
    disabled: customDisabled,
    status: customStatus,
    allowClear,
    classNames: classes,
    rootClassName,
    className
  } = props, rest = __rest5(props, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className"]);
  const {
    getPrefixCls,
    direction
  } = React24.useContext(ConfigContext);
  const mergedSize = useSize_default(customizeSize);
  const disabled = React24.useContext(DisabledContext_default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = React24.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const innerRef = React24.useRef(null);
  React24.useImperativeHandle(ref, () => {
    var _a2;
    return {
      resizableTextArea: (_a2 = innerRef.current) === null || _a2 === void 0 ? void 0 : _a2.resizableTextArea,
      focus: (option) => {
        var _a3, _b;
        triggerFocus2((_b = (_a3 = innerRef.current) === null || _a3 === void 0 ? void 0 : _a3.resizableTextArea) === null || _b === void 0 ? void 0 : _b.textArea, option);
      },
      blur: () => {
        var _a3;
        return (_a3 = innerRef.current) === null || _a3 === void 0 ? void 0 : _a3.blur();
      }
    };
  });
  const prefixCls = getPrefixCls("input", customizePrefixCls);
  let mergedAllowClear;
  if (typeof allowClear === "object" && (allowClear === null || allowClear === void 0 ? void 0 : allowClear.clearIcon)) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: React24.createElement(CloseCircleFilled_default, null)
    };
  }
  const cssVarCls = useCSSVarCls_default(prefixCls);
  const [wrapCSSVar, hashId] = style_default3(prefixCls, cssVarCls);
  return wrapCSSVar(React24.createElement(es_default5, Object.assign({}, rest, {
    disabled: mergedDisabled,
    allowClear: mergedAllowClear,
    className: (0, import_classnames12.default)(cssVarCls, className, rootClassName),
    classes: {
      affixWrapper: (0, import_classnames12.default)(`${prefixCls}-textarea-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-textarea-show-count`]: props.showCount || ((_a = props.count) === null || _a === void 0 ? void 0 : _a.show)
      }, getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus), hashId)
    },
    classNames: Object.assign(Object.assign({}, classes), {
      textarea: (0, import_classnames12.default)({
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-sm`]: mergedSize === "small",
        [`${prefixCls}-lg`]: mergedSize === "large"
      }, getStatusClassNames(prefixCls, mergedStatus), hashId, classes === null || classes === void 0 ? void 0 : classes.textarea)
    }),
    prefixCls,
    suffix: hasFeedback && React24.createElement("span", {
      className: `${prefixCls}-textarea-suffix`
    }, feedbackIcon),
    ref: innerRef
  })));
});
var TextArea_default2 = TextArea2;

// node_modules/antd/es/typography/style/mixins.js
var getTitleStyle = (fontSize, lineHeight, color, token) => {
  const {
    titleMarginBottom,
    fontWeightStrong
  } = token;
  return {
    marginBottom: titleMarginBottom,
    color,
    fontWeight: fontWeightStrong,
    fontSize,
    lineHeight
  };
};
var getTitleStyles = (token) => {
  const headings = [1, 2, 3, 4, 5];
  const styles = {};
  headings.forEach((headingLevel) => {
    styles[`
      h${headingLevel}&,
      div&-h${headingLevel},
      div&-h${headingLevel} > textarea,
      h${headingLevel}
    `] = getTitleStyle(token[`fontSizeHeading${headingLevel}`], token[`lineHeightHeading${headingLevel}`], token.colorTextHeading, token);
  });
  return styles;
};
var getLinkStyles = (token) => {
  const {
    componentCls
  } = token;
  return {
    "a&, a": Object.assign(Object.assign({}, operationUnit(token)), {
      textDecoration: token.linkDecoration,
      "&:active, &:hover": {
        textDecoration: token.linkHoverDecoration
      },
      [`&[disabled], &${componentCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        "&:active, &:hover": {
          color: token.colorTextDisabled
        },
        "&:active": {
          pointerEvents: "none"
        }
      }
    })
  };
};
var getResetStyles = (token) => ({
  code: {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.2em 0.1em",
    fontSize: "85%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: 3
  },
  kbd: {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.15em 0.1em",
    fontSize: "90%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.06)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderBottomWidth: 2,
    borderRadius: 3
  },
  mark: {
    padding: 0,
    // FIXME hardcode in v4
    backgroundColor: gold[2]
  },
  "u, ins": {
    textDecoration: "underline",
    textDecorationSkipInk: "auto"
  },
  "s, del": {
    textDecoration: "line-through"
  },
  strong: {
    fontWeight: 600
  },
  // list
  "ul, ol": {
    marginInline: 0,
    marginBlock: "0 1em",
    padding: 0,
    li: {
      marginInline: "20px 0",
      marginBlock: 0,
      paddingInline: "4px 0",
      paddingBlock: 0
    }
  },
  ul: {
    listStyleType: "circle",
    ul: {
      listStyleType: "disc"
    }
  },
  ol: {
    listStyleType: "decimal"
  },
  // pre & block
  "pre, blockquote": {
    margin: "1em 0"
  },
  pre: {
    padding: "0.4em 0.6em",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    background: "rgba(150, 150, 150, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: 3,
    fontFamily: token.fontFamilyCode,
    // Compatible for marked
    code: {
      display: "inline",
      margin: 0,
      padding: 0,
      fontSize: "inherit",
      fontFamily: "inherit",
      background: "transparent",
      border: 0
    }
  },
  blockquote: {
    paddingInline: "0.6em 0",
    paddingBlock: 0,
    borderInlineStart: "4px solid rgba(100, 100, 100, 0.2)",
    opacity: 0.85
  }
});
var getEditableStyles = (token) => {
  const {
    componentCls,
    paddingSM
  } = token;
  const inputShift = paddingSM;
  return {
    "&-edit-content": {
      position: "relative",
      "div&": {
        insetInlineStart: token.calc(token.paddingSM).mul(-1).equal(),
        marginTop: token.calc(inputShift).mul(-1).equal(),
        marginBottom: `calc(1em - ${unit(inputShift)})`
      },
      [`${componentCls}-edit-content-confirm`]: {
        position: "absolute",
        insetInlineEnd: token.calc(token.marginXS).add(2).equal(),
        insetBlockEnd: token.marginXS,
        color: token.colorTextDescription,
        // default style
        fontWeight: "normal",
        fontSize: token.fontSize,
        fontStyle: "normal",
        pointerEvents: "none"
      },
      textarea: {
        margin: "0!important",
        // Fix Editable Textarea flash in Firefox
        MozTransition: "none",
        height: "1em"
      }
    }
  };
};
var getCopyableStyles = (token) => ({
  "&-copy-success": {
    [`
    &,
    &:hover,
    &:focus`]: {
      color: token.colorSuccess
    }
  }
});
var getEllipsisStyles = () => ({
  [`
  a&-ellipsis,
  span&-ellipsis
  `]: {
    display: "inline-block",
    maxWidth: "100%"
  },
  "&-single-line": {
    whiteSpace: "nowrap"
  },
  "&-ellipsis-single-line": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    // https://blog.csdn.net/iefreer/article/details/50421025
    "a&, span&": {
      verticalAlign: "bottom"
    },
    "> code": {
      paddingBlock: 0,
      maxWidth: "calc(100% - 1.2em)",
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      verticalAlign: "bottom",
      // https://github.com/ant-design/ant-design/issues/45953
      boxSizing: "content-box"
    }
  },
  "&-ellipsis-multiple-line": {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
  }
});

// node_modules/antd/es/typography/style/index.js
var genTypographyStyle = (token) => {
  const {
    componentCls,
    titleMarginTop
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
      color: token.colorText,
      wordBreak: "break-word",
      lineHeight: token.lineHeight,
      [`&${componentCls}-secondary`]: {
        color: token.colorTextDescription
      },
      [`&${componentCls}-success`]: {
        color: token.colorSuccess
      },
      [`&${componentCls}-warning`]: {
        color: token.colorWarning
      },
      [`&${componentCls}-danger`]: {
        color: token.colorError,
        "a&:active, a&:focus": {
          color: token.colorErrorActive
        },
        "a&:hover": {
          color: token.colorErrorHover
        }
      },
      [`&${componentCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        userSelect: "none"
      },
      [`
        div&,
        p
      `]: {
        marginBottom: "1em"
      }
    }, getTitleStyles(token)), {
      [`
      & + h1${componentCls},
      & + h2${componentCls},
      & + h3${componentCls},
      & + h4${componentCls},
      & + h5${componentCls}
      `]: {
        marginTop: titleMarginTop
      },
      [`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]: {
        [`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]: {
          marginTop: titleMarginTop
        }
      }
    }), getResetStyles(token)), getLinkStyles(token)), {
      // Operation
      [`
        ${componentCls}-expand,
        ${componentCls}-edit,
        ${componentCls}-copy
      `]: Object.assign(Object.assign({}, operationUnit(token)), {
        marginInlineStart: token.marginXXS
      })
    }), getEditableStyles(token)), getCopyableStyles(token)), getEllipsisStyles()), {
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
var prepareComponentToken2 = () => ({
  titleMarginTop: "1.2em",
  titleMarginBottom: "0.5em"
});
var style_default4 = genStyleHooks("Typography", (token) => [genTypographyStyle(token)], prepareComponentToken2);

// node_modules/antd/es/typography/Editable.js
var Editable = (props) => {
  const {
    prefixCls,
    "aria-label": ariaLabel,
    className,
    style,
    direction,
    maxLength,
    autoSize = true,
    value,
    onSave,
    onCancel,
    onEnd,
    component,
    enterIcon = React25.createElement(EnterOutlined_default, null)
  } = props;
  const ref = React25.useRef(null);
  const inComposition = React25.useRef(false);
  const lastKeyCode = React25.useRef();
  const [current, setCurrent] = React25.useState(value);
  React25.useEffect(() => {
    setCurrent(value);
  }, [value]);
  React25.useEffect(() => {
    if (ref.current && ref.current.resizableTextArea) {
      const {
        textArea
      } = ref.current.resizableTextArea;
      textArea.focus();
      const {
        length
      } = textArea.value;
      textArea.setSelectionRange(length, length);
    }
  }, []);
  const onChange = (_ref) => {
    let {
      target
    } = _ref;
    setCurrent(target.value.replace(/[\n\r]/g, ""));
  };
  const onCompositionStart = () => {
    inComposition.current = true;
  };
  const onCompositionEnd = () => {
    inComposition.current = false;
  };
  const onKeyDown = (_ref2) => {
    let {
      keyCode
    } = _ref2;
    if (inComposition.current)
      return;
    lastKeyCode.current = keyCode;
  };
  const confirmChange = () => {
    onSave(current.trim());
  };
  const onKeyUp = (_ref3) => {
    let {
      keyCode,
      ctrlKey,
      altKey,
      metaKey,
      shiftKey
    } = _ref3;
    if (lastKeyCode.current === keyCode && !inComposition.current && !ctrlKey && !altKey && !metaKey && !shiftKey) {
      if (keyCode === KeyCode_default.ENTER) {
        confirmChange();
        onEnd === null || onEnd === void 0 ? void 0 : onEnd();
      } else if (keyCode === KeyCode_default.ESC) {
        onCancel();
      }
    }
  };
  const onBlur = () => {
    confirmChange();
  };
  const textClassName = component ? `${prefixCls}-${component}` : "";
  const [wrapCSSVar, hashId] = style_default4(prefixCls);
  const textAreaClassName = (0, import_classnames13.default)(prefixCls, `${prefixCls}-edit-content`, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, textClassName, hashId);
  return wrapCSSVar(React25.createElement("div", {
    className: textAreaClassName,
    style
  }, React25.createElement(TextArea_default2, {
    ref,
    maxLength,
    value: current,
    onChange,
    onKeyDown,
    onKeyUp,
    onCompositionStart,
    onCompositionEnd,
    onBlur,
    "aria-label": ariaLabel,
    rows: 1,
    autoSize
  }), enterIcon !== null ? cloneElement(enterIcon, {
    className: `${prefixCls}-edit-content-confirm`
  }) : null));
};
var Editable_default = Editable;

// node_modules/antd/es/typography/Typography.js
var React26 = __toESM(require_react());
var import_classnames14 = __toESM(require_classnames());
var __rest6 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Typography = React26.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    component: Component2 = "article",
    className,
    rootClassName,
    setContentRef,
    children,
    direction: typographyDirection,
    style
  } = props, restProps = __rest6(props, ["prefixCls", "component", "className", "rootClassName", "setContentRef", "children", "direction", "style"]);
  const {
    getPrefixCls,
    direction: contextDirection,
    typography
  } = React26.useContext(ConfigContext);
  const direction = typographyDirection !== null && typographyDirection !== void 0 ? typographyDirection : contextDirection;
  let mergedRef = ref;
  if (setContentRef) {
    mergedRef = composeRef(ref, setContentRef);
  }
  if (true) {
    const warning3 = devUseWarning("Typography");
    warning3.deprecated(!setContentRef, "setContentRef", "ref");
  }
  const prefixCls = getPrefixCls("typography", customizePrefixCls);
  const [wrapCSSVar, hashId] = style_default4(prefixCls);
  const componentClassName = (0, import_classnames14.default)(prefixCls, typography === null || typography === void 0 ? void 0 : typography.className, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId);
  const mergedStyle = Object.assign(Object.assign({}, typography === null || typography === void 0 ? void 0 : typography.style), style);
  return wrapCSSVar(
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    React26.createElement(Component2, Object.assign({
      className: componentClassName,
      style: mergedStyle,
      ref: mergedRef
    }, restProps), children)
  );
});
if (true) {
  Typography.displayName = "Typography";
}
var Typography_default = Typography;

// node_modules/antd/es/typography/hooks/useMergedConfig.js
var React27 = __toESM(require_react());
function useMergedConfig(propConfig, templateConfig) {
  return React27.useMemo(() => {
    const support = !!propConfig;
    return [support, Object.assign(Object.assign({}, templateConfig), support && typeof propConfig === "object" ? propConfig : null)];
  }, [propConfig]);
}

// node_modules/antd/es/typography/hooks/useUpdatedEffect.js
var React28 = __toESM(require_react());
var useUpdatedEffect = (callback, conditions) => {
  const mountRef = React28.useRef(false);
  React28.useEffect(() => {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  }, conditions);
};
var useUpdatedEffect_default = useUpdatedEffect;

// node_modules/antd/es/typography/Base/Ellipsis.js
var React29 = __toESM(require_react());
function cuttable(node) {
  const type4 = typeof node;
  return type4 === "string" || type4 === "number";
}
function getNodesLen(nodeList) {
  let totalLen = 0;
  nodeList.forEach((node) => {
    if (cuttable(node)) {
      totalLen += String(node).length;
    } else {
      totalLen += 1;
    }
  });
  return totalLen;
}
function sliceNodes(nodeList, len) {
  let currLen = 0;
  const currentNodeList = [];
  for (let i = 0; i < nodeList.length; i += 1) {
    if (currLen === len) {
      return currentNodeList;
    }
    const node = nodeList[i];
    const canCut = cuttable(node);
    const nodeLen = canCut ? String(node).length : 1;
    const nextLen = currLen + nodeLen;
    if (nextLen > len) {
      const restLen = len - currLen;
      currentNodeList.push(String(node).slice(0, restLen));
      return currentNodeList;
    }
    currentNodeList.push(node);
    currLen = nextLen;
  }
  return nodeList;
}
var NONE = 0;
var PREPARE = 1;
var WALKING = 2;
var DONE_WITH_ELLIPSIS = 3;
var DONE_WITHOUT_ELLIPSIS = 4;
var Ellipsis = (_ref) => {
  let {
    enabledMeasure,
    children,
    text,
    width,
    fontSize,
    rows,
    onEllipsis
  } = _ref;
  const [[startLen, midLen, endLen], setCutLength] = React29.useState([0, 0, 0]);
  const [lastLen, setLastLen] = React29.useState(0);
  const [walkingState, setWalkingState] = React29.useState(NONE);
  const [singleRowHeight, setSingleRowHeight] = React29.useState(0);
  const singleRowRef = React29.useRef(null);
  const midRowRef = React29.useRef(null);
  const nodeList = React29.useMemo(() => toArray(text), [text]);
  const totalLen = React29.useMemo(() => getNodesLen(nodeList), [nodeList]);
  const mergedChildren = React29.useMemo(() => {
    if (!enabledMeasure || walkingState !== DONE_WITH_ELLIPSIS) {
      if (lastLen && walkingState !== DONE_WITHOUT_ELLIPSIS && enabledMeasure)
        return children(sliceNodes(nodeList, lastLen), lastLen < totalLen);
      return children(nodeList, false);
    }
    return children(sliceNodes(nodeList, midLen), midLen < totalLen);
  }, [enabledMeasure, walkingState, children, nodeList, midLen, totalLen]);
  useLayoutEffect_default(() => {
    if (enabledMeasure && width && fontSize && totalLen) {
      setWalkingState(PREPARE);
      setCutLength([0, Math.ceil(totalLen / 2), totalLen]);
    }
  }, [enabledMeasure, width, fontSize, text, totalLen, rows]);
  useLayoutEffect_default(() => {
    var _a;
    if (walkingState === PREPARE) {
      setSingleRowHeight(((_a = singleRowRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0);
    }
  }, [walkingState]);
  useLayoutEffect_default(() => {
    var _a, _b;
    if (singleRowHeight) {
      if (walkingState === PREPARE) {
        const midHeight = ((_a = midRowRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
        const maxHeight = rows * singleRowHeight;
        if (midHeight <= maxHeight) {
          setWalkingState(DONE_WITHOUT_ELLIPSIS);
          onEllipsis(false);
        } else {
          setWalkingState(WALKING);
        }
      } else if (walkingState === WALKING) {
        if (startLen !== endLen) {
          const midHeight = ((_b = midRowRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
          const maxHeight = rows * singleRowHeight;
          let nextStartLen = startLen;
          let nextEndLen = endLen;
          if (startLen === endLen - 1) {
            nextEndLen = startLen;
          } else if (midHeight <= maxHeight) {
            nextStartLen = midLen;
          } else {
            nextEndLen = midLen;
          }
          const nextMidLen = Math.ceil((nextStartLen + nextEndLen) / 2);
          setCutLength([nextStartLen, nextMidLen, nextEndLen]);
        } else {
          setWalkingState(DONE_WITH_ELLIPSIS);
          setLastLen(midLen);
          onEllipsis(true);
        }
      }
    }
  }, [walkingState, startLen, endLen, rows, singleRowHeight]);
  const measureStyle = {
    width,
    whiteSpace: "normal",
    margin: 0,
    padding: 0
  };
  const renderMeasure = (content, ref, style) => React29.createElement("span", {
    "aria-hidden": true,
    ref,
    style: Object.assign({
      position: "fixed",
      display: "block",
      left: 0,
      top: 0,
      zIndex: -9999,
      visibility: "hidden",
      pointerEvents: "none",
      fontSize: Math.ceil(fontSize / 2) * 2
    }, style)
  }, content);
  const renderMeasureSlice = (len, ref) => {
    const sliceNodeList = sliceNodes(nodeList, len);
    return renderMeasure(children(sliceNodeList, true), ref, measureStyle);
  };
  return React29.createElement(React29.Fragment, null, mergedChildren, enabledMeasure && walkingState !== DONE_WITH_ELLIPSIS && walkingState !== DONE_WITHOUT_ELLIPSIS && React29.createElement(React29.Fragment, null, renderMeasure("lg", singleRowRef, {
    wordBreak: "keep-all",
    whiteSpace: "nowrap"
  }), walkingState === PREPARE ? renderMeasure(children(nodeList, false), midRowRef, measureStyle) : renderMeasureSlice(midLen, midRowRef)));
};
if (true) {
  Ellipsis.displayName = "Ellipsis";
}
var Ellipsis_default = Ellipsis;

// node_modules/antd/es/typography/Base/EllipsisTooltip.js
var React30 = __toESM(require_react());
var EllipsisTooltip = (_ref) => {
  let {
    enabledEllipsis,
    isEllipsis,
    children,
    tooltipProps
  } = _ref;
  if (!(tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.title) || !enabledEllipsis) {
    return children;
  }
  return React30.createElement(tooltip_default, Object.assign({
    open: isEllipsis ? void 0 : false
  }, tooltipProps), children);
};
if (true) {
  EllipsisTooltip.displayName = "EllipsisTooltip";
}
var EllipsisTooltip_default = EllipsisTooltip;

// node_modules/antd/es/typography/Base/index.js
var __rest7 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function wrapperDecorations(_ref, content) {
  let {
    mark,
    code,
    underline,
    delete: del,
    strong,
    keyboard,
    italic
  } = _ref;
  let currentContent = content;
  function wrap(tag, needed) {
    if (!needed) {
      return;
    }
    currentContent = React31.createElement(tag, {}, currentContent);
  }
  wrap("strong", strong);
  wrap("u", underline);
  wrap("del", del);
  wrap("code", code);
  wrap("mark", mark);
  wrap("kbd", keyboard);
  wrap("i", italic);
  return currentContent;
}
function getNode(dom, defaultNode, needDom) {
  if (dom === true || dom === void 0) {
    return defaultNode;
  }
  return dom || needDom && defaultNode;
}
function toList(val) {
  if (val === false) {
    return [false, false];
  }
  return Array.isArray(val) ? val : [val];
}
var ELLIPSIS_STR = "...";
var Base = React31.forwardRef((props, ref) => {
  var _a, _b, _c;
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    type: type4,
    disabled,
    children,
    ellipsis,
    editable,
    copyable,
    component,
    title
  } = props, restProps = __rest7(props, ["prefixCls", "className", "style", "type", "disabled", "children", "ellipsis", "editable", "copyable", "component", "title"]);
  const {
    getPrefixCls,
    direction
  } = React31.useContext(ConfigContext);
  const [textLocale] = useLocale_default("Text");
  const typographyRef = React31.useRef(null);
  const editIconRef = React31.useRef(null);
  const prefixCls = getPrefixCls("typography", customizePrefixCls);
  const textProps = omit(restProps, ["mark", "code", "delete", "underline", "strong", "keyboard", "italic"]);
  const [enableEdit, editConfig] = useMergedConfig(editable);
  const [editing, setEditing] = useMergedState(false, {
    value: editConfig.editing
  });
  const {
    triggerType = ["icon"]
  } = editConfig;
  const triggerEdit = (edit) => {
    var _a2;
    if (edit) {
      (_a2 = editConfig.onStart) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig);
    }
    setEditing(edit);
  };
  useUpdatedEffect_default(() => {
    var _a2;
    if (!editing) {
      (_a2 = editIconRef.current) === null || _a2 === void 0 ? void 0 : _a2.focus();
    }
  }, [editing]);
  const onEditClick = (e) => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    triggerEdit(true);
  };
  const onEditChange = (value) => {
    var _a2;
    (_a2 = editConfig.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig, value);
    triggerEdit(false);
  };
  const onEditCancel = () => {
    var _a2;
    (_a2 = editConfig.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig);
    triggerEdit(false);
  };
  const [enableCopy, copyConfig] = useMergedConfig(copyable);
  const [copied, setCopied] = React31.useState(false);
  const copyIdRef = React31.useRef(null);
  const copyOptions = {};
  if (copyConfig.format) {
    copyOptions.format = copyConfig.format;
  }
  const cleanCopyId = () => {
    if (copyIdRef.current) {
      clearTimeout(copyIdRef.current);
    }
  };
  const onCopyClick = (e) => {
    var _a2;
    e === null || e === void 0 ? void 0 : e.preventDefault();
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    (0, import_copy_to_clipboard.default)(copyConfig.text || String(children) || "", copyOptions);
    setCopied(true);
    cleanCopyId();
    copyIdRef.current = setTimeout(() => {
      setCopied(false);
    }, 3e3);
    (_a2 = copyConfig.onCopy) === null || _a2 === void 0 ? void 0 : _a2.call(copyConfig, e);
  };
  React31.useEffect(() => cleanCopyId, []);
  const [isLineClampSupport, setIsLineClampSupport] = React31.useState(false);
  const [isTextOverflowSupport, setIsTextOverflowSupport] = React31.useState(false);
  const [expanded, setExpanded] = React31.useState(false);
  const [isJsEllipsis, setIsJsEllipsis] = React31.useState(false);
  const [isNativeEllipsis, setIsNativeEllipsis] = React31.useState(false);
  const [isNativeVisible, setIsNativeVisible] = React31.useState(true);
  const [enableEllipsis, ellipsisConfig] = useMergedConfig(ellipsis, {
    expandable: false
  });
  const mergedEnableEllipsis = enableEllipsis && !expanded;
  const {
    rows = 1
  } = ellipsisConfig;
  const needMeasureEllipsis = React31.useMemo(() => (
    // Disable ellipsis
    !mergedEnableEllipsis || // Provide suffix
    ellipsisConfig.suffix !== void 0 || ellipsisConfig.onEllipsis || // Can't use css ellipsis since we need to provide the place for button
    ellipsisConfig.expandable || enableEdit || enableCopy
  ), [mergedEnableEllipsis, ellipsisConfig, enableEdit, enableCopy]);
  useLayoutEffect_default(() => {
    if (enableEllipsis && !needMeasureEllipsis) {
      setIsLineClampSupport(isStyleSupport("webkitLineClamp"));
      setIsTextOverflowSupport(isStyleSupport("textOverflow"));
    }
  }, [needMeasureEllipsis, enableEllipsis]);
  const cssEllipsis = React31.useMemo(() => {
    if (needMeasureEllipsis) {
      return false;
    }
    if (rows === 1) {
      return isTextOverflowSupport;
    }
    return isLineClampSupport;
  }, [needMeasureEllipsis, isTextOverflowSupport, isLineClampSupport]);
  const isMergedEllipsis = mergedEnableEllipsis && (cssEllipsis ? isNativeEllipsis : isJsEllipsis);
  const cssTextOverflow = mergedEnableEllipsis && rows === 1 && cssEllipsis;
  const cssLineClamp = mergedEnableEllipsis && rows > 1 && cssEllipsis;
  const onExpandClick = (e) => {
    var _a2;
    setExpanded(true);
    (_a2 = ellipsisConfig.onExpand) === null || _a2 === void 0 ? void 0 : _a2.call(ellipsisConfig, e);
  };
  const [ellipsisWidth, setEllipsisWidth] = React31.useState(0);
  const [ellipsisFontSize, setEllipsisFontSize] = React31.useState(0);
  const onResize = (_ref2, element) => {
    let {
      offsetWidth
    } = _ref2;
    var _a2;
    setEllipsisWidth(offsetWidth);
    setEllipsisFontSize(parseInt((_a2 = window.getComputedStyle) === null || _a2 === void 0 ? void 0 : _a2.call(window, element).fontSize, 10) || 0);
  };
  const onJsEllipsis = (jsEllipsis) => {
    var _a2;
    setIsJsEllipsis(jsEllipsis);
    if (isJsEllipsis !== jsEllipsis) {
      (_a2 = ellipsisConfig.onEllipsis) === null || _a2 === void 0 ? void 0 : _a2.call(ellipsisConfig, jsEllipsis);
    }
  };
  React31.useEffect(() => {
    const textEle = typographyRef.current;
    if (enableEllipsis && cssEllipsis && textEle) {
      const currentEllipsis = cssLineClamp ? textEle.offsetHeight < textEle.scrollHeight : textEle.offsetWidth < textEle.scrollWidth;
      if (isNativeEllipsis !== currentEllipsis) {
        setIsNativeEllipsis(currentEllipsis);
      }
    }
  }, [enableEllipsis, cssEllipsis, children, cssLineClamp, isNativeVisible]);
  React31.useEffect(() => {
    const textEle = typographyRef.current;
    if (typeof IntersectionObserver === "undefined" || !textEle || !cssEllipsis || !mergedEnableEllipsis) {
      return;
    }
    const observer = new IntersectionObserver(() => {
      setIsNativeVisible(!!textEle.offsetParent);
    });
    observer.observe(textEle);
    return () => {
      observer.disconnect();
    };
  }, [cssEllipsis, mergedEnableEllipsis]);
  let tooltipProps = {};
  if (ellipsisConfig.tooltip === true) {
    tooltipProps = {
      title: (_a = editConfig.text) !== null && _a !== void 0 ? _a : children
    };
  } else if (React31.isValidElement(ellipsisConfig.tooltip)) {
    tooltipProps = {
      title: ellipsisConfig.tooltip
    };
  } else if (typeof ellipsisConfig.tooltip === "object") {
    tooltipProps = Object.assign({
      title: (_b = editConfig.text) !== null && _b !== void 0 ? _b : children
    }, ellipsisConfig.tooltip);
  } else {
    tooltipProps = {
      title: ellipsisConfig.tooltip
    };
  }
  const topAriaLabel = React31.useMemo(() => {
    const isValid = (val) => ["string", "number"].includes(typeof val);
    if (!enableEllipsis || cssEllipsis) {
      return void 0;
    }
    if (isValid(editConfig.text)) {
      return editConfig.text;
    }
    if (isValid(children)) {
      return children;
    }
    if (isValid(title)) {
      return title;
    }
    if (isValid(tooltipProps.title)) {
      return tooltipProps.title;
    }
    return void 0;
  }, [enableEllipsis, cssEllipsis, title, tooltipProps.title, isMergedEllipsis]);
  if (editing) {
    return React31.createElement(Editable_default, {
      value: (_c = editConfig.text) !== null && _c !== void 0 ? _c : typeof children === "string" ? children : "",
      onSave: onEditChange,
      onCancel: onEditCancel,
      onEnd: editConfig.onEnd,
      prefixCls,
      className,
      style,
      direction,
      component,
      maxLength: editConfig.maxLength,
      autoSize: editConfig.autoSize,
      enterIcon: editConfig.enterIcon
    });
  }
  const renderExpand = () => {
    const {
      expandable,
      symbol
    } = ellipsisConfig;
    if (!expandable)
      return null;
    let expandContent;
    if (symbol) {
      expandContent = symbol;
    } else {
      expandContent = textLocale === null || textLocale === void 0 ? void 0 : textLocale.expand;
    }
    return React31.createElement("a", {
      key: "expand",
      className: `${prefixCls}-expand`,
      onClick: onExpandClick,
      "aria-label": textLocale === null || textLocale === void 0 ? void 0 : textLocale.expand
    }, expandContent);
  };
  const renderEdit = () => {
    if (!enableEdit)
      return;
    const {
      icon,
      tooltip
    } = editConfig;
    const editTitle = toArray(tooltip)[0] || (textLocale === null || textLocale === void 0 ? void 0 : textLocale.edit);
    const ariaLabel = typeof editTitle === "string" ? editTitle : "";
    return triggerType.includes("icon") ? React31.createElement(tooltip_default, {
      key: "edit",
      title: tooltip === false ? "" : editTitle
    }, React31.createElement(transButton_default, {
      ref: editIconRef,
      className: `${prefixCls}-edit`,
      onClick: onEditClick,
      "aria-label": ariaLabel
    }, icon || React31.createElement(EditOutlined_default, {
      role: "button"
    }))) : null;
  };
  const renderCopy = () => {
    if (!enableCopy)
      return;
    const {
      tooltips,
      icon
    } = copyConfig;
    const tooltipNodes = toList(tooltips);
    const iconNodes = toList(icon);
    const copyTitle = copied ? getNode(tooltipNodes[1], textLocale === null || textLocale === void 0 ? void 0 : textLocale.copied) : getNode(tooltipNodes[0], textLocale === null || textLocale === void 0 ? void 0 : textLocale.copy);
    const systemStr = copied ? textLocale === null || textLocale === void 0 ? void 0 : textLocale.copied : textLocale === null || textLocale === void 0 ? void 0 : textLocale.copy;
    const ariaLabel = typeof copyTitle === "string" ? copyTitle : systemStr;
    return React31.createElement(tooltip_default, {
      key: "copy",
      title: copyTitle
    }, React31.createElement(transButton_default, {
      className: (0, import_classnames15.default)(`${prefixCls}-copy`, copied && `${prefixCls}-copy-success`),
      onClick: onCopyClick,
      "aria-label": ariaLabel
    }, copied ? getNode(iconNodes[1], React31.createElement(CheckOutlined_default, null), true) : getNode(iconNodes[0], React31.createElement(CopyOutlined_default, null), true)));
  };
  const renderOperations = (renderExpanded) => [renderExpanded && renderExpand(), renderEdit(), renderCopy()];
  const renderEllipsis = (needEllipsis) => [needEllipsis && React31.createElement("span", {
    "aria-hidden": true,
    key: "ellipsis"
  }, ELLIPSIS_STR), ellipsisConfig.suffix, renderOperations(needEllipsis)];
  return React31.createElement(es_default, {
    onResize,
    disabled: !mergedEnableEllipsis || cssEllipsis
  }, (resizeRef) => React31.createElement(EllipsisTooltip_default, {
    tooltipProps,
    enabledEllipsis: mergedEnableEllipsis,
    isEllipsis: isMergedEllipsis
  }, React31.createElement(Typography_default, Object.assign({
    className: (0, import_classnames15.default)({
      [`${prefixCls}-${type4}`]: type4,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-ellipsis`]: enableEllipsis,
      [`${prefixCls}-single-line`]: mergedEnableEllipsis && rows === 1,
      [`${prefixCls}-ellipsis-single-line`]: cssTextOverflow,
      [`${prefixCls}-ellipsis-multiple-line`]: cssLineClamp
    }, className),
    prefixCls: customizePrefixCls,
    style: Object.assign(Object.assign({}, style), {
      WebkitLineClamp: cssLineClamp ? rows : void 0
    }),
    component,
    ref: composeRef(resizeRef, typographyRef, ref),
    direction,
    onClick: triggerType.includes("text") ? onEditClick : void 0,
    "aria-label": topAriaLabel === null || topAriaLabel === void 0 ? void 0 : topAriaLabel.toString(),
    title
  }, textProps), React31.createElement(Ellipsis_default, {
    enabledMeasure: mergedEnableEllipsis && !cssEllipsis,
    text: children,
    rows,
    width: ellipsisWidth,
    fontSize: ellipsisFontSize,
    onEllipsis: onJsEllipsis
  }, (node, needEllipsis) => {
    let renderNode = node;
    if (node.length && needEllipsis && topAriaLabel) {
      renderNode = React31.createElement("span", {
        key: "show-content",
        "aria-hidden": true
      }, renderNode);
    }
    const wrappedContext = wrapperDecorations(props, React31.createElement(React31.Fragment, null, renderNode, renderEllipsis(needEllipsis)));
    return wrappedContext;
  }))));
});
var Base_default = Base;

// node_modules/antd/es/typography/Link.js
var __rest8 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Link = React32.forwardRef((_a, ref) => {
  var {
    ellipsis,
    rel
  } = _a, restProps = __rest8(_a, ["ellipsis", "rel"]);
  if (true) {
    const warning3 = devUseWarning("Typography.Link");
    true ? warning3(typeof ellipsis !== "object", "usage", "`ellipsis` only supports boolean value.") : void 0;
  }
  const mergedProps = Object.assign(Object.assign({}, restProps), {
    rel: rel === void 0 && restProps.target === "_blank" ? "noopener noreferrer" : rel
  });
  delete mergedProps.navigate;
  return React32.createElement(Base_default, Object.assign({}, mergedProps, {
    ref,
    ellipsis: !!ellipsis,
    component: "a"
  }));
});
var Link_default = Link;

export {
  useCSSVarCls_default,
  _regeneratorRuntime,
  _asyncToGenerator,
  getTransitionName,
  motion_default,
  useSize_default,
  style_default,
  useCompactItemContext,
  NoCompactStyle,
  Compact_default,
  genCompactItemStyle,
  isStyleSupport,
  canUseDocElement,
  FieldContext_default,
  ListContext_default,
  Field_default,
  List_default,
  useForm_default,
  useWatch_default,
  es_default6 as es_default,
  FormContext2 as FormContext,
  NoStyleItemContext,
  FormProvider3 as FormProvider,
  FormItemPrefixContext,
  FormItemInputContext,
  NoFormStyle,
  initMotion,
  initFadeMotion,
  initMoveMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  initSlideMotion,
  zoomIn,
  initZoomMotion,
  collapse_default,
  getStatusClassNames,
  getMergedStatus,
  Popup,
  getArrowToken,
  genRoundedArrow,
  MAX_VERTICAL_CONTENT_RADIUS,
  getArrowOffsetToken,
  getArrowStyle,
  getPlacements,
  isPresetColor,
  isPresetStatusColor,
  tooltip_default,
  genPlaceholderStyle,
  genHoverStyle,
  genActiveStyle,
  genDisabledStyle,
  genInputSmallStyle,
  genStatusStyle,
  genBasicInputStyle,
  genInputGroupStyle,
  initInputToken,
  initComponentToken,
  style_default3 as style_default2,
  triggerFocus,
  BaseInput_default,
  useRemovePasswordTimeout,
  Input_default2 as Input_default,
  es_default5 as es_default2,
  TextArea_default2 as TextArea_default,
  transButton_default,
  Typography_default,
  Base_default,
  Link_default
};
/*! Bundled license information:

@babel/runtime/helpers/esm/regeneratorRuntime.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)
*/
//# sourceMappingURL=chunk-JHZWL6XW.js.map
