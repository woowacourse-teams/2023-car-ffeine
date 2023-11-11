create table filter
(
    id          bigint       not null auto_increment,
    created_at  timestamp not null ,
    updated_at  timestamp not null ,
    filter_type varchar(255) not null,
    name        varchar(255) not null,
    primary key (id)
) engine=InnoDB;

create table member_filter
(
    id         bigint not null auto_increment,
    created_at timestamp not null ,
    updated_at timestamp not null ,
    filter_id  bigint not null,
    member_id  bigint not null,
    primary key (id)
) engine=InnoDB;

alter table filter
    add constraint UK_ksjv0nt86b05wtkf62sxgj86a unique (name);

alter table member_filter
    add constraint FKdj04kecwcd5sefx89c43bm85k
        foreign key (filter_id)
            references filter (id)
            on delete cascade;

alter table member_filter
    add constraint FKkcpov56k5me8j1bpsljabgvpe
        foreign key (member_id)
            references member (id)
            on delete cascade;
