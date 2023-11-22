const fs = require('fs');

function deleteFolder(folderPath) {
    fs.rm(folderPath, { recursive: true }, (error) => {
        if (error) {
            return console.error("Error occured while deleting the folder", error);
        }
        console.info("Folder has been deleted successfully");
    });
};

function deleteFile(filePath) {
    fs.unlinkSync(filePath, { recursive: true }, (error) => {
        if (error) {
            return console.error("Error occured while deleting the file", error);
        }
        console.info("File has been deleted successfully");
    });
};

function copyFilesToRoot(sourceFolder, fileName) {

    const sourceFolderPath = `${sourceFolder}/${fileName}`

    fs.copyFile(sourceFolderPath, fileName, (error) => {
        if (error) {
            return console.error("Error occured while copying the file", error);
        }
        console.info("File has been copied successfully");
    });
};


// Exporting all the function
module.exports = { deleteFolder, copyFilesToRoot, deleteFile };

// This makes the all exported functions individually runnable through cmd
require('make-runnable/custom')({ printOutputFrame: false })