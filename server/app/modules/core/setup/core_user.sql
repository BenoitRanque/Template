CREATE TABLE IF NOT EXISTS "core_user" (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT,
  name TEXT,
  about TEXT,
  roles UUID[]
)