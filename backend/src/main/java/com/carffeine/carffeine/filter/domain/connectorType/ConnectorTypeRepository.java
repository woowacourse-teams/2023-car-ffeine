package com.carffeine.carffeine.filter.domain.connectorType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectorTypeRepository extends JpaRepository<ConnectorType, Long> {

    boolean existsByConnectorKey(String key);
}
