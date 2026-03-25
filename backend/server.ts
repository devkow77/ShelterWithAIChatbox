import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
