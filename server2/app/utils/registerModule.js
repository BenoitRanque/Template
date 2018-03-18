export default function (module, app) {
  const router = express.Router()

  router.use()

  app.use(`/api/${module.name}`, router)
}