package com.carffeine.carffeine.common.aop;

import com.carffeine.carffeine.config.datasource.DataSourceType;

public class UserHolder {

    private static final ThreadLocal<Context> userContext = new ThreadLocal<>();

    public static void clearDataSource() {
        getUserContext().setDataSourceType(null);
    }

    public static DataSourceType getDataSourceType() {
        DataSourceType dataSourceType = getUserContext().getDataSourceType();
        if (dataSourceType != null) {
            return dataSourceType;
        }
        return DataSourceType.SOURCE;
    }

    public static void setDataSourceType(DataSourceType target) {
        getUserContext().setDataSourceType(target);
    }

    private static Context getUserContext() {
        if (userContext.get() == null) {
            userContext.set(new Context());
        }
        return userContext.get();
    }

    private static class Context {
        private DataSourceType dataSourceType;

        public DataSourceType getDataSourceType() {
            return dataSourceType;
        }

        public void setDataSourceType(DataSourceType dataSourceType) {
            this.dataSourceType = dataSourceType;
        }
    }
}
