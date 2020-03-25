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

function addTask({ description, id }) {
  const html = `
      <div class="card my-3" id="${id}">
        <div class="card-body">
          <p class="card-text">${description}</p>
          <input type="button" value="Done" onclick="completeTask(this);" class="btn btn-link p-0" data-id="${id}" />
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
        </div>
    </div>
    `;

  const node = document.getElementById(id);
  node.outerHTML = html;
}
