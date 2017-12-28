const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){
        if(xhr.status>= 200 && xhr.status < 300 || xhr.status === 304){
            alert(xhr.responseText)
        }
    }
}
xhr.onerror = function (err) {

    debugger

}

xhr.open('get','http://www.baidu.com/index.html', true)

xhr.send(null)

