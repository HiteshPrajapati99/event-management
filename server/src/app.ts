import express from 'express';
import bodyParser from 'body-parser';
import { checkDBConnection } from './services/prisma';
import routes from "./routes"
import cors from "cors"

const app = express();


checkDBConnection()

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use('/uploads', express.static('uploads')); // To serve uploaded images
app.use('/api', routes);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
