const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const images = [
    '1_kaldi_idea.png',
    '2_kaldi_arrival.png',
    '3_kaldi_shopping.png',
    '4_omodi_heavy.png'
];

const inputDir = path.join(__dirname, 'kaldi_manga');
const outputVideo = path.join(inputDir, 'output.mp4');
const imageDuration = 5; // seconds per image

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
const command = `"${ffmpegPath}" -f concat -safe 0 -i "${listFile}" -vsync vfr -pix_fmt yuv420p "${outputVideo}" -y`;

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
