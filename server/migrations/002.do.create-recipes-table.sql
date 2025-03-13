CREATE TABLE IF NOT EXISTS recipes (
    id uuid PRIMARY KEY,
    name varchar(255) NOT NULL,
    "timesPerDay" int NOT NULL DEFAULT 1,
    duration int NOT NULL DEFAULT 1,    
    editable boolean NOT NULL DEFAULT false
);
