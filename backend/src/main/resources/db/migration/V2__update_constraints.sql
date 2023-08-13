ALTER TABLE charge_station
    MODIFY address VARCHAR(200) NOT NULL,
    MODIFY company_name VARCHAR(70) NOT NULL,
    MODIFY contact VARCHAR(50) NOT NULL,
    MODIFY detail_location VARCHAR(200) NOT NULL,
    MODIFY is_parking_free BIT NOT NULL,
    MODIFY is_private BIT NOT NULL,
    MODIFY latitude DECIMAL(13, 7) NOT NULL,
    MODIFY longitude DECIMAL(13, 7) NOT NULL,
    MODIFY operating_time VARCHAR(70) NOT NULL,
    MODIFY station_name VARCHAR(120) NOT NULL,
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now();

ALTER TABLE charger
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY method VARCHAR(15),
    MODIFY type VARCHAR(20) NOT NULL;

ALTER TABLE charger_status
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY charger_condition VARCHAR(20);

ALTER TABLE charger_status
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY charger_condition VARCHAR(20);

ALTER TABLE fault_report
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now();

ALTER TABLE member
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY email VARCHAR(255) NOT NULL,
    ADD COLUMN name      VARCHAR(20) NOT NULL default '',
    ADD COLUMN image_url VARCHAR(100);

ALTER TABLE misinformation_detail_report
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY category VARCHAR(20) NOT NULL,
    MODIFY content VARCHAR(255) NOT NULL;


ALTER TABLE misinformation_report
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY is_checked BIT NOT NULL default false;

ALTER TABLE periodic_congestion
    MODIFY created_at DATETIME NOT NULL default now(),
    MODIFY updated_at DATETIME NOT NULL default now(),
    MODIFY congestion double precision NOT NULL,
    MODIFY start_time integer NOT NULL,
    MODIFY day_of_week varchar(10) not null,
    MODIFY station_id varchar(255) not null,
    MODIFY total_count integer not null,
    MODIFY use_count integer not null;

alter table member
    add constraint UK_mbmcqelty0fbrvxp1q58dn57t unique (email);

# alter table fault_report
#     add constraint FKtewf1joflpxta4w8677pyjok4
#         foreign key (member_id)
#             references member (id);
#
# alter table fault_report
#     add constraint FKyeyh5c6glrdyqft2pql2xfvm
#         foreign key (station_id)
#             references charge_station (station_id);
#
# alter table misinformation_detail_report
#     add constraint FKs0cb88kkwn5lfvy2h7xew5a86
#         foreign key (misinformation_report_id)
#             references misinformation_report (id);
#
# alter table misinformation_report
#     add constraint FKbjqikcjrdawwdfhfv4fr0lbre
#         foreign key (member_id)
#             references member (id);
#
# alter table misinformation_report
#     add constraint FK377eixc2kbdpc91wtikx53o2k
#         foreign key (station_id)
#             references charge_station (station_id);

