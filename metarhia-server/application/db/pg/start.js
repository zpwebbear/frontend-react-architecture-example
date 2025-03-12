async () => {
    db.pg = new npm.pg.Pool(config.database);
}