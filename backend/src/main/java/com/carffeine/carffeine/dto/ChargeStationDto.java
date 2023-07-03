package com.carffeine.carffeine.dto;

import java.util.List;

record ChargeStationDto(
	int numOfRows,
	String resultCode,
	int pageNo,
	List<ChargeStationInfo> items,
	int totalCount,
	String resultMsg
) {

	record ChargeStationInfo(
		String trafficYn,
		String delDetail,
		String delYn,
		String limitDetail,
		String limitYn,
		String note,
		String parkingFree,
		String kindDetail,
		String kind,
		String zscode,
		String zcode,
		String method,
		String output,
		String powerType,
		String nowTsdt,
		String lastTedt,
		String lastTsdt,
		String statUpdDt,
		String stat,
		String busiCall,
		String busiNm,
		String bnm,
		String busiId,
		String lng,
		String lat,
		String useTime,
		String location,
		String addr,
		String chgerType,
		String chgerId,
		String statId,
		String statNm
	) {
	}
}
