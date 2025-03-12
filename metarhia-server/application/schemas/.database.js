({
  name: 'sample',
  description: 'Sample database schema',
  version: 1,
  driver: 'pg',

  authors: [
    { name: 'Dmytro Brahinets', email: 'zp.babu@gmail.com' },
  ],

  connection: {
    host: '127.0.0.1',
    port: 5432,
    database: 'sample',
    user: 'postgres',
    password: 'example',
  },
})