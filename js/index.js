document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // 
    if (validateForm()) {
        addBookmark();
    } else {
        showAlert();
    }
});

var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxInfo = document.querySelector(".box-info");

var bookmarkList;

if (localStorage.getItem("Bookmark") == null) {
    bookmarkList = [];
} else {
    bookmarkList = JSON.parse(localStorage.getItem("Bookmark"));
}

function addBookmark() {
    var bookmark = {
        Name: bookmarkName.value,
        Url: bookmarkUrl.value
    };

    bookmarkList.push(bookmark);
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkList));
    clearForm();
    display();
}

function display() {
    var cartona = "";

    for (var i = 0; i < bookmarkList.length; i++) {
        cartona += `
          <tr>
            <td>${i + 1}</td>
            <td>${bookmarkList[i].Name}</td>
            <td><a href="${bookmarkList[i].Url}" class="btn btn-visit" target="_blank"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
            <td><button class="btn btn-delete" onclick="deleteBookmark(${i})"><i class="fas fa-trash-alt"></i> Delete</button></td>
          </tr>
        `;
    }
    tableContent.innerHTML = cartona;
}

function clearForm() {
    bookmarkName.value = "";
    bookmarkUrl.value = "";
}

function deleteBookmark(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkList));
    display();
}

function validateForm() {
    var name = bookmarkName.value.trim();
    var url = bookmarkUrl.value.trim();
    var validUrlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (name.length >= 3 && validUrlPattern.test(url)) {
        bookmarkName.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");
        return true;
    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        return false;
    }
}

function showAlert() {
    boxInfo.classList.remove("d-none");
}

closeBtn.addEventListener("click", function() {
    boxInfo.classList.add("d-none");
});

document.addEventListener("DOMContentLoaded", display);