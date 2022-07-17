const editModal = document.getElementById("edit-modal");
const editInput = document.getElementById("edit-input");
let editNoteId = "";
let currentTitle = "";
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    editNoteId = event.target.dataset.id;
    currentTitle = event.target.dataset.title;

    currentLi = event.target.previousElementSibling;
    editInput.focus();
    editInput.value = currentTitle;

    editModal.style.display = "block";
  }
  if (event.target.dataset.type === "close-modal") {
    editModal.style.display = "none";
  }
  if (event.target.dataset.type === "send-note") {
    const newTitle = editInput.value;
    edit(editNoteId, newTitle).then(() => {
      editModal.style.display = "none";
      document.getElementById(`${editNoteId}`).textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(_id, newTitle) {
  const req = { id: _id, title: newTitle };
  await fetch("/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(req),
  });
}
