package GraphicBuild;

import org.knowm.xchart.XYChart;

import java.awt.*;
import java.util.ArrayList;

import static GraphicBuild.Main.N;
import static GraphicBuild.Main.c;
import static GraphicBuild.Main.getW;
import static GraphicBuild.Radius.getRadius;
import static org.knowm.xchart.style.markers.SeriesMarkers.NONE;

/**
 * Created by ivan on 24.01.17.
 */
public class LeftBeam {

    public static void  buildPosGauss(XYChart chart, double count) {

        double center, tmp1, tmp2, y;
        double radius;

        for(double i = -count; i > -N + 1; i -= count) {
            ArrayList<Double> xradius = new ArrayList<>();
            ArrayList<Double> yradius = new ArrayList<>();
            radius = -getRadius(i);
            center = i + radius;
            tmp1 = i;
            while(true) {
                tmp2 = getW(tmp1);
                y = Math.sqrt(radius * radius - (tmp1 - center) * (tmp1 - center));
                if(tmp2 > y) {
                    xradius.add(tmp1);
                    yradius.add(y);
                } else {
                    break;
                }
                tmp1 += 0.000000001;
            }

            chart.addSeries(c + "nd", xradius, yradius).setMarker(NONE).setLineColor(Color.RED).setShowInLegend(false);
            c++;
        }
    }

    public static void  buildNegGauss(XYChart chart, double count) {

        double center, tmp1, tmp2, y;
        double radius;

        for(double i = -count; i > -N + 1; i -= count) {
            ArrayList<Double> xradius = new ArrayList<>();
            ArrayList<Double> yradius = new ArrayList<>();
            radius = -getRadius(i);
            center = i + radius;
            tmp1 = i;
            while(true) {
                tmp2 = -getW(tmp1);
                y = -Math.sqrt(radius * radius - (tmp1 - center) * (tmp1 - center));
                if(tmp2 < y) {
                    xradius.add(tmp1);
                    yradius.add(y);
                } else {
                    break;
                }
                tmp1 += 0.000000001;
            }

            chart.addSeries(c + "nd", xradius, yradius).setMarker(NONE).setLineColor(Color.RED).setShowInLegend(false);
            c++;
        }
    }

}
