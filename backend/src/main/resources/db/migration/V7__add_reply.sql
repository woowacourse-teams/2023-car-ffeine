CREATE TABLE reply
(
    id         BIGINT AUTO_INCREMENT,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,
    content    VARCHAR(200) NOT NULL,
    is_deleted BOOLEAN      NOT NULL,
    member_id  BIGINT       NOT NULL,
    review_id  BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (review_id) REFERENCES review(id)
) ENGINE=InnoDB;
