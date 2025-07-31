import { build as _build } from "esbuild";
import { join, relative } from "path";
import { stat } from "fs/promises";
import { glob } from "glob";
import { filesize } from "filesize";

// Configuration
const srcDir = join(process.cwd(), "src/scripts");
const outDir = join(process.cwd(), "public/scripts");

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
const getOptions = (bundle, prod) => ({
	platform: "browser",
	target: "es2015",
	format: "esm",
	bundle,
	minify: prod,
	sourcemap: !prod,
});

export async function buildScripts(prod) {
	try {
		// Ensure directories exist
		// await fs.mkdir(shareOutDir, { recursive: true });
		// await fs.mkdir(outDir, { recursive: true });
		const all = await glob("*", { cwd: srcDir, withFileTypes: true });
		const dirs = all.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
		for (const dir of dirs) {
			if (dir === "share") {
				console.log("Building shared dependencies...");
				const srcdir = join(srcDir, dir);
				const outdir = join(outDir, dir);
				const files = await glob("*.ts", { cwd: srcdir });
				await _build({
					...getOptions(true, prod),
					entryPoints: files.map((f) => join(srcdir, f)),
					outdir,
				});
				await showSize(outdir);
			} else {
				const srcdir = join(srcDir, dir);
				await _build({
					...getOptions(true, prod),
					entryPoints: [join(srcDir, dir, "index.ts")],
					outfile: join(outDir, dir + ".js"),
					external: ["../share/*"],
					plugins: [
						{
							name: "rewrite-imports",
							setup(build) {
								build.onResolve({ filter: /^\.\.\/share\// }, (args) => {
									// Transform ../share/foo to ./share/foo
									const newPath = args.path.replace(/^\.\.\/share\//, "./share/");
									return { path: newPath, external: true };
								});
							},
						},
					],
				});
			}
		}

		// Build entry points
		console.log("Building others...");
		const entryFiles = (await glob("*.ts", { cwd: srcDir })).filter((f) => !f.startsWith("share/"));

		await _build({
			...getOptions(false, prod),
			entryPoints: entryFiles.map((f) => join(srcDir, f)),
			outdir: outDir,
		});
		await showSize(outDir);
	} catch (error) {
		console.error("Build failed:", error);
		process.exit(1);
	}
}
