// script.js
document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notesContainer');
    const searchTermInput = document.getElementById('searchTerm');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const showAddNoteModalBtn = document.getElementById('showAddNoteModalBtn');
    const noteModal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const cancelNoteBtn = document.getElementById('cancelNoteBtn');
    const colorPalette = document.querySelectorAll('.color-palette .bg-color');
    const perevodRuQwerty = document.querySelector('.perevod-ru-qwerty');
    const perevodUzQwerty = document.querySelector('.perevod-uz-qwerty');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let editingIndex = null;
    let selectedColor = null;
  
    function renderNotes() {
      notesContainer.innerHTML = '';
      const searchTerm = searchTermInput.value.toLowerCase();
      const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) && 
        (selectedColor === null || note.filterColor === selectedColor)
      );
  
if(perevodRuQwerty.style.display == "block"){
  filteredNotes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.className = 'block-content';
    noteElement.style.backgroundColor = note.color;
    noteElement.innerHTML = `
    <h3 class="h1">${note.title}</h3>
    <div class="data">
      <p><b class="perevod-text" data-ru="Дата:" data-uz="Sana:">Дата:</b> ${formatDate(note.date)} <b class="perevod-text" data-ru="Время:" data-uz="Vaqt:">Время:</b> ${formatTime(note.date)}</p>
    </div>
    <p class="zametki">${note.content}</p>
    <div class="delete-redacter">
      <div class="reducter btn-create" onclick="editNoteHandler(${index})">
        <img class="img-img-img" src="./assets/icon.svg" alt="" />
        <h3 class="perevod-text" data-ru="РЕДАКТИРОВАТЬ" data-uz="Tahrirlash">Tahrirlash</h3>
      </div>
      <div class="delete btn-ago" onclick="deleteNoteHandler(${index})">
        <img class="img-img-img" src="./assets/Vector.svg" alt="" />
        <h3 class="perevod-text" data-ru="Удалить" data-uz="Oʻchirish">Oʻchirish</h3>
      </div>
    </div>
  `;
    notesContainer.appendChild(noteElement);
  });
}
else{
  filteredNotes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.className = 'block-content';
    noteElement.style.backgroundColor = note.color;
    noteElement.innerHTML = `
    <h3 class="h1">${note.title}</h3>
    <div class="data">
      <p><b class="perevod-text" data-ru="Дата:" data-uz="Sana:">Дата:</b> ${formatDate(note.date)} <b class="perevod-text" data-ru="Время:" data-uz="Vaqt:">Время:</b> ${formatTime(note.date)}</p>
    </div>
    <p class="zametki">${note.content}</p>
    <div class="delete-redacter">
      <div class="reducter btn-create" onclick="editNoteHandler(${index})">
        <img class="img-img-img" src="./assets/icon.svg" alt="" />
        <h3 class="perevod-text" data-ru="РЕДАКТИРОВАТЬ" data-uz="Tahrirlash">РЕДАКТИРОВАТЬ</h3>
      </div>
      <div class="delete btn-ago" onclick="deleteNoteHandler(${index})">
        <img class="img-img-img" src="./assets/Vector.svg" alt="" />
        <h3 class="perevod-text" data-ru="Удалить" data-uz="Oʻchirish">Удалить</h3>
      </div>
    </div>
  `;
    notesContainer.appendChild(noteElement);
  });
}

    }

    function addNote() {
      const currentDate = new Date();
      const formattedDate = currentDate.getTime();
      const newNote = {
        title: noteTitleInput.value,
        content: noteContentInput.value,
        date: formattedDate,
        color: selectedColor !== null ? getColor(selectedColor) : undefined,
        filterColor: selectedColor,
      };
  
      if (editingIndex !== null) {
        notes[editingIndex] = newNote;
        editingIndex = null;
      } else {
        notes.push(newNote);
      }
      
      localStorage.setItem('notes', JSON.stringify(notes));
      closeNoteModal();
      renderNotes();
    }
  
    function deleteNoteHandler(index) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    }
  
    function editNoteHandler(index) {
      editingIndex = index;
      const note = notes[index];
      noteTitleInput.value = note.title;
      noteContentInput.value = note.content;
      selectedColor = note.filterColor;
      applyModalColor(note.filterColor);
      modalTitle.textContent = 'Edit Note';
      showNoteModal();
    }
  
    function formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }
  
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  
    function getColor(index) {
      switch(index) {
        case 1: return '#fbbaeb';
        case 2: return '#d292ff';
        case 3: return '#fff292';
        case 4: return '#92caff';
        case 5: return '#ff9292';
        default: return '';
      }
    }
  
    function applyModalColor(colorIndex) {
      const color = getColor(colorIndex);
      noteModal.querySelector('.menu-modal').style.background = color || '';
    }
  
    function showNoteModal() {
      noteModal.style.display = 'flex';
      applyModalColor(selectedColor);
    }
  
    function closeNoteModal() {
      noteModal.style.display = 'none';
      noteTitleInput.value = '';
      noteContentInput.value = '';
      selectedColor = null;
      modalTitle.textContent = 'Add Note';
      applyModalColor(selectedColor);
    }
  
    function filterNotesByColor(colorIndex) {
      selectedColor = colorIndex !== 'null' ? parseInt(colorIndex) : null;
      renderNotes();
    }
  
    searchTermInput.addEventListener('input', renderNotes);
    clearSearchBtn.addEventListener('click', () => {
      searchTermInput.value = '';
      renderNotes();
    });
    showAddNoteModalBtn.addEventListener('click', showNoteModal);
    cancelNoteBtn.addEventListener('click', closeNoteModal);
    saveNoteBtn.addEventListener('click', addNote);
  
    colorPalette.forEach(color => {
      color.addEventListener('click', (event) => {
        selectedColor = parseInt(event.target.getAttribute('data-color'));
        applyModalColor(selectedColor);
        filterNotesByColor(event.target.getAttribute('data-color'));
      });
    });

    renderNotes();
  
    window.editNoteHandler = editNoteHandler;
    window.deleteNoteHandler = deleteNoteHandler;
  });
  
  
  let searchBtn = document.querySelector('.search-btn');
  let deleteTextInput = document.querySelector('.delete-text-input');
  let search = document.querySelector('.search');
  let deleteTextSearchContent = document.querySelector('.delete-text-search-content');
  let spisokMunuList = document.querySelector('.spisok-munu-list');
  let createList = document.querySelector('.create-list');
  const perevodTextFun = document.querySelector('.perevod-text-fun');
  const deleteRedacter = document.querySelectorAll('.delete-redacter');
  const perevodRuQwerty = document.querySelector('.perevod-ru-qwerty');
  const perevodUzQwerty = document.querySelector('.perevod-uz-qwerty');
  // const elements = document.querySelectorAll('.intro_btn')
  
  
  spisokMunuList.addEventListener('click', function(){
      const blockContent = document.querySelectorAll('.block-content');
        const data = document.querySelectorAll('.data');
        const zametki = document.querySelectorAll('.zametki');
        const deleteRedacter = document.querySelectorAll('.delete-redacter');
        const imgSpisok = document.querySelector('.img-spisok');
        const h3Zametka = document.querySelector('.h3-zametka');
        const h1= document.querySelector('.h1');
        if(h3Zametka.innerHTML === "Список"){
  
          h3Zametka.innerText = "Сетка";
          // imgSpisok.src = "./assets/Vector (1).svg";
  
          blockContent.forEach(item => {
              item.style.width = "95%";
              item.style.maxHeight = "fit-content";
              if(item.style.display === "none"){
                item.style.display = "none";
              }
              else if(item.style.display === "block"){
                item.style.display = "flex";
              }
              item.style.alignItems = "start";
              item.style.justifyContent = "space-around";
              item.style.flexWrap = "wrap";
            });
      
            data.forEach(item => {
              item.style.top = "10px";
              item.style.right = "10px";
              item.style.marginTop = "0%";
            });
      
            deleteRedacter.forEach(item => {
              item.style.justifyContent = "end";
            });
      
            zametki.forEach(item => {
              item.style.marginBottom = "10%";
              item.style.maxHeight = "fit-content";
              
            });
        }
        else{
  
          h3Zametka.innerHTML = "Список";
          // imgSpisok.src = "./assets/Vector.png";
  
          blockContent.forEach(item => {
              item.style.width = "25vw";
              item.style.minHeight = "25vw";
              if(item.style.display === "none"){
                item.style.display = "none";
              }
              else if(item.style.display === "flex"){
                item.style.display = "block";
              }
              item.style.flexWrap = "nowrap";
            });
      
            data.forEach(item => {
              item.style.marginTop = "2%";
            });
      
            deleteRedacter.forEach(item => {
              item.style.justifyContent = "center";
            });
      
            zametki.forEach(item => {
              item.style.marginBottom = "5vh";
              item.style.minHeight = "1vh";
              item.style.maxHeight = "15vh";
            });
        }        
  
  })
  
  
  searchBtn.addEventListener('click', function(){
    deleteTextInput.style.display = "block";
      search.style.display = "flex";
      deleteTextSearchContent.style.display = "block";
      searchBtn.style.display = "none";
      createList.style.display = "none";
      perevodTextFun.style.display = "none";
      deleteRedacter.forEach(item => {
        item.style.display = "none";
      });
  });
  
  deleteTextInput.addEventListener('click', function(){
      search.style.display = "none";
      deleteTextSearchContent.style.display = "none";
      searchBtn.style.display = "block";
      deleteTextInput.style.display = "none";
      createList.style.display = "flex";
      perevodTextFun.style.display = "block";
      deleteRedacter.forEach(item => {
        item.style.display = "flex";
      });
  });
  
  
  
  
  document.getElementById('perevod-ru').addEventListener('click', function () {
    translate('ru');
    perevodUzQwerty.style.display = 'block';
    perevodRuQwerty.style.display = 'none';
  });
  
  document.getElementById('perevod-uz').addEventListener('click', function () {
    translate('uz');
    perevodRuQwerty.style.display = 'block';
    perevodUzQwerty.style.display = 'none';
  });
  
  function translate(lang) {
    var elements = document.getElementsByClassName('perevod-text');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      
      // Вставляем соответствующий перевод текста.
      if (lang === 'ru') {
        element.textContent = element.getAttribute('data-ru');
      } else if (lang === 'uz') {
        element.textContent = element.getAttribute('data-uz');
      }
    }
  }
  

