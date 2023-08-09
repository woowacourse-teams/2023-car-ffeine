package com.carffeine.carffeine.filter.fake;

import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorTypeRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeConnectorTypeRepository implements ConnectorTypeRepository {

    private final Map<Long, ConnectorType> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public boolean existsByConnectorKey(String key) {
        return map.values()
                .stream()
                .anyMatch(it -> it.getConnectorKey().equals(key));
    }

    @Override
    public List<ConnectorType> findAll() {
        return new ArrayList<>(map.values());
    }

    @Override
    public <S extends ConnectorType> List<S> saveAll(Iterable<S> connectorTypes) {
        List<S> savedConnectorType = new ArrayList<>();

        for (S connectorType : connectorTypes) {
            id++;
            map.put(id, connectorType);
            savedConnectorType.add(connectorType);
        }

        return savedConnectorType;
    }

    @Override
    public Optional<ConnectorType> findByConnectorKey(final String connectorKey) {
        return map.values()
                .stream()
                .filter(it -> it.getConnectorKey().equals(connectorKey))
                .findAny();
    }
}
