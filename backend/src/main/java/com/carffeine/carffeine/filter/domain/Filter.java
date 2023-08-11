package com.carffeine.carffeine.filter.domain;

import com.carffeine.carffeine.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@Entity
public class Filter extends BaseEntity {

    private static final String DECIMAL_SIGN = ".00";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private FilterType filterType;

    public static Filter of(String name, String filterType) {
        FilterType type = FilterType.from(filterType);

        if (type.isCapacities()) {
            String capacity = makeCapacity(name);
            return new Filter(null, capacity, type);
        }

        return new Filter(null, name, type);
    }

    private static String makeCapacity(String capacity) {
        if (capacity.endsWith(DECIMAL_SIGN)) {
            return capacity;
        }

        return capacity + DECIMAL_SIGN;
    }
}
