CREATE TABLE IF NOT EXISTS roles (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  about TEXT,
  rank INTEGER,
  privileges uuid[]
)
