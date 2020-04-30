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
                const fileId = e.target.closest(".mainSection__file").id.substring(5);
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
        this.contextMenu = new ContextMenu(this);
        this.contextMenu.setup();
    }
    // Methods 
   
    getFilesFromServer() {
        // This will be replaced with request to api 
        this.files = {
            "_id": "0",
            "name": "root",
            "created": 637237873697270785,
            "directories": [
              {
                "_id": "",
                "name": "RecycleBin",
                "created": 637237873697206347,
                "directories": [],
                "files": []
              },
              {
                "_id": null,
                "name": "MainDirectory",
                "created": 0,
                "directories": [],
                "files": [
                  {
                    "_id": "txZ+plsL7z8=",
                    "name": "file_1",
                    "created": 637237873697212390,
                    "size": 0
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
                "name": "Xg4tOy+Hxj8=bvTi3zZ64T8=fh115r6O6j8=",
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
                "_id": null,
                "name": "",
                "created": 0,
                "directories": [],
                "files": [
                  {
                    "_id": "4YttrfDF5j8=",
                    "name": "file_4",
                    "created": 637237873697258158,
                    "size": 0
                  }
                ]
              },
              {
                "_id": null,
                "name": "5VG8QfIo7j8=",
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
    loadFilesToView() {
        let filePointer;
        while(true) {

        }
    }
    deleteFile(file_id) {
        var file = {
          isShared : true,
          id: file_id,
          name: "TestFile.dat",
          created: new Date(637237873697212390),
          size: "40.2MB",
          shareLink : "localhost:5001/sharedlink/uniquelink"
      };
      const deleteModal = this.createDeleteModal(file);
      document.body.appendChild(deleteModal);    
    }
    createDeleteModal(file) {
      const deleteModal = document.createElement('div');
        deleteModal.classList.add('DeleteModal');
        deleteModal.innerHTML = this.fillDeleteModalHTML(file);
        deleteModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            document.body.removeChild(deleteModal);
        });
        deleteModal.querySelector("#modalDeleteBtn").addEventListener('click', (e) => {
            e.preventDefault();
            // There should be call to method that calling api to delete
            const result = this.deleteFileRequest(file.id);
            
            if(result == true) {
              this.removeFileFromDOM(file.id);
              document.body.removeChild(deleteModal);
            }
            else {
              const deleteBtns = deleteModal.querySelector("#DeleteModal__btns");
              const deleteBtn = deleteModal.querySelector("#modalDeleteBtn");
              console.log(deleteBtn);
              deleteBtns.removeChild(deleteBtn);
              const deleteText = deleteModal.querySelector("#DeleteModal_text");
              deleteText.innerHTML ="Error occured durring delete operation. Try later.";
            } 
        });
        return deleteModal;
    }
    removeFileFromDOM(file_id) {
      const fileList = document.querySelector('#fileList');
      const fileBox = fileList.querySelector(`#file_${file_id}`);
      fileList.removeChild(fileBox);
    }
    fillDeleteModalHTML(file) {
      return `<header>
                 <h2 class="DeleteModal__header">Delete</h2>
             </header>
             <div class="DeleteModal__content">
                 <h3 class="DeleteModal__file">Item:</h3>
                 <h3 class="DeleteModal__filename">${file.name}</h3>
                 <h4 class="DeleteModal__filesize">${file.size}</h4>
                 <p class="DeleteModal__p" id="DeleteModal_text">Do you really want to delete this item?</p>
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