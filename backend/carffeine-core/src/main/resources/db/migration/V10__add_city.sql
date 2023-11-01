create table if not exists city
(
    id              BIGINT AUTO_INCREMENT
    primary key,
    name            VARCHAR(255)   NOT NULL,
    latitude        decimal(13, 7) NOT NULL,
    longitude       decimal(13, 7) NOT NULL
    ) ENGINE=InnoDB;
