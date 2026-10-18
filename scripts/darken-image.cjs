const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../src/lib/assets/unsplash-bg.jpg');
const outputPath = path.join(__dirname, '../src/lib/assets/unsplash-bg-dark.jpg');

const image = sharp(inputPath);

image.modulate({ brightness: 0.7 }).toFile(outputPath, (err) => {
	if (err) {
		console.error('Error creating darker image:', err);
		process.exit(1);
	}
	console.log(`Created darker version: ${outputPath}`);
});
