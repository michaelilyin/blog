CREATE TABLE users (
  id BIGSERIAL NOT NULL,
  login VARCHAR(32) NOT NULL,
  name VARCHAR(32),
  surname VARCHAR(32),
  email VARCHAR(32) NOT NULL,
  birthday DATE,

  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE roles (
  id BIGSERIAL NOT NULL,
  name VARCHAR(64),
  description TEXT,
  internal BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE permissions (
  id BIGSERIAL NOT NULL,
  name VARCHAR(64),
  code VARCHAR(64),
  description TEXT,
  CONSTRAINT permission_pley PRIMARY KEY (id)
)