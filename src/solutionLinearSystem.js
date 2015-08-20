"use strict";

var math = require("mathjs");
var Util = require("./util").Util;
	
/*
 * Function that receives a matrix A in the upper triangular form, a B column vector
 * and return the linear solution system through the back substitution.
 *
 * @param {Matrix} A
 * @param {Vector} B - Column vector.
 * @return {Vector} X - Solution of the linear system.
 *
 * */
function backSubstitution(A, B){
	var n = math.subset(math.size(B), math.index(0));
	var X = math.zeros(n, 1);
	var numerator = math.subset(B, math.index(n - 1, 0));
	var denominator = math.subset(A, math.index(n - 1, n - 1));
	X = math.subset(X, math.index(n - 1, 0), math.divide(numerator, denominator));
	for(var k = n - 2; k >= 0; --k) {
		var firstMultiplier = math.subset(A, math.index(k, math.range(k + 1, n)));
		var secondMultiplier = math.subset(X, math.index(math.range(k + 1, n), 0));
		var multiplier = math.multiply(firstMultiplier, secondMultiplier);
		numerator = math.add(math.subset(B, math.index(k, 0)), math.multiply(-1, multiplier));
		denominator = math.subset(A, math.index(k, k));
		X = math.subset(X, math.index(k, 0), math.divide(numerator, denominator));
	}
	return X;
}

/*
 * Function that solves the linear system by the gaussian elimination with pivoting.
 *
 * B should be given as a column vector.
 *
 * @param {Matrix} A
 * @param {Vector} B - Column vector.
 * @return {Vector} solutions - Solution of the linear system.
 * */
function solve(A, B) {
	var size = math.subset(math.size(A), math.index(0));
	var X = math.zeros(size);
	var C = math.zeros(1, size+1);
	var augmentedMatrix = math.concat(A, B);
	for(var q = 0; q < size - 1; ++q) {
		var subMatrix = math.subset(augmentedMatrix, math.index(math.range(q, size), q));
		var maxk = math.max(subMatrix);
		var maxIndex = Util.getIndexColumn(subMatrix, maxk);
		C = math.subset(augmentedMatrix, math.index(q, math.range(0, size + 1)));
		var replaceMatrix = math.subset(augmentedMatrix, math.index(maxIndex + q, math.range(0, size + 1)));
		augmentedMatrix = math.subset(augmentedMatrix, math.index(q, math.range(0, size + 1)), replaceMatrix, 0);
		augmentedMatrix = math.subset(augmentedMatrix, math.index(maxIndex + q, math.range(0, size + 1)), C);
		if(math.equal(math.subset(augmentedMatrix, math.index(q, q)), 0)) {
			throw new Error("the matrix A is singular");
		}
		for(var k = q + 1; k < size; ++k) {
			var numerator = math.subset(augmentedMatrix, math.index(k, q));
			var denominator = math.subset(augmentedMatrix, math.index(q, q));
			var m = math.divide(numerator, denominator);
			var firstSum = math.subset(augmentedMatrix, math.index(k, math.range(q, size + 1)));
			var secondSum = math.multiply(-m, math.subset(augmentedMatrix, math.index(q, math.range(q, size + 1))));
			var value = math.add(firstSum, secondSum);
			augmentedMatrix = math.subset(augmentedMatrix, math.index(k, math.range(q, size + 1)), value);
		}
	}
	A = math.subset(augmentedMatrix, math.index(math.range(0, size), math.range(0, size)));
	B = math.subset(augmentedMatrix, math.index(math.range(0, size), size));
	return backSubstitution(A, B);
}

exports.SolutionLinearSystem = {
	backSubstitution: backSubstitution,
	solve: solve
};