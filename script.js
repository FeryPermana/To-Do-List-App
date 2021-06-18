const formList = document.querySelector('#form-list');
const tulisList = document.querySelector('#tulis-list');
const WorkList = document.querySelector("#workList");
const cariList = document.querySelector('#cari-list');
const hapusSemuaList = document.querySelector("#hapus-semua-list");


document.addEventListener("DOMContentLoaded", tampilList);
formList.addEventListener("submit", createList);
WorkList.addEventListener("click", ubahList);
cariList.addEventListener("keyup", pencarianList);
hapusSemuaList.addEventListener("click", hapusListItem)

function tampilList() {
    const list = getList();

    list.forEach((kontent) => {
        const li = document.createElement("li");
        li.className = "list-group-item item-list";
        li.appendChild(document.createTextNode(kontent.isi));
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

        kontent.isi = "";
    });
}

function createList(e) {
    e.preventDefault();

    if (tulisList.value) {
        // membuat elemen li
        const li = document.createElement("li");
        li.className = "list-group-item item-list";
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

        tambahDataKeLocalStorage(tulisList.value);

        tulisList.value = "";

    } else {
        alert('Kamu belum tulis sesuatu silahkan tulis terlebih dahulu');
    }
}

function getList() {
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }

    return list;
}

function tambahDataKeLocalStorage(isiList) {
    const list = getList();

    list.push({
        status: 0,
        isi: isiList
    });

    localStorage.setItem("list", JSON.stringify(list));
}

function ubahList(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-list")) {
        if (confirm("Apakah anda yakin mau menghapus list ini ? ")) {
            const element = e.target.parentElement;
            const elementlist = element.parentElement;
            elementlist.remove();
            deleteListLocalStorage(elementlist);
        }
    } else if (e.target.classList.contains("selesai-list")) {
        if (confirm("Apakah anda yakin list ini sudah selesai")) {
            const element = e.target.parentElement;
            const elementlist = element.parentElement;
            elementlist.className = "list-group-item item-list selesai";
            // elementlist.style = "background-color: #fcba03";
            elementlist.classList.add = "valid";
            element.remove();
        }
    }
}

function deleteListLocalStorage(elementlist)
{
    const list = getList();

    list.forEach((kontent, index) => {
        if (elementlist.firstChild.textContent === kontent.isi) {
            list.splice(index, 1)
        }
    })
    localStorage.setItem("list", JSON.stringify(list));
    
}

function pencarianList(e) {
    const cariList = e.target.value.toLowerCase();
    let itemList = document.querySelectorAll(".item-list");

    itemList.forEach((item) => {
        const isiItem = item.firstChild.textContent.toLowerCase();

        if (isiItem.indexOf(cariList) != -1)
        {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important")
        }
    });
}

function hapusListItem() {
    if (confirm("Anda yakin mau menghapus semua list")) {
        WorkList.innerHTML = "";
    }
}