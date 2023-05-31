// 日時をいい感じの形式にする関数
function convertTimestampToDatetime(timestamp) {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}
// Firebaseからのコピー 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "",
    authDomain: "column-19691.firebaseapp.com",
    projectId: "column-19691",
    storageBucket: "column-19691.appspot.com",
    messagingSenderId: "1076543854909",
    appId: "1:1076543854909:web:29726f6c5534fb44e74d54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ↓追加
const db = getFirestore(app);


// column.html

$("#send").on("click", function () {
    // 送信時に必要な処理
    // cloumn.html

    const postData = {

        time: serverTimestamp(),
        date: $("#date").val(),
        category: $("#category").val(),
        app_name: $("#app_name").val(),
        comment: $("#comment").val(),

    };
    addDoc(collection(db, "column"), postData, {
        merge: true,
    });
    $("#date").val("");
    $("#category").val("");
    $("#app_name").val("");
    $("#comment").val("");
    // time: serverTimestamp(),
});

// データ取得処理（毎回、同じ）
const q = query(collection(db, "column"), orderBy("time", "desc"));

onSnapshot(q, (querySnapshot) => {
    //【割と重要】querySnapshotは{ }内で！
    // const documents = querySnapshot.docs;
    console.log(querySnapshot.docs);

    // column.html
    // 前項の`console.log()`下に記述

    const documents = [];
    querySnapshot.docs.forEach(function (doc) {
        const document = {
            id: doc.id,
            data: doc.data(),
        };
        documents.push(document);
    });

    console.log(documents);

    const htmlElements = [];
    documents.forEach(function (document) {
        htmlElements.push(`
     <tr>
            <td class="date">${document.data.date}</td>
            <td class="category">${document.data.category}</td>
            <td class="app_name">${document.data.app_name}</td>
            <td class="comment">${document.data.comment}</td>
        </tr>
    
  `);
        // });

        $("#table tbody").html(htmlElements.join(''));
    });
    //ここまでは毎回同じ

    // テーブルを生成
    const tableBody = documents.map(doc => {
        return `
        <tr>
            <td class="date">${doc.data.date}</td>
            <td class="category">${doc.data.category}</td>
            <td class="app_name">${doc.data.app_name}</td>
            <td class="comment">${doc.data.comment}</td>
        </tr>
    `;
    });

    $("table tbody").html(tableBody.join(''));

});


// //clearクリック
$(function () {
    const COLUMN_LIST = "column_list";
    window.COLUMN_LIST = COLUMN_LIST;
    // });

    $("#clear").on("click", function () {
        removeLocalStorage(COLUMN_LIST);
        $("table tbody tr").remove();
    });
});
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}


