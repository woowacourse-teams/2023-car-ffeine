ALTER TABLE periodic_congestion DROP PRIMARY KEY;

ALTER TABLE periodic_congestion
    ADD PRIMARY KEY (id, day_of_week),
    ADD INDEX idx_station_day_of_week (station_id, day_of_week);
