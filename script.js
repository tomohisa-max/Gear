// 初期化処理
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("item-input");
    const addButton = document.getElementById("add-btn");
    const itemList = document.getElementById("item-list");

    // ローカルストレージからデータを取得
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    savedItems.forEach(item => addItemToList(item.text, item.checked));

    // 持ち物を追加
    addButton.addEventListener("click", () => {
        const itemText = input.value.trim();
        if (itemText) {
            addItemToList(itemText, false); // 初期状態は未チェック
            saveItem(itemText, false);
            input.value = ""; // 入力フィールドをクリア
        }
    });

    // 持ち物をリストに追加する関数
    function addItemToList(itemText, isChecked) {
        const li = document.createElement("li");

        // チェックボックスを作成
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isChecked; // チェック状態を反映
        checkbox.addEventListener("change", () => {
            updateItem(itemText, checkbox.checked);
        });

        // テキスト部分を作成
        const span = document.createElement("span");
        span.textContent = itemText;

        // 削除ボタンを作成
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "削除";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            itemList.removeChild(li);
            removeItem(itemText);
        });

        // 各要素をリストアイテムに追加
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    }

    // ローカルストレージに保存する関数
    function saveItem(itemText, isChecked) {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        items.push({ text: itemText, checked: isChecked });
        localStorage.setItem("items", JSON.stringify(items));
    }

    // チェック状態を更新する関数
    function updateItem(itemText, isChecked) {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        const updatedItems = items.map(item =>
            item.text === itemText ? { ...item, checked: isChecked } : item
        );
        localStorage.setItem("items", JSON.stringify(updatedItems));
    }

    // ローカルストレージから削除する関数
    function removeItem(itemText) {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        const updatedItems = items.filter(item => item.text !== itemText);
        localStorage.setItem("items", JSON.stringify(updatedItems));
    }
});

