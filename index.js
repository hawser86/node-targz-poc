const fs = require('fs');
const tar = require('tar-stream')
const zlib = require('zlib');

const inputStream = fs.createReadStream('files/greetings.tar.gz');

const gunzip = zlib.createGunzip();
const extract = tar.extract();

extract.on('entry', (header, stream, callback) => {
    console.log(header.name);
    stream.pipe(fs.createWriteStream('output/' + header.name));
    stream.on('end', callback);
});

extract.on('finish', () => {
    console.log('done');
});

inputStream.pipe(gunzip).pipe(extract);


