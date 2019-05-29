var presets = {
  'linear': [0, 0, 1, 1],
  'ease': [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
};

/**
 * @function cubicBezierTimingFunction
 * @param {string} x1
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} precision
 * @return {function}
 */

export const cubicBezierTimingFunction = (x1, y1, x2, y2, precision) => {
  var preset;
  if (typeof x1 === 'string') {
    precision = y1;
    preset = presets[x1] || presets.linear;
    x1 = preset[0];
    y1 = preset[1];
    x2 = preset[2];
    y2 = preset[3];
  } else if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
    x1 = presets.linear[0];
    y1 = presets.linear[1];
    x2 = presets.linear[2];
    y2 = presets.linear[3];
  }

  precision = precision || 0.00001;

  var pow = Math.pow,
    abs = Math.abs;

  /**
   * @function yFn
   * @param {number} t
   * @return {number}
   */
  function yFn(t) {
    // 3 * (1 - t) ^ 2 * t * y1 + 3 * (1 - t) * t ^ 2 * y2 + t ^ 3
    // 3 * pow(1 - t, 2) * t * y1 + 3 * (1 - t) * pow(t, 2) * y2 + pow(t, 3);
    return (3 * y1 - 3 * y2 + 1) * pow(t, 3) + (3 * y2 - 6 * y1) * pow(t, 2) + 3 * y1 * t;
  }

  /**
   * @function xFn
   * @param {number} t
   * @return {number}
   */
  function xFn(t) {
    // 3 * (1 - t) ^ 2 * t * x1 + 3 * (1 - t) * t ^ 2 * x2 + t ^ 3
    // 3 * pow(1 - t, 2) * t * x1 + 3 * (1 - t) * pow(t, 2) * x2 + pow(t, 3);
    return (3 * x1 - 3 * x2 + 1) * pow(t, 3) + (3 * x2 - 6 * x1) * pow(t, 2) + 3 * x1 * t;
  }

  /**
   * @function resolveT
   * @param {number} x
   * @return {number}
   */
  function resolveT(x) {
    var left = 0,
      right = 1,
      t,
      approximateX;
    while (left < right) {
      t = (left + right) / 2;
      approximateX = xFn(t);
      if (abs(x - approximateX) < precision) {
        return t;
      } else if (x < approximateX) {
        right = t;
      } else {
        left = t;
      }
    }

    return t;
  }

  return function (x) {
    if (x <= 0) {
      return 0;
    }

    if (x >= 1) {
      return 1;
    }

    return yFn(resolveT(x));
  };
}
