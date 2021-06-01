import express, { RequestHandler } from "express";
import cls from "cls-hooked";

const nsid = "request";
const ns = cls.createNamespace(nsid);

const app = express();

app.use((_, __, next) => {
  ns.run(() => next());
});

let id = 0;
app.use((_, __, next) => {
  if (ns && ns.active) {
    ns.set("id", id++);
  }
  next();
});

function log(message: string): void {
  const id = ns.get("id");
  console.log({
    id,
    message,
    time: new Date().getTime(),
  });
}

app.get("/", (_, res) => {
  log("start");
  setTimeout(() => {
    log("end");
    res.send("poyo");
  }, 1000 * Math.random());
});

async function main(): Promise<void> {
  app.listen(3000, () => console.log("http://localhost:3000"));
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
