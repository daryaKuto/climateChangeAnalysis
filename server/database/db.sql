-- Database: climate_change

-- DROP DATABASE IF EXISTS climate_change;
CREATE ROLE daryakutovaya WITH LOGIN SUPERUSER PASSWORD 'password'

CREATE DATABASE climate_change;
-- Table: public.propublica

DROP TABLE IF EXISTS propublica

CREATE TABLE IF NOT EXISTS propublica
(
    county_name character varying NOT NULL,
    heat integer,
    wet_bulb integer,
    farm_crop_fields integer,
    sea_level_rise integer,
    large_fires integer,
    economic_damage integer,
    state character varying,
    county_id bigint NOT NULL DEFAULT nextval('propublica_county_id_seq'::regclass),
    CONSTRAINT propublica_pkey PRIMARY KEY (county_id)
);

---TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS public.propublica
--     OWNER to daryakutovaya;
-- Index: county_namep_index

-- DROP INDEX IF EXISTS public.county_namep_index;

CREATE INDEX IF NOT EXISTS county_namep_index
    ON propublica

    -- Table: public.zips_ca

DROP TABLE IF EXISTS zips_ca;

CREATE TABLE IF NOT EXISTS zips_ca
(
    zipcode character varying NOT NULL,
    type character varying,
    primary_city character varying,
    acceptable_cities character varying,
    unacceptable_cities character varying,
    state character varying,
    county_name character varying,
    timezone character varying,
    "area-codes" character varying,
    latitude character varying,
    longitude character varying,
    estimated_population character varying,
    CONSTRAINT zips_ca_pkey PRIMARY KEY (zipcode)
)

-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS public.zips_ca
--     OWNER to daryakutovaya;
-- Index: county_namez_index

-- DROP INDEX IF EXISTS public.county_namez_index;

CREATE INDEX IF NOT EXISTS county_namez_index
    ON zips_ca;
-- Index: zip_index

-- DROP INDEX IF EXISTS public.zip_index;

CREATE INDEX IF NOT EXISTS zip_index
    ON zips_ca;