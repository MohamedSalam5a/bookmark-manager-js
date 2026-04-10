/*            start Global                   */
var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var bookmarksList = [];
/*             End Global                   */

if (localStorage.getItem("saveToLocalStorage") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("saveToLocalStorage"));
  displayBookmarks();
}



//Add Bookmarks
function addBookmark() {
  if (
    
    ValidationInput(siteName, "msgName") &&
    ValidationInput(siteUrl, "msgurl")
  ) {
    var bookmark = {
      name: siteName.value.trim(),
      url: siteUrl.value.trim(),
    };

    bookmarksList.push(bookmark);
    displayBookmarks();
    localStorage.setItem("saveToLocalStorage", JSON.stringify(bookmarksList));
    clearBookmark();
    colsebtn()
  }
}

//clearBookmark
function clearBookmark() {
  siteName.value = null;
  siteUrl.value = null;

  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

//displayBookmarks
function displayBookmarks() {
  var box = "";

  for (var i = 0; i < bookmarksList.length; i++) {
    box += `   <tr>
                    <td>${i + 1}</td>
                    <td>${bookmarksList[i].name}</td>
                    <td><button  onclick="visitWebsite(${i})" type="button" class="btn btn-success">Visit</button></td>
                    <td><button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger">Delete</button></td>
                </tr>`;
  }
  document.getElementById("dataBookMark").innerHTML = box;
}
//visitWebsite
function visitWebsite(index) {
  open(bookmarksList[index].url, "_blank");
  displayBookmarks();
}
// deleteBookmark
function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("saveToLocalStorage", JSON.stringify(bookmarksList));
  displayBookmarks();
}

//===============Validation===================

function ValidationInput(element, idMsg) {
  var regex = {
    bookmarkName: /^[a-zA-Z]{3,15}( [a-zA-Z]{1,15})?$/,
    siteUrl:
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,
  };
  var textValid = element.value;
  var idMsg = document.getElementById(idMsg);

  if (regex[element.id].test(textValid)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    idMsg.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    idMsg.classList.remove("d-none");
    return false;
  }
}


