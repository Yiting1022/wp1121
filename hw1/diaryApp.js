let currentDiaryCard;  // 用於保存當前正在編輯或查看的日記卡的索引。在這個簡單的範例中，我們將使用一個數組來儲存所有日記卡。

let diaries = [];  // 存放所有日記卡的數組。

function openNewDiary() {
    currentDiaryCard = null;  // 新日記卡沒有索引
    document.getElementById("diaryEditText").value = "";
    document.getElementById("viewMode").style.display = "none";
    document.getElementById("editMode").style.display = "block";
    document.getElementById("diaryPage").style.display = "block";
}

function switchToEditMode() {
    document.getElementById("diaryEditText").value = currentDiaryCard ? diaries[currentDiaryCard].content : "";
    document.getElementById("viewMode").style.display = "none";
    document.getElementById("editMode").style.display = "block";
}

function saveDiary() {
    let diaryText = document.getElementById("diaryEditText").value;
    let tag = document.getElementById("tags").value;
    let mood = document.getElementById("moods").value;
    let currentDate = new Date();
    let formattedDate = `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')} (${['日', '一', '二', '三', '四', '五', '六'][currentDate.getDay()]})`;

    if (currentDiaryCard !== null) {
        // 更新已有的日記卡
        diaries[currentDiaryCard].content = diaryText;
        diaries[currentDiaryCard].tag = tag;
        diaries[currentDiaryCard].mood = mood;
    } else {
        // 新增新的日記卡
        diaries.push({
            date: formattedDate,
            content: diaryText,
            tag: tag,
            mood: mood
        });

        // 在首頁顯示新的日記卡
        let diaryCardsDiv = document.getElementById("diaryCards");
        let newCard = document.createElement("div");
        newCard.innerHTML = `
            <strong>${formattedDate}</strong><br>
            標籤: ${tag}<br>
            心情: ${mood}<br>
        `;
        newCard.onclick = function() {
            // 當點擊日記卡時設置 currentDiaryCard 並顯示內容
            currentDiaryCard = diaries.length - 1;  // 最新的日記卡索引
            document.getElementById("diaryContent").innerText = diaryText;
            document.getElementById("viewMode").style.display = "block";
            document.getElementById("editMode").style.display = "none";
            document.getElementById("diaryPage").style.display = "block";
        };
        diaryCardsDiv.appendChild(newCard);
    }

    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";
}

function cancelEdit() {
    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";
    if (currentDiaryCard === null) {
        // 如果是新的日記卡，返回首頁
        document.getElementById("diaryPage").style.display = "none";
    }
}
