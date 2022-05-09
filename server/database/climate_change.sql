-- Database: climate_change

-- DROP DATABASE IF EXISTS climate_change;

CREATE DATABASE climate_change
    WITH
    OWNER = daryakutovaya
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.propublica

-- DROP TABLE IF EXISTS public.propublica;

CREATE TABLE IF NOT EXISTS public.propublica
(
    county_name character varying COLLATE pg_catalog."default" NOT NULL,
    heat integer,
    wet_bulb integer,
    farm_crop_fields integer,
    sea_level_rise integer,
    large_fires integer,
    economic_damage integer,
    state character varying COLLATE pg_catalog."default",
    county_id bigint NOT NULL DEFAULT nextval('propublica_county_id_seq'::regclass),
    CONSTRAINT propublica_pkey PRIMARY KEY (county_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.propublica
    OWNER to daryakutovaya;
-- Index: county_namep_index

-- DROP INDEX IF EXISTS public.county_namep_index;

CREATE INDEX IF NOT EXISTS county_namep_index
    ON public.propublica USING btree
    (county_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

    -- Table: public.zips_ca

-- DROP TABLE IF EXISTS public.zips_ca;

CREATE TABLE IF NOT EXISTS public.zips_ca
(
    zipcode character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default",
    primary_city character varying COLLATE pg_catalog."default",
    acceptable_cities character varying COLLATE pg_catalog."default",
    unacceptable_cities character varying COLLATE pg_catalog."default",
    state character varying COLLATE pg_catalog."default",
    county_name character varying COLLATE pg_catalog."default",
    timezone character varying COLLATE pg_catalog."default",
    "area-codes" character varying COLLATE pg_catalog."default",
    latitude character varying COLLATE pg_catalog."default",
    longitude character varying COLLATE pg_catalog."default",
    estimated_population character varying COLLATE pg_catalog."default",
    CONSTRAINT zips_ca_pkey PRIMARY KEY (zipcode)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.zips_ca
    OWNER to daryakutovaya;
-- Index: county_namez_index

-- DROP INDEX IF EXISTS public.county_namez_index;

CREATE INDEX IF NOT EXISTS county_namez_index
    ON public.zips_ca USING btree
    (county_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: zip_index

-- DROP INDEX IF EXISTS public.zip_index;

CREATE INDEX IF NOT EXISTS zip_index
    ON public.zips_ca USING btree
    (zipcode COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;