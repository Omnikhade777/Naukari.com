const express=require('express');
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
const mainRouter=require("./routes/index")
const PORT=3000;

app.use("/api/v1",mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});