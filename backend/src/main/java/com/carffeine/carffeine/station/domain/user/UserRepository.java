package com.carffeine.carffeine.station.domain.user;

import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Long> {

    User findById(Long id);
}
