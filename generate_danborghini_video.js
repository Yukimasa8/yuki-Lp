const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const images = [
    '1.png',
    '2.png',
    '3.png',
    '4.png'
];

const inputDir = path.join(__dirname, 'danborghini_manga');
const outputVideo = path.join(inputDir, 'output.mp4');
const imageDuration = 5; // seconds per image (total 20s for 4 images)

// Create a temporary file list for ffmpeg
const listFile = path.join(inputDir, 'images.txt');
let fileContent = '';

images.forEach(image => {
    // Escape backslashes for Windows paths in ffmpeg concat file
    const imagePath = path.join(inputDir, image).replace(/\\/g, '/');
    fileContent += `file '${imagePath}'\n`;
    fileContent += `duration ${imageDuration}\n`;
});
// Add the last file again to ensure the duration of the last clip is respected
const lastImage = path.join(inputDir, images[images.length - 1]).replace(/\\/g, '/');
fileContent += `file '${lastImage}'\n`;

fs.writeFileSync(listFile, fileContent);

const ffmpegPath = 'C:\\Users\\YUKIMASA\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe';
// Added scale filter to ensure even dimensions (divisible by 2) which is required for some encoders
// Also added -pix_fmt yuv420p for compatibility
const command = `"${ffmpegPath}" -f concat -safe 0 -i "${listFile}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -vsync vfr -pix_fmt yuv420p "${outputVideo}" -y`;

console.log('Generating video...');
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`ffmpeg output: ${stderr}`);
    }
    console.log(`Video generated successfully: ${outputVideo}`);

    // Clean up list file
    fs.unlinkSync(listFile);
});
