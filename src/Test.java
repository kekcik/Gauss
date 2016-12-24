import org.knowm.xchart.*;


public class Test {

    public static void main(String[] args) throws Exception {

        double[] xData = new double[]{1.0, 2.9, 4.0};
        double[] yData = new double[]{2.0, 4.8, 3.9};

        XYChart  chart = QuickChart.getChart("Chart", "X", "Y", "y(x)", xData, yData);

        new SwingWrapper(chart).displayChart();

    }
}
