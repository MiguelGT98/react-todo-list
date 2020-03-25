function saveTask() {
  const description = document.getElementById("taskDescription").value;

  const body = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ description })
  };

  fetch("/tasks", body)
    .then(response => {
      if (!response.ok) {
        throw "Error in AJAX call";
      }

      return response.json();
    })
    .then(task => {
      document.getElementById("taskDescription").value = "";
      addTask(task);
    })
    .catch(error => {
      console.error(error);
    });
}

function completeTask(e) {
  const id = e.dataset.id;

  const body = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  };

  fetch(`/done/${id}`, body)
    .then(response => {
      if (!response.ok) {
        throw "Error in AJAX call";
      }

      return response.json();
    })
    .then(task => {
      modifyTask(task);
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteTask(e) {
  const id = e.dataset.id;

  const body = {
    method: "DELETE",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  };

  fetch(`/task/${id}`, body)
    .then(response => {
      if (!response.ok) {
        throw "Error in AJAX call";
      }

      return response.json();
    })
    .then(task => {
      removeTask(task);
    })
    .catch(error => {
      console.error(error);
    });
}

function addTask({ description, id }) {
  const html = `
      <div class="card my-3" id="${id}">
        <div class="card-body">
          <p class="card-text">${description}</p>
          <input type="button" value="Done" onclick="completeTask(this);" class="btn btn-link p-0" data-id="${id}" />
          <button type="button" class="btn btn-default position-absolute p-0 bg-transparent" style="top: 1.25rem; right: 1.25rem;"
            onclick="deleteTask(this);" data-id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: #dc3545 !important">
              <path class="heroicon-ui"
                d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
            </svg>
          </button>
        </div>
      </div>
    `;
  const node = document.createRange().createContextualFragment(html);
  document.getElementById("taskList").prepend(node);
}

function modifyTask({ description, id }) {
  const html = `
    <div class="card my-3 bg-light" id=${id}>
        <div class="card-body">
            <p class="card-text">${description}</p>
            <button type="button" class="btn btn-default position-absolute p-0 bg-transparent" style="top: 1.25rem; right: 1.25rem;"
              onclick="deleteTask(this);" data-id="${id}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: #dc3545 !important">
                <path class="heroicon-ui"
                  d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
              </svg>
            </button>
        </div>
    </div>
    `;

  const node = document.getElementById(id);
  node.outerHTML = html;
}

function removeTask({ id }) {
  const node = document.getElementById(id);
  node.remove();
}
