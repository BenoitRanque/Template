INSERT INTO "core_privilege" (
  module,
  name,
  description,
  get_routes,
  post_routes,
  put_routes,
  delete_routes
)
VALUES (
  ${module},
  ${name},
  ${description},
  ${get_routes},
  ${post_routes},
  ${put_routes},
  ${delete_routes}
)