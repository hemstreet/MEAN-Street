const uuid = require('uuid4');

class FileService {

    uploadFileAndGetLocalUrl(file, field) {
        return new Promise((resolve, reject) => {
            if (!file) return reject();

            let extension = file.name.split('.').pop();
            let fileName = `${uuid()}.${extension}`;
            let photosDirectory = `${__dirname}/../../files`,
                filePath = `${photosDirectory}/${fileName}`;

            file.mv(filePath, (err) => {
                if (err) return reject(err);
                resolve(filePath);
            });
        });
    }

    uploadFilesAndGetUrls(files, model) {
        return new Promise((resolve, reject) => {
            let files = files;

            let promises = [];

            if (files) {
                promises = Object.keys(files).map(fileName => {
                    return this.uploadFileAndGetLocalUrl(files[fileName], fileName);
                });
            }
            else {
                promises.push()
            }

            Promise.all(promises).then((filePaths) => {

                if (filePaths && filePaths.length > 0) {
                    let _files = Object.keys(files);

                    filePaths.forEach((value, index) => {
                        model[_files[index]] = filePaths[index];
                    })
                }
                resolve(model);
            });
        });
    }
}

module.exports = new FileService();