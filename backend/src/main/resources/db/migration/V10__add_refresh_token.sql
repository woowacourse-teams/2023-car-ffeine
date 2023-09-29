
create table if not exists refresh_token
(
    id         bigint       not null auto_increment,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    member_id  bigint       not null,
    token_id   varchar(255) not null,
    primary key (id)
) engine=InnoDB;
