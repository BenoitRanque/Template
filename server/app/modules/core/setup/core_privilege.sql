CREATE TABLE IF NOT EXISTS privileges (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  action_name TEXT,
  about TEXT,
  get_routes TEXT[],
  post_routes TEXT[],
  put_routes TEXT[],
  delete_routes TEXT[]
)
