package com.carffeine.carffeine.filter.controller.dto.connectorType;

import com.carffeine.carffeine.filter.controller.domain.connectorType.ConnectorType;

public record ConnectorTypeResponse(String connectorKey, String value) {

    public static ConnectorTypeResponse of(ConnectorType connectorType) {
        return new ConnectorTypeResponse(connectorType.getConnectorKey(), connectorType.getValue());
    }
}
