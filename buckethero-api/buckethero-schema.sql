CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password    TEXT NOT NULL,

  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE lists (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NUll,
  emoji_unicode TEXT, 
  user_id     INTEGER NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE list_items (
  id          SERIAL PRIMARY KEY,
  list_id     INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  due_date    TIMESTAMP,
  location    TEXT,
  category    TEXT,
  price_point  INTEGER DEFAULT 0,
  is_completed  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE gallery_items (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT,
  category    TEXT
);

