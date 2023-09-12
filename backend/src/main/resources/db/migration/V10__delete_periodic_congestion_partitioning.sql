ALTER TABLE periodic_congestion REMOVE PARTITIONING;

ALTER TABLE periodic_congestion DROP PRIMARY KEY;

ALTER TABLE periodic_congestion
    ADD PRIMARY KEY (id);
