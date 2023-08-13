create table review
(
    id         bigint       not null auto_increment,
    created_at timestamp,
    updated_at timestamp,
    content    varchar(255) not null,
    is_deleted bit          not null,
    ratings    integer      not null,
    member_id  bigint       not null,
    station_id varchar(255) not null,
    primary key (id)
) engine=InnoDB;

alter table review
    add constraint FKk0ccx5i4ci2wd70vegug074w1
        foreign key (member_id)
            references member (id);

alter table review
    add constraint FKhid46v3nj14ymk050qbpyrb5c
        foreign key (station_id)
            references charge_station (station_id);

