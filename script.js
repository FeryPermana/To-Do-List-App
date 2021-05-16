const formList = document.querySelector('#form-list');
const tulisList = document.querySelector('#tulis-list');
const WorkList = document.querySelector("#workList");

formList.addEventListener("submit", createList);
WorkList.addEventListener("click", ubahList);

function createList(e) {
    e.preventDefault();

    if (tulisList.value) {
        // membuat elemen li
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(tulisList.value));
        // membuat button delete
        const deleteList = document.createElement("a");
        deleteList.className = "d-flex justify-content-end text-decoration-none mb-2";
        deleteList.style = "margin-top: -20px;"
        deleteList.href = "#";

        const spanDelete = document.createElement("span");
        spanDelete.className = "badge bg-danger delete-list";
        spanDelete.innerHTML = "Delete";

        deleteList.appendChild(spanDelete);

        // membuat button selesai
        const selesaiList = document.createElement("a");
        selesaiList.className = "d-flex justify-content-end text-decoration-none";
        selesaiList.href = "#";

        const spanSelesai = document.createElement("span");
        spanSelesai.className = "badge bg-primary selesai-list";
        spanSelesai.innerHTML = "Selesai";

        selesaiList.appendChild(spanSelesai);

        // menggabungkan semua element
        li.appendChild(deleteList);
        li.appendChild(selesaiList);

        WorkList.appendChild(li);

        tulisList.value = "";

    } else {
        alert('Kamu belum tulis sesuatu silahkan tulis terlebih dahulu');
    }
}

function ubahList(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-list")) {
        if (confirm("Apakah anda yakin mau menghapus list ini ? ")) {
            const element = e.target.parentElement;
            const elementlist = element.parentElement;
            elementlist.remove();
        }
    } else if (e.target.classList.contains("selesai-list")) {
        if (confirm("Apakah anda yakin list ini sudah selesai")) {
            const element = e.target.parentElement;
            const elementlist = element.parentElement;
            elementlist.className = "list-group-item";
            elementlist.style = "background-color: #fcba03";
            elementlist.classList.add = "valid";
            element.remove();
        }
    }
}