const express = require("express")
const app = express()

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
app.use(express.static("build"))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`React app listening at http://localhost:${port}`)
})
