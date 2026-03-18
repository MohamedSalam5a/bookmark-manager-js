/*            start Global                   */
var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var bookmarksList = [];
/*             End Global                   */

if (localStorage.getItem("saveToLocalStorage") !== null) {
    bookmarksList = JSON.parse(localStorage.getItem("saveToLocalStorage"));
    displayBookmarks();
}

// Add Bookmarks
function addBookmark() {
    if (ValidationName() && ValidationUrl()) {
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value,
        }

        bookmarksList.push(bookmark);
        displayBookmarks();
        localStorage.setItem("saveToLocalStorage", JSON.stringify(bookmarksList));
        console.log(bookmarksList);
        clearBookmark()
    }
}

//clearBookmark
function clearBookmark() {
    siteName.value = null;
    siteUrl.value = null;

    siteName.classList.remove("is-valid")
    siteUrl.classList.remove("is-valid")
}

//displayBookmarks
function displayBookmarks() {
    var box = "";

    for (var i = 0; i < bookmarksList.length; i++) {
        box += `   <tr>
                    <td>${i + 1}</td>
                    <td>${bookmarksList[i].name}</td>
                    <td><button  onclick="visitWebsite(${i})" type="button" class="btn btn-warning">Visit</button></td>
                    <td><button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger">Delete</button></td>
                </tr>`;
    }
    document.getElementById("dataBookMark").innerHTML = box;
}
//visitWebsite
function visitWebsite(index) {
    open(bookmarksList[index].url, "_blank")
    displayBookmarks()
}
// deleteBookmark
function deleteBookmark(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("saveToLocalStorage", JSON.stringify(bookmarksList));
    displayBookmarks();
}

//===============Validation===================
function ValidationName() {
    var regex = /^[a-zA-Z]{3,15}( [a-zA-Z]{1,15})?$/
    var termData = siteName.value;
    var msgName = document.getElementById("msgName");
    if (regex.test(termData)) {
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        msgName.classList.add("d-none")
        return true;

    } else {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        msgName.classList.remove("d-none")
        return false;
    }
}

function ValidationUrl() {
    var regex = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i
    var termData = siteUrl.value;
    var msgurl = document.getElementById("msgurl");
    if (regex.test(termData)) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        msgurl.classList.add("d-none")
        return true;

    } else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        msgurl.classList.remove("d-none")
        return false;
    }
}

//===================================

