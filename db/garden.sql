--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: garden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE garden (
    fname text,
    lname text,
    address text,
    id integer NOT NULL,
    email text,
    password text,
    admin text,
    currentservice integer,
    assignedtech text,
    serviceday text,
    servicetime text
);


ALTER TABLE garden OWNER TO postgres;

--
-- Name: garden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE garden_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE garden_id_seq OWNER TO postgres;

--
-- Name: garden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE garden_id_seq OWNED BY garden.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE services (
    servname text,
    servsummary text,
    servprice integer,
    id integer NOT NULL,
    servdescription text
);


ALTER TABLE services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE services_id_seq OWNED BY services.id;


--
-- Name: garden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY garden ALTER COLUMN id SET DEFAULT nextval('garden_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY services ALTER COLUMN id SET DEFAULT nextval('services_id_seq'::regclass);


--
-- Data for Name: garden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY garden (fname, lname, address, id, email, password, admin, currentservice, assignedtech, serviceday, servicetime) FROM stdin;
jason	wormack	390 N 100 E, Pleasant Grove, UT 84062	40	jason@gmail.com	jason	\N	2	2	monday	morning
keith	schermerhorn	350 E University Pkwy, Orem, UT 84058	35	keith@gmail.com	keith	\N	1	1	monday	morning
brian	schermerhorn	75 State St, Orem, UT 84058	34	brian@gmail.com	brian	\N	2	2	monday	afternoon
kyle	VanDeRiet	1330 300 N, Provo, UT 84606	3	kyle@gmail.com	kyle	\N	1	1	wednesday	evening
thai	tran	1080 900 E, Provo, UT 84604	2	thai@gmail.com	thai	\N	2	1	wednesday	afternoon
scott	schermerhorn	440 W 300 S, Provo, UT 84601	1	scott@gmail.com	scott	supersecret	3	1	wednesday	morning
robert	smith	98 Center St, Provo, UT 84601	37	robert@gmail.com	 robert	\N	3	2	friday	afternoon
nadine	sanderson	742 N 900 E, American Fork, UT 84003	38	nadine@gmail.com	nadine	\N	2	2	friday	evening
charles	sanderson	8044 Cooldige St	39	charles@gmail.com	charles	\N	2	2	friday	evening
henry	henry	henry	41	henry@gmail.om	henry	\N	\N	\N	\N	\N
\.


--
-- Name: garden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('garden_id_seq', 41, true);


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY services (servname, servsummary, servprice, id, servdescription) FROM stdin;
basic plus	The basic plus service is awesome, in addition to the inital set up, our technicians will also come out weekly to weed and maintain your garden with all the nutrients and protectionthey need, in a safe, organic approach	100	2	\N
basic super	The basic super plan includes everything from the basic, and basic plus plans, but also includes a greenhouse that we set up and maintain all year round so you can enjoy the harvest 365 days a year!	400	3	\N
basic	The basic service is our most popular service for garden minded foodies. It is a basic one time package where our skilled technicians come out and set up everything you need for a successful garden!	75	1	<h1>The basic plan </h1><p>is our most economic package, that gives your the experiance of working with the plants, but under our supervision, so you never have to worry about what to do! This plan comes with</p>
\.


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('services_id_seq', 4, true);


--
-- Name: garden garden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY garden
    ADD CONSTRAINT garden_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

