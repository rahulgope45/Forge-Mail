import express from 'express';
const PORT = 3000;
const app = express();
app.get('/', (req, res) => {
    res.send().json({ msg: "Server startup" });
});
app.listen(PORT, () => {
    console.log(`Server Started at:${PORT}`);
});
//# sourceMappingURL=index.js.map