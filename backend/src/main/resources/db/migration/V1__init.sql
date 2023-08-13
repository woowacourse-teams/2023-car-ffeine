
create table if not exists charge_station
(
    station_id      varchar(255)   not null
    primary key,
    created_at      datetime       null,
    updated_at      datetime       null,
    address         varchar(255)   null,
    company_name    varchar(255)   null,
    contact         varchar(255)   null,
    detail_location varchar(255)   null,
    is_parking_free bit            null,
    is_private      bit            null,
    latitude        decimal(13, 7) null,
    longitude       decimal(13, 7) null,
    operating_time  varchar(255)   null,
    private_reason  varchar(255)   null,
    station_name    varchar(255)   null,
    station_state   varchar(255)   null
    );

create index idx_station_coordination
    on charge_station (latitude, longitude, station_id);

create table if not exists  charger
(
    charger_id varchar(255)   not null,
    station_id varchar(255)   not null,
    created_at datetime       null,
    updated_at datetime       null,
    capacity   decimal(19, 2) null,
    method     varchar(255)   null,
    price      decimal(19, 2) null,
    type       varchar(255)   null,
    primary key (charger_id, station_id)
    );

create table if not exists  charger_status
(
    charger_id         varchar(255) not null,
    station_id         varchar(255) not null,
    created_at         datetime     null,
    updated_at         datetime     null,
    charger_condition  varchar(255) null,
    latest_update_time datetime     null,
    primary key (charger_id, station_id)
    );

create table if not exists fault_report
(
    id         bigint auto_increment
    primary key,
    created_at datetime     null,
    updated_at datetime     null,
    member_id  bigint       null,
    station_id varchar(255) null,
    constraint FKyeyh5c6glrdyqft2pql2xfvm
    foreign key (station_id) references charge_station (station_id)
    );

create table if not exists member
(
    id         bigint auto_increment
    primary key,
    created_at datetime     null,
    updated_at datetime     null,
    email      varchar(255) null,
    member_role      varchar(255) null
    );

create table if not exists  misinformation_report
(
    id         bigint auto_increment
    primary key,
    created_at datetime     null,
    updated_at datetime     null,
    is_checked bit          not null,
    member_id  bigint       null,
    station_id varchar(255) null,
    constraint FK377eixc2kbdpc91wtikx53o2k
    foreign key (station_id) references charge_station (station_id)
    );

create table if not exists  misinformation_detail_report
(
    id                       bigint auto_increment
    primary key,
    created_at               datetime     null,
    updated_at               datetime     null,
    category                 varchar(255) not null,
    content                  varchar(255) not null,
    misinformation_report_id bigint       not null,
    constraint FKs0cb88kkwn5lfvy2h7xew5a86
    foreign key (misinformation_report_id) references misinformation_report (id)
    );

create table if not exists  periodic_congestion
(
    id          varchar(255) not null
    primary key,
    created_at  datetime     null,
    updated_at  datetime     null,
    charger_id  varchar(255) null,
    congestion  double       not null,
    day_of_week varchar(255) null,
    start_time  int          null,
    station_id  varchar(255) null,
    total_count int          not null,
    use_count   int          not null
    );


