ALTER TABLE periodic_congestion DROP PRIMARY KEY;
ALTER TABLE periodic_congestion
ADD PRIMARY KEY (id, day_of_week);

ALTER TABLE periodic_congestion
    PARTITION BY LIST COLUMNS (day_of_week) (
    PARTITION p_monday VALUES IN ('MONDAY'),
    PARTITION p_tuesday VALUES IN ('TUESDAY'),
    PARTITION p_wednesday VALUES IN ('WEDNESDAY'),
    PARTITION p_thursday VALUES IN ('THURSDAY'),
    PARTITION p_friday VALUES IN ('FRIDAY'),
    PARTITION p_saturday VALUES IN ('SATURDAY'),
    PARTITION p_sunday VALUES IN ('SUNDAY')
    );
