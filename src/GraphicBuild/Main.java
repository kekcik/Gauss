package GraphicBuild;

import org.knowm.xchart.*;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.Styler;


import java.awt.*;
import java.util.ArrayList;
import java.util.Scanner;

import static GraphicBuild.Radius.getRadius;
import static org.knowm.xchart.style.markers.SeriesMarkers.NONE;

public class Main implements ExampleChart<XYChart> {

    public static double lambda;
    public static double W0;
    public static int N;
    public static double K;
    public static int lensPos;
    private static double focus;

    private static ArrayList<Double> xMass;
    private static ArrayList<Double> yArrayPos;
    private static ArrayList<Double> yArrayNeg;

    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        System.out.println("How much length of the wave?");
        lambda = in.nextDouble();

        System.out.println("How much lenght of resonator?");
        W0 = in.nextDouble();

        System.out.println("What is our area?");
        N = in.nextInt();

        System.out.println("Where is our lense?");
        lensPos = in.nextInt();

        System.out.println("How much is focus?");
        focus = in.nextDouble();

        K = (2 * Math.PI) / lambda;


        xMass = getXCoords(-N, lensPos);
        yArrayPos = Approx.getYCoords(xMass, true, W0);
        yArrayNeg = Approx.getYCoords(xMass, false, W0);

        ExampleChart<XYChart> exampleChart = new Main();
        XYChart chart = exampleChart.getChart();

        new SwingWrapper<XYChart>(chart).displayChart();


    }

    @Override
    public XYChart getChart() {
        XYChart chart = new XYChartBuilder().width(800).height(600).title("Gaussian beam").xAxisTitle("Z").yAxisTitle("X").theme(Styler.ChartTheme.GGPlot2).build();

        System.out.println(xMass.size());
        chart.addSeries("Gaussian beam", xMass, yArrayPos).setMarker(NONE).setLineColor(Color.RED);
        chart.addSeries("2nd", xMass, yArrayNeg).setMarker(NONE).setLineColor(Color.RED).setShowInLegend(false);

        chart.addSeries("lense", new double[]{xMass.get(xMass.size() - 1), xMass.get(xMass.size() - 1)}, new double[]{yArrayPos.get(yArrayPos.size() - 1), yArrayNeg.get(yArrayNeg.size() - 1)}).setMarker(NONE).setLineColor(Color.BLUE);

        double x = xMass.get(xMass.size() - 1);
        double radius = getRadius(x);
        System.out.println("radius = " + radius);
        double M = (Math.abs(focus / (lensPos - focus))) * (1 / (Math.sqrt(1 + Math.pow(Math.PI * W0 * W0 / (lambda * (lensPos - focus)), 2))));
        double newW0 = M * W0;
        double newZ, newX;
        if (lensPos - focus > 0) {
            newZ = focus + M * M * (lensPos - focus);
            newX = lensPos + newZ;
            xMass = getXCoords(lensPos, (int) (newZ * 2) + lensPos);
            yArrayPos = getNewYCoords(xMass, true, newW0, newX);
            yArrayNeg = getNewYCoords(xMass, false, newW0, newX);
        } else if (lensPos - focus < 0) {
            newW0 = yArrayPos.get(yArrayPos.size() - 1);
            xMass = getXCoords(lensPos, (2 * lensPos) + lensPos + 20);
            yArrayPos = getNewYCoords(xMass, true, newW0, lensPos);
            yArrayNeg = getNewYCoords(xMass, false, newW0, lensPos);
        } else {
            double tmp1, tmp2;
            xMass = getXCoords(lensPos, lensPos + 1);
            tmp1 = yArrayPos.get(yArrayPos.size() - 1);
            tmp2 = yArrayNeg.get(yArrayNeg.size() - 1);
            yArrayPos = new ArrayList<Double>();
            yArrayPos.add(tmp1);
            yArrayPos.add(tmp1);
            yArrayNeg = new ArrayList<Double>();
            yArrayNeg.add(tmp2);
            yArrayNeg.add(tmp2);
        }

        chart.addSeries("4st", xMass, yArrayPos).setMarker(NONE).setLineColor(Color.RED).setShowInLegend(false);
        chart.addSeries("5nd", xMass, yArrayNeg).setMarker(NONE).setLineColor(Color.RED).setShowInLegend(false);


        return chart;
    }

    private static ArrayList<Double> getXCoords(int n, int x) {
        System.out.println("n = " + n + " x = " + x);
        ArrayList<Double> result = new ArrayList<>();
        for (double i =  n; i <= x; i += 0.1) {
            result.add(i);
        }
        return result;
    }

    private double getW(double x) {
        return W0 * Math.sqrt(1 + Math.pow(((2 * x) / (2 * Math.PI * Math.pow(W0, 2) / lambda)), 2));
    }

    public static ArrayList<Double> getNewYCoords(ArrayList<Double> xCoords, boolean isPos, double w, double x) {

        ArrayList<Double> result = new ArrayList<>();

        double tmp;

        for (int i = 0; i < xCoords.size(); i++) {
            tmp = w * Math.sqrt(1 + Math.pow(((2 * (xCoords.get(i) - x)) / (2 * Math.PI * Math.pow(w, 2) / lambda)), 2));
            if (isPos) {
                result.add(tmp);
            } else {
                result.add(-tmp);
            }
        }

        return result;
    }

}
