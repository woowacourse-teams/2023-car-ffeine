package com.carffeine.carffeine.domain;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class ChargeStation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String stationId;

	private String stationName;

	private String companyName;

	private boolean isParkingFree;

	private String operatingTime;

	private String detailLocation;

	private BigDecimal latitude;

	private BigDecimal longitude;

	private boolean isPrivate;

	private String contact;

	private String stationState;

	private String privateReason;

	@OneToMany(fetch = FetchType.EAGER)
	private List<Charger> chargers;
}
