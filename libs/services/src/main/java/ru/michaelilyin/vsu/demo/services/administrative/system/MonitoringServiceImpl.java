package ru.michaelilyin.vsu.demo.services.administrative.system;

import com.sun.management.OperatingSystemMXBean;
import ru.michaelilyin.vsu.demo.annotation.system.audit.AuditError;
import ru.michaelilyin.vsu.demo.dto.administrative.system.CPULoadDTO;
import ru.michaelilyin.vsu.demo.dto.administrative.system.MemoryLoadDTO;
import ru.michaelilyin.vsu.demo.dto.administrative.system.MonitoringDTO;
import ru.michaelilyin.vsu.demo.dto.administrative.system.RuntimeInfoDTO;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 07.05.2016.
 */
//@Service
public class MonitoringServiceImpl {

    @AuditError
    public MonitoringDTO getSystemMonitoringInfo() {
        OperatingSystemMXBean os = ((OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean());
        RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();
        MonitoringDTO monitoring = new MonitoringDTO();
        monitoring.setLoadAverage(os.getSystemLoadAverage());
        monitoring.setArch(os.getArch());
        monitoring.setVersion(os.getVersion());
        monitoring.setName(os.getName());
        monitoring.setCpu(getCpuLoad(os));
        monitoring.setMemory(getMemoryLoad(os));
        monitoring.setRuntime(getRuntimeInfo(runtime));
        return monitoring;
    }

    private CPULoadDTO getCpuLoad(OperatingSystemMXBean os) {
        CPULoadDTO cpu = new CPULoadDTO();
        cpu.setTotalLoad(os.getSystemCpuLoad() * 100);
        cpu.setAppLoad(os.getProcessCpuLoad() * 100);
        cpu.setUsage(cpu.getAppLoad() * 100 / cpu.getTotalLoad());
        cpu.setCoreCount(os.getAvailableProcessors());
        return cpu;
    }

    private MemoryLoadDTO getMemoryLoad(OperatingSystemMXBean os) {
        MemoryLoadDTO mem = new MemoryLoadDTO();
        mem.setCommitted(os.getCommittedVirtualMemorySize());
        mem.setTotal(os.getTotalPhysicalMemorySize());
        mem.setFree(os.getFreePhysicalMemorySize());
        mem.setSwapTotal(os.getTotalSwapSpaceSize());
        mem.setSwapFree(os.getFreeSwapSpaceSize());
        return mem;
    }

    private RuntimeInfoDTO getRuntimeInfo(RuntimeMXBean runtime) {
        RuntimeInfoDTO ri = new RuntimeInfoDTO();
        ri.setName(runtime.getName());
        ri.setSpecName(runtime.getSpecName());
        ri.setSpecVendor(runtime.getSpecVendor());
        ri.setSpecVersion(runtime.getSpecVersion());
        ri.setVmVendor(runtime.getVmVendor());
        ri.setVmVersion(runtime.getVmVersion());
        ri.setStartTime(runtime.getStartTime());
        ri.setUptime(runtime.getUptime());
        return ri;
    }
}
