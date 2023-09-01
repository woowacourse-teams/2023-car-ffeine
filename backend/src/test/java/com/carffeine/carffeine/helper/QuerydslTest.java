package com.carffeine.carffeine.helper;

import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@DataJpaTest
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(value = {QuerydslConfig.class, ReviewQueryRepository.class, ReplyQueryRepository.class})
public @interface QuerydslTest {
}
