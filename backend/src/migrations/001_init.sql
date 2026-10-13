CREATE TABLE IF NOT EXISTS painters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  birth_year INT,
  death_year INT,
  bio_short TEXT
);

CREATE TABLE IF NOT EXISTS paintings (
  id TEXT PRIMARY KEY,
  painter_id TEXT NOT NULL REFERENCES painters(id),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  style_tag TEXT,
  docent_story TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS painting_difficulties (
  painting_id TEXT NOT NULL REFERENCES paintings(id),
  level TEXT NOT NULL CHECK (level IN ('25', '100', '400')),
  grid_cols INT NOT NULL,
  grid_rows INT NOT NULL,
  PRIMARY KEY (painting_id, level)
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  painting_id TEXT NOT NULL REFERENCES paintings(id),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('25', '100', '400')),
  placed_piece_ids JSONB NOT NULL DEFAULT '[]',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, painting_id, difficulty)
);

CREATE TABLE IF NOT EXISTS user_gallery (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  unlocked_rooms TEXT[] NOT NULL DEFAULT '{}',
  wallpaper_style TEXT,
  frame_style TEXT
);

CREATE TABLE IF NOT EXISTS packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_display TEXT,
  revenuecat_product_id TEXT,
  painting_ids TEXT[] NOT NULL DEFAULT '{}'
);
