package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;

public enum Region {
    SEOUL("서울특별시", BigDecimal.valueOf(37.540705), BigDecimal.valueOf(126.956764)),
    INCHEON("인천광역시", BigDecimal.valueOf(37.469221), BigDecimal.valueOf(126.573234)),
    GWANGJU("광주광역시", BigDecimal.valueOf(35.126033), BigDecimal.valueOf(126.831302)),
    DAEGU("대구광역시", BigDecimal.valueOf(35.798838), BigDecimal.valueOf(128.583052)),
    ULSAN("울산광역시", BigDecimal.valueOf(35.519301), BigDecimal.valueOf(129.239078)),
    DAEJEON("대전광역시", BigDecimal.valueOf(36.321655), BigDecimal.valueOf(127.378953)),
    BUSAN("부산광역시", BigDecimal.valueOf(35.198362), BigDecimal.valueOf(129.053922)),
    GYEONGGI("경기도", BigDecimal.valueOf(37.567167), BigDecimal.valueOf(127.190292)),
    GANGWON("강원특별자치도", BigDecimal.valueOf(37.555837), BigDecimal.valueOf(128.209315)),
    CHUNGNAM("충청남도", BigDecimal.valueOf(36.557229), BigDecimal.valueOf(126.779757)),
    CHUNGBUK("충청북도", BigDecimal.valueOf(36.628503), BigDecimal.valueOf(127.929344)),
    GYEONGBUK("경상북도", BigDecimal.valueOf(36.248647), BigDecimal.valueOf(128.664734)),
    GYEONGNAM("경상남도", BigDecimal.valueOf(35.259787), BigDecimal.valueOf(128.664734)),
    JEONBUK("전라북도", BigDecimal.valueOf(35.716705), BigDecimal.valueOf(127.144185)),
    JEONNAM("전라남도", BigDecimal.valueOf(34.819400), BigDecimal.valueOf(126.893113)),
    JEJU("제주특별자치도", BigDecimal.valueOf(33.364805), BigDecimal.valueOf(126.542671)),
    ;

    private final String value;
    private final BigDecimal latitude;
    private final BigDecimal longitude;

    Region(String value, BigDecimal latitude, BigDecimal longitude) {
        this.value = value;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String value() {
        return value;
    }

    public BigDecimal latitude() {
        return latitude;
    }

    public BigDecimal longitude() {
        return longitude;
    }
}
