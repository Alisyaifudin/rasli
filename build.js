import { build } from "esbuild";
import { dirname, join, relative } from "path";
import { stat, mkdir, copyFile, readdir } from "fs/promises";
import { glob } from "glob";
import { filesize } from "filesize";
import { fileURLToPath } from "url";
import { buildScripts } from "./script-builder.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const srcDir = join(process.cwd(), "src");
const serverDir = join(process.cwd(), "build");

async function showSize(cwd) {
	// Get sizes of all built files
	const jsFiles = await glob("*.js", { cwd });
	const buildResults = [];

	for (const file of jsFiles) {
		const outputPath = join(cwd, file);
		const sizeInfo = await getFileSize(outputPath);
		buildResults.push({
			file: relative(cwd, outputPath),
			size: sizeInfo.size,
			formattedSize: sizeInfo.formatted,
		});
	}

	// Display build results
	console.log("\nBuild completed! File sizes:");
	console.table(
		buildResults.map((r) => ({
			File: r.file,
			Size: r.formattedSize,
		}))
	);

	const totalSize = buildResults.reduce((sum, r) => sum + r.size, 0);
	console.log(`\nTotal size: ${filesize(totalSize)} (${buildResults.length} files)`);
}

async function getFileSize(filePath) {
	try {
		const stats = await stat(filePath);
		return {
			size: stats.size,
			formatted: filesize(stats.size),
		};
	} catch (error) {
		console.error(`Error getting size for ${filePath}:`, error);
		return { size: 0, formatted: "0 B" };
	}
}

// Build options
const options = {
	platform: "browser",
	target: "es2015",
	format: "esm",
	bundle: true,
	minify: true,
};

async function buildPages() {
	try {
		// Ensure directories exist
		await mkdir(serverDir, { recursive: true });
		const file = join("./src/index.ts");
		await build({
			...options,
			entryPoints: [file],
			outfile: join(serverDir, "index.js"),
		});
		await showSize(serverDir);
	} catch (error) {
		console.error("Build failed:", error);
		process.exit(1);
	}
}

async function runBuild() {
	console.log("Build scripts");
	await buildScripts(true);
	return buildPages();
}

async function copyWorkerFile() {
	try {
		const sourcePath = join(__dirname, "_worker.js");
		const destPath = join(__dirname, "build", "_worker.js");

		await mkdir(dirname(destPath), { recursive: true });
		await copyFile(sourcePath, destPath);
		console.log("✅ Copied _worker.js to build");
	} catch (error) {
		console.error("❌ Error copying _worker.js:", error);
		throw error;
	}
}

async function copyAssets() {
	const sourceDir = "./public";
	const targetDir = "./build";

	try {
		// Create target directory if it doesn't exist
		await mkdir(targetDir, { recursive: true });

		// Get all files and directories in source
		const items = await readdir(sourceDir, { withFileTypes: true });

		for (const item of items) {
			const sourcePath = join(sourceDir, item.name);
			const targetPath = join(targetDir, item.name);

			if (item.isDirectory()) {
				// Recursively copy directory
				await copyDirectory(sourcePath, targetPath);
			} else {
				// Copy file
				await copyFile(sourcePath, targetPath);
				console.log(`Copied: ${sourcePath} → ${targetPath}`);
			}
		}

		console.log("✅ Assets copied successfully!");
	} catch (error) {
		console.error("❌ Error copying assets:", error);
		throw error;
	}
}

async function copyDirectory(source, target) {
	// Create target directory
	await mkdir(target, { recursive: true });

	// Get all items in source directory
	const items = await readdir(source, { withFileTypes: true });

	for (const item of items) {
		const sourcePath = join(source, item.name);
		const targetPath = join(target, item.name);

		if (item.isDirectory()) {
			// Recursively copy subdirectory
			await copyDirectory(sourcePath, targetPath);
		} else {
			// Copy file
			await copyFile(sourcePath, targetPath);
			console.log(`Copied: ${sourcePath} → ${targetPath}`);
		}
	}
}

async function main() {
	try {
		await runBuild(); // Step 1: Run the build
		await copyWorkerFile();
		await copyAssets();
		console.log("🚀 Build completed!");
	} catch (error) {
		console.error("❌ Build process failed:", error);
		process.exit(1);
	}
}

main();
