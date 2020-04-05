DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER NOT NULL,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL
);
