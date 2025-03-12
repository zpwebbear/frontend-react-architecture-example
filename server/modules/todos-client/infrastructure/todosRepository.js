function expand(rowCount, columnCount, startAt = 1) {
  let index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      (v) =>
        `(${Array(columnCount)
          .fill(0)
          .map((v) => `$${index++}`)
          .join(', ')})`,
    )
    .join(', ');
}

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
    async deleteById(id) {
      const result = await pg.query('DELETE FROM todos WHERE id = $1', [id]);
      return result;
    },
    async upsertAll(todos) {
      if (!todos || todos.length === 0) return;
      const values = expand(todos.length, 3);
      const flatTodos = todos.flatMap((todo) => [
        todo.id,
        todo.name,
        todo.index,
      ]);

      const result = await pg.query(
        `INSERT INTO todos (id, name, index) VALUES ${values} ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, index = EXCLUDED.index RETURNING *`,
        flatTodos,
      );
      return result.rows;
    },
  };
};
