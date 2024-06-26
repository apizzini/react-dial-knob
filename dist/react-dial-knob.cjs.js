'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var KnobArea = /** @class */ (function () {
    function KnobArea(refElement, props) {
        var _this = this;
        this.handleOnMouseDown = function (event) {
            _this.addWindowEventListeners('mouse');
            var pageX = event.pageX, pageY = event.pageY, clientX = event.clientX, clientY = event.clientY;
            _this.updateAreaLocation({ pageX: pageX, pageY: pageY, clientX: clientX, clientY: clientY });
            _this.updateAngleValue(pageX, pageY);
        };
        this.handleOnMouseMove = function (event) {
            if (!_this.isInteracting) {
                return;
            }
            var pageX = event.pageX, pageY = event.pageY;
            _this.updateAngleValue(pageX, pageY);
        };
        this.handleOnMouseUp = function () {
            _this.removeWindowEventListeners('mouse');
        };
        this.handleOnTouchStart = function (event) {
            _this.addWindowEventListeners('touch');
            if ('changedTouches' in event && event.changedTouches.length === 1) {
                var _a = event.changedTouches[0], pageX = _a.pageX, pageY = _a.pageY, clientX = _a.clientX, clientY = _a.clientY;
                _this.updateAreaLocation({ pageX: pageX, pageY: pageY, clientX: clientX, clientY: clientY });
                _this.updateAngleValue(pageX, pageY);
            }
        };
        this.handleOnTouchMove = function (event) {
            if (!_this.isInteracting) {
                return;
            }
            if ('changedTouches' in event && event.changedTouches.length === 1) {
                var _a = event.changedTouches[0], pageX = _a.pageX, pageY = _a.pageY;
                _this.updateAngleValue(pageX, pageY);
            }
        };
        this.handleOnTouchEnd = function () {
            _this.removeWindowEventListeners('touch');
        };
        this.handleOnFocus = function () {
            _this.isInteracting = true;
        };
        this.handleOnBlur = function () {
            _this.isInteracting = false;
        };
        this.handleOnKeyDown = function (event) {
            var keyCode = event.key || { 38: 'ArrowUp', 40: 'ArrowDown' }[event.keyCode];
            if (keyCode === 'ArrowUp' && _this.value + _this.step <= _this.max) {
                _this.value += _this.step;
                _this.angle = _this.angleFromValue(_this.value);
            }
            else if (keyCode === 'ArrowDown' &&
                _this.value - _this.step >= _this.min) {
                _this.value -= _this.step;
                _this.angle = _this.angleFromValue(_this.value);
            }
        };
        this.onAngleChange = props.onAngleChange;
        this.onValueChange = props.onValueChange;
        this.onInteractionChange = props.onInteractionChange;
        this._locationX = 0;
        this._locationY = 0;
        this.refElement = refElement;
        this._isInteracting = false;
        this.windowEventListeners = {
            mouse: [
                ['mousemove', this.handleOnMouseMove],
                ['mouseup', this.handleOnMouseUp],
            ],
            touch: [
                ['touchmove', this.handleOnTouchMove],
                ['touchend', this.handleOnTouchEnd],
            ],
        };
        this.updateFromProps(props);
    }
    KnobArea.prototype.updateFromProps = function (props) {
        if (props.max <= props.min || props.max < props.min + props.step) {
            throw new Error('Max value should be bigger or equal to min+step value.');
        }
        this.min = props.min;
        this.max = props.max;
        this.step = props.step;
        this.diameter = props.diameter;
        this.onAngleChange = props.onAngleChange || this.onAngleChange;
        this.onValueChange = props.onValueChange || this.onValueChange;
        this.onInteractionChange =
            props.onInteractionChange || this.onInteractionChange;
        this.spaceMaxFromZero =
            props.spaceMaxFromZero !== undefined ? props.spaceMaxFromZero : true;
        if (props.jumpLimit) {
            this.jumpLimit = props.jumpLimit;
        }
        if (props.value !== this.value) {
            if (props.min > this.value || props.value < props.min) {
                this.value = props.min;
            }
            else if (props.max < this.value || props.value > props.max) {
                this.value = props.max;
            }
            else {
                this.value = props.value;
            }
            this.angle = this.angleFromValue(this.value);
        }
        if (this.value % this.step || (this.max - this.min) % this.step) {
            throw new Error('Value and (max - min) should be divisible by step.');
        }
    };
    Object.defineProperty(KnobArea.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (val) {
            if (this._angle === val) {
                return;
            }
            this._angle = val;
            if (this.onAngleChange) {
                this.onAngleChange(this._angle);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KnobArea.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            var newValue = this.getValueWithinJumpLimit(val);
            if (this._value === newValue) {
                return;
            }
            this._value = newValue;
            if (this.onValueChange) {
                this.onValueChange(this._value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KnobArea.prototype, "isInteracting", {
        get: function () {
            return this._isInteracting;
        },
        set: function (val) {
            if (this._isInteracting === val) {
                return;
            }
            this._isInteracting = val;
            if (this.onInteractionChange) {
                this.onInteractionChange(this._isInteracting);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KnobArea.prototype, "numSteps", {
        get: function () {
            return (this.max - this.min) / this.step;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KnobArea.prototype, "valsDistribution", {
        get: function () {
            if (this.spaceMaxFromZero) {
                return 360 / (this.numSteps + 1);
            }
            return 360 / this.numSteps;
        },
        enumerable: false,
        configurable: true
    });
    KnobArea.prototype.getValueWithinJumpLimit = function (newValue) {
        if (!this.jumpLimit) {
            return newValue;
        }
        var limit = Math.max(this.step, Math.ceil((this.max - this.min) * this.jumpLimit));
        if (Math.abs(newValue - this.value) > limit) {
            if (newValue > this.max * 0.9 &&
                this.value < this.min + this.max * 0.1) {
                return this.min;
            }
            if (newValue < this.min + this.max * 0.1 &&
                this.value > this.max * 0.9) {
                return this.max;
            }
            return this.value;
        }
        return newValue;
    };
    KnobArea.prototype.getComputedTransformXY = function (el) {
        if (!window.getComputedStyle || !el) {
            return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
        }
        var style = window.getComputedStyle(el);
        var transform = style.transform || style.webkitTransform;
        if (!transform) {
            return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
        }
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) {
            var scaleX_1 = parseFloat(mat[1].split(', ')[0]);
            var scaleY_1 = parseFloat(mat[1].split(', ')[5]);
            return {
                x: parseFloat(mat[1].split(', ')[12]),
                y: parseFloat(mat[1].split(', ')[13]),
                scaleX: scaleX_1,
                scaleY: scaleY_1,
            };
        }
        mat = transform.match(/^matrix\((.+)\)$/);
        var scaleX = mat ? parseFloat(mat[1].split(', ')[0]) : 1;
        var scaleY = mat ? parseFloat(mat[1].split(', ')[3]) : 1;
        return {
            x: mat ? parseFloat(mat[1].split(', ')[4]) : 0,
            y: mat ? parseFloat(mat[1].split(', ')[5]) : 0,
            scaleX: scaleX,
            scaleY: scaleY,
        };
    };
    KnobArea.prototype.updateAreaLocation = function (eventCoords) {
        var areaRadius = this.diameter / 2;
        // See article with explanation at: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
        var x = 0;
        var y = 0;
        var el = this.refElement.current;
        var transformXY = this.getComputedTransformXY(el);
        while (el) {
            if (el.tagName.toUpperCase() === 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                x += el.offsetLeft - xScroll + el.clientLeft;
                y += el.offsetTop - yScroll + el.clientTop;
            }
            else {
                // for all other non-BODY elements
                x += el.offsetLeft - el.scrollLeft + el.clientLeft;
                y += el.offsetTop - el.scrollTop + el.clientTop;
            }
            x += transformXY.x;
            y += transformXY.y;
            el = el.offsetParent;
            transformXY = this.getComputedTransformXY(el);
        }
        this._locationX = x + areaRadius;
        this._locationY = y + areaRadius;
        this._locationX += eventCoords.pageX - eventCoords.clientX;
        this._locationY += eventCoords.pageY - eventCoords.clientY;
    };
    KnobArea.prototype.calcDegreeOfRotation = function (pageX, pageY) {
        var rad = Math.atan2(pageX - this._locationX, pageY - this._locationY);
        var deg = Math.abs(rad * (180 / Math.PI) - 180);
        return deg;
    };
    KnobArea.prototype.valueFromAngle = function (angle) {
        var _this = this;
        var angleAsPercent = angle / (this.numSteps * this.valsDistribution);
        var totalValue = this.numSteps * this.step;
        var val = this.min + angleAsPercent * totalValue;
        if (val > this.max + this.step / 2) {
            return this.min;
        }
        var valuesList = Array.from(new Array(this.numSteps + 1)).map(function (_, i) {
            return _this.min + i * _this.step;
        });
        var closest = valuesList.reduce(function (prev, curr) {
            return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev;
        });
        return closest;
    };
    KnobArea.prototype.angleFromValue = function (value) {
        return Math.ceil(((value - this.min) / this.step) * this.valsDistribution);
    };
    KnobArea.prototype.updateAngleValue = function (pageX, pageY) {
        var _this = this;
        requestAnimationFrame(function () {
            var updatedAngle = _this.calcDegreeOfRotation(pageX, pageY);
            _this.value = _this.valueFromAngle(updatedAngle);
            _this.angle = _this.angleFromValue(_this.value);
        });
    };
    KnobArea.prototype.addWindowEventListeners = function (group) {
        this.isInteracting = true;
        this.windowEventListeners[group].forEach(function (handlerData) {
            var eventName = handlerData[0], handler = handlerData[1];
            window.addEventListener(eventName, handler);
        });
    };
    KnobArea.prototype.removeWindowEventListeners = function (group) {
        this.isInteracting = false;
        this.windowEventListeners[group].forEach(function (handlerData) {
            var eventName = handlerData[0], handler = handlerData[1];
            window.removeEventListener(eventName, handler);
        });
    };
    return KnobArea;
}());

function KnobErrorWrap(props) {
    console && console.error(props.error);
    return (React__default["default"].createElement("div", { style: {
            width: "".concat(props.diameter, "px"),
            height: "".concat(props.diameter, "px"),
            borderRadius: "".concat(props.diameter / 2, "px"),
            position: 'relative',
            outline: 'none',
            boxSizing: 'border-box',
            overflow: 'hidden',
        } },
        React__default["default"].createElement("div", { style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'red',
                textAlign: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 999,
                paddingTop: 'calc(50% - 0.5em)',
                background: 'rgba(0, 0, 0, 0.2)',
                pointerEvents: 'none',
            } }, "\uD83D\uDCA3"),
        props.children));
}

function useKnobAreaClass(props) {
    var refElement = React.useRef(null);
    var refKnobArea = React.useRef(null);
    var errorContent = null;
    try {
        if (!refKnobArea.current) {
            refKnobArea.current = new KnobArea(refElement, props);
        }
        else {
            refKnobArea.current.updateFromProps(props);
        }
    }
    catch (e) {
        errorContent = e;
    }
    return [refElement, refKnobArea.current, errorContent];
}
function Knob(props) {
    var _a = useKnobAreaClass(props), refElement = _a[0], knobArea = _a[1], errorContent = _a[2];
    var defaultStyle = {
        width: "".concat(props.diameter, "px"),
        height: "".concat(props.diameter, "px"),
        borderRadius: "".concat(props.diameter / 2, "px"),
        position: 'relative',
        outline: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
    };
    var userStyle = props.knobStyle || {};
    var activeStyle = __assign(__assign({}, defaultStyle), userStyle);
    var knobElement = (React__default["default"].createElement("div", { ref: refElement, onMouseDown: knobArea && knobArea.handleOnMouseDown, onTouchStart: knobArea && knobArea.handleOnTouchStart, onKeyDown: knobArea && knobArea.handleOnKeyDown, onFocus: knobArea && knobArea.handleOnFocus, onBlur: knobArea && knobArea.handleOnBlur, style: activeStyle, tabIndex: 0, "aria-valuenow": props.value, "aria-valuemin": props.min, "aria-valuemax": props.max, "aria-valuetext": props.ariaValueText, "aria-labelledby": props.ariaLabelledBy }, props.children));
    if (errorContent) {
        return (React__default["default"].createElement(KnobErrorWrap, { error: errorContent, diameter: props.diameter }, knobElement));
    }
    return knobElement;
}

function SkinWrap(props) {
    var defaultStyle = {
        position: 'relative',
        outline: 'none',
        boxSizing: 'border-box',
    };
    var userStyle = props.style || {};
    var activeStyle = __assign(__assign({}, defaultStyle), userStyle);
    return React__default["default"].createElement("div", { style: activeStyle }, props.children);
}

function composeTwo(handler, callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        handler.apply(void 0, args);
        if (callback) {
            callback.apply(void 0, args);
        }
    };
}

function useAngleUpdater(currentValue) {
    var angleRef = React.useRef(0);
    var setAngleRef = function (angleVal) {
        angleRef.current = angleVal;
    };
    var _a = React.useState(0), angle = _a[0], setAngle = _a[1];
    React.useEffect(function () {
        setAngle(angleRef.current);
    }, [angleRef.current, currentValue]);
    return [angle, setAngleRef];
}

function Basic(props) {
    var _a = useAngleUpdater(props.value), angle = _a[0], setAngle = _a[1];
    var _b = React.useState(false), isActive = _b[0], setIsActive = _b[1];
    var theme = props.theme || {};
    var activeColor = theme.activeColor || '#a1dca8';
    var defaultColor = theme.defaultColor || '#3f3f3f';
    var gradientStart = theme.gradientStart || '#f9f9f9';
    var gradientEnd = theme.gradientEnd || '#eaeced';
    var notchAndText = theme.notchAndText || '#3f3f3f';
    var borderColor = isActive ? activeColor : defaultColor;
    var angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
    var interactionChangeHandler = composeTwo(setIsActive, props.onInteractionChange);
    return (React__default["default"].createElement(SkinWrap, { style: props.style },
        React__default["default"].createElement(Knob, { diameter: props.diameter, value: props.value, min: props.min, max: props.max, step: props.step, jumpLimit: props.jumpLimit, spaceMaxFromZero: props.spaceMaxFromZero, ariaLabelledBy: props.ariaLabelledBy, ariaValueText: props.ariaValueText, knobStyle: __assign({ cursor: 'pointer' }, props.knobStyle), onAngleChange: angleChangeHandler, onInteractionChange: interactionChangeHandler, onValueChange: props.onValueChange },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("svg", { viewBox: "0 0 166.56 166.56", transform: "rotate(".concat(angle, ")"), style: { transform: "rotate(".concat(angle, "deg)") } },
                    React__default["default"].createElement("defs", null,
                        React__default["default"].createElement("linearGradient", { id: "a" },
                            React__default["default"].createElement("stop", { offset: "0", stopColor: gradientStart, stopOpacity: "1" }),
                            React__default["default"].createElement("stop", { offset: "1", stopColor: gradientEnd, stopOpacity: "1" })),
                        React__default["default"].createElement("filter", { id: "b", width: "1.11", height: "1.11", x: "-0.055", y: "-0.055", colorInterpolationFilters: "sRGB" },
                            React__default["default"].createElement("feGaussianBlur", { stdDeviation: "3.45" })),
                        React__default["default"].createElement("linearGradient", { id: "c", x1: "140.985", x2: "63.122", y1: "98.751", y2: "202.317", gradientTransform: "translate(-75.643 -328.104)", gradientUnits: "userSpaceOnUse", xlinkHref: "#a" })),
                    React__default["default"].createElement("g", { fillOpacity: "1", transform: "translate(-21.72 -65.22)" },
                        React__default["default"].createElement("circle", { cx: "105", cy: "148.5", r: "75", fill: "#ccc", stroke: "none", strokeDasharray: "none", strokeMiterlimit: "4", strokeOpacity: "1", strokeWidth: "17.106", filter: "url(#b)", opacity: "1" }),
                        React__default["default"].createElement("circle", { cx: "29.357", cy: "-179.604", r: "70", fill: "url(#c)", stroke: borderColor, strokeDasharray: "none", strokeMiterlimit: "4", strokeOpacity: "1", strokeWidth: "1", opacity: "1", transform: "rotate(135.448)" }),
                        React__default["default"].createElement("circle", { cx: "105.083", cy: "88.628", r: "4.443", fill: notchAndText, stroke: "#b1b1b1", strokeDasharray: "none", strokeMiterlimit: "4", strokeOpacity: "1", strokeWidth: "0.551", opacity: "1" }))),
                React__default["default"].createElement("div", { style: {
                        width: '100%',
                        textAlign: 'center',
                        fontSize: "".concat(Math.ceil(props.diameter / 4), "px"),
                        position: 'absolute',
                        top: 'calc(50% - 0.6em)',
                        userSelect: 'none',
                        color: notchAndText,
                    } }, props.value))),
        props.children));
}

function HighContrast(props) {
    var _a = useAngleUpdater(props.value), angle = _a[0], setAngle = _a[1];
    var _b = React.useState(false), isActive = _b[0], setIsActive = _b[1];
    var theme = props.theme || {};
    var activeColor = theme.activeColor || '#b56a7a';
    var defaultColor = theme.defaultColor || '#100';
    var bgrColor = isActive ? activeColor : defaultColor;
    var angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
    var interactionChangeHandler = composeTwo(setIsActive, props.onInteractionChange);
    return (React__default["default"].createElement(SkinWrap, { style: props.style },
        React__default["default"].createElement(Knob, { diameter: props.diameter, value: props.value, min: props.min, max: props.max, step: props.step, jumpLimit: props.jumpLimit, spaceMaxFromZero: props.spaceMaxFromZero, ariaLabelledBy: props.ariaLabelledBy, ariaValueText: props.ariaValueText, knobStyle: __assign({ cursor: 'pointer' }, props.knobStyle), onAngleChange: angleChangeHandler, onInteractionChange: interactionChangeHandler, onValueChange: props.onValueChange },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("svg", { viewBox: "0 0 100 100", transform: "rotate(".concat(angle, ")"), style: { transform: "rotate(".concat(angle, "deg)") } },
                    React__default["default"].createElement("path", { fill: bgrColor, d: "M50 0A50 50 0 000 50a50 50 0 0050 50 50 50 0 0050-50A50 50 0 0050 0zm0 2a48 48 0 0148 48 48 48 0 01-48 48A48 48 0 012 50 48 48 0 0150 2z" }),
                    React__default["default"].createElement("path", { fill: bgrColor, d: "M50 4A46 46 0 004 50a46 46 0 0046 46 46 46 0 0046-46A46 46 0 0050 4zm0 2.141a4.276 4.276 0 014.276 4.277A4.276 4.276 0 0150 14.694a4.276 4.276 0 01-4.276-4.276A4.276 4.276 0 0150 6.141z" })),
                React__default["default"].createElement("div", { style: {
                        width: '100%',
                        textAlign: 'center',
                        fontSize: "".concat(Math.ceil(props.diameter / 3), "px"),
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: 'calc(50% - 0.6em)',
                        userSelect: 'none',
                        color: '#fff',
                    } }, props.value))),
        props.children));
}

function White(props) {
    var _a = useAngleUpdater(props.value), angle = _a[0], setAngle = _a[1];
    var _b = React.useState(false), isActive = _b[0], setIsActive = _b[1];
    var theme = props.theme || {};
    var activeNotchColor = theme.activeNotchColor || '#b56a7a';
    var defaultNotchColor = theme.defaultNotchColor || '#f7f7f7';
    var activeTextColor = theme.activeTextColor || '#b56a7a';
    var defaultTextColor = theme.defaultTextColor || '#100';
    var bgrColor = isActive ? activeTextColor : defaultTextColor;
    var numSteps = Math.ceil((props.max - props.min) / props.step);
    var numNotches = Math.min(numSteps, 36);
    var activeNotch = Math.ceil(angle / Math.ceil(360 / numNotches));
    var angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
    var interactionChangeHandler = composeTwo(setIsActive, props.onInteractionChange);
    return (React__default["default"].createElement(SkinWrap, { style: props.style },
        React__default["default"].createElement(Knob, { diameter: props.diameter, value: props.value, min: props.min, max: props.max, step: props.step, jumpLimit: props.jumpLimit, spaceMaxFromZero: props.spaceMaxFromZero, ariaLabelledBy: props.ariaLabelledBy, ariaValueText: props.ariaValueText, knobStyle: __assign({ cursor: 'pointer' }, props.knobStyle), onAngleChange: angleChangeHandler, onInteractionChange: interactionChangeHandler, onValueChange: props.onValueChange },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("svg", { viewBox: "0 0 62.463 62.463" },
                    React__default["default"].createElement("defs", null,
                        React__default["default"].createElement("linearGradient", { id: "prefix__c" },
                            React__default["default"].createElement("stop", { offset: 0, stopColor: "#fff" }),
                            React__default["default"].createElement("stop", { offset: 1, stopColor: "#b0b0b0" })),
                        React__default["default"].createElement("linearGradient", { id: "prefix__a" },
                            React__default["default"].createElement("stop", { offset: 0, stopColor: "#939393" }),
                            React__default["default"].createElement("stop", { offset: 1, stopColor: "#f0f0f0", stopOpacity: 0 })),
                        React__default["default"].createElement("linearGradient", { id: "prefix__b" },
                            React__default["default"].createElement("stop", { offset: 0, stopColor: "#b0b0b0" }),
                            React__default["default"].createElement("stop", { offset: 1, stopColor: "#fdfdfd" })),
                        React__default["default"].createElement("linearGradient", { gradientTransform: "matrix(.84848 0 0 .84848 -25.569 29.664)", gradientUnits: "userSpaceOnUse", y2: 136.304, x2: 200.519, y1: 175.459, x1: 244.552, id: "prefix__e", xlinkHref: "#prefix__b" }),
                        React__default["default"].createElement("linearGradient", { gradientUnits: "userSpaceOnUse", y2: 196.319, x2: 143.659, y1: 184.184, x1: 133.863, id: "prefix__d", xlinkHref: "#prefix__c" })),
                    React__default["default"].createElement("g", { transform: "translate(-131.196 -134.336)" },
                        React__default["default"].createElement("g", { transform: "translate(-442.372 -663.575) scale(4.37185)" },
                            React__default["default"].createElement("circle", { cx: 138.339, cy: 189.655, r: 7.144, fill: bgrColor }),
                            React__default["default"].createElement("path", { d: "M138.34 182.511a7.144 7.144 0 00-7.144 7.144 7.144 7.144 0 007.143 7.144 7.144 7.144 0 007.144-7.144 7.144 7.144 0 00-7.144-7.144zm0 .53a6.615 6.615 0 016.614 6.614 6.615 6.615 0 01-6.615 6.614 6.615 6.615 0 01-6.614-6.614 6.615 6.615 0 016.614-6.615z", fill: "url(#prefix__d)" }),
                            React__default["default"].createElement("circle", { cx: 138.339, cy: 189.655, r: 6.35, fill: "#fff" })),
                        React__default["default"].createElement("circle", { r: 14.583, cy: 192.949, cx: 149.253, fill: "none" }),
                        React__default["default"].createElement("circle", { cy: 165.567, cx: 162.427, fill: "#f0f0f0", r: 27.151 })),
                    React__default["default"].createElement("g", { transform: "translate(".concat(62.463 / 2, " ").concat(62.463 / 2, ") scale(0.45) rotate(-90)") }, Array.from(new Array(numNotches)).map(function (_, index) {
                        var step = (2 * Math.PI) / numNotches;
                        var angle = index * step;
                        var width = 2;
                        var height = 8;
                        var x = width / 2 + 62.463 * Math.cos(angle);
                        var y = height / 2 + 62.463 * Math.sin(angle);
                        var origX = x - width / 2;
                        var origY = y - height / 2;
                        var fill = activeNotch > index
                            ? activeNotchColor
                            : defaultNotchColor;
                        var key = 'notch_' + index;
                        return (React__default["default"].createElement("rect", { key: key, id: "r".concat(index), fill: fill, width: width, height: height, x: x, y: y, transform: "rotate(".concat(index *
                                Math.ceil(360 / numNotches) +
                                90, " ").concat(origX, " ").concat(origY, ")") }));
                    }))),
                React__default["default"].createElement("div", { style: {
                        width: '100%',
                        textAlign: 'center',
                        fontSize: "".concat(Math.ceil(props.diameter / 4), "px"),
                        position: 'absolute',
                        top: 'calc(50% - 0.6em)',
                        userSelect: 'none',
                        color: bgrColor,
                    } }, props.value))),
        props.children));
}

/*
 * CSS for this component is written by @simurai
 * All credits goes to him
 * https://codepen.io/simurai/pen/DwJdq
 */
var uniqClassName$1 = "metal-".concat(new Date().getTime());
function Silver(props) {
    var _a = useAngleUpdater(props.value), angle = _a[0], setAngle = _a[1];
    var _b = React.useState("".concat(uniqClassName$1, "-bgr")), bgrClass = _b[0], setBgrClass = _b[1];
    var angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
    var interactionChangeHandler = composeTwo(function (isInteracting) {
        isInteracting
            ? setBgrClass("".concat(uniqClassName$1, "-bgr-active"))
            : setBgrClass("".concat(uniqClassName$1, "-bgr"));
    }, props.onInteractionChange);
    var glowSpacing = 28;
    return (React__default["default"].createElement(SkinWrap, { style: props.style },
        React__default["default"].createElement(Knob, { diameter: props.diameter + glowSpacing, value: props.value, min: props.min, max: props.max, step: props.step, jumpLimit: props.jumpLimit, spaceMaxFromZero: props.spaceMaxFromZero, ariaLabelledBy: props.ariaLabelledBy, ariaValueText: props.ariaValueText, knobStyle: __assign({ cursor: 'pointer' }, props.knobStyle), onAngleChange: angleChangeHandler, onInteractionChange: interactionChangeHandler, onValueChange: props.onValueChange },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("style", { type: "text/css" }, ".".concat(uniqClassName$1, "-bgr, .").concat(uniqClassName$1, "-bgr-active {\n                        position: absolute;\n                        z-index:1;\n                        outline: none;\n\n                        background-color: hsl(0,0%,90%);\n                        box-shadow: inset hsla(0,0%,15%,  1) 0  0px 0px 4px, /* border */\n                        inset hsla(0,0%,15%, .8) 0 -1px 5px 4px, /* soft SD */\n                        inset hsla(0,0%,0%, .25) 0 -1px 0px 7px, /* bottom SD */\n                        inset hsla(0,0%,100%,.7) 0  2px 1px 7px, /* top HL */\n\n                        hsla(0,0%, 0%,.15) 0 -5px 6px 4px, /* outer SD */\n                        hsla(0,0%,100%,.5) 0  5px 6px 4px; /* outer HL */ \n\n                        transition: color .2s;\n                    }\n                    \n                    .").concat(uniqClassName$1, "-bgr-active {\n                        color: hsl(210, 100%, 40%);\n                        text-shadow: hsla(210,100%,20%,.3) 0 -1px 0, hsl(210,100%,85%) 0 2px 1px, hsla(200,100%,80%,1) 0 0 5px, hsla(210,100%,50%,.6) 0 0 20px;\n                        box-shadow: \n                            inset hsla(208, 79%, 28%,  1) 0  0px 0px 4px, /* border */\n                            inset hsla(208,100%,15%, .4) 0 -1px 5px 4px, /* soft SD */\n                            inset hsla(208,100%,20%,.25) 0 -1px 0px 7px, /* bottom SD */\n                            inset hsla(208,100%,100%,.7) 0  2px 1px 7px, /* top HL */\n\n                            hsla(208,100%,75%, .8) 0  0px 3px 2px, /* outer SD */\n                            hsla(208,50%,40%, .25) 0 -5px 6px 4px, /* outer SD */\n                            hsla(208,80%,95%,   1) 0  5px 6px 4px; /* outer HL */\n                    }\n\n                    .").concat(uniqClassName$1, "-rot {\n                        position: absolute;\n                        z-index: 2;\n                        top: 7px;\n                        left: 7px;\n                        background-image: -webkit-radial-gradient(  50%   0%,  8% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient(  50% 100%, 12% 50%, hsla(0,0%,100%,.6) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient(   0%  50%, 50%  7%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient( 100%  50%, 50%  5%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   3%, hsla(0,0%,  0%,.1) 3.5%),\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%,.1) 7.5%),\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.2) 2.2%),\n\n                        -webkit-radial-gradient( 50% 50%, 200% 50%, hsla(0,0%,90%,1) 5%, hsla(0,0%,85%,1) 30%, hsla(0,0%,60%,1) 100%);\n                    }\n\n\n                    .").concat(uniqClassName$1, "-rot:before, .").concat(uniqClassName$1, "-rot:after {\n                        content: \"\";\n                        top: 0;\n                        left: 0;\n                        position: absolute;\n                        width: inherit;\n                        height: inherit;\n                        border-radius: inherit;\n\n                        /* fake conical gradients */\n                        background-image: -webkit-radial-gradient(  50%   0%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient(  50% 100%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient(   0%  50%, 50% 10%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient( 100%  50%, 50% 06%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%);\n                    }\n                    .").concat(uniqClassName$1, "-rot:before { transform: rotate( 65deg); }\n                    .").concat(uniqClassName$1, "-rot:after { transform: rotate(-65deg); }\n                    \n                    .").concat(uniqClassName$1, "-notch {\n                        position: absolute;\n                        width: 10px;\n                        height: 10px;\n                        background: black;\n                        border-radius: 5px;\n                        top: 5px;\n                    }\n                    .").concat(uniqClassName$1, "-text {\n                        width: 100%;\n                        text-align: center;\n                        font-weight: bold;\n                        position: absolute;\n                        top: calc(50% - 0.6em);\n                        user-select: none;\n                        z-index: 3;\n                        color: #262626;\n                        text-shadow: -1px -1px 1px #111, 1px 1px 2px #fff;\n                    }")),
                React__default["default"].createElement("div", { style: {
                        position: 'relative',
                        width: props.diameter,
                        height: props.diameter,
                        userSelect: 'none',
                        margin: "".concat(glowSpacing / 2, "px 0 0 ").concat(glowSpacing / 2, "px"),
                    } },
                    React__default["default"].createElement("div", { className: bgrClass, style: {
                            width: "".concat(props.diameter, "px"),
                            height: "".concat(props.diameter, "px"),
                            borderRadius: "".concat(props.diameter / 2, "px"),
                        } }),
                    React__default["default"].createElement("div", { className: "".concat(uniqClassName$1, "-rot"), style: {
                            width: "".concat(props.diameter - 14, "px"),
                            height: "".concat(props.diameter - 14, "px"),
                            lineHeight: "".concat(props.diameter - 14, "px"),
                            borderRadius: "".concat((props.diameter - 14) / 2, "px"),
                            transform: "rotate(".concat(angle, "deg)"),
                        } },
                        React__default["default"].createElement("div", { className: "".concat(uniqClassName$1, "-notch"), style: {
                                left: "".concat((props.diameter - 24) / 2, "px"),
                            } })),
                    React__default["default"].createElement("div", { className: "".concat(uniqClassName$1, "-text"), style: {
                            fontSize: "".concat(Math.ceil(props.diameter / 4), "px"),
                        } }, props.value)))),
        props.children));
}

/*
 * CSS for this component is written by @Hyungsub
 * All credits goes to him
 * https://codepen.io/Hyungsub08/pen/yLBPJKW
 */
var uniqClassName = "donut-".concat(new Date().getTime());
function Donut(props) {
    var _a = useAngleUpdater(props.value), angle = _a[0], setAngle = _a[1];
    var _b = React.useState("".concat(uniqClassName, "-center")), centerClass = _b[0], setCenterClass = _b[1];
    var angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
    var interactionChangeHandler = composeTwo(function (isInteracting) {
        isInteracting
            ? setCenterClass("".concat(uniqClassName, "-center-active"))
            : setCenterClass("".concat(uniqClassName, "-center"));
    }, props.onInteractionChange);
    var theme = props.theme || {};
    var donutColor = theme.donutColor || '#1BA098';
    var defaultBgrColor = theme.bgrColor || '#e1e1e1';
    var maxedBgrColor = theme.maxedBgrColor || '#051622';
    var centerColor = theme.centerColor || '#fff';
    var centerFocusedColor = theme.centerFocusedColor || '#F7F4E9';
    var donutThickness = theme.donutThickness || 30;
    var bgrColor = defaultBgrColor;
    if (props.value === props.max) {
        bgrColor = maxedBgrColor;
    }
    var colorBgr = bgrColor;
    var colorOne = donutColor;
    var colorTwo = donutColor;
    var angleOne = 90;
    var angleTwo = angle;
    if (angle < 180) {
        colorBgr = donutColor;
        colorOne = bgrColor;
        colorTwo = bgrColor;
        angleOne = angle + 90;
        angleTwo = 0;
    }
    return (React__default["default"].createElement(SkinWrap, { style: props.style },
        React__default["default"].createElement(Knob, { diameter: props.diameter, value: props.value, min: props.min, max: props.max, step: props.step, jumpLimit: props.jumpLimit, spaceMaxFromZero: props.spaceMaxFromZero, ariaLabelledBy: props.ariaLabelledBy, ariaValueText: props.ariaValueText, knobStyle: __assign({ cursor: 'pointer' }, props.knobStyle), onAngleChange: angleChangeHandler, onInteractionChange: interactionChangeHandler, onValueChange: props.onValueChange },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("style", { type: "text/css" }, ".".concat(uniqClassName, " {\n                      position: relative;\n                      border-radius: 50%;\n                      overflow: hidden;\n                    }\n                    .").concat(uniqClassName, "-slice-one, .").concat(uniqClassName, "-slice-two {\n                      position: absolute;\n                      top: 0;\n                      left: 0;\n                      width: 100%;\n                      height: 100%;\n                    }\n                    .").concat(uniqClassName, "-center, .").concat(uniqClassName, "-center-active {\n                      position: absolute;\n                      border-radius: 50%;\n                    }\n                    .").concat(uniqClassName, "-center {\n                      background: ").concat(centerColor, ";\n                    }\n                    .").concat(uniqClassName, "-center-active {\n                      background: ").concat(centerFocusedColor, ";\n                    }\n                    .").concat(uniqClassName, "-center span {\n                      display: block;\n                      text-align: center;\n                    }\n                    .").concat(uniqClassName, "-text {\n                        width: 100%;\n                        text-align: center;\n                        font-weight: bold;\n                        position: absolute;\n                        top: calc(50% - 0.6em);\n                        user-select: none;\n                        z-index: 3;\n                    }")),
                React__default["default"].createElement("div", { style: {
                        position: 'relative',
                        width: props.diameter,
                        height: props.diameter,
                        userSelect: 'none',
                    } },
                    React__default["default"].createElement("div", { className: uniqClassName, style: {
                            width: "".concat(props.diameter, "px"),
                            height: "".concat(props.diameter, "px"),
                            background: colorBgr,
                        } },
                        React__default["default"].createElement("div", { className: "".concat(uniqClassName, "-slice-one"), style: {
                                clip: "rect(0 ".concat(props.diameter, "px ").concat(props.diameter / 2, "px 0)"),
                                transform: "rotate(".concat(angleOne, "deg)"),
                                background: colorOne,
                            } }),
                        React__default["default"].createElement("div", { className: "".concat(uniqClassName, "-slice-two"), style: {
                                clip: "rect(0 ".concat(props.diameter / 2, "px ").concat(props.diameter, "px 0)"),
                                transform: "rotate(".concat(angleTwo, "deg)"),
                                background: colorTwo,
                            } }),
                        React__default["default"].createElement("div", { className: centerClass, style: {
                                top: "".concat(donutThickness, "px"),
                                left: "".concat(donutThickness, "px"),
                                width: "".concat(props.diameter - donutThickness * 2, "px"),
                                height: "".concat(props.diameter - donutThickness * 2, "px"),
                            } })),
                    React__default["default"].createElement("div", { className: "".concat(uniqClassName, "-text"), style: {
                            color: donutColor,
                            fontSize: "".concat(Math.ceil(props.diameter / 4), "px"),
                        } }, props.value)))),
        props.children));
}

exports.Basic = Basic;
exports.Donut = Donut;
exports.HighContrast = HighContrast;
exports.Silver = Silver;
exports.SkinWrap = SkinWrap;
exports.White = White;
exports.composeTwo = composeTwo;
exports["default"] = Knob;
exports.useAngleUpdater = useAngleUpdater;
//# sourceMappingURL=react-dial-knob.cjs.js.map
