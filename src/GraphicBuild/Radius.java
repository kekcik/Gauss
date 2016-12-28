package GraphicBuild;

import static GraphicBuild.Main.W0;
import static GraphicBuild.Main.K;

public class Radius {

    public static double getRadius(double z) {
        if(z == 0) return 0;
        double r = z * (1 + Math.pow((K * W0 * W0 / (2 * z)), 2));
        return r;
    }

}
