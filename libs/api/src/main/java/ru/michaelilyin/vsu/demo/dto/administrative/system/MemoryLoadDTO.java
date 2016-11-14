package ru.michaelilyin.vsu.demo.dto.administrative.system;

/**
 * Created by Michael Ilyin on 07.05.2016.
 */
public class MemoryLoadDTO {
    private long committed;
    private long total;
    private long free;
    private long swapTotal;
    private long swapFree;

    public void setCommitted(long committed) {
        this.committed = committed;
    }

    public long getCommitted() {
        return committed;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getTotal() {
        return total;
    }

    public void setFree(long free) {
        this.free = free;
    }

    public long getFree() {
        return free;
    }

    public void setSwapTotal(long swapTotal) {
        this.swapTotal = swapTotal;
    }

    public long getSwapTotal() {
        return swapTotal;
    }

    public void setSwapFree(long swapFree) {
        this.swapFree = swapFree;
    }

    public long getSwapFree() {
        return swapFree;
    }

    @Override
    public String toString() {
        return "MemoryLoadDTO{" +
                "committed=" + committed +
                ", total=" + total +
                ", free=" + free +
                ", swapTotal=" + swapTotal +
                ", swapFree=" + swapFree +
                '}';
    }
}
