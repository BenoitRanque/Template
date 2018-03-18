CREATE TABLE IF NOT EXISTS "core_privilege" (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  module TEXT,
  name TEXT,
  description TEXT,
  get_routes TEXT[] DEFAULT [],
  post_routes TEXT[] DEFAULT [],
  put_routes TEXT[] DEFAULT [],
  delete_routes TEXT[] DEFAULT []
)
