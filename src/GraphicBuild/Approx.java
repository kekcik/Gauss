package GraphicBuild;

import java.util.ArrayList;
import java.util.List;
import java.lang.Math.*;

import static GraphicBuild.Main.W0;
import static GraphicBuild.Main.lambda;

/**
 * Created by ivan on 27.12.16.
 */
public class Approx {


    //pre: ArrayList<Double> != null
    //post: ArrayList<Double> != null
    public static ArrayList<Double> getYCoords(ArrayList<Double> xCoords, boolean isPos, double w) {

        ArrayList<Double> result = new ArrayList<Double>();

        double tmp;

        for(int i = 0; i < xCoords.size(); i++) {
            tmp = w * Math.sqrt(1 + Math.pow(((2 * xCoords.get(i)) / (2 * Math.PI * Math.pow(w, 2) / lambda)), 2));
            if(isPos) {
                result.add(tmp);
            } else {
                result.add(-tmp);
            }
        }

        return result;
    }



}
