package net.medvedmike.vsu.demo.domain.util;

public abstract class PageSupport {
	
	protected Integer cnt;   // Количество записей в выборке
	protected Integer rnum;  // Номер записи
	
	public Integer getCnt() {
		return cnt;
	}

	public void setCnt(Integer cnt) {
		this.cnt = cnt;
	}

	public Integer getRnum() {
		return rnum;
	}

	public void setRnum(Integer rnum) {
		this.rnum = rnum;
	}
}
