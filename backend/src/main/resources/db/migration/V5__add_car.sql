-- car 테이블
CREATE TABLE IF NOT EXISTS car (
                                   id BIGINT NOT NULL AUTO_INCREMENT,
                                   created_at TIMESTAMP NOT NULL,
                                   updated_at TIMESTAMP NOT NULL,
                                   name VARCHAR(64) NOT NULL,
    vintage VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
    ) ENGINE=InnoDB;

-- car_filter 테이블
CREATE TABLE IF NOT EXISTS car_filter (
                            id BIGINT NOT NULL AUTO_INCREMENT,
                            created_at TIMESTAMP NOT NULL,
                            updated_at TIMESTAMP NOT NULL,
                            car_id BIGINT NOT NULL,
                            filter_id BIGINT NOT NULL,
                            PRIMARY KEY (id)
) ENGINE=InnoDB;

-- member_car 테이블
CREATE TABLE IF NOT EXISTS member_car (
                            id BIGINT NOT NULL AUTO_INCREMENT,
                            created_at TIMESTAMP NOT NULL,
                            updated_at TIMESTAMP NOT NULL,
                            car_id BIGINT NOT NULL,
                            member_id BIGINT NOT NULL,
                            PRIMARY KEY (id)
) ENGINE=InnoDB;

-- car_filter 테이블의 외래 키 제약 조건
ALTER TABLE car_filter
    ADD CONSTRAINT FK_car_filter_car_id
        FOREIGN KEY (car_id) REFERENCES car (id) ON DELETE CASCADE;

ALTER TABLE car_filter
    ADD CONSTRAINT FK_car_filter_filter_id
        FOREIGN KEY (filter_id) REFERENCES filter (id) ON DELETE CASCADE;

-- member_car 테이블의 외래 키 제약 조건
ALTER TABLE member_car
    ADD CONSTRAINT FK_member_car_car_id
        FOREIGN KEY (car_id) REFERENCES car (id);

ALTER TABLE member_car
    ADD CONSTRAINT FK_member_car_member_id
        FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE;
