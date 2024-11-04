// Astept ca intregul document sa fie incarcat complet inainte de a executa codul meu
document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterCompleted = document.getElementById('filter-completed');
  const clearCompletedBtn = document.getElementById('clear-completed');  // le sterg pe toate cele bifate, le elimin
  const todoCount = document.querySelector('.todo-count');
  const toggleAllBtn = document.getElementById('check-all'); // daca vreau sa le bifez pe toate din sagetica de sus.

  let todos = [];
  // Setez filtrul curent la 'all' (toate task-urile)
  let currentFilter = 'all';

  // Functie pentru a afisa task-urile in functie de filtrul curent
  const renderTodos = () => {
    // Curat lista de task-uri afisata
    todoList.innerHTML = '';
    // Parcurg lista de task-uri
    todos.forEach((todo, index) => {
      // Afisez task-urile in functie de filtrul curent
      if (currentFilter === 'all' || (currentFilter === 'active' && !todo.completed) || (currentFilter === 'completed' && todo.completed)) {
        // Creez un element <li> pentru fiecare task
        const li = document.createElement('li');
        // Adaug clasa 'completed' daca task-ul este completat
        li.className = todo.completed ? 'completed' : '';
        // Adaug HTML-ul pentru checkbox si textul task-ului
        li.innerHTML = `
          <input type="checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
          <span>${todo.text}</span>
        `;
        // Adaug elementul <li> in lista de task-uri
        todoList.appendChild(li);
      }
    });
    // Actualizez numarul de task-uri ramase
    updateCount();
    // Verific daca trebuie afisat butonul pentru stergerea task-urilor completate
    checkClearCompleted();
  };

  // Functie pentru a actualiza numarul de task-uri ramase
  const updateCount = () => {
    // Calculez numarul de task-uri active (necompletate)
    const activeTodos = todos.filter(todo => !todo.completed).length;
    // Afisez numarul de task-uri ramase
    todoCount.textContent = `${activeTodos} items left`;
    // am expandat numarul retinut in locatia activeTodos.
  };

  // Functie pentru a verifica daca trebuie afisat butonul pentru stergerea task-urilor completate
  const checkClearCompleted = () => {
    // Calculez numarul de task-uri completate
    const completedTodos = todos.filter(todo => todo.completed).length;
    // Afisez butonul doar daca exista task-uri completate
    clearCompletedBtn.style.display = completedTodos ? 'block' : 'none';
  };

  // Adaug un task nou cand apas tasta Enter in campul de input
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim() !== '') {
      // Adaug task-ul in lista cu statusul 'necompletat'
      todos.push({ text: todoInput.value.trim(), completed: false });
      // Golesc campul de input
      todoInput.value = '';
      // Afisez task-urile actualizate
      renderTodos();
    }
  });

  // Marchez un task ca fiind completat/necompletat cand dau click pe checkbox-ul sau
  todoList.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
      // Obtin indexul task-ului din atributul 'data-index' al checkbox-ului
      const index = e.target.dataset.index;
      // Schimb statusul task-ului
      todos[index].completed = e.target.checked;
      // Afisez task-urile actualizate
      renderTodos();
    }
  });

  // Filtrez si afisez toate task-urile
  filterAll.addEventListener('click', () => {
    filterAll.classList.add('selected');
    filterActive.classList.remove('selected');
    filterCompleted.classList.remove('selected');
    currentFilter = 'all';
    renderTodos();
  });

  // Filtrez si afisez doar task-urile active
  filterActive.addEventListener('click', () => {
    filterAll.classList.remove('selected');
    filterActive.classList.add('selected');
    filterCompleted.classList.remove('selected');
    currentFilter = 'active';
    renderTodos();
  });

  // Filtrez si afisez doar task-urile completate
  filterCompleted.addEventListener('click', () => {
    filterAll.classList.remove('selected');
    filterActive.classList.remove('selected');
    filterCompleted.classList.add('selected');
    currentFilter = 'completed';
    renderTodos();
  });

  // Sterg toate task-urile completate
  clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
  });

  // Marchez toate task-urile ca fiind completate/necompletate
  toggleAllBtn.addEventListener('click', () => {
    // Verific daca toate task-urile sunt completate
    const allCompleted = todos.every(todo => todo.completed);
    // Schimb statusul fiecarui task
    todos.forEach(todo => todo.completed = !allCompleted);
    // Afisez task-urile actualizate
    renderTodos();
  });

  // Afisez task-urile la initializarea paginii
  renderTodos();
});