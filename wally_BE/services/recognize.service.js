// * TensorFlow Stuff
const tf = require("@tensorflow/tfjs-node");
const busboy = require("busboy");

class RecognizeService {
    static async predict(req, res) {
        if (!model) {
          res.status(500).send("Model is not loaded yet!");
          return;
        }
      
        // * Create a Busboy instance
        const bb = busboy({ headers: req.headers });
        bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
          const buffer = [];
          file.on("data", (data) => {
            buffer.push(data);
          });
          file.on("end", async () => {
            // * Run Object Detection
            const image = tf.node.decodeImage(Buffer.concat(buffer));
            const predictions = await model.detect(image, 3, 0.25);
            res.json(predictions);
          });
        });
        req.pipe(bb);
      };
}


module.exports = RecognizeService;