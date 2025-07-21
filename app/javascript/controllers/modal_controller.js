import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["modal","form", "priority"]
    
    open(event) {
        const titleCreate = "新しいタスクを追加"
        const titleEdit = "既存のタスクを編集"
        const todo = event.target.dataset
        const modal = this.modalTarget
        if (event.target.dataset.id) {
            // 編集モード
            document.querySelector(".modal-title").textContent = titleEdit
            this.formTarget.dataset.endpoint = `/todos/${todo.id}`
            this.formTarget.dataset.method = "PUT"
            modal.querySelector("#taskTitle").value = todo.title
            modal.querySelector("#taskDescription").value = todo.description
            modal.querySelector("#taskDueDate").value = todo.due_date
            modal.querySelector("#taskCategory").value = todo.category
            const buttons = modal.querySelectorAll(".priority-option")
            buttons.forEach((btn) => btn.classList.remove("selected"))
            modal.querySelector(`.priority-option[data-priority="${todo.priority}"]`).classList.add("selected")
            modal.querySelector("#taskTags").value = todo.tags
            modal.querySelector("#btn-submit").value = "📝 タスクを編集"
        } else {
            // 新規作成モード
            document.querySelector(".modal-title").textContent = titleCreate
            this.formTarget.dataset.endpoint = `/todos`
            this.formTarget.dataset.method = "POST"
            modal.querySelector("#taskTitle").value = ""
            modal.querySelector("#taskDescription").value = ""
            modal.querySelector("#taskDueDate").value = ""
            modal.querySelector("#taskCategory").value = ""
            const buttons = modal.querySelectorAll(".priority-option")
            buttons.forEach((btn) => btn.classList.remove("selected"))
            modal.querySelector(".priority-option.medium").classList.add("selected")
            modal.querySelector("#taskTags").value = ""
            modal.querySelector("#btn-submit").value = "📝 タスクを追加"
        }
        this.modalTarget.classList.remove("hidden")
        document.body.style.overflowY = 'hidden';
    }

    close() {
        this.modalTarget.classList.add("hidden")
        document.body.style.overflowY = 'auto';

        // フォームをリセット
        taskForm.reset();
        document.getElementById('taskPriority').value = 'medium';
        document.querySelectorAll('.priority-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector('.priority-option.medium').classList.add('selected');
    }

    selectPriority(event) {
        this.priorityTarget.value = event.currentTarget.dataset.priority
        const buttons = this.element.querySelectorAll("button")
        buttons.forEach((btn) => btn.classList.remove("selected"))
        event.currentTarget.classList.add("selected");
    }

}
