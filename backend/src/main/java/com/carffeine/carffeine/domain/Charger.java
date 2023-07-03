package com.carffeine.carffeine.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Charger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String chargerId;

	// 추후에 enum으로 바꿀 수 있으면 바꾸기
	private String type;

	// issue 추후에 가격은 직접 조사 후 채우기
	// private String price;

	private LocalDateTime latestEndTime;

	private LocalDateTime latestStartTime;

	private LocalDateTime startTimeWhenCharging;

	private String state;

	private BigDecimal capacity;

	// 추후 enum으로 바꿀 수 있다면 바꾸기
	private String method;
}
