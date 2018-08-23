BEGIN;

DROP TABLE IF EXISTS accounts,trade_history CASCADE;

CREATE TABLE accounts(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(80) NOT NULL,
  USD NUMERIC(20,10) NOT NULL,
  BTC NUMERIC(20,10) NOT NULL,
  ETH NUMERIC(20,10) NOT NULL
);

CREATE TABLE trade_history(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts(id) NOT NULL,
  time_stamp BIGINT NOT NULL,
  start_currency TEXT NOT NULL CHECK (start_currency IN ('USD','BTC','ETH')),
  start_amount NUMERIC(20,10) NOT NULL,
  end_currency TEXT NOT NULL CHECK (end_currency IN ('USD','BTC','ETH')),
  end_amount NUMERIC(20,10) NOT NULL
);

COMMIT;
