CREATE TABLE IF NOT EXISTS "core_privilege" (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  module TEXT,
  get_routes TEXT[],
  post_routes TEXT[],
  put_routes TEXT[],
  delete_routes TEXT[]
)
