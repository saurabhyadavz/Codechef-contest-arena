"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = {
    POPOVER_CONTAINER_CLASS_NAME: 'react-tiny-popover-container',
    DEFAULT_PADDING: 6,
    DEFAULT_WINDOW_PADDING: 6,
    FADE_TRANSITION: 0.35,
    DEFAULT_ARROW_COLOR: 'black',
    DEFAULT_POSITIONS: ['top', 'left', 'right', 'bottom'],
    EMPTY_CLIENT_RECT: {
        top: 0,
        left: 0,
        bottom: 0,
        height: 0,
        right: 0,
        width: 0,
    },
};
exports.arrayUnique = function (array) { return array.filter(function (value, index, self) { return self.indexOf(value) === index; }); };
exports.rectsAreEqual = function (rectA, rectB) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return rectA === rectB ||
        ((_a = rectA) === null || _a === void 0 ? void 0 : _a.bottom) === ((_b = rectB) === null || _b === void 0 ? void 0 : _b.bottom) &&
            ((_c = rectA) === null || _c === void 0 ? void 0 : _c.height) === ((_d = rectB) === null || _d === void 0 ? void 0 : _d.height) &&
            ((_e = rectA) === null || _e === void 0 ? void 0 : _e.left) === ((_f = rectB) === null || _f === void 0 ? void 0 : _f.left) &&
            ((_g = rectA) === null || _g === void 0 ? void 0 : _g.right) === ((_h = rectB) === null || _h === void 0 ? void 0 : _h.right) &&
            ((_j = rectA) === null || _j === void 0 ? void 0 : _j.top) === ((_k = rectB) === null || _k === void 0 ? void 0 : _k.top) &&
            ((_l = rectA) === null || _l === void 0 ? void 0 : _l.width) === ((_m = rectB) === null || _m === void 0 ? void 0 : _m.width);
};
exports.popoverInfosAreEqual = function (infoA, infoB) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return infoA === infoB ||
        ((_a = infoA) === null || _a === void 0 ? void 0 : _a.align) === ((_b = infoB) === null || _b === void 0 ? void 0 : _b.align) &&
            ((_c = infoA) === null || _c === void 0 ? void 0 : _c.nudgedLeft) === ((_d = infoB) === null || _d === void 0 ? void 0 : _d.nudgedLeft) &&
            ((_e = infoA) === null || _e === void 0 ? void 0 : _e.nudgedTop) === ((_f = infoB) === null || _f === void 0 ? void 0 : _f.nudgedTop) &&
            exports.rectsAreEqual((_g = infoA) === null || _g === void 0 ? void 0 : _g.popoverRect, (_h = infoB) === null || _h === void 0 ? void 0 : _h.popoverRect) &&
            exports.rectsAreEqual((_j = infoA) === null || _j === void 0 ? void 0 : _j.targetRect, (_k = infoB) === null || _k === void 0 ? void 0 : _k.targetRect) &&
            ((_l = infoA) === null || _l === void 0 ? void 0 : _l.position) === ((_m = infoB) === null || _m === void 0 ? void 0 : _m.position);
};
exports.targetPositionHasChanged = function (oldTargetRect, newTargetRect) {
    return oldTargetRect === null
        || oldTargetRect.left !== newTargetRect.left
        || oldTargetRect.top !== newTargetRect.top
        || oldTargetRect.width !== newTargetRect.width
        || oldTargetRect.height !== newTargetRect.height;
};
//# sourceMappingURL=util.js.map