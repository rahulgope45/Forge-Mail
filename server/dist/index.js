import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
const PORT = 3000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ msg: "Server startup" });
});
app.listen(PORT, () => {
    console.log(`Server Started at:${PORT}`);
});
//# sourceMappingURL=index.js.map