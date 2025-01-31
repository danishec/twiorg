import fs from "fs";
import Uglify from "uglify-js";

var pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
var html = fs.readFileSync("src/storyFormat.html", "utf-8");
var js = Uglify.minify(fs.readFileSync("src/twiorg.js", "utf-8"));
html = html.replace("{{SCRIPT}}", js.code);

var outputJSON = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  description: pkg.description,
  proofing: false,
  source: html,
};

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

var outputString =
  "window.storyFormat(" + JSON.stringify(outputJSON, null, 2) + ");";
fs.writeFile("dist/format.js", outputString, function (err) {
  if (err) {
    console.log("Error building story format:", err);
  } else {
    console.log("Successfully built story format to dist/format.js");
  }
});
