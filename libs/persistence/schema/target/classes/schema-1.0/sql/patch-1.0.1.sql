CREATE TABLE users (
  id BIGSERIAL NOT NULL,
  login VARCHAR(32) NOT NULL,
  name VARCHAR(32),
  surname VARCHAR(32),
  email VARCHAR(32) NOT NULL,
  birthday DATE,

  CONSTRAINT user_pkey PRIMARY KEY (id)
);