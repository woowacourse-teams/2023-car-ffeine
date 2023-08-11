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
import javax.persistence.Table;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@Table(name = "filter")
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

    public Filter(final String name, final FilterType filterType) {
        this.name = name;
        this.filterType = filterType;
    }

    public static Filter of(String name, String filterType) {
        FilterType type = FilterType.from(filterType);

        if (type.isCapacityType()) {
            String capacity = makeCapacity(name);
            return new Filter(capacity, type);
        }

        return new Filter(name, type);
    }

    private static String makeCapacity(String capacity) {
        if (capacity.endsWith(DECIMAL_SIGN)) {
            return capacity;
        }

        return capacity + DECIMAL_SIGN;
    }
}
