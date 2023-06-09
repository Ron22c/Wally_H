// * TensorFlow Stuff

const tf = require('@tensorflow/tfjs-node');
const coco_ssd = require('@tensorflow-models/coco-ssd');

// * Import routers
const recognizeRouter = require('./routers/recognize.route');
const itemRouter = require('./routers/item.route');


// * Server Stuff
const express = require('express');
const {config} = require('dotenv');

config();

// * Init Model
global.model = undefined;
(async () => {
  model = await coco_ssd.load({
    base: "mobilenet_v1",
  });
})();

// * Init Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/recognize", recognizeRouter);
app.use("/item", itemRouter);

app.get("/", (req, res) => {
    res.send("up");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});