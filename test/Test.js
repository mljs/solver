require("../src/solutionLinearSystem");
require("../src/nonLinearEquations");
var math = require('mathjs');
var should = require('should');

describe('Numerical methods', function() {

    describe('Solution linear system', function () {

         it('Back substitution', function () {
             var A = math.matrix([[4, -1, 2, 3],
                                 [0, -2, 7, -4],
                                 [0, 0, 6, 5],
                                 [0, 0, 0, 3]]);
             var B = math.matrix([[20],
                                  [-7],
                                  [4],
                                  [6]]);
             var result = SolutionLinearSystem._backSubstitution(A, B);
             var solutions = [3, -4, -1, 2];
             for(var i = 0; i < solutions.length; ++i) {
                 math.subset(result, math.index(i, 0)).should.be.approximately(solutions[i], 10e-7);
             }
         });

         it('Solve system', function () {
              var A = math.matrix([[24.14, -1.210],
                                    [1.133, 5.281]]);
              var B = math.matrix([[22.93], [6.414]]);
              var result = SolutionLinearSystem.solve(A, B);
              for(var i = 0; i < 2; ++i) {
                  math.subset(result, math.index(i, 0)).should.be.approximately(1, 10e-7);
              }
         });
    });

    describe('Non-linear Equations', function () {
         var f1 = math.eval("f(x) = x * sin(x) - 1");

         it('Bisection method', function () {
              var result = NonLinearEquations.bisectionMethod(f1, 0, 2, 10e-7);
              result.should.be.approximately(1.114157141, 10e-7);
         });

         it('False position', function () {
             var result = NonLinearEquations.falsePositionMethod(f1, 0, 2, 10e-7, 10e-7, 500);
             result.should.be.approximately(1.114157141, 10e-7);
         });

         var f2 = math.eval("f(x) = 1980 * (1 - exp(-x / 10)) - 98*x");
         var f2prime = math.eval("f(x) = 198 * exp(-x / 10) - 98");

         it('Newton method', function () {
             var result = NonLinearEquations.newtonMethod(f2, f2prime, 16, 10-7, 10-7, 500);
             result.should.be.approximately(16.20957798, 10e-3);
         });

         var f3 = math.eval("f(x) = x^3 - 3*x + 2");

        // Take it from page 89 - 90, Cap 2
         it('Secant method', function () {
             var result = NonLinearEquations.secantMethod(f3, -2.6, -2.4, 10e-7, 10e-7, 500);
             result.should.be.approximately(-2, 10e-5);
         });
    });
});