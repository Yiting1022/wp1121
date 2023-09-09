let diaries = [];
let isEditing = false;
let currentDiaryIndex = -1;

function createDiary() {
    document.getElementById('diaryPage').style.display = 'block';

    const date = new Date();
    const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]})`;
    document.getElementById('diaryDate').innerText = formattedDate;
    
    isEditing = false;
    currentDiaryIndex = -1;

}

function saveDiary() {
    const diary = {
        date: document.getElementById('diaryDate').innerText,
        tag: document.getElementById('diaryTag').value,
        mood: document.getElementById('diaryMood').value,
        content: document.getElementById('diaryContent').value
    };

    if (isEditing) {
        diaries[currentDiaryIndex] = diary;
    } else {
        diaries.push(diary);
    }
    document.getElementById('diaryContent').value = '';
    document.getElementById('diaryPage').style.display = 'none';
    filterByTag();
}

function cancelDiary() {
    document.getElementById('diaryPage').style.display = 'none';
}

function renderDiaries(filteredDiaries) {
    const diaryList = document.getElementById('diaryList');
    diaryList.innerHTML = "";

    filteredDiaries.forEach((diary, index) => {
        const diaryCard = document.createElement('div');
        diaryCard.className = 'diaryCard';
        diaryCard.innerHTML = `
            <p>${diary.date}</p>
            <p>
                <span class="highlighted_1">${diary.tag}</span>
                <span class="highlighted_2">${diary.mood}</span>
            </p>
            <p>${diary.content.slice(0, 100)}${diary.content.length > 100 ? '...' : ''}</p>
            <button onclick="editDiary(${index})">編輯</button>
            <button onclick="deleteDiary(${index})">刪除</button> 
        `;
        diaryList.appendChild(diaryCard);
    });
}
function editDiary(index) {
    isEditing = true;
    currentDiaryIndex = index;
    const diary = diaries[index];

    document.getElementById('diaryDate').innerText = diary.date;
    document.getElementById('diaryTag').value = diary.tag;
    document.getElementById('diaryMood').value = diary.mood;
    document.getElementById('diaryContent').value = diary.content;
    document.getElementById('diaryPage').style.display = 'block';

}

function addNewTagOption() {
    const selectElement = document.getElementById('diaryTag');
    const filterElement = document.getElementById('filterTag');
    const newTagInput = document.getElementById('newTagInput');


    // 檢查輸入框是否有內容且該選項還不存在於 <select> 中
    if (newTagInput.value && ![...selectElement.options].some(option => option.value === newTagInput.value)) {
        const newOption = document.createElement('option');
        newOption.value = newTagInput.value;
        newOption.textContent = newTagInput.value;
        newFilterOption = newOption.cloneNode(true);    // 複製一個新的 <option> 元素
    
        
        // 新增新的選項到 <select> 元素
        selectElement.appendChild(newOption);
        filterElement.appendChild(newFilterOption);

        // 清空輸入框的內容
        newTagInput.value = '';
    } else {
        alert('該標籤已存在或輸入框是空的！');
    }
}
function addNewMoodOption() {
    const selectElement = document.getElementById('diaryMood');
    const filterElement = document.getElementById('filterMood');
    const newMoodInput = document.getElementById('newMoodInput');

    // 檢查輸入框是否有內容且該選項還不存在於 <select> 中
    if (newMoodInput.value && ![...selectElement.options].some(option => option.value === newMoodInput.value)) {
        const newOption = document.createElement('option');
        newOption.value = newMoodInput.value;
        newOption.textContent = newMoodInput.value;
        newFilterOption = newOption.cloneNode(true);    // 複製一個新的 <option> 元素
        
        // 新增新的選項到 <select> 元素
        selectElement.appendChild(newOption);
        filterElement.appendChild(newFilterOption);

        // 清空輸入框的內容
        newMoodInput.value = '';
    } else {
        alert('該心情標籤已存在或輸入框是空的！');
    }
}
function filterByTag() {
    const selectedTag = document.getElementById('filterTag').value;
    const selectedMood = document.getElementById('filterMood').value;
    let filteredDiaries = diaries;
    
    if (selectedTag !== 'all') {
        filteredDiaries = filteredDiaries.filter(diary => diary.tag === selectedTag);
    }
    
    if (selectedMood !== 'all') {
        filteredDiaries = filteredDiaries.filter(diary => diary.mood === selectedMood);
    }
    renderDiaries(filteredDiaries);

}

function deleteDiary(index) {
    // 確認用戶是否真的想刪除這篇日記
    const isConfirmed = window.confirm("確定要刪除這篇日記嗎？");
    if (isConfirmed) {
        diaries.splice(index, 1);  // 從陣列中刪除該日記
        filterByTag();  // 重新渲染日記列表
    }
}


window.onload = function() {
    filterByTag();
}


