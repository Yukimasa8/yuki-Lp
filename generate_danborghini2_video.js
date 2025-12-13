const { exec } = require('child_process');
const path = require('path');

const inputDir = path.join(__dirname, 'danborghini_manga2');
const outputVideo = path.join(inputDir, 'output.mp4');

const images = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png'];
const imageDuration = 5; // seconds (30s total for 6 images)

// Construct inputs
const inputs = images.map(img => `-loop 1 -t ${imageDuration} -i "${path.join(inputDir, img).replace(/\\/g, '/')}"`).join(' ');

// Construct filter complex to scale and pad all images to 1080x1080 (or common size) and concat
// We use 1080x1080 as a target square resolution which is good for manga
const filterComplex = images.map((_, i) =>
    `[${i}:v]scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2,setsar=1[v${i}];`
).join('') +
    images.map((_, i) => `[v${i}]`).join('') + `concat=n=${images.length}:v=1:a=0[v]`;

const ffmpegPath = 'C:\\Users\\YUKIMASA\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe';

const command = `"${ffmpegPath}" ${inputs} -filter_complex "${filterComplex}" -map "[v]" -c:v libx264 -pix_fmt yuv420p -y "${outputVideo}"`;

console.log('Generating video with robust command...');
console.log(command);

exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`ffmpeg output: ${stderr}`);
    }
    console.log(`Video generated successfully: ${outputVideo}`);
});
