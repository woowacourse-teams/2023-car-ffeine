package com.carffeine.carffeine.common.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class RepositoryDataSourceAspect {

    @Pointcut("execution(public * com.carffeine.carffeine.*Repository..*.*(..))")
    private void repository() {
    }

    @Around("repository() && @within(dataSource)")
    public Object handler(ProceedingJoinPoint joinPoint, DataSource dataSource) throws Throwable {
        UserHolder.setDataSourceType(dataSource.value());
        Object returnType = joinPoint.proceed();
        UserHolder.clearDataSource();
        return returnType;
    }
}
