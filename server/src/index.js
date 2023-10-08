import server from "./config/server.js";

const PORT = process.env.PORT;

const app = server.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log(`server running at http://localhost:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  app.close(() => {
    process.exit(1);
  });
});
