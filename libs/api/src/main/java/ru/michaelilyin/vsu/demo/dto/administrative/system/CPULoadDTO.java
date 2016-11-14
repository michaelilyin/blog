package ru.michaelilyin.vsu.demo.dto.administrative.system;

import java.util.List;

/**
 * Created by Michael Ilyin on 07.05.2016.
 */
public class CPULoadDTO {
    private double totalLoad;
    private double appLoad;
    private int coreCount;
    private double usage;

    public double getTotalLoad() {
        return totalLoad;
    }

    public void setTotalLoad(double totalLoad) {
        this.totalLoad = totalLoad;
    }

    public double getAppLoad() {
        return appLoad;
    }

    public void setAppLoad(double appLoad) {
        this.appLoad = appLoad;
    }

    public int getCoreCount() {
        return coreCount;
    }

    public void setCoreCount(int coreCount) {
        this.coreCount = coreCount;
    }

    public void setUsage(double usage) {
        this.usage = usage;
    }

    public double getUsage() {
        return usage;
    }

    @Override
    public String toString() {
        return "CPULoadDTO{" +
                "totalLoad=" + totalLoad +
                ", appLoad=" + appLoad +
                ", coreCount=" + coreCount +
                ", usage=" + usage +
                '}';
    }
}
