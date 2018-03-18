CREATE TABLE IF NOT EXISTS core_role (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  about TEXT,
  rank INTEGER,
  privilege uuid[]
)
