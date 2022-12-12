import { createReadStream, createWriteStream } from 'node:fs';
import csv from 'csvtojson';

const inputFilePath = './src/task1.2/files/input.csv'
const outputFilePath = './src/task1.2/files/output.json'


const readStream = createReadStream(inputFilePath);
const writeStream = createWriteStream(outputFilePath);

readStream.on('error', (err) => {
    console.error(err);
})

writeStream.on('error', (err) => {
    console.error(err)
})

readStream.on('end', () => {
    console.log('end');
})

readStream.pipe(csv()).pipe(writeStream);