create table if not exists city
(
    id              BIGINT AUTO_INCREMENT,
    name            VARCHAR(200)   NOT NULL,
    latitude        decimal(13, 7) NOT NULL,
    longitude       decimal(13, 7) NOT NULL,
    PRIMARY KEY (id),
) ENGINE=InnoDB;
