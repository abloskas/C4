var express = require("express");

var app = express();

app.listen(8000, function() {
  console.log("listening on port 8000");
});

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/stylesheets"));

// app.set('views', __dirname + '/views');

// app.set('view engine', 'ejs');
app.get("/", function(request, response) {
  response.render("index");
});

// var http = require("http");
// var app =
// var server = http.createServer(function(request, response) {
//   response.writeHead(200, { "Content-type": "text/css" });
//   var fileContents = fs.readFileSync(
//     "./stylesheets/style.css",
//     { encoding: "utf8" },
//     function(err, data) {
//       if (!err) {
//         response.write(data);
//       } else {
//         console.log(err);
//       }
//     }
//   );
//   router.home(request, response);
//   router.user(request, response);
// });
// server.listen(8000);
