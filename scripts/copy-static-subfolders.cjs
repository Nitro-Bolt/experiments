const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const staticDir = path.resolve(rootDir, "static");
const buildDir = path.resolve(rootDir, "build");

const ensureDirectory = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const copyRecursive = (sourcePath, destinationPath) => {
  const stat = fs.statSync(sourcePath);

  if (stat.isDirectory()) {
    ensureDirectory(destinationPath);
    for (const entry of fs.readdirSync(sourcePath)) {
      copyRecursive(
        path.resolve(sourcePath, entry),
        path.resolve(destinationPath, entry)
      );
    }
    return;
  }

  ensureDirectory(path.dirname(destinationPath));
  fs.copyFileSync(sourcePath, destinationPath);
};

if (!fs.existsSync(staticDir) || !fs.existsSync(buildDir)) {
  process.exit(0);
}

for (const entry of fs.readdirSync(staticDir)) {
  if (entry === "index.html") {
    continue;
  }

  const sourcePath = path.resolve(staticDir, entry);
  const destinationPath = path.resolve(buildDir, entry);
  copyRecursive(sourcePath, destinationPath);
}
