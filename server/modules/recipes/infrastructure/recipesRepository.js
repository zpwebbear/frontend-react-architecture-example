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

module.exports.recipesRepository = (pg) => {
  return {
    async getAll() {
      const result = await pg.query('SELECT * FROM recipes');
      return result.rows;
    },
    async getById(id) {
      const result = await pg.query('SELECT * FROM recipes WHERE id = $1', [id]);
      return result.rows[0];
    },
    async deleteById(id) {
      const result = await pg.query('DELETE FROM recipes WHERE id = $1', [id]);
      return result;
    },
    async upsertAll(recipes) {
      if (!recipes || recipes.length === 0) return;
      const values = expand(recipes.length, 5);
      const flatRecipes = recipes.flatMap((recipe) => [
        recipe.id,
        recipe.name,
        recipe.timesPerDay,
        recipe.duration,
        recipe.editable,
      ]);
      const result = await pg.query(
        `INSERT INTO recipes (id, name, "timesPerDay", duration, editable) 
        VALUES ${values} ON CONFLICT (id) DO 
        UPDATE SET name = EXCLUDED.name, "timesPerDay" = EXCLUDED."timesPerDay", duration = EXCLUDED.duration, editable = EXCLUDED.editable RETURNING *`,
        flatRecipes,
      );
      return result.rows;
    }
  };
};