
(function () {
        var
            container = document.getElementById('container'),
            start = (new Date).getTime(),
            data, graph, offset, i;

            
        // Draw a sine curve at time t
        function animate (t) {
        var 
            data = [];
            offset = 2 * Math.PI * (t - start) / 10000;

            for (i = 0; i < 4 * Math.PI; i += 0.2) {
                data.push([i, Math.sin(i - offset)]);
            }
            var totalHeight = 0.01
            var xLens1 = 5 
            var xLens2 = 10
            var buildLens = function (xLens, rLens1, rLens2, totalHeight) {
                var dataLens = []
                //var xLens = 2.5
                //var rLens1 = 15
                //var rLens2 = 10
                var heightLensPro = 0.9
                var widthLens1 = rLens1 - Math.sqrt(rLens1*rLens1 - totalHeight*totalHeight*heightLensPro*heightLensPro)
                var widthLens2 = rLens2 - Math.sqrt(rLens2*rLens2 - totalHeight*totalHeight*heightLensPro*heightLensPro)
                for (var i = xLens + rLens1 - widthLens1; i < xLens + rLens1; i += 0.01) {
                    dataLens.push([i - rLens1 + widthLens1, Math.sqrt(rLens1*rLens1-(i - xLens)*(i - xLens))])
                }
                for (var i = xLens + rLens1 ; i > xLens + rLens1 - widthLens1; i -= 0.01) {
                    dataLens.push([i - rLens1 + widthLens1, -Math.sqrt(rLens1*rLens1-(i - xLens)*(i - xLens))])
                }
                for (var i = xLens - rLens2 + widthLens2; i > xLens - rLens2 ; i -= 0.01) {
                    dataLens.push([i + rLens2 - widthLens2, -Math.sqrt(rLens2 * rLens2 - (i - xLens)*(i - xLens))])
                }
                for (var i = xLens - rLens2 ; i < xLens - rLens2 + widthLens2; i += 0.01) {
                    dataLens.push([i + rLens2 - widthLens2, Math.sqrt(rLens2*rLens2-(i - xLens)*(i - xLens))])
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
                for (var z = za; z < zb; z += 0.1) {
                    var x = z
                    var y = w0 *Math.sqrt(1 + Math.pow(alpha * z / (Math.PI * w0 * w0), 2))
                    dataSumLine.push([x, y])
                    dataSumLine.push([x, -y])
                    dataTopLine.push([x, y])
                    dataBottonLine.push([x, -y])
                }
                return [dataSumLine, dataTopLine, dataBottonLine]
            }
            
            var lens1 = buildLens(xLens1, 15, 10, totalHeight)
            var lens2 = buildLens(xLens2, 5, 5, totalHeight)
            var g1 = buildGauss(-20, xLens1, 0.00000063, 0.001)
            // Draw Graph
            graph = Flotr.draw(container, [ 
                {data: g1[0], color: 'pink', alpha: 0.01},
                {data: g1[1], color: 'red'},
                {data: g1[2], color: 'red'},
                {data: lens1, color: 'blue'},               
                {data: lens2, color: 'blue'} 

                ], {
            yaxis : {
                max : totalHeight,
                min : -totalHeight
            }
            });


            // Animate
        //   setTimeout(function () {
        //     animate((new Date).getTime() );
        //   }, 50);
        }

        animate(start);
      })();