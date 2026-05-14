import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { prisma, testDatabaseConnection } from './lib/prisma.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ msg: "Server startup" });
});
const startServer = async () => {
    console.log("Checking All The Apis");
    //======= Database Conection =======
    const isDataBaseConnectionOk = await testDatabaseConnection();
    if (!isDataBaseConnectionOk) {
        console.log("Error is Database Connection");
    }
    app.listen(PORT, () => {
        console.log(`Server Started at:${PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map