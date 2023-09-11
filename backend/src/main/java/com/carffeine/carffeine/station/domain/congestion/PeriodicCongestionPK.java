package com.carffeine.carffeine.station.domain.congestion;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.DayOfWeek;

@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PeriodicCongestionPK implements Serializable {

    private String id;
    private DayOfWeek dayOfWeek;
}
