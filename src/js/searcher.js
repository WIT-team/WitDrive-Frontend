    const JsonFile = `
    [
        {
        "ID": "5ec29d893daa4865780194e4",
        "Name": "testFile.txt",
        "Created": "2020-05-18T14:36:57.791Z",
        "Size": 1,
        "Shared": true
        },
        {
        "ID": "5ec2a5de92058c0ad4d17a16",
        "Name": "f.txt",
        "Created": "2020-05-18T15:12:30.492Z",
        "Size": 1,
        "Shared": true
        },
        {
        "ID": "5ec2ab8fa044ae19d0bea62c",
        "Name": "foto.jpg",
        "Created": "2020-05-18T15:36:47.936Z",
        "Size": 3954,
        "Shared": true
        }
    ]`

    const parsed = JSON.parse(JsonFile)

    let HTML_Code = `<ul class="mainSection__file-list" id="fileList">\n`

    for (let i = 0; i < parsed.length; i++) {
        HTML_Code += `<li class="mainSection__file" id=${parsed[i]["ID"]}>
                            <div class="mainSection__file-box" >
                            <span><i class="mainSection__file-icon icon-doc-inv"></i></span>
                            <span class="mainSection__file-name">
                                ${parsed[i]["Name"]}
                            </span>
                            <span class="mainSection__file-filesize">
                                ${parsed[i]["Size"]}
                            </span>
                            <span class="mainSection__file-uploadTime">
                                ${parsed[i]["Created"]} 
                            </span>
                        </div>
                    </li>`
    }

    console.log(parsed)

    document.getElementById("results").innerHTML = HTML_Code
