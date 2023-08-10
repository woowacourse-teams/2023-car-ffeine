package com.carffeine.carffeine.filter.domain.connectorType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "connector_type")
@EqualsAndHashCode(of = {"id"})
@Entity
public class ConnectorType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String connectorKey;

    private String value;

    public static ConnectorType from(String connectorKey, String value) {
        return new ConnectorType(null, connectorKey, value);
    }
}
