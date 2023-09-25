package com.carffeine.carffeine.common.aop;

import com.carffeine.carffeine.config.datasource.DataSourceType;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    DataSourceType value();
}
