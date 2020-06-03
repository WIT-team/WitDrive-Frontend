class ContextMenu {
  constructor(fileOp) {
      this.fileOp = fileOp;
  }
  setup() {
      document.body.addEventListener('contextmenu', (e) => {
          
          let constextMenu = document.querySelector('.up_file__contextmenu');
          if(constextMenu !== null) {
              document.body.removeChild(constextMenu);
          }
          const clikedItemClass = e.target.getAttribute("class");
          if(['up_mainSection__file', 'up_mainSection__file-box', 'up_mainSection__file-name up_mainSection__file--cell', 'up_mainSection__file-filesize up_mainSection__file--cell', 'up_mainSection__file-uploadTime up_mainSection__file--cell'].indexOf(clikedItemClass) >= 0) {
              e.preventDefault();
              let fileId = e.target.closest(".up_mainSection__file").id;
              if(fileId.substring(0,4) == "file")
                fileId = fileId.substring(5);
              else
                fileId = fileId.substring(7);
              constextMenu = this.createCM_DOMel(e.clientX, e.clientY,fileId);
              document.body.appendChild(constextMenu);
          }
      });
      document.addEventListener('click', (e) => {
          let constextMenu = document.querySelector('.up_file__contextmenu');
          if(constextMenu !== null) {
              document.body.removeChild(constextMenu);
          }
      });
  }
  createCM_DOMel(posX, posY, fileid) {
      const contextmenu = document.createElement('div');
      contextmenu.classList.add('up_file__contextmenu');
      contextmenu.id = `CM_file_${fileid}`;
      contextmenu.innerHTML = `
          <button class="up_file__contextmenu-item" id="file__cm-downloadBtn">
              <i class="up_file__contextmenu-btn-icon icon-doc-inv"></i>
              <span class="up_file__contextmenu-btn-text">Download</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-renameBtn">
              <i class="up_file__contextmenu-btn-icon icon-doc-inv"></i>
              <span class="up_file__contextmenu-btn-text">Rename</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-deleteBtn">
              <i class="up_file__contextmenu-btn-icon icon-doc-inv"></i>
              <span class="up_file__contextmenu-btn-text">Delete</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-shareBtn">
              <i class="up_file__contextmenu-btn-icon icon-doc-inv"></i>
              <span class="up_file__contextmenu-btn-text">Share...</span>
          </button>`;
      const downloadBtn = contextmenu.querySelector('#file__cm-downloadBtn');
      const deleteBtn = contextmenu.querySelector('#file__cm-deleteBtn');
      const shareBtn = contextmenu.querySelector('#file__cm-shareBtn');
      const renameBtn = contextmenu.querySelector('#file__cm-renameBtn');
      shareBtn.addEventListener('click',(e) => {
          e.preventDefault();
          this.fileOp.displayShareDialog(fileid);
      });
      deleteBtn.addEventListener('click',(e) => {
          e.preventDefault();
          this.fileOp.deleteFile(fileid);
      });
      renameBtn.addEventListener('click',(e) => {
        e.preventDefault();
        this.fileOp.rename(fileid);
      });
      contextmenu.style.top = posY + "px";
      contextmenu.style.left = posX + "px";
      return contextmenu;
  }
}

class FileOperator {
  // Properties
  files = [];

  //Constructors
  constructor(auth, api) {
      this.api = api;
      this.auth = auth;
  }
  // Methods 
  setup(currentRoute) {
    if(currentRoute == "files") {
      this.loadFiles();
      const folderBtn = document.querySelector("#newFolderBtn");
      if(folderBtn != null)
      folderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.OpenNewFolderModal();
      });
      this.contextMenu = new ContextMenu(this);
      this.contextMenu.setup();
      
      const UploadBtn = document.querySelector("#upl");
      const InputBtn = document.querySelector("#inp");
      if(UploadBtn != null)
        UploadBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(this.files);
          InputBtn.click();
      });
      if(InputBtn != null)
      InputBtn.addEventListener('change', (e) => {
          e.preventDefault();
          const fileList = InputBtn.files;
          
          this.uploadFilesToServer(fileList);
      });
    }
    else if(currentRoute == "shared") {
      this.getSharedFilesFromServer();
      this.loadSharedToView();
    }
    else if(currentRoute == "bin") {

    }
    
  }
   // DownLoad files 
  downloadFilesFromServer(fileId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/files/download/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'multipart/form-data');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      console.log(userId);
      console.log(fileId);
      console.log(this.api + `u/${userId}/files/download/${fileId}`);
      if(XHR.status == 400)
      {
        //this.auth.logout();
      }
        else
        {
          console.log(JSON.parse(XHR.response));
        }
    } catch (error) {
      return false;
    }
  }
    // Upload files
  uploadFilesToServer(fileList) {
      const userId = this.auth.getUserId();
      var dirID = this.files.ID;

      for (var i = 0; i < fileList.length; i++)
      {
        try {
          var formData = new FormData();
          formData.append("file", fileList[i]);
          const XHR = new XMLHttpRequest();
          XHR.open( 'POST', this.api + `u/${userId}/files/upload?directoryId=`+dirID,false);
          //XHR.setRequestHeader('Content-Type', 'multipart/form-data');
          XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
          XHR.send(formData);
          if(XHR.status == 200)
          {
            if(i==fileList.length-1)
            {
              const fList = document.querySelector("#fileList");
              fList.innerHTML = "";
              this.loadFiles();
            }
          }
          else if(XHR.status == 400) {
            this.auth.logout();
          }
        } catch (error) {
        return false;
        }
      }
    }
  getSharedFilesFromServer() {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/files/get-shared-list`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200)
        this.files = JSON.parse(XHR.response);
      else if(XHR.status == 401) {
        this.auth.logout();
      }
      console.log(this.files);
    } catch (error) {
      return false;
    } 
  }
  loadSharedToView() {
    this.files.forEach(file => {
      const fileBox = this.createSharedFileTemplate(file);
      fileList.appendChild(fileBox);
    });
  }
  // Load files 
  getFilesFromServer() {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/files/root`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200)
        this.files = JSON.parse(XHR.response);
      else if(XHR.status == 401) {
        this.auth.logout();
      }
      console.log(this.files);
    } catch (error) {
      return false;
    } 
  }
  getFileData(id) {
    let directory = this.files;
      for (let index = 0; index < directory.files.length; index++) {
        const el = directory.files[index];
        if(el.ID === id)
          return el;
      }
      for (let index = 0; index < directory.directories.length; index++) {
        const el = directory.directories[index];
        if(el._id === id)
          return el;
      }
      return null;
  }
  bindParentFolderBtn(parentFolderBtn) {
    parentFolderBtn.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.loadFilesToView(mainFolder.ParentID);
     });
     parentFolderBtn.addEventListener('drop', (e) => {
      let elementID = e.dataTransfer.getData('text');
      const fileList = document.querySelector('#fileList');
          fileList.removeChild(fileList.querySelector(`#${elementID}`));
        if(elementID.slice(0,4) == 'file') {
          elementID = elementID.slice(5);
          const file = this.findFile(elementID);
          this.files.files = this.removeItemFromArr(elementID,this.files.files);
          //folder.files.push(file); - parent folder
        }
        else if (elementID.slice(0,6) == 'folder') {
          elementID = elementID.slice(7);
          const dir = this.findFolderObj(elementID);
          this.files.directories = this.removeItemFromArr(elementID,this.files.directories);
          //folder.directories.push(dir); - parent folder
        }
    });
    parentFolderBtn.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  }
  loadFilesToView(folderID) {

   const mainFolder = this.files;
    
   if(mainFolder.ParentID != null) {
    const parentFolderBtn = document.querySelector("#parentFolderBtn");
    if(parentFolderBtn != null){
       parentFolderBtn.style.display = "inline-block";
       this.bindParentFolderBtn(parentFolderBtn);
    }
   }
   else 
   {
    const parentFolderBtn = document.querySelector("#parentFolderBtn");
    if(parentFolderBtn != null){
       parentFolderBtn.style.display = "none";
    }
   }
   
    //const mainFolder = this.files.directories[i];
    const fileList = document.querySelector("#fileList");
    fileList.innerHTML = null;
    mainFolder.directories.forEach(file => {
      const fileBox = this.createFolderTemplate(file);
      fileList.appendChild(fileBox);
    });
    
    mainFolder.files.forEach(file => {
      const fileBox = this.createFileTemplate(file);
      fileList.appendChild(fileBox);
    });
  }
  createFolderTemplate(folder) {
    const folderElement = document.createElement('li');
    folderElement.id = `folder_${folder.ID}`;
    folderElement.classList.add('up_mainSection__file');
    folderElement.draggable=true;
    let foldername = folder.Name.substring(0, Math.min(folder.Name.length,40));
    if(foldername.length < folder.Name.length)
      foldername = foldername + "...";
    folderElement.innerHTML = `<div class="up_mainSection__file-box" >
                                <span><i class="up_mainSection__file-icon icon-folder-1"></i></span>
                                <span class="up_mainSection__file-name up_mainSection__file--cell">
                                  ${foldername}
                                </span>
                                <span class="up_mainSection__file-uploadTime up_mainSection__file--cell">
                                  ${this.convertUploadDate(folder.Created)}
                                </span>
                                <span class="up_mainSection__file-filesize up_mainSection__file--cell">
                                  -
                                </span>
                                
                              </div>`;
    folderElement.addEventListener('dblclick', (e) => {
      let folderID = folderElement.id.slice(7);
      const directoryObj = this.findFolderObj(folderID);
      if(directoryObj != null) {
        this.files = directoryObj;
        this.loadFilesToView(null);
      }
    });
    folderElement.addEventListener('drop', (e) => {
      let elementID = e.dataTransfer.getData('text');
      const fileList = document.querySelector('#fileList');
      if(elementID != folderElement.id) {
          fileList.removeChild(fileList.querySelector(`#${elementID}`));
        if(elementID.slice(0,4) == 'file') {
          elementID = elementID.slice(5);
          const file = this.findFile(elementID);
          this.files.files = this.removeItemFromArr(elementID,this.files.files);
          folder.files.push(file);
        }
        else if (elementID.slice(0,6) == 'folder') {
          elementID = elementID.slice(7);
          const dir = this.findFolderObj(elementID);
          this.files.directories = this.removeItemFromArr(elementID,this.files.directories);
          folder.directories.push(dir);
        }
      }
      
    });
    folderElement.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    folderElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text',e.target.id);
    });
    return folderElement;
  }
  removeItemFromArr(id, arr) {
    return arr.filter(function(item) {
      return item.ID !== id
    });
  }
  findFolderObj(folderId) {
    let directories = this.files.directories;
    for (let index = 0; index < directories.length; index++) {
      const directory = directories[index];
      if(directory.ID == folderId) {
        return directory;
      }
    }
    return null;
  }
  findFile(objId) {
    let dir = this.files.files;
    for (let index = 0; index < dir.length; index++) {
      const obj = dir[index];
      if(obj.ID == objId) {
        return obj;
      }
    }
    return null;
  }
  createFileTemplate(file){
    const fileElement = document.createElement('li');
    fileElement.id = `file_${file.ID}`;
    fileElement.classList.add('up_mainSection__file');
    fileElement.draggable=true;
    let filename = file.Name.substring(0, Math.min(file.Name.length,40));
    if(filename.length < file.Name.length)
      filename = filename + "...";
    fileElement.innerHTML = `<div class="up_mainSection__file-box" >
                                <span><i class="up_mainSection__file-icon icon-doc-inv"></i></span>
                                <span class="up_mainSection__file-name up_mainSection__file--cell">
                                  ${filename}
                                </span>
                                <span class="up_mainSection__file-uploadTime up_mainSection__file--cell">
                                  ${this.convertUploadDate(file.Created)}
                                </span>
                                <span class="up_mainSection__file-filesize up_mainSection__file--cell">
                                  ${this.convertFileSize(file.Size)}
                                </span>
                                
                              </div>`;
    fileElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text',e.target.id);
    });

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
      deleteModal.classList.add('up_DeleteModal');
      //if(file.hasOwnProperty('directories')) // file.Type == 1 - file 
        deleteModal.innerHTML = this.fillDeleteModalHTML(file);
      //else
      //  deleteModal.innerHTML = this.folderDeleteModalHTML(file);
      deleteModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
          e.preventDefault();
          document.body.removeChild(deleteModal);
      });
      deleteModal.querySelector("#modalDeleteBtn").addEventListener('click', (e) => {
          e.preventDefault();
          e.target.disabled = true;
          const result = this.deleteFileRequest(file.ID);
          e.target.disabled = false;
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
    //if(file.type == "file")
      fileList.removeChild(fileList.querySelector(`#file_${file.ID}`));
    //else
    //  fileList.removeChild(fileList.querySelector(`#folder_${file.ID}`));
  }
  fillDeleteModalHTML(file) {
    return `<header>
               <h2 class="up_DeleteModal__header">Delete</h2>
           </header>
           <div class="up_DeleteModal__content">
               <h3 class="up_DeleteModal__file">File:</h3>
               <h3 class="up_DeleteModal__filename">${file.Name}</h3>
               <h4 class="up_DeleteModal__filesize">${this.convertFileSize(file.Size)}</h4>
               <p class="up_DeleteModal__p" id="DeleteModal_text">Do you really want to delete this file?</p>
               <div class="up_DeleteModal__btns" id="DeleteModal__btns">
                   <button class="up_DeleteModal__CloseBtn" id="modalCloseBtn">Close</button>
                   <button class="up_DeleteModal__DeleteBtn" id="modalDeleteBtn">Delete</button>
               </div>
           </div>`
  }
  folderDeleteModalHTML(file) {
    return `<header>
               <h2 class="up_DeleteModal__header">Delete</h2>
           </header>
           <div class="up_DeleteModal__content">
               <h3 class="up_DeleteModal__file">Folder:</h3>
               <h3 class="up_DeleteModal__filename">${file.Name}</h3>
               <p class="up_DeleteModal__p" id="DeleteModal_text">Do you really want to delete this folder?</p>
               <div class="up_DeleteModal__btns" id="DeleteModal__btns">
                   <button class="up_DeleteModal__CloseBtn" id="modalCloseBtn">Close</button>
                   <button class="up_DeleteModal__DeleteBtn" id="modalDeleteBtn">Delete</button>
               </div>
           </div>`
  }   
  deleteFileRequest(fileId) { 
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'DELETE', this.api + `u/${userId}/files/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200)
        return true;
      else if(XHR.status == 401)
        this.auth.logout();
      else
        return false; 
    } catch (error) {
      return false;
    }
    
  }
  displayShareDialog(file_id) {
    const file = this.getFileData(file_id);
    const shareModal = this.createShareModal(file);
    document.body.appendChild(shareModal);
  }
  createShareModal(file) {
      const shareModal = document.createElement('div');
      shareModal.classList.add('up_ShareModal');
      shareModal.innerHTML = this.fillShareModalHTML(file);
      shareModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
          e.preventDefault();
          document.body.removeChild(shareModal);
      });
      shareModal.querySelector("#modalSwitchBtn").addEventListener('click', (e) => {
          e.preventDefault();
          e.target.disabled = true;
          const sharelink = shareModal.querySelector('#modalShareLink');
          if(!file.Shared) {
            const result = this.enableSharingRequest(file.ID);
            console.log(result);
            if(result.status) {
              file.ShareID = result.ShareID;
              file.Shared = true;
              e.target.innerHTML = "Disable sharing";
              const sh = `${this.auth.getDomain()}/sharedfile/${file.ShareID}`;
              sharelink.href = sh;
              sharelink.textContent = sh;
            }
          }
          else {
            const result = this.disableSharingRequest(file.ID);
            if(result) {
              file.ShareID = '-';
              file.Shared = false;
              e.target.innerHTML = "Enable sharing";
              sharelink.href = file.ShareID;
              sharelink.textContent = file.ShareID;
            }
          }
          e.target.disabled = false;

      });
      return shareModal;
  }
  enableSharingRequest(fileId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', this.api + `u/${userId}/files/share/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200)
        return {status: true, ShareID : XHR.response};
      else if(XHR.status == 401)
        this.auth.logout();
      else
        return {status: false, shareID : '-'};
    } catch (error) {
      return {status: false, shareID : '-'};
    }
  }
  disableSharingRequest(fileId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', this.api + `u/${userId}/files/disable-sharing/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200)
        return true;
      else if(XHR.status == 401)
        this.auth.logout();
      else
        return false;
    } catch (error) {
      return false;
    }
  }
  fillShareModalHTML(file) {
      const sharelink = (file.Shared) ? `${this.auth.getDomain()}/sharedfile/${file.ShareID}` : '-';
      return `<header>
              <h2 class="up_ShareModal__header">Share</h2>
          </header>
          <div class="up_ShareModal__content">
              <h3 class="up_ShareModal__file">Share item:</h3>
              <h3 class="up_ShareModal__filename">${file.Name}</h3>
              <h4 class="up_ShareModal__filesize">${this.convertFileSize(file.Size)}</h4>
              <p class="up_ShareModal__p">Share link: <a href="${sharelink} " class="up_ShareModal__sharelink" id="modalShareLink">${sharelink}</a></p>
              <div class="up_ShareModal__btns">
                  <button class="up_ShareMOdal__CloseBtn" id="modalCloseBtn">Close</button>
                  <button class="up_ShareMOdal__SwitchSBtn" id="modalSwitchBtn">${(file.Shared) ? "Disable" : "Enable"} sharing</button>
              </div>
          </div>`;
  }
  createRenameModal(file) {
    const renameModal = document.createElement('div');
    renameModal.classList.add('up_RenameModal');
    renameModal.innerHTML = `<header>
          <h2 class="up_RenameModal__header">Rename element</h2>
      </header>
      <div class="up_RenameModal__content">
          <h3 class="up_RenameModal__file">Name:</h3>
          <input type="text" name="newName" value = "${file.Name}" id="newName" class="up_RenameModal__filename"/>
          <p class="up_RenameModal__p" id="RenameModal_text"></p>
          <div class="up_RenameModal__btns" id="RenameModal__btns">
              <button class="up_RenameModal__CloseBtn" id="modalCloseBtn">Close</button>
              <button class="up_RenameModal__RenameBtn" id="modalRenameBtn">Rename</button>
          </div>
      </div>`;
    renameModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
      e.preventDefault();
      document.body.removeChild(renameModal);
    });
    renameModal.querySelector("#modalRenameBtn").addEventListener('click', (e) => {
      e.preventDefault();
      const newName = renameModal.querySelector('#newName').value;
      const result = this.renameFileRequest(file.ID, newName);
      
      if(result == true) {
        file.Name = newName;
        this.updateFileNameEl(file.ID, newName);
        document.body.removeChild(renameModal);
      }
      else {
        const renameBtns = renameModal.querySelector("#RenameModal__btns");
        const renameBtn = renameModal.querySelector("#modalRenameBtn");
        renameBtns.removeChild(renameBtn);
        const renameText = renameModal.querySelector("#RenameModal_text");
        renameText.innerHTML ="Error occured durring operation. Try again later.";
      } 
  });
  return renameModal;
  }
  updateFileNameEl(fileId, newName) {
    let filename = newName.substring(0, Math.min(newName.length,40));
    if(filename.length < newName.length)
      filename = filename + "...";
    const fileBox = document.querySelector(`#file_${fileId}`);
    fileBox.querySelector('.up_mainSection__file-name').textContent = newName;
  }
  rename(file_id) {
    var file = this.getFileData(file_id);
    if(file != null) {
      const renameModal = this.createRenameModal(file);
      document.body.appendChild(renameModal);
    }   
  }
  renameFileRequest(fileId, newName) { 
    const userId = this.auth.getUserId();
    /*try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'DELETE', this.api + `u/${userId}/files/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", this.auth.getUserToken());
      XHR.send(null);
      if(XHR.status == 200)
        return true;
      else
        return false; 
    } catch (error) {
      return false;
    }
    */
   return {status : 400};
  }
  newFolderRequest(newName) {
      const userId = this.auth.getUserId();
      /*try {
        const XHR = new XMLHttpRequest();
        XHR.open( 'DELETE', this.api + `u/${userId}/files/${fileId}`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.setRequestHeader("Authorization", this.auth.getUserToken());
        XHR.send(null);
        if(XHR.status == 200)
          return true;
        else
          return false; 
      } catch (error) {
        return false;
      }
      */
     return {status : 200};
  }
  CreateFolderModal() {
    const newFolderModal = document.createElement('div');
    newFolderModal.classList.add('up_NewFolderModal');
    newFolderModal.innerHTML = `
      <header>
          <h2 class="up_NewFolderModal__header">New folder</h2>
      </header>
      <div class="up_NewFolderModal__content">
          <h3 class="up_NewFolderModal__name">Name:</h3>
          <input type="text" name="newName" placeholder="New folder" id="newName" class="up_NewFolderModal__foldername"/>
          <p class="up_NewFolderModal__p" id="newFolderModal_text"></p>
          <div class="up_NewFolderModal__btns" id="newFolderModal__btns">
              <button class="up_NewFolderModal__CloseBtn" id="modalCloseBtn">Close</button>
              <button class="up_NewFolderModal__CreateBtn" id="modalCreateBtn">Create</button>
          </div>
      </div>`;
    newFolderModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
      e.preventDefault();
      document.body.removeChild(newFolderModal);
    });
    newFolderModal.querySelector("#modalCreateBtn").addEventListener('click', (e) => {
      e.preventDefault();
      const newName = newFolderModal.querySelector('#newName').value;
      if(newName.length > 0) {
        const result = this.newFolderRequest(newName);
        if(result.status == 200) {
          document.body.removeChild(newFolderModal);
          const newFolder = {
            ID : (Math.random()*100).toFixed(0).toString(),
            Name : newName,
            Created : '2020-05-27T09:14:09.554Z',
            ParentID : this.files.ID,
            directories : [],
            files : []
          };
          const folderElement = this.createFolderTemplate(newFolder);
          document.querySelector('#fileList').appendChild(folderElement);
          this.files.directories.push(newFolder);
          console.log(this.files);
        }
        else {
          const newFolderBtns = newFolderModal.querySelector("#newFolderModal__btns");
          const newFolderBtn = newFolderModal.querySelector("#modalCreateBtn");
          newFolderBtns.removeChild(newFolderBtn);
          const newFolderText = newFolderModal.querySelector("#newFolderModal_text");
          newFolderText.innerHTML ="Error occured durring operation. Try again later.";
          return null;
        }
      }
      else {
        const newFolderBtns = newFolderModal.querySelector("#newFolderModal__btns");
        const newFolderBtn = newFolderModal.querySelector("#modalCreateBtn");
        newFolderBtns.removeChild(newFolderBtn);
        const newFolderText = newFolderModal.querySelector("#newFolderModal_text");
        newFolderText.innerHTML ="Error occured durring operation. Try again later.";
        return null;
      } 
    });
    document.body.appendChild(newFolderModal);
    
  }
  OpenNewFolderModal() {
    const folderBtn = document.querySelector("#newFolderBtn");
    folderBtn.disabled = true;
    const newFolder = this.CreateFolderModal();
    if(newFolder != null) 
      document.querySelector("#fileList").appendChild(newFolder);
      folderBtn.disabled = false;
  }
  createSharedFolderTemplate(folder) {
    const folderElement = document.createElement('li');
    folderElement.id = `folder_${folder.ID}`;
    folderElement.classList.add('up_mainSection__file');
    let foldername = folder.Name.substring(0, Math.min(folder.Name.length,40));
    if(foldername.length < folder.Name.length)
      foldername = foldername + "...";
    folderElement.innerHTML = `<div class="up_mainSection__file-box" >
                                <span><i class="up_mainSection__file-icon icon-folder-1"></i></span>
                                <span class="up_mainSection__file-name up_mainSection__file--cell">
                                  ${foldername}
                                </span>
                                <span class="up_mainSection__file-uploadTime up_mainSection__file--cell">
                                  ${this.convertUploadDate(folder.Created)}
                                </span>
                                <span class="up_mainSection__file-filesize up_mainSection__file--cell">
                                  -
                                </span>
                                <span><i class="up_mainSection__file-icon icon-cancel" id="DisableSharingIcBtn"></i></span>
                              </div>`;
    folderElement.querySelector('#DisableSharingIcBtn').addEventListener('click', (e) => {
     if(this.disableSharingRequest(folder.ID)) {
       const fileList = document.querySelector('#fileList');
       fileList.removeChild(fileList.querySelector(`#folder_${folder.ID}`));
     }
    }); 
    return folderElement;
  }
  createSharedFileTemplate(file) {
    const fileElement = document.createElement('li');
    fileElement.id = `file_${file.ID}`;
    fileElement.classList.add('up_mainSection__file');
    let filename = file.Name.substring(0, Math.min(file.Name.length,40));
    if(filename.length < file.Name.length)
      filename = filename + "...";
    fileElement.innerHTML = `<div class="up_mainSection__file-box" >
                                
                                <span><i class="up_mainSection__file-icon icon-doc-inv"></i></span>
                                <span class="up_mainSection__file-name up_mainSection__file--cell">
                                  ${filename}
                                </span>
                                <span class="up_mainSection__file-uploadTime up_mainSection__file--cell">
                                  ${this.convertUploadDate(file.Created)}
                                </span>
                                <span class="up_mainSection__file-filesize up_mainSection__file--cell">
                                  ${this.convertFileSize(file.Size)}
                                </span>
                                <span><i class="up_mainSection__file-icon icon-cancel" id="DisableSharingIcBtn"></i></span>
                              </div>`;
    fileElement.querySelector('#DisableSharingIcBtn').addEventListener('click', (e) => {
      if(this.disableSharingRequest(file.ID)) {
        const fileList = document.querySelector('#fileList');
        fileList.removeChild(fileList.querySelector(`#file_${file.ID}`));
      }
    });                    
    return fileElement;
  }
}

export default FileOperator;
