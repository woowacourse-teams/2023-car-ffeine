package com.carffeine.carffeine.config.datasource;

import com.carffeine.carffeine.common.aop.UserHolder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.Map;

@Slf4j
public class RoutingDataSource extends AbstractRoutingDataSource {

    public static RoutingDataSource from(Map<Object, Object> dataSources) {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        routingDataSource.setDefaultTargetDataSource(dataSources.get(DataSourceType.SOURCE));
        routingDataSource.setTargetDataSources(dataSources);
        return routingDataSource;
    }

    @Override
    protected Object determineCurrentLookupKey() {
        DataSourceType dataSourceType = UserHolder.getDataSourceType();
        if (dataSourceType != null) {
            log.info("dataSourceType = " + dataSourceType);
            return dataSourceType;
        }
        boolean readOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (readOnly) {
            log.info("Routing to REPLICA");
            return DataSourceType.REPLICA;
        }
        log.info("Routing to SOURCE");
        return DataSourceType.SOURCE;
    }
}
