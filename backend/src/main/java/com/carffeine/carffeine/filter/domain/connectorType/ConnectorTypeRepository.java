package com.carffeine.carffeine.filter.domain.connectorType;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ConnectorTypeRepository extends Repository<ConnectorType, Long> {

    boolean existsByConnectorKey(String key);

    List<ConnectorType> findAll();

    <S extends ConnectorType> List<S> saveAll(Iterable<S> entities);

    Optional<ConnectorType> findByConnectorKey(String connectorKey);
}
