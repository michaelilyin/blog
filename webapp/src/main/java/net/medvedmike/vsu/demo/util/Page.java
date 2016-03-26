package net.medvedmike.vsu.demo.util;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

public class Page<Entity> {

	@JsonProperty("total")
	private int totalPagesNumber = 0;

	@JsonProperty("page")
	private int currentPage = 0;

	@JsonProperty("records")
	private int totalDBRecords = 0;

	@JsonProperty("rows")
	private Collection<Entity> object = null;

	public Page() {
	}

	public Page(Collection<Entity> rows, int totalDBRecords, int rowsOnPage, int currentPage) {
		double pageCeil =  Math.ceil((float)totalDBRecords / rowsOnPage);

		this.totalPagesNumber = (pageCeil == 0) ? 1 : (int)Math.round(pageCeil);
		this.currentPage      = currentPage;
		this.totalDBRecords   = totalDBRecords;
		this.object           = rows;
	}
	
	public Page(int totalDBRecords, int rowsOnPage, int currentPage) {
		double pageCeil =  Math.ceil((float)totalDBRecords / rowsOnPage);

		this.totalPagesNumber = (pageCeil == 0) ? 1 : (int)Math.round(pageCeil);
		this.currentPage      = currentPage;
		this.totalDBRecords   = totalDBRecords;
	}

	public int getTotalPagesNumber() {
		return totalPagesNumber;
	}

	public void setTotalPagesNumber(int totalPagesNumber) {
		this.totalPagesNumber = totalPagesNumber;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalDBRecords() {
		return totalDBRecords;
	}

	public void setTotalDBRecords(int totalDBRecords) {
		this.totalDBRecords = totalDBRecords;
	}

	public Collection<Entity> getObject() {
		return object;
	}

	public void setObject(Collection<Entity> rows) {
		this.object = rows;
	}

}
