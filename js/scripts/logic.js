angular.module('BlankApp', [])
      .controller('MyController', ['$scope', '$log', function ($scope, $log) {
        $scope.greetMe = 'World';
        $scope.setDefault = function () {
            console.log($scope.lens1)
            $scope.alpha = 0.00000063
            $scope.lens1 = {}
            $scope.lens2 = {}
            $scope.gauss1 = {}
            $scope.gauss2 = {}
            $scope.gauss3 = {}
            $scope.lens1.r1 = 10
            $scope.lens1.r2 = 15
            $scope.lens1.x = 10

            $scope.lens2.r1 = 15
            $scope.lens2.r2 = 10
            $scope.lens2.x = 30

            $scope.gauss1.w0 = 0.0014
            $scope.gauss1.z0 = 0
            $scope.dx = 0.01

            $scope.gauss2.w0 = 0
            $scope.gauss2.z0 = 0
            $scope.yyy = 0.01
            $scope.add = 25
            $scope.gauss3.w0 = 0
            $scope.gauss3.z0 = 0
        }
        var
            container = document.getElementById('container'),
            start = (new Date).getTime(),
            data, graph, offset, i;

        // Draw a sine curve at time t
        function animate (t) {
            if ($scope.alpha == undefined) $scope.setDefault();
            var totalHeight = $scope.yyy
                alpha = $scope.alpha
                lens1 = $scope.lens1
                lens2 = $scope.lens2
                gauss1 = $scope.gauss1
            var buildLens = function (xLens, rLens2, rLens1, totalHeight) {
                var dataLens = []
                //var xLens = 2.5
                //var rLens1 = 15
                //var rLens2 = 10
                var heightLensPro = 0.9
                var kaf = 1
                var widthLens1 = rLens1 - Math.sqrt(rLens1*rLens1 - totalHeight*totalHeight*heightLensPro*heightLensPro)
                var widthLens2 = rLens2 - Math.sqrt(rLens2*rLens2 - totalHeight*totalHeight*heightLensPro*heightLensPro)
                for (var i = xLens + rLens1 - widthLens1; i < xLens + rLens1; i += 0.000001) {
                    dataLens.push([xLens + kaf * (i - rLens1 + widthLens1- xLens), Math.sqrt(rLens1*rLens1-(i - xLens)*(i - xLens))])
                }

                for (var i = xLens + rLens1 ; i > xLens + rLens1 - widthLens1; i -= 0.000001) {
                    dataLens.push([xLens + kaf * (i - rLens1 + widthLens1 - xLens), -Math.sqrt(rLens1*rLens1-(i - xLens)*(i - xLens))])
                }
                for (var i = xLens - rLens2 + widthLens2; i > xLens - rLens2 ; i -= 0.000001) {
                    dataLens.push([xLens + kaf * (i + rLens2 - widthLens2 - xLens), -Math.sqrt(rLens2 * rLens2 - (i - xLens)*(i - xLens))])
                }
                for (var i = xLens - rLens2 ; i < xLens - rLens2 + widthLens2; i += 0.000001) {
                    dataLens.push([xLens + kaf * (i + rLens2 - widthLens2 - xLens), Math.sqrt(rLens2*rLens2-(i - xLens)*(i - xLens))])
                }
                return dataLens
            }
            var buildGauss = function (zk, za, zb, alpha, w0) {
                //var w0 = 0.001
                //var alpha = 0.00000063
                //var za = -20
                //var zb = 20
                var dataSumLine = []
                var dataTopLine = []
                var dataBottonLine = []
                for (var z = za; z < zb; z += $scope.dx) {
                    var x = z
                    var y = w0 *Math.sqrt(1 + Math.pow(alpha * (z-zk) / (Math.PI * w0 * w0), 2))
                    dataSumLine.push([x, y])
                    dataSumLine.push([x, -y])
                    dataTopLine.push([x, y])
                    dataBottonLine.push([x, -y])
                }
                return [dataSumLine, dataTopLine, dataBottonLine]
            }
            var getNextGauss = function (gauss, lens) {
                var f = lens.r1*lens.r2/(0.6 * (lens.r1 + lens.r2))
                var s = (lens.x - gauss.z0)
                f += 0.0000000001
                var mr = Math.abs(f/(s - f))
                var z0 = Math.PI * gauss.w0 * gauss.w0 / alpha
                var r = z0 / (s - f)
                var M = mr / Math.sqrt(1 + r * r)
                var z0n = M * M * (s - f) + f + lens.x
                //var z0n = f * (1 + ((s/f - 1))/((Math.pow(s/f - 1), 2) + Math.pow(Math.PI*gauss.w0*gauss.w0/(alpha*f),2))) + lens.x
                //var w0n = f * alpha * gauss.w0 / Math.sqrt(alpha*alpha*Math.pow(s - f,2) + Math.pow(gauss.w0, 4) * Math.PI * Math.PI)
                //var z0n = f + w0n / gauss.w0*Math.sqrt(f*f - Math.pow(Math.PI *w0n * gauss.w0/alpha,2))
                var w0n = gauss.w0/(Math.sqrt(Math.pow(1 - s / f,2) + Math.pow(Math.PI * gauss.w0 * gauss.w0/(alpha * f),2)))
                $scope.gauss2.w0 = w0n
                $scope.gauss2.z0 = z0n
                return {
                    z0: z0n,
                    w0 : w0n
                }
            }
            if (lens1.x > lens2.x) {
                var t = lens1 
                lens1 = lens2 
                lens2 = t
            }
            
            var gauss2 = getNextGauss(gauss1, lens1)
            var gauss3 = getNextGauss(gauss2, lens2)
            $scope.gauss2 = gauss2
            $scope.gauss3 = gauss3
            var add = $scope.add;
            var lens1Data = buildLens(lens1.x, lens1.r1, lens1.r2, totalHeight)
            var lens2Data = buildLens(lens2.x, lens2.r1, lens2.r2, totalHeight)
            var gauss1Data = buildGauss(gauss1.z0, lens1.x - add, lens1.x, alpha, gauss1.w0)
            var gauss2Data = buildGauss(gauss2.z0, lens1.x, lens2.x, alpha, gauss2.w0)
            var gauss3Data = buildGauss(gauss3.z0, lens2.x, lens2.x + add, alpha, gauss3.w0)

            // Draw Graph
            graph = Flotr.draw(container, [ 
                {data: gauss1Data[0], color: 'pink'},
                {data: gauss1Data[1], color: 'red'},
                {data: gauss1Data[2], color: 'red'},
                {data: gauss2Data[0], color: 'pink'},
                {data: gauss2Data[1], color: 'red'},
                {data: gauss2Data[2], color: 'red'},
                {data: gauss3Data[0], color: 'pink'},
                {data: gauss3Data[1], color: 'red'},
                {data: gauss3Data[2], color: 'red'},
                {data: lens1Data, color: 'blue'},               
                {data: lens2Data, color: 'blue'}
                ], {
            yaxis : {
                max : totalHeight,
                min : -totalHeight
            }
            });


            // Animate
          setTimeout(function () {
            animate((new Date).getTime() );
          }, 1000);
        }

        animate(start);
      }]);

    angular.element(function() {
      angular.bootstrap(document, ['BlankApp']);
    });