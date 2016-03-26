CREATE SEQUENCE seq_user_id
  START WITH 1
  INCREMENT BY 1
  NO CYCLE;

CREATE TABLE users (
  id BIGINT NOT NULL DEFAULT nextval('seq_user_id'),
  login VARCHAR(32) NOT NULL,
  name VARCHAR(32),
  surname VARCHAR(32),
  email VARCHAR(32) NOT NULL,
  birthday DATE,

  CONSTRAINT user_pkey PRIMARY KEY (id)
);