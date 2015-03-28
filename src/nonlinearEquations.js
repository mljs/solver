var math = require("mathjs");

NonLinearEquations = {
	
	/*
	 * Function that finds the root of the function "f" given the
	 * interval [a, b] by the bisection method. (f(a) and f(b) must be of different sign)
	 * 
	 * @param {Function} f - Function that we want to find the root.
	 * @param {Number|BigNumber} a - Lower boundary of the interval.
	 * @param {Number|BigNumber} b - Higher boundary of the interval.
	 * @param {Number|BigNumber} delta - Delta is the tolerance of the bisection method.
	 * @return {Number|BigNumber} root - The root of the function at the given interval.
	 * */
	bisectionMethod : function(f, a, b, delta) {
		var ya = f(a);
		var yb = f(b);
		var root;
		if(math.largerEq(math.multiply(ya, yb), 0)) {
			throw "Bisection method requires that f(a) and f(b) be of different sign.";
		}
		// maxIterations is an aproximation of the number of iterations that need the method to converge
		var maxIterations = math.add(1, math.round(math.divide(math.subtract(math.log( math.subtract(b, a)), math.log(delta)), math.log(2))));
		for(var i = 0; i < maxIterations; ++i) {
			root = math.divide(math.add(a, b), 2);
			var yc = f(root);
			if(math.equal(yc, 0)) {
				a = root;
				b = root;
				break;
			} else if(math.larger(math.multiply(yc, yb), 0)) {
				b = root;
				yb = yc;
			} else {
				a = root;
				ya = root;
			}
			if(math.smaller(math.subtract(b, a), delta))
				break;
		}
		return root;
	},
	
	/*
	 * Function that finds the root of the function "f" given the
     * interval [a, b] by the false position method. (f(a) and f(b) must be of different sign)
	 *
	 * Requires a delta for the difference between a and b, and epsilon
	 * for the tolerance of the value at the function f in the root.
	 * 
     * @param {Function} f - Function that we want to find the root.
     * @param {Number|BigNumber} a - Lower boundary of the interval.
     * @param {Number|BigNumber} b - Higher boundary of the interval.
	 * @param {Number|BigNumber} delta - Tolerance for the difference between a and b.
	 * @param {Number|BigNumber} epsilon - Tolerance for the value of at the function f in the root
	 * @param {Number} maxIterations - Maximum number of iterations.
	 * @return {Number|BigNumber} root - Root of the function at the given interval.
	 * */
	
	falsePositionMethod : function (f, a, b, delta, epsilon, maxIterations) {
		var ya = f(a);
		var yb = f(b);
		var root;
		if(math.larger(math.multiply(ya, yb), 0)) {
			throw "Bisection method requires that f(a) and f(b) be of different sign.";
		}
		for(var i = 0; i < maxIterations; ++i) {
			dx = math.divide(math.multiply(yb, math.subtract(b, a)), math.subtract(yb, ya));
			root = math.subtract(b, dx);
			ac = math.subtract(root, a);
			yc = f(root);
			if (math.equal(yc, 0)) {
				break;
			} else if (math.larger(math.multiply(yb, yc), 0)) {
				b = root;
				yb = yc;
			} else {
				a = root;
				ya = yc;
			}
			dx = math.min(math.abs(dx), ac);
			if ( math.smaller(math.abs(dx), delta) || math.smaller(math.abs(yc), epsilon))
				break;
		}
		return root;
	},
	
	/*
	 * Function that find the root of the function "f" and his derivate "df"
	 * by the Newton-Raphson method.
	 * 
     * Requires a delta for the difference between a and b, and epsilon
     * for the tolerance of the value at the function f in the root.
	 * 
	 * @param {Function} f - Function that we want to find the root.
	 * @param {Function} df - Derivate of the "f" function.
	 * @param {Number|BigNumber} p0 - Initial aproximation to a zero of "f" function
     * @param {Number|BigNumber} delta - Tolerance for the difference between a and b.
     * @param {Number|BigNumber} epsilon - Tolerance for the value of at the function f in the root
     * @param {Number} maxIterations - Maximum number of iterations.
     * @return {Number|BigNumber} p0 - Root of the function at the given interval.
	 * */
	newtonMethod : function(f, df, p0, delta, epsilon, maxIterations) {
		for(var i = 0; i < maxIterations; ++i) {
			var p1 = math.subtract(p0, math.divide(f(p0), df(p0)));
			var absoluteError = math.abs(math.subtract(p1, p0));
			var relativeError = math.divide(math.multiply(2, absoluteError), math.add(math.abs(p1), delta));
			p0 = p1;
			y = f(p0);
			if(math.smaller(absoluteError, delta) || math.smaller(relativeError, delta) || math.smaller(math.abs(y), epsilon)) {
				break;
			}
		}
		return p0;
	},
	
	/*
	 * Function that find the root of the function "f" by the secant method.
     *
     * Requires a delta for the tolerance of p1, and epsilon
     * for the tolerance of the value at the function f in the root.
	 * 
	 * @param {Function} f - Function that we want to find the root.
	 * @param {Number|BigNumber} p0 - Initial approximation to a root of "f"
	 * @param {Number|BigNumber} p1 - Initial approximation to a root of "f"
	 * @param {Number|BigNumber} delta - Tolerance for p1
	 * @param {Number|BigNumber} epsilon - Tolerance for the value of at the function f in the root
	 * @param {Number} maxIterations - Maximum number of iterations.
	 * @return {Number|BigNumber} p1 - Root of the function at the given interval.
	 * 
	 * */
	secantMethod : function(f, p0, p1, delta, epsilon, maxIterations) {
		for(var i = 0; i < maxIterations; ++i) {
			var p2 = math.subtract(p1, math.divide(math.multiply(f(p1), math.subtract(p1, p0)), (math.subtract(f(p1), f(p0)))));
			var absoluteError = math.abs(math.subtract(p2, p1));
			var relativeError = math.divide(math.multiply(2, absoluteError), math.add(math.abs(p2), delta));
			p0 = p1;
			p1 = p2;
			y = f(p1);
			if(math.smaller(absoluteError, delta) || math.smaller(relativeError, delta) || math.smaller(math.abs(y), epsilon)) {
				break;
			}
		}
		return p1;
	}
};
