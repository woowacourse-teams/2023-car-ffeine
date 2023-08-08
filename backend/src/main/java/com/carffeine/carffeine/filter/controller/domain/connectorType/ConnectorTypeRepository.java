package com.carffeine.carffeine.filter.controller.domain.connectorType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectorTypeRepository extends JpaRepository<ConnectorType, Long> {

    boolean existsByConnectorKey(String key);
}
