CREATE TABLE IF NOT EXISTS instructions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    day int NOT NULL,
    morning jsonb DEFAULT '{}'::jsonb,
    afternoon jsonb DEFAULT '{}'::jsonb,
    evening jsonb DEFAULT '{}'::jsonb,
    night jsonb DEFAULT '{}'::jsonb
);