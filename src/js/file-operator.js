class ContextMenu {
    constructor(fileOp) {
        this.fileOp = fileOp;
    }
    setup() {
        document.body.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            let constextMenu = document.querySelector('.file__contextmenu');
            if(constextMenu !== null) {
                document.body.removeChild(constextMenu);
            }
            const clikedItemClass = e.target.getAttribute("class");

            if(['mainSection__file', 'mainSection__file-box', 'mainSection__file-name', 'mainSection__file-filesize', 'mainSection__file-uploadTime'].indexOf(clikedItemClass) >= 0) {
                let fileId = e.target.closest(".mainSection__file").id;
                if(fileId.substring(0,4) == "file")
                  fileId = fileId.substring(5);
                else
                  fileId = fileId.substring(7);
                constextMenu = this.createCM_DOMel(e.clientX, e.clientY,fileId);
                document.body.appendChild(constextMenu);
            }
        });
        document.addEventListener('click', (e) => {
            e.preventDefault();
            let constextMenu = document.querySelector('.file__contextmenu');
            if(constextMenu !== null) {
                document.body.removeChild(constextMenu);
            }
        });
    }
    createCM_DOMel(posX, posY, fileid) {
        const contextmenu = document.createElement('div');
        contextmenu.classList.add('file__contextmenu');
        contextmenu.id = `CM_file_${fileid}`;
        contextmenu.innerHTML = `<button class="file__contextmenu-item" id="file__cm-moveBtn">
                <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
                <span class="file__contextmenu-btn-text">Move</span>
            </button>
            <button class="file__contextmenu-item" id="file__cm-downloadBtn">
                <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
                <span class="file__contextmenu-btn-text">Download</span>
            </button>
            <button class="file__contextmenu-item" id="file__cm-deleteBtn">
                <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
                <span class="file__contextmenu-btn-text">Delete</span>
            </button>
            <button class="file__contextmenu-item" id="file__cm-shareBtn">
                <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
                <span class="file__contextmenu-btn-text">Share...</span>
            </button>`;
        const downloadBtn = contextmenu.querySelector('#file__cm-downloadBtn');
        const deleteBtn = contextmenu.querySelector('#file__cm-deleteBtn');
        const shareBtn = contextmenu.querySelector('#file__cm-shareBtn');
        shareBtn.addEventListener('click',(e) => {
            e.preventDefault();
            this.fileOp.displayShareDialog(fileid);
        })
        deleteBtn.addEventListener('click',(e) => {
            e.preventDefault();
            this.fileOp.deleteFile(fileid);
        })
        contextmenu.style.top = posY + "px";
        contextmenu.style.left = posX + "px";
        return contextmenu;
    }
}

class FileOperator {
    // Properties
    files = [];

    //Constructors
    constructor() {
        this.loadFiles();
        this.contextMenu = new ContextMenu(this);
        this.contextMenu.setup();
    }
    // Methods 
    
    // Load files 
    getFilesFromServer() {
      // This will be replaced with request to api 
      this.files = {
          "_id": "0",
          "name": "root",
          "type" : "directory",
          "created": 637237873697270785,
          "directories": [
            {
              "_id": "",
              "name": "RecycleBin",
              "created": 637237873697206347,
              "shared" : "true",
              "type" : "directory",
              "directories": [],
              "files": [
                {
                "_id": "1",
                  "name": "TestFile.dat",
                  "created": "30-04-2020 15:19",
                  "size": "637237873697270785"
                }
              ]
            },
            {
              "_id": 5,
              "name": "Files",
              "created": 0,
              "type" : "directory",
              "directories": [
                {
                  "_id": "6",
                  "type" : "directory",
                  "name": "Folder ____ Xg4tOy+Hxj8=bvTi3zZ64T8=fh115r6O6j8=",
                  "created": 0,
                  "directories": [],
                  "files": [
                    {
                      "_id": "nEajLE6j0T8=",
                      "name": "file_3",
                      "created": 637237873697258132,
                      "size": 0
                    }
                  ]
                },
                {
                  "_id": "7",
                  "type" : "directory",
                  "name": "Folder ____ 4YttrfDF5j8=",
                  "created": 0,
                  "directories": [],
                  "files": [
                    {
                      "_id": "Folder ____ 4YttrfDF5j8=",
                      "name": "file_4",
                      "created": 637237873697258158,
                      "size": 0
                    }
                  ]
                },
                {
                  "_id": "8",
                  "type" : "directory",
                  "name": "Folder ____ 5VG8QfIo7j8=",
                  "created": 0,
                  "directories": [],
                  "files": [
                    {
                      "_id": "wfI7eWD5zT8=",
                      "name": "file_5",
                      "created": 637237873697258189,
                      "size": 0
                    }
                  ]
                },
              ],
              "files": [
                {
                  "_id": "1",
                  "type" : "file",
                  "name": "TestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaFile.dat",
                  "created": "0",
                  "size": "237810"
                },
                {
                  "_id": "2",
                  "type" : "file",
                  "name": "TestFile2.dat",
                  "created": "0",
                  "size": "537237810"
                },
                {
                  "_id": "3",
                  "type" : "file",
                  "name": "TestFile3.dat",
                  "created": "0",
                  "size": "37810"
                },
                {
                  "_id": "4",
                  "type" : "file",
                  "name": "TestFile4.dat",
                  "created": "0",
                  "size": "637237810"
                }
              ]
            },
            {
              "_id": null,
              "name": "2",
              "created": 0,
              "directories": [
                {
                  "_id": null,
                  "name": "4tYG3",
                  "created": 0,
                  "directories": [
                    {
                      "_id": null,
                      "name": "xj8=",
                      "created": 0,
                      "directories": [],
                      "files": [
                        {
                          "_id": "d5EotrtIxD8=",
                          "name": "file_2",
                          "created": 637237873697257865,
                          "size": 0
                        }
                      ]
                    }
                  ],
                  "files": []
                }
              ],
              "files": []
            },
            
            {
              "_id": null,
              "name": "0",
              "created": 0,
              "directories": [],
              "files": []
            },
            {
              "_id": null,
              "name": "00232451",
              "created": 0,
              "directories": [],
              "files": []
            }
          ],
          "files": []
      };
    }
    getFileData(id) {
      console.log(id);
      let directory = this.files.directories[1];
        for (let index = 0; index < directory.files.length; index++) {
          const el = directory.files[index];
          if(el._id === id)
            return el;
        }
        for (let index = 0; index < directory.files.length; index++) {
          const el = directory.directories[index];
          if(el._id === id)
            return el;
        }
        return null;
    }
    loadFilesToView(file_name) {
      var len = this.files.directories.length;
      var i=0;
      for  (i;i<len;++i)
      {
        if(this.files.directories[i].name==file_name)
          break;
      }
      const mainFolder = this.files.directories[i];
      const fileList = document.querySelector("#fileList");

      mainFolder.directories.forEach(file => {
        const fileBox = this.createFolderTemplate(file);
        fileList.appendChild(fileBox);
      })
      mainFolder.files.forEach(file => {
        const fileBox = this.createFileTemplate(file);
        fileList.appendChild(fileBox);
      });
    }
    createFolderTemplate(folder) {
      const folderElement = document.createElement('li');
      folderElement.id = `folder_${folder._id}`;
      folderElement.classList.add('mainSection__file');
      //fileElement.draggable=true;
      let foldername = folder.name.substring(0, Math.min(folder.name.length,40));
      if(foldername.length < folder.name.length)
        foldername = foldername + "...";
      folderElement.innerHTML = `<div class="mainSection__file-box" >
                                  <span><i class="mainSection__file-icon icon-folder-1"></i></span>
                                  <span class="mainSection__file-name mainSection__file--cell">
                                    ${foldername}
                                  </span>
                                  <span class="mainSection__file-uploadTime mainSection__file--cell">
                                    ${this.convertUploadDate(folder.created)}
                                  </span>
                                  <span class="mainSection__file-filesize mainSection__file--cell">
                                    -
                                  </span>
                                  
                                </div>`;
      return folderElement;
    }
    createFileTemplate(file){
      const fileElement = document.createElement('li');
      fileElement.id = `file_${file._id}`;
      fileElement.classList.add('mainSection__file');
      //fileElement.draggable=true;
      let filename = file.name.substring(0, Math.min(file.name.length,40));
      if(filename.length < file.name.length)
        filename = filename + "...";
      fileElement.innerHTML = `<div class="mainSection__file-box" >
                                  <span><i class="mainSection__file-icon icon-doc-inv"></i></span>
                                  <span class="mainSection__file-name mainSection__file--cell">
                                    ${filename}
                                  </span>
                                  <span class="mainSection__file-uploadTime mainSection__file--cell">
                                    ${this.convertUploadDate(file.created)}
                                  </span>
                                  <span class="mainSection__file-filesize mainSection__file--cell">
                                    ${this.convertFileSize(file.size)}
                                  </span>
                                  
                                </div>`;
      return fileElement;
    }
    loadFiles() {
      this.getFilesFromServer();
      this.loadFilesToView("Files");
    }
    convertFileSize(sizeInBytes) {
      if(sizeInBytes < 1024)
        sizeInBytes = sizeInBytes + " B";
      else if(sizeInBytes > 1024 && sizeInBytes < Math.pow(1024,2))
        sizeInBytes = Math.round(sizeInBytes / 1024) + " KB";
      else if(sizeInBytes > Math.pow(1024,2) && sizeInBytes < Math.pow(1024,3))
        sizeInBytes = Math.round(sizeInBytes / Math.pow(1024,2)) + " MB";
      else
        sizeInBytes = Math.round(sizeInBytes / Math.pow(1024,3)) + " GB";
      return sizeInBytes;
    }
    convertUploadDate(uploadDate) {
      const date = new Date(uploadDate);
      let day = (date.getDay() > 9) ? date.getDay() : "0" + date.getDay();
      let month = (date.getMonth() + 1 > 9) ? date.getMonth() + 1: "0" + (date.getMonth() + 1);
      let hours = (date.getHours() > 9) ? date.getHours() : "0" + date.getHours();
      let minutes = (date.getMinutes() > 9) ? date.getMinutes() : "0" + date.getMinutes();
      return  day + "-" + month + "-" + date.getFullYear() + " " + hours + ":" + minutes;
    }

    /* DElETE FILE */ 
    deleteFile(file_id) {
      var file = this.getFileData(file_id);
      if(file != null) {
        const deleteModal = this.createDeleteModal(file);
        document.body.appendChild(deleteModal);    
      }
    }
    createDeleteModal(file) {
      const deleteModal = document.createElement('div');
        deleteModal.classList.add('DeleteModal');
        if(file.type == "file")
          deleteModal.innerHTML = this.fillDeleteModalHTML(file);
        else
          deleteModal.innerHTML = this.folderDeleteModalHTML(file);
        deleteModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            document.body.removeChild(deleteModal);
        });
        deleteModal.querySelector("#modalDeleteBtn").addEventListener('click', (e) => {
            e.preventDefault();
            // There should be call to method that calling api to delete
            const result = this.deleteFileRequest(file._id);
            
            if(result == true) {
              this.removeFileFromDOM(file);
              document.body.removeChild(deleteModal);
            }
            else {
              const deleteBtns = deleteModal.querySelector("#DeleteModal__btns");
              const deleteBtn = deleteModal.querySelector("#modalDeleteBtn");
              deleteBtns.removeChild(deleteBtn);
              const deleteText = deleteModal.querySelector("#DeleteModal_text");
              deleteText.innerHTML ="Error occured durring delete operation. Try later.";
            } 
        });
        return deleteModal;
    }
    removeFileFromDOM(file) {
      const fileList = document.querySelector('#fileList');
      if(file.type == "file")
        fileList.removeChild(fileList.querySelector(`#file_${file._id}`));
      else
        fileList.removeChild(fileList.querySelector(`#folder_${file._id}`));
    }

    fillDeleteModalHTML(file) {
      return `<header>
                 <h2 class="DeleteModal__header">Delete</h2>
             </header>
             <div class="DeleteModal__content">
                 <h3 class="DeleteModal__file">File:</h3>
                 <h3 class="DeleteModal__filename">${file.name}</h3>
                 <h4 class="DeleteModal__filesize">${this.convertFileSize(file.size)}</h4>
                 <p class="DeleteModal__p" id="DeleteModal_text">Do you really want to delete this file?</p>
                 <div class="DeleteModal__btns" id="DeleteModal__btns">
                     <button class="DeleteModal__CloseBtn" id="modalCloseBtn">Close</button>
                     <button class="DeleteModal__DeleteBtn" id="modalDeleteBtn">Delete</button>
                 </div>
             </div>`
    }
    folderDeleteModalHTML(file) {
      return `<header>
                 <h2 class="DeleteModal__header">Delete</h2>
             </header>
             <div class="DeleteModal__content">
                 <h3 class="DeleteModal__file">Folder:</h3>
                 <h3 class="DeleteModal__filename">${file.name}</h3>
                 <p class="DeleteModal__p" id="DeleteModal_text">Do you really want to delete this folder?</p>
                 <div class="DeleteModal__btns" id="DeleteModal__btns">
                     <button class="DeleteModal__CloseBtn" id="modalCloseBtn">Close</button>
                     <button class="DeleteModal__DeleteBtn" id="modalDeleteBtn">Delete</button>
                 </div>
             </div>`
    }   
    deleteFileRequest(id) { 
      // delete request to api (not specified yet)
      let deleted = true;
      if(deleted)
          // returns true if  request accepted 
          return true;
          // returns false if server responded with error
      return false;  
    }
    displayShareDialog(file_id) {
      var file = {
          isShared : true,
          id: "txZ+plsL7z8=",
          name: "TestFile.dat",
          created: new Date(637237873697212390),
          size: "40.1MB",
          shareLink : "localhost:5001/sharedlink/uniquelink"
      };
      const shareModal = this.createShareModal(file);
      document.body.appendChild(shareModal);
    }
    createShareModal(file) {
        const shareModal = document.createElement('div');
        shareModal.classList.add('ShareModal');
        shareModal.innerHTML = this.fillShareModalHTML(file);
        shareModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            document.body.removeChild(shareModal);
        });
        shareModal.querySelector("#modalSwitchBtn").addEventListener('click', (e) => {
            e.preventDefault();
            file.shareLink = '-';
            file.isShared = !file.isShared;
            console.log(file.isShared);
            e.target.innerHTML = `${(file.isShared) ? "Disable" : "Enable"} sharing`;
            const sharelink = shareModal.querySelector('#modalShareLink');
            // There should be call to method that calling api for unique link
            sharelink.href = file.shareLink;
            sharelink.innerHTML = file.shareLink;

        });
        return shareModal;
    }
    fillShareModalHTML(file) {
        return `<header>
                <h2 class="ShareModal__header">Share</h2>
            </header>
            <div class="ShareModal__content">
                <h3 class="ShareModal__file">Share item:</h3>
                <h3 class="ShareModal__filename">${file.name}</h3>
                <h4 class="ShareModal__filesize">${file.size}</h4>
                <p class="ShareModal__p">Share link:
                    <a href="${file.shareLink}" class="ShareModal__sharelink" id="modalShareLink">
                    ${file.shareLink}
                    </a>
                </p>
                <div class="ShareModal__btns">
                    <button class="ShareMOdal__CloseBtn" id="modalCloseBtn">Close</button>
                    <button class="ShareMOdal__SwitchSBtn" id="modalSwitchBtn">${(file.isShared) ? "Disable" : "Enable"} sharing</button>
                </div>
            </div>`;
    }
  
}

const fileOperator = new FileOperator();