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

module.exports.instructionsRepository = (pg) => {
  return {
    async getAll() {
      const result = await pg.query('SELECT * FROM instructions');
      return result.rows;
    },
    async getById(id) {
      const result = await pg.query('SELECT * FROM instructions WHERE id = $1', [id]);
      return result.rows[0];
    },
    async deleteById(id) {
      const result = await pg.query('DELETE FROM instructions WHERE id = $1', [id]);
      return result;
    },
    async deleteAll() {
      const result = await pg.query('DELETE FROM instructions');
      return result;
    },
    async upsertAll(instructions) {
      if (!instructions || instructions.length === 0) return;
      const values = expand(instructions.length, 5);
      const flatInstructions = instructions.flatMap((instruction) => [
        instruction.day,
        JSON.stringify(instruction.morning),
        JSON.stringify(instruction.afternoon),
        JSON.stringify(instruction.evening),
        JSON.stringify(instruction.night),
      ]);
      const result = await pg.query(
        `INSERT INTO instructions (day, morning, afternoon, evening, night) VALUES ${values} RETURNING *`,
        flatInstructions,
      );
      return result.rows;
    }
  };
}