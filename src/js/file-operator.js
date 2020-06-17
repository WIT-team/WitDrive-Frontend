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
              if(fileId.substring(0,4) == "file") {
                fileId = fileId.substring(5);
                constextMenu = this.createCM_DOMel(e.clientX, e.clientY,fileId);
              }
              else {
                fileId = fileId.substring(7);
                constextMenu = this.createDirCM_DOMel(e.clientX, e.clientY,fileId);
              }
                
              
              document.body.appendChild(constextMenu);
          }
          if(e.target.id == "files-box" && this.fileOp.canPaste()) {
            e.preventDefault();
            const cntxt = document.createElement('div');
            cntxt.classList.add('up_file__contextmenu');
            cntxt.innerHTML = `
                <button class="up_file__contextmenu-item" id="PasteBtn">
                  <span class="up_file__contextmenu-btn-text">Paste</span>
                </button>
            `;
            cntxt.style.top = e.clientY + "px";
            cntxt.style.left = e.clientX + "px";
            document.body.appendChild(cntxt);
            cntxt.querySelector("#PasteBtn").addEventListener('click', (e) => {
              this.fileOp.Paste();
            });
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
              <i class="up_file__contextmenu-btn-icon icon-download"></i>
              <span class="up_file__contextmenu-btn-text">Download</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-renameBtn">
              <i class="up_file__contextmenu-btn-icon icon-pencil"></i>
              <span class="up_file__contextmenu-btn-text">Rename</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-CopyBtn">
            <i class="up_file__contextmenu-btn-icon icon-docs"></i>
            <span class="up_file__contextmenu-btn-text">Copy</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-deleteBtn">
              <i class="up_file__contextmenu-btn-icon icon-trash"></i>
              <span class="up_file__contextmenu-btn-text">Delete</span>
          </button>
          <button class="up_file__contextmenu-item" id="file__cm-shareBtn">
              <i class="up_file__contextmenu-btn-icon icon-share"></i>
              <span class="up_file__contextmenu-btn-text">Share...</span>
          </button>`;
      const downloadBtn = contextmenu.querySelector('#file__cm-downloadBtn');
      const deleteBtn = contextmenu.querySelector('#file__cm-deleteBtn');
      const shareBtn = contextmenu.querySelector('#file__cm-shareBtn');
      const copyBtn = contextmenu.querySelector('#file__cm-CopyBtn');
      const renameBtn = contextmenu.querySelector('#file__cm-renameBtn');
      copyBtn.addEventListener('click',(e) => {
        e.preventDefault();
        this.fileOp.Copy({ID:fileid, Type:1});
      });
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
      downloadBtn.addEventListener('click',(e) => {
        e.preventDefault();
        this.fileOp.downloadFilesFromServer(fileid);	
    });
      contextmenu.style.top = posY + "px";
      contextmenu.style.left = posX + "px";
      return contextmenu;
  }
  createDirCM_DOMel(posX, posY, fileid) {
    const contextmenu = document.createElement('div');
    contextmenu.classList.add('up_file__contextmenu');
    contextmenu.id = `CM_file_${fileid}`;
    contextmenu.innerHTML = `
        <button class="up_file__contextmenu-item" id="file__cm-renameBtn">
            <i class="up_file__contextmenu-btn-icon icon-pencil"></i>
            <span class="up_file__contextmenu-btn-text">Rename</span>
        </button>
        <button class="up_file__contextmenu-item" id="file__cm-CopyBtn">
          <i class="up_file__contextmenu-btn-icon icon-docs"></i>
          <span class="up_file__contextmenu-btn-text">Copy</span>
        </button>
        <button class="up_file__contextmenu-item" id="file__cm-deleteBtn">
            <i class="up_file__contextmenu-btn-icon icon-trash"></i>
            <span class="up_file__contextmenu-btn-text">Delete</span>
        </button>
        <button class="up_file__contextmenu-item" id="file__cm-shareBtn">
            <i class="up_file__contextmenu-btn-icon icon-share"></i>
            <span class="up_file__contextmenu-btn-text">Share...</span>
        </button>`;
    const deleteBtn = contextmenu.querySelector('#file__cm-deleteBtn');
    const shareBtn = contextmenu.querySelector('#file__cm-shareBtn');
    const copyBtn = contextmenu.querySelector('#file__cm-CopyBtn');
    const renameBtn = contextmenu.querySelector('#file__cm-renameBtn');
    copyBtn.addEventListener('click',(e) => {
      e.preventDefault();
      this.fileOp.Copy({ID:fileid, Type:2});
    });
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
function loadingON()
{
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: block;";
}
function loadingOFF()
{
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: none;";
}
class FileOperator {
  // Properties
  files = [];
  parentFolderBtnBinded = false;
  copiedElement = null;
  //Constructors
  constructor(auth, api) {
      this.api = api;
      this.auth = auth;
  }
  // Methods 

  // Copy & Paste 
  canPaste() {return this.copiedElement != null; }
  Paste() {
    loadingON();
    setTimeout(() => {
      loadingOFF();
    if(this.copiedElement!= null) {
      if(this.copiedElement.Type == 1) {
        const result = this.PasteFileRequest(this.copiedElement.ID);
        if(result.status == 200) {
          const file = JSON.parse(result.response);
          const fileTemplate = this.createFileTemplate(file);
          const fileList = document.querySelector("#fileList");
          fileList.appendChild(fileTemplate);
          this.files.files.push(file);
        }
      }
      else if(this.copiedElement.Type == 2) {
        const result = this.PasteDirRequest(this.copiedElement.ID);
        if(result.status == 200) {
          const dir = JSON.parse(result.response);
          if(this.getDirByName(dir.Name) == null) {
            const dirTemplate = this.createFolderTemplate(dir);
            const fileList = document.querySelector("#fileList");
            fileList.appendChild(dirTemplate);
            this.files.directories.push(dir);
          }
        }
      } 
    }
  },100);

  }
  Copy(element) {this.copiedElement = {ID: element.ID, Type: element.Type}};
  PasteDirRequest(dirId) {
    const userId = this.auth.getUserId();
    const dstDirId  = this.files.ID;
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PUT', `${this.api}u/${userId}/dir/copy?dirId=${dirId}&dstDirId=${dstDirId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR; 
    } catch (error) {}
  }
  PasteFileRequest(fileId) {
    const userId = this.auth.getUserId();
    const dirId = this.files.ID;
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PUT', `${this.api}u/${userId}/files/copy?fileId=${fileId}&dirId=${dirId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR; 
    } catch (error) {}
  }

  // setup 
  setup(currentRoute) {

    if(currentRoute == "files") {
      this.loadFiles();

      const searchBtn = document.querySelector("#searchBtn");
      if(searchBtn != null){
          searchBtn.addEventListener('click', (e) =>{
            e.preventDefault();
            const search = this.searcher();
            if(search != null){
              document.body.appendChild(search);
            }
        })
      }


      const folderBtn = document.querySelector("#newFolderBtn");
      if(folderBtn != null)
      folderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.OpenNewFolderModal();
      });
      this.contextMenu = new ContextMenu(this);
      this.contextMenu.setup();
      this.bindDownloadAndUpload();
     
    }
    else if(currentRoute == "shared") {
      this.getSharedFilesFromServer();
      this.loadSharedToView();
      this.contextMenu = new ContextMenu(this);
      this.contextMenu.setup();
    }
    else if(currentRoute == "bin") {

    }
    else if(currentRoute == "sharedfile") {
      const shareId = this.router.getParameters()[0];
      this.getShById(shareId);
     
    }
  }
  setRouter(router) {
    this.router = router;
  }
  setRootId(rootId) {
    localStorage.setItem("rootId", rootId);
  }
  getRootId() {
    return localStorage.getItem("rootId");
  }
  getShById(shareId) {
    const result = this.getShRequest(shareId);
    if(result.status == 200) {
      const fileList = document.querySelector("#fileList");
      fileList.innerHTML = null;
      const files = JSON.parse(result.response);
      files.forEach(element => {
        let fileElement;
        if(element.Type == 1)
          fileElement = this.createShFileTmpWithDwnl(element, shareId);
        else
          fileElement = this.createShDirTmpWithDwnl(element, shareId);
        fileList.appendChild(fileElement);
      });
    }
    else {
      this.router.loadRoute('404');
    }
  }
  getShRequest(shareId) {
    const XHR = new XMLHttpRequest(); 
    try {  
      XHR.open( 'GET',`${this.api}shared/info/${shareId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.send();
      return XHR;
    } catch (error) {
      return XHR;
    } 
  }
  bindDownloadAndUpload() {
    const UploadBtn = document.querySelector("#upl");
    const InputBtn = document.querySelector("#inp");
    if(UploadBtn != null)
      UploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        InputBtn.click();
    });
    if(InputBtn != null)
    InputBtn.addEventListener('change', (e) => {
        e.preventDefault();
        const fileList = InputBtn.files;
        this.uploadFilesToServer(fileList);
    });
  }
   // DownLoad files 
  downloadFilesFromServer(fileId) {
    const userId = this.auth.getUserId();
    const fileData = this.getFileData(fileId);
    let anchor = document.createElement("a");
    this.router.routerDataEl.appendChild(anchor);
    let downloadingFile = `${this.api}u/${userId}/files/${fileId}`;

    let headers = new Headers();
    headers.append('Authorization', "Bearer " + this.auth.getUserToken());
    loadingON();
      setTimeout(() => {
        loadingOFF();
    fetch(downloadingFile, { headers })
      .then(response => response.blob())
      .then(blobby => {
        let objectUrl = window.URL.createObjectURL(blobby);

        anchor.href = objectUrl;
        anchor.download = fileData.Name;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
    });
    
      },100);
  }
  getSpaseFromServer()
  {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/account/available-space`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 401)
        this.auth.logout();
      else
      {
        return JSON.parse(XHR.response);
      }
    } catch (error) {
      return false;
    } 
  }
  setSpaceToView(space)
  {
    const el = document.querySelector("#space-details");
    var used = this.convertFileSize(space.Used);
    var aval = this.convertFileSize(space.Available);
    el.textContent=used+" of "+aval+" used";
  }
    // Upload files
  uploadFilesToServer(fileList) {
      const userId = this.auth.getUserId();
      var dirID = this.files.ID;
      loadingON();
      setTimeout(() => {
        var space = this.getSpaseFromServer();
      var totalSize=0;
      for (var i = 0; i < fileList.length; i++)
      {
        totalSize= totalSize+fileList[i].size;
      }
      if(totalSize>=space.Left)
      {
        loadingOFF();
        const errorModal = document.createElement('div');
        errorModal.classList.add('ErrorModal');
        let modalBody = `<header>
                <h2 class="ErrorModal__header">Ups, something gone wrong!</h2>
            </header>
            <div class="ErrorModal__content">`;
            
            modalBody += `<p class="ErrorModal__p">You have not enough disk space, you can buy more.</p>`;
            
            modalBody += `<div class="ErrorModal__btns" id="ErrorModal__btns">
                    <button class="ErrorModal__CloseBtn" id="modalCloseBtn">Close</button>
                </div>
            </div>`;
        errorModal.innerHTML = modalBody;
        this.router.routerDataEl.appendChild(errorModal); 
        errorModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            this.router.routerDataEl.removeChild(errorModal);
        });
        return false;
      }
      else
      {
      for (var i = 0; i < fileList.length; i++)
      {
        try {
          var formData = new FormData();
          formData.append("file", fileList[i]);
          const XHR = new XMLHttpRequest();
          XHR.open( 'POST', this.api + `u/${userId}/files/upload?directoryId=`+dirID,false);
          XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
          XHR.send(formData);
          
          if(XHR.status == 200)
          {
            if(i==fileList.length-1)
            {
              loadingOFF();
              const fList = document.querySelector("#fileList");
              fList.innerHTML = "";
              const result = this.getDirData(dirID);
              if(result.status == 200) {
                this.files = JSON.parse(result.response);
                this.loadFilesToView(null);
              }
            }
          }
          else if(XHR.status == 400) {
            this.auth.logout();
          }
        } catch (error) {
        return false;
        }
      }
      this.setSpaceToView(this.getSpaseFromServer());
    }
    }, 100);
  }

  getSharedFilesFromServer() {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/share/shared-list`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      this.setSpaceToView(this.getSpaseFromServer());
      if(XHR.status == 200)
        this.files = JSON.parse(XHR.response);
      else if(XHR.status == 401) {
        this.auth.logout();
      }
    } catch (error) {
      return false;
    } 
  }
  loadSharedToView() {
    this.files.forEach(file => {
      let fileBox;
      if(file.Type == 1) {
        fileBox = this.createSharedFileTemplate(file);
      }
      else {
        fileBox = this.createSharedFolderTemplate(file);
      }
      fileList.appendChild(fileBox);
    });
  }
  // Load files 
  getFilesFromServer() {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', this.api + `u/${userId}/dir/root`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      if(XHR.status == 200) {
        this.files = JSON.parse(XHR.response);
        this.setRootId(this.files.ID);
      }  
      else if(XHR.status == 401) {
        this.auth.logout();
      }
    } catch (error) {
      return false;
    } 
  }
  getFileData(id) {
    let directory = this.files;
    if(Array.isArray(directory)) {
       for (let index = 0; index < directory.length; index++) {
        const el = directory[index];
        if(el.ID === id)
          return el;
      }
    }
    else {
      for (let index = 0; index < directory.files.length; index++) {
        const el = directory.files[index];
        if(el.ID === id)
          return el;
      }
      for (let index = 0; index < directory.directories.length; index++) {
        const el = directory.directories[index];
        if(el.ID === id)
          return el;
      }
    }
    return null;
  }
  getDirByName(dirName) {
    for (let index = 0; index < directory.directories.length; index++) {
      const el = directory.directories[index];
      if(el.Name === dirName)
        return el;
    }
    return null;
  }
  bindParentFolderBtn(parentFolderBtn) {
    parentFolderBtn.addEventListener('dblclick', (e) => {
      e.preventDefault();
      console.log(this.files.ParentID); // Testing
      const result = this.getDirData(this.files.ParentID);
      if(result.status == 200) {
        this.files = JSON.parse(result.response);
        this.loadFilesToView(null);
      }
     });
     parentFolderBtn.addEventListener('drop', (e) => {
      let elementID = e.dataTransfer.getData('text');
      const fileList = document.querySelector('#fileList');
          fileList.removeChild(fileList.querySelector(`#${elementID}`));
        if(elementID.slice(0,4) == 'file') {
          elementID = elementID.slice(5);
          const file = this.findFile(elementID);
          if(file != null) {
            const result = this.moveFileRequest(file.ID, this.files.ParentID);
            if(result.status == 200)
              this.files.files = this.removeItemFromArr(elementID,this.files.files);
          }
        }
        else if (elementID.slice(0,6) == 'folder') {
          elementID = elementID.slice(7);
          const dir = this.findFolderObj(elementID);
          if(dir != null) {
            const result = this.moveFolderRequest(dir.ID, this.files.ParentID);
            if(result.status == 200) {
              this.files.directories = this.removeItemFromArr(elementID,this.files.directories);
              folder.directories.push(dir);
            }
          }
        }
    });
    parentFolderBtn.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  }
  loadFilesToView(folderID) {
   const mainFolder = this.files;
   if(mainFolder.ID != this.getRootId()) {
    const parentFolderBtn = document.querySelector("#parentFolderBtn");
    if(parentFolderBtn != null){
       parentFolderBtn.style.display = "inline-block";
       if (!this.parentFolderBtnBinded){
        this.bindParentFolderBtn(parentFolderBtn);
        this.parentFolderBtnBinded = true;
       }
    }
   }
   else 
   {
    const parentFolderBtn = document.querySelector("#parentFolderBtn");
    if(parentFolderBtn != null){
       parentFolderBtn.style.display = "none";
    }
   }
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
      console.log(this.files.ParentID); // Testing
      const directoryObj = this.findFolderObj(folderID);
      if(directoryObj != null) {
        const result = this.getDirData(directoryObj.ID);
        if(result.status == 200) {
          this.files = JSON.parse(result.response);
          this.loadFilesToView(null);
        }
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
          if(file != null) {
            const result = this.moveFileRequest(file.ID, folder.ID);
            if(result.status == 200)
              this.files.files = this.removeItemFromArr(elementID,this.files.files);
              folder.files.push(file);
          }
        }
        else if (elementID.slice(0,6) == 'folder') {
          elementID = elementID.slice(7);
          const dir = this.findFolderObj(elementID);
          if(dir != null) {
            const result = this.moveFolderRequest(dir.ID, folder.ID);
            if(result.status == 200) {
              this.files.directories = this.removeItemFromArr(elementID,this.files.directories);
              folder.directories.push(dir);
            }
          }
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
  getDirData(dirId)  {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'GET', `${ this.api}u/${userId}/dir/${dirId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR;
    } catch (error) {
      return null;
    }
  }
  moveFileRequest(fileId, dirId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', `${this.api}u/${userId}/files/move?fileId=${fileId}&dirId=${dirId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR;
    } catch (error) {
      return null;
    }
  }
  moveFolderRequest(srcDirId, dstDirId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', `${this.api}u/${userId}/dir/move?srcDirId=${srcDirId}&dstDirId=${dstDirId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR;
    } catch (error) {
      return null;
    }
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
                                  ${this.convertFileSize(file.Length)}
                                </span>
                                
                              </div>`;
    fileElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text',e.target.id);
    });

    return fileElement;
  }
  loadFiles() {
    var space = this.getSpaseFromServer();
    this.getFilesFromServer();
    this.loadFilesToView("Files");
    
    setTimeout(() => {   
    this.setSpaceToView(space);
    },100);

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
    let day = (date.getDate() > 9) ? date.getDate() : "0" + date.getDate();
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
      this.router.routerDataEl.appendChild(deleteModal);    
    }
  }
  createDeleteModal(file) {
    const deleteModal = document.createElement('div');
      deleteModal.classList.add('up_DeleteModal');
      if(file.Type == 1) // 1 - file 
        deleteModal.innerHTML = this.fillDeleteModalHTML(file);
      else {
        deleteModal.innerHTML = this.folderDeleteModalHTML(file);
      } 
      deleteModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
          e.preventDefault();
          this.router.routerDataEl.removeChild(deleteModal);
      });
      deleteModal.querySelector("#modalDeleteBtn").addEventListener('click', (e) => {
        loadingON();
        setTimeout(() => {  
          e.preventDefault();
          e.target.disabled = true;
          const result = this.deleteFileRequest(file.ID);
          e.target.disabled = false;
          if(result == true) {
            this.removeFileFromDOM(file);
            this.router.routerDataEl.removeChild(deleteModal);
          }
          else {
            const deleteBtns = deleteModal.querySelector("#DeleteModal__btns");
            const deleteBtn = deleteModal.querySelector("#modalDeleteBtn");
            deleteBtns.removeChild(deleteBtn);
            const deleteText = deleteModal.querySelector("#DeleteModal_text");
            deleteText.innerHTML ="Error occured durring delete operation. Try later.";
          }
          loadingOFF(); 
        }, 100);
      });
      return deleteModal;
  }
  removeFileFromDOM(file) {
    const fileList = document.querySelector('#fileList');
    if(file.Type == 1)
      fileList.removeChild(fileList.querySelector(`#file_${file.ID}`));
    else
      fileList.removeChild(fileList.querySelector(`#folder_${file.ID}`));
  }
  fillDeleteModalHTML(file) {
    return `<header>
               <h2 class="up_DeleteModal__header">Delete</h2>
           </header>
           <div class="up_DeleteModal__content">
               <h3 class="up_DeleteModal__file">File:</h3>
               <h3 class="up_DeleteModal__filename">${file.Name}</h3>
               <h4 class="up_DeleteModal__filesize">${this.convertFileSize(file.Length)}</h4>
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
      XHR.open( 'DELETE', this.api + `u/${userId}/dir/${fileId}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      // loadingON();
      XHR.send();
      this.setSpaceToView(this.getSpaseFromServer());
       loadingOFF();
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
    this.router.routerDataEl.appendChild(shareModal);
  }
  createShareModal(file) {
      const shareModal = document.createElement('div');
      shareModal.classList.add('up_ShareModal');
      shareModal.innerHTML = this.fillShareModalHTML(file);
      shareModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
          e.preventDefault();
          this.router.routerDataEl.removeChild(shareModal);
      });
      shareModal.querySelector("#copyLinkhBtn").addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
          // поддержка имеется, включить соответствующую функцию проекта.
          const sharelink2 = shareModal.querySelector('#modalShareLink');
          navigator.clipboard.writeText(sharelink2.textContent)
          .then(() => {
            // Получилось!
          })
          .catch(err => {
            console.log('Something went wrong', err);
          });
        } else {
          alert("Sorry. Update your browser");
        }
    });
      shareModal.querySelector("#modalSwitchBtn").addEventListener('click', (e) => {
          e.preventDefault();
          loadingON();
          setTimeout(() => { 
          e.target.disabled = true;
          const sharelink = shareModal.querySelector('#modalShareLink');
          if(!file.Shared) {
            const result = this.enableSharingRequest(file.ID);
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
          loadingOFF();
        }, 100);
      });
      return shareModal;
  }
  enableSharingRequest(fileId) {
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH',`${this.api}u/${userId}/share/enable?elementId=${fileId}`,false);
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
      XHR.open( 'PATCH',`${this.api}u/${userId}/share/disable?elementId=${fileId}`,false);
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
              <h4 class="up_ShareModal__filesize">${(file.Type == 1) ? this.convertFileSize(file.Length) : ""} </h4>
              <p class="up_ShareModal__p">Share link: <a href="${sharelink} " class="up_ShareModal__sharelink" id="modalShareLink">${sharelink}</a></p>
              <div class="up_ShareModal__btns">
                  <button class="up_ShareMOdal__CloseBtn" id="modalCloseBtn">Close</button>
                  <button class="up_ShareMOdal__SwitchSBtn" id="modalSwitchBtn">${(file.Shared) ? "Disable" : "Enable"} sharing</button>
                  <button class="up_ShareMOdal__SwitchSBtn" id="copyLinkhBtn">Copy link</button>
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
      this.router.routerDataEl.removeChild(renameModal);
    });
    renameModal.querySelector("#modalRenameBtn").addEventListener('click', (e) => {
      e.preventDefault();
      loadingON();
      setTimeout(() => {
        loadingOFF();
      let newName = renameModal.querySelector('#newName').value;
      renameModal.querySelector('#newName').select();
      newName = newName.replace("/",'\\');
      let result;
      if(file.Type == 1)
        result = this.renameFileRequest(file.ID, newName);
      else
        result = this.renameFolderRequest(file.ID, newName);
      if(result.status == 200) {
        file.Name = newName;
        if(file.Type == 1)
          this.updateFileNameEl(file.ID, newName);
        else
          this.updateFolderNameEl(file.ID, newName);
          this.router.routerDataEl.removeChild(renameModal);
      }
      else {
        const renameBtns = renameModal.querySelector("#RenameModal__btns");
        const renameBtn = renameModal.querySelector("#modalRenameBtn");
        renameBtns.removeChild(renameBtn);
        const renameText = renameModal.querySelector("#RenameModal_text");
        renameText.innerHTML ="Error occured during operation. Try again later.";
      } 
      },100);
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
  updateFolderNameEl(fileId, newName) {
    let filename = newName.substring(0, Math.min(newName.length,40));
    if(filename.length < newName.length)
      filename = filename + "...";
    const fileBox = document.querySelector(`#folder_${fileId}`);
    fileBox.querySelector('.up_mainSection__file-name').textContent = newName;
  }
  rename(file_id) {
    var file = this.getFileData(file_id);
    if(file != null) {
      const renameModal = this.createRenameModal(file);
      this.router.routerDataEl.appendChild(renameModal);
    }
  }
  renameFileRequest(fileId, newName) { 
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', `${this.api}u/${userId}/files/rename?fileId=${fileId}&name=${newName}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR;
    } catch (error) {
      return null;
    }
  }
  renameFolderRequest(folderId, newName) { 
    const userId = this.auth.getUserId();
    try {
      const XHR = new XMLHttpRequest();
      XHR.open( 'PATCH', `${ this.api}u/${userId}/dir/rename?dirId=${folderId}&name=${newName}`,false);
      XHR.setRequestHeader('Content-Type', 'application/json');
      XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
      XHR.send();
      return XHR;
    } catch (error) {
      return null;
    }
  }
  newFolderRequest(newName) {
      const userId = this.auth.getUserId();
      const actualDirId = this.files.ID;
      try {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', `${this.api}u/${userId}/dir/create?dirId=${actualDirId}&name=${newName}`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
        XHR.send();
        return XHR; 
      } catch (error) {}
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
      this.router.routerDataEl.removeChild(newFolderModal);
    });
    newFolderModal.querySelector('#newName').addEventListener('keyup', _ => {
      const newFolderText = newFolderModal.querySelector("#newFolderModal_text");
      newFolderText.innerHTML = '';
    });
    newFolderModal.querySelector("#modalCreateBtn").addEventListener('click', (e) => {
      e.preventDefault();
      const newName = newFolderModal.querySelector('#newName').value;
      if(newName.length > 0) {
        const result = this.newFolderRequest(newName);
        if(result.status == 200) {
          this.router.routerDataEl.removeChild(newFolderModal);
          const newFolder = JSON.parse(result.response);
          const folderElement = this.createFolderTemplate(newFolder);
          document.querySelector('#fileList').appendChild(folderElement);
          this.files.directories.push(newFolder);
        }
        else {
          const newFolderBtns = newFolderModal.querySelector("#newFolderModal__btns");
          const newFolderBtn = newFolderModal.querySelector("#modalCreateBtn");
          //newFolderBtns.removeChild(newFolderBtn);
          const newFolderText = newFolderModal.querySelector("#newFolderModal_text");
          newFolderText.innerHTML ="Error occured durring operation. Try again.";
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
    this.router.routerDataEl.appendChild(newFolderModal);
    
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
                              </div>`;
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
                                  ${this.convertFileSize(file.Length)}
                                </span>
                              </div>`;               
    return fileElement;
  }
  createShFileTmpWithDwnl(file, shareId) {
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
                                  ${this.convertFileSize(file.Length)}
                                </span>
                                <span id="sharedDownloadBtn"><i class="icon-download"></i></span>
                              </div>`;
    fileElement.querySelector("#sharedDownloadBtn").addEventListener('click', (e) => {
      const a = document.createElement('a');
      a.href = `${this.api}shared/${shareId}?fileId=${file.ID}`;
      a.download = file.Name;
      a.click();
    });               
    return fileElement;
  }
  createShDirTmpWithDwnl(file,shareId) {
    const fileElement = document.createElement('li');
    fileElement.id = `folder_${file.ID}`;
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
                                <span id="sharedDownloadBtn"><i class="icon-download"></i></span>
                              </div>`;
    fileElement.querySelector("#sharedDownloadBtn").addEventListener('click', (e) => {
      const a = document.createElement('a');
      a.href = `${this.api}shared/${shareId}?fileId=${file.ID}`;
      a.download = file.Name;
      a.click();
    });               
    return fileElement;
  }


  searcher(){
    const searchBox = document.createElement('div');
    searchBox.classList.add('up_SearcherModal');
    searchBox.innerHTML = `
    <header>
        <h2 class="up_SearcherModal__header">Search files</h2>
    </header>
    <div class="up_SearcherModal__content">
        <h3 class="up_SearcherModal__name">Search:</h3>
        <input type="search" name="searcher" id="searcher" class="up_SearcherModal__searchText"/>
        <div class="up_SearcherModal__filter", id="searcherFilter"></div>
        <p class="up_SearcherModal__p" id="SearcherModal_text"></p>
        <div class="up_SearcherModal__btns" id="SearcherModal__btns">
            <button class="up_SearcherModal__CloseBtn" id="modalCloseBtn">Close</button>
            <button class="up_SearcherModal__FilterBtn" id="modalFilterBtn">Filter</button>
            <button class="up_SearcherModal__SearchBtn" id="modalSearchBtn">Search</button>
        </div>
    </div>`;
    searchBox.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
      e.preventDefault();
      document.body.removeChild(searchBox);
    });
    searchBox.querySelector('#searcher').addEventListener('input', (e) =>{
      e.preventDefault();
      this.searchText = searchBox.querySelector('#searcher').value;
    })
    searchBox.querySelector("#modalFilterBtn").addEventListener('click', (e) => {
      e.preventDefault();
      const filterBox = searchBox.querySelector("#searcherFilter");
      if (filterBox.querySelector("#searcherFilterOptions") == null){
        filterBox.innerHTML = `
        <div class="up_SearcherModal__filter" id="searcherFilterOptions">Sort by:
        <table>
          <ul class="up_SearcherModal__filterOption">
            <li><input type="checkbox" id="searcherFilterOptions_name">Name
            <select id="searcherNameFilter">
              <option value="Contains">Contains</option>
              <option value="Eq">Equal</option>
              <option value="Ne">Not equal</option>
            </select>
            </li>
            <li><input type="checkbox" id="searcherFilterOptions_date">Date
            <select id="searcherDateFilter">
              <option value="Eq">Equal</option>
              <option value="Ne">Not equal</option>
              <option value="Lt">Less than</option>
              <option value="Lte">Less than equal</option>
              <option value="Gt">Greater than</option>
              <option value="Gte">Greater than equal</option>
            </select>
            <input type="date" id="searcherDateFilter_date"></input>
            <input type="time" id="searcherDateFilter_time"></input>
            </li>
            <li><input type="checkbox" id="searcherFilterOptions_size">Size
            <select id="searcherSizeFilter">
              <option value="Eq">Equal</option>
              <option value="Ne">Not equal</option>
              <option value="Lt">Less than</option>
              <option value="Lte">Less than equal</option>
              <option value="Gt">Greater than</option>
              <option value="Gte">Greater than equal</option>
            </select>
            <input type="number" id="searcherSizeFilter_value"></input>
            </li>
          </ul>
        </table>
        </div>`;
      } else {
        filterBox.innerHTML = ``;
        //searchBox.removeChild(filterBox);
      }
    });
    searchBox.querySelector("#modalSearchBtn").addEventListener('click', (e) => {
      this.searching = true;
      this.searcherRequest();
      document.body.removeChild(searchBox);
      setTimeout(this.router.loadRoute('results'), 1000);
    });
    return searchBox;
  }

  searcherRequest(){
    var fileList = new Object();
      fileList.Name = new Object();
        fileList.Name.Contains = [];
        fileList.Name.Contains.push(this.searchText);

    console.log(this.files.ParentID)

    const filterBox = document.getElementById('searcherFilterOptions');
    if (filterBox != null){
      if (filterBox.value != ''){
        const options = ['searcherFilterOptions_name', 'searcherFilterOptions_date', 'searcherFilterOptions_size'];
        
        options.forEach(val => {
          
          const check = document.getElementById(val);
            console.log(check);
            switch (val){
              case 'searcherFilterOptions_name':
                if(check.checked == true){
                  const logic = document.getElementById('searcherNameFilter').value;
                  if (logic != 'Contains'){
                    delete fileList.Name.Contains;
                    fileList.Name[logic] = [this.searchText];
                  }
                }
                break;
              case 'searcherFilterOptions_date':
                if(check.checked == true){
                  const logic = document.getElementById('searcherDateFilter').value;
                  if (fileList['Modified'] == null){
                    fileList.Modified = new Object();
                  }
                  var dateVal = document.getElementById('searcherDateFilter_date').value;
                  const timeVal = "T" + document.getElementById('searcherDateFilter_time').value + ":00";
                  if(dateVal == '' || timeVal == ''){
                    dateVal = new Date();
                    fileList.Modified[logic] = dateVal.toJSON();
                  } else {
                    fileList.Modified[logic] = dateVal+timeVal;
                  }
                }  
                break;
              case 'searcherFilterOptions_size':
                if(check.checked == true){
                  if (fileList['Metadata'] == null){
                    fileList.Metadata = new Object();
                  }
                    const logic = document.getElementById('searcherSizeFilter').value;
                    const valueInput = document.getElementById('searcherSizeFilter');
                    var number = 0
                    if (valueInput != null){
                      number = document.getElementById('searcherSizeFilter_value').value;
                    }
                    fileList.Metadata.Length = new Object();
                    fileList.Metadata.Length[logic] = [number];
                  
                }
                break;
            }
          });
        //console.log(JSON.stringify(fileList));
      }
    //const XHR = new XMLHttpRequest();
    //XHR.open();
    }
    
  const send = JSON.stringify(fileList)
  console.log(send);

  const XHR = new XMLHttpRequest();
  XHR.open( 'GET', this.api + `u/${this.auth.getUserId()}/dir/search?searchRoot=${this.files.ParentID}`,false);
  XHR.setRequestHeader('Content-Type', 'application/json');
  XHR.setRequestHeader("Authorization", "Bearer " + this.auth.getUserToken());
  XHR.send(send);
  if(XHR.status == 200){
    this.results = XHR.response;
  }

  }

  checkSearch(){
    if(this.searching !== true){
      this.router.loadRoute('files');
    } else {
      document.getElementById('fileList').innerHTML = this.results;
    }
  }

}

export default FileOperator;
