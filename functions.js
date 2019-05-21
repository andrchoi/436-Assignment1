let samples = [
    "Hello world!",
    "I'm Commander Shepard and this is \n my favourite site on the internet",
    "test",
    "https://youtu.be/dQw4w9WgXcQ"
];

let i = 0;

function deleteMessage(id) {
    let message = document.getElementById(id);
    // if comments exist, do not remove element
    let comments = message.children[5]
    if (comments) {
        message.innerHTML = "<em>Message deleted.</em>" + comments.outerHTML;
    } else message.outerHTML = "";
}

function addReply(value, id) {
    let parent = document.getElementById(id);
    parent.children[4].outerHTML = "<button class=\"reply\" onclick=\"reply("+id+");\">Reply</button>";
    if (value!=="") {
        let comments = parent.children[5];
        let post = makePost(value);
        if (comments) {
            comments.innerHTML += post;
        } else {
            parent.innerHTML += "<ul class=\"replyMsg\">"+post+"</ul>"
        }
    }
}

function cancelReply(id) {
    let parent = document.getElementById(id);
    parent.children[4].outerHTML = "<button class=\"reply\" onclick=\"reply("+id+");\">Reply</button>";
}

function reply(id) {
    let parent = document.getElementById(id);
    // make text form for input
    parent.children[4].outerHTML = "<form onsubmit=\"addReply(this.text.value,"+id+"); return false;\">"+
        "<textarea name=\"text\" type=\"text\" value=\"\"></textarea>"+
        "<input type=\"submit\" value=\"Reply\"/>"+
        "<button onclick=\"cancelReply("+id+");\">Cancel</button></form>";
}

function makePost(value) {
    // create message and details in html and save in string variable
    let post = "<li id="+i+">";
    post += "<div><pre>"+value+"</pre></div><br />";
    let date = new Date().toString();
    let index = date.indexOf(":")+6;
    post += "<span class=\"date\">"+date.slice(0,index)+"</span>";
    post += "<button class=\"delete\" onclick=\"deleteMessage("+i+");\">Delete</button>";
    post += "<button class=\"reply\" onclick=\"reply("+i+");\">Reply</button>";
    post +="</li>";

    i++;
    return post;
}

function clearMsgField() {
    document.getElementById("msgField").value = "";
}

function addComment(value) {
    if (value !== "") {
        let messageList = document.getElementsByClassName("comments")[0];
        messageList.children[0].innerHTML += makePost(value);
        clearMsgField();
    }
}

function addSampleMessages() {
    samples.forEach(function(m) {
        addComment(m);
    })
}

function clearMessages() {
    let msgList = document.getElementsByClassName("comments")[0];
    msgList.children[0].innerHTML = "";
}