const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const images = [
    '1_newyork.png',
    '2_no_money.png',
    '3_idea.png',
    '4_newyoku.png'
];

const inputDir = path.join(__dirname, 'instagram_post');
const outputVideo = 'output.mp4';
const imageDuration = 5; // seconds per image

// Create a temporary file list for ffmpeg
const listFile = 'images.txt';
let fileContent = '';

images.forEach(image => {
    // Escape backslashes for Windows paths in ffmpeg concat file
    const imagePath = path.join(inputDir, image).replace(/\\/g, '/');
    fileContent += `file '${imagePath}'\n`;
    fileContent += `duration ${imageDuration}\n`;
});

// Add the last file again without duration to ensure the last frame is shown correctly
// (ffmpeg concat demuxer quirk: last file needs to be specified but duration applies to previous entry, 
// actually for the last entry, the duration directive should be *after* the file line, 
// but standard practice often duplicates the last entry or relies on input options. 
// Let's stick to the standard format: file 'path' \n duration 3)
// Correct format for concat demuxer:
// file 'path'
// duration 5
// file 'path2'
// duration 5
// ...
// (Last file needs to be repeated or just have duration? Actually, for the last image to stay, 
// we might need to handle it carefully. But let's try the standard duration after file.)

// Re-building content to be safe
fileContent = '';
images.forEach(image => {
    const imagePath = path.join(inputDir, image).replace(/\\/g, '/');
    fileContent += `file '${imagePath}'\n`;
    fileContent += `duration ${imageDuration}\n`;
});
// Add the last file again to ensure the duration of the last clip is respected
const lastImage = path.join(inputDir, images[images.length - 1]).replace(/\\/g, '/');
fileContent += `file '${lastImage}'\n`;


fs.writeFileSync(listFile, fileContent);

const ffmpegPath = 'C:\\Users\\YUKIMASA\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe';
const command = `"${ffmpegPath}" -f concat -safe 0 -i ${listFile} -vsync vfr -pix_fmt yuv420p ${outputVideo} -y`;

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
