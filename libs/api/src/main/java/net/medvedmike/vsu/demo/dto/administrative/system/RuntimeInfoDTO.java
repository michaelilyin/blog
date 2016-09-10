package net.medvedmike.vsu.demo.dto.administrative.system;

/**
 * Created by Michael Ilyin on 07.05.2016.
 */
public class RuntimeInfoDTO {
    private String name;
    private String specName;
    private String specVendor;
    private String specVersion;
    private String vmVendor;
    private String vmVersion;
    private long startTime;
    private long uptime;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setSpecName(String specName) {
        this.specName = specName;
    }

    public String getSpecName() {
        return specName;
    }

    public void setSpecVendor(String specVendor) {
        this.specVendor = specVendor;
    }

    public String getSpecVendor() {
        return specVendor;
    }

    public void setSpecVersion(String specVersion) {
        this.specVersion = specVersion;
    }

    public String getSpecVersion() {
        return specVersion;
    }

    public void setVmVendor(String vmVendor) {
        this.vmVendor = vmVendor;
    }

    public String getVmVendor() {
        return vmVendor;
    }

    public void setVmVersion(String vmVersion) {
        this.vmVersion = vmVersion;
    }

    public String getVmVersion() {
        return vmVersion;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setUptime(long uptime) {
        this.uptime = uptime;
    }

    public long getUptime() {
        return uptime;
    }

    @Override
    public String toString() {
        return "RuntimeInfoDTO{" +
                "name='" + name + '\'' +
                ", specName='" + specName + '\'' +
                ", specVendor='" + specVendor + '\'' +
                ", specVersion='" + specVersion + '\'' +
                ", vmVendor='" + vmVendor + '\'' +
                ", vmVersion='" + vmVersion + '\'' +
                ", startTime=" + startTime +
                ", uptime=" + uptime +
                '}';
    }
}
