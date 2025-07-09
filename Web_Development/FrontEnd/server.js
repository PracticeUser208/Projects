// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const express = require('express');
const app = express();

const port = 8085;
app.listen(port, () => {
    console.log(`Client server has started listening on port ${port}`);
});

app.use(express.static("public"));
