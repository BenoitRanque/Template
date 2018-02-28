import pg from '../../../utils/pg'

pg.any(require('./core_user.sql')).then(() => {
  pg.any(require('./core_user_init.sql'), {username: 'admin', password: '$2a$12$qVnApQn8vHkeZ18ka9HZsufGh78zEZsdbLuXxKcQmbb2ygXS5c5ZW'})
})
pg.any(require('./core_role.sql'))
pg.any(require('./core_session.sql'))
pg.any(require('./core_privilege.sql')).then(() => {

  pg.any(require('./core_privilege_init'), {
    module: 'core',
    name: '',
    description: '',
    get_routes: [

    ],
    post_routes: [

    ],
    put_routes: [

    ],
    delete_routes: [

    ]
  })
})