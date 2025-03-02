module.exports.todosRepository = (pg) => {
  return {
    async getAll() {
      const result = await pg.query('SELECT * FROM todos');
      return result.rows;
    },
    async getById(id) {
      const result = await pg.query('SELECT * FROM todos WHERE id = $1', [id]);
      return result.rows[0];
    },
    async create(todo) {
      return pg.query(
        'INSERT INTO todos (name, index) VALUES ($1, $2) RETURNING *',
        [todo.name, todo.index],
      );
    },
    async updateById(id, todo) {
      return pg.query(
        'UPDATE todos SET name = $1, index = $2 WHERE id = $3 RETURNING *',
        [todo.name, todo.index, id],
      );
    },
    async deleteById(id) {
      return pg.query('DELETE FROM todos WHERE id = $1', [id]);
    },
    async upsertAll(todos) {
      return pg.query(
        'INSERT INTO todos (id, name, index) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = $2, index = $3',
        todos.map((todo) => [todo.id, todo.name, todo.index]),
      );
    }
  };
};
