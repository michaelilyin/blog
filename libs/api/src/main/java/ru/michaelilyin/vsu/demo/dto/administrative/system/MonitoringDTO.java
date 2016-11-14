package ru.michaelilyin.vsu.demo.dto.administrative.system;

/**
 * Created by Michael Ilyin on 07.05.2016.
 */
public class MonitoringDTO {
    private double loadAverage;
    private CPULoadDTO cpu;
    private MemoryLoadDTO memory;
    private RuntimeInfoDTO runtime;
    private String arch;
    private String version;
    private String name;

    public MonitoringDTO() {
    }

    public CPULoadDTO getCpu() {
        return cpu;
    }

    public void setCpu(CPULoadDTO cpu) {
        this.cpu = cpu;
    }

    public double getLoadAverage() {
        return loadAverage;
    }

    public void setLoadAverage(double loadAverage) {
        this.loadAverage = loadAverage;
    }

    public MemoryLoadDTO getMemory() {
        return memory;
    }

    public void setMemory(MemoryLoadDTO memory) {
        this.memory = memory;
    }

    public void setArch(String arch) {
        this.arch = arch;
    }

    public String getArch() {
        return arch;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getVersion() {
        return version;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public RuntimeInfoDTO getRuntime() {
        return runtime;
    }

    public void setRuntime(RuntimeInfoDTO runtime) {
        this.runtime = runtime;
    }

    @Override
    public String toString() {
        return "MonitoringDTO{" +
                "loadAverage=" + loadAverage +
                ", arch='" + arch + '\'' +
                ", version='" + version + '\'' +
                ", name='" + name + '\'' +
                ", \ncpu=" + cpu +
                ", \nmemory=" + memory +
                ", \nruntime=" + runtime +
                '}';
    }
}
