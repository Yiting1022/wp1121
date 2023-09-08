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

    document.getElementById('diaryPage').style.display = 'none';
    renderDiaries();
}

function cancelDiary() {
    document.getElementById('diaryPage').style.display = 'none';
}

function renderDiaries() {
    const diaryList = document.getElementById('diaryList');
    diaryList.innerHTML = "";

    diaries.forEach((diary, index) => {
        const diaryCard = document.createElement('div');
        diaryCard.className = 'diaryCard';
        diaryCard.innerHTML = `
            <p>${diary.date}</p>
            <p>標籤: ${diary.tag}</p>
            <p>心情: ${diary.mood}</p>
            <p>${diary.content.slice(0, 100)}${diary.content.length > 100 ? '...' : ''}</p>
            <button onclick="editDiary(${index})">編輯</button>
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
