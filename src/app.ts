import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("poyo");
});

async function main(): Promise<void> {
  app.listen(3000);
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
