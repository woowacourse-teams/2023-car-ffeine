package com.carffeine.carffeine.domain.chargestation.charger;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChargerId implements Serializable {

    private String stationId;

    private String chargerId;
}
