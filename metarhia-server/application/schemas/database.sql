CREATE TABLE "Todo" (
  "todoId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "index" integer NOT NULL
);

ALTER TABLE "Todo" ADD CONSTRAINT "pkTodo" PRIMARY KEY ("todoId");
