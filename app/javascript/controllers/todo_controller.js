import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["form", "title", "description", "dueDate", "category", "priority", "tags"]

    initialize() {
        this.notCompleteTaskElem = document.querySelector(".stat-notComp");
        this.completeTaskElem = document.querySelector(".stat-comp");
        this.progressElem = document.querySelector(".stat-progress");
        this.notCompleteTaskCount = Number(this.notCompleteTaskElem.textContent);
        this.completeTaskCount = Number(this.completeTaskElem.textContent);
        this.progress = Number(this.progressElem.textContent);
    }

    calcProgress() {
        const total = this.notCompleteTaskCount + this.completeTaskCount;
        this.progress = total === 0 ? 0 : Math.round((this.completeTaskCount / total) * 100);
    }

    addTask() {
        this.notCompleteTaskCount++;
        this.calcProgress();
        this.renderStats();
    }

    complete() {
        this.notCompleteTaskCount--;
        this.completeTaskCount++;
        this.calcProgress();
        this.renderStats();
    }

    refrectStatsDeleteTask(isCompleted) {
        if (isCompleted) {
            this.completeTaskCount--;
        } else {
            this.notCompleteTaskCount--;
        }
        this.calcProgress();
        this.renderStats();
    }

    cancelComplete() {
        this.completeTaskCount--;
        this.notCompleteTaskCount++;
        this.calcProgress();
        this.renderStats();
    }

    renderStats() {
        this.notCompleteTaskElem.textContent = this.notCompleteTaskCount;
        this.completeTaskElem.textContent = this.completeTaskCount;
        this.progressElem.textContent = this.progress + "%";
    }

    async submit(event) {
        event.preventDefault()

        const title = this.titleTarget.value.trim()
        const description = this.descriptionTarget.value
        const due_date = this.dueDateTarget.value
        const category = this.categoryTarget.value
        const priority = this.priorityTarget.value
        const tags = this.tagsTarget.value

        if (title === "") {
            alert("タイトルを入力してください")
            return
        }

        try {

            const formData = this.formTarget.dataset
            const response = await fetch(formData.endpoint, {
                method: formData.method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    todo: {
                        title: title,
                        description: description,
                        due_date: due_date,
                        category_id: category,
                        priority: priority,
                        tags: tags
                    }
                })
            })

            // if (!response.ok) throw new Error("登録に失敗しました")

            const result = await response.json()
            console.log(result);
            // this.showMessage("✅ 登録成功！ユーザーID: " + result.user.userId, "success")

            // モーダルを閉じる
            document.getElementById("taskModal").classList.add("hidden")
            document.body.style.overflowY = 'auto';

            // formをリセット
            this.resetForm;

            // 画面の表示を更新
            const btnData = event.target.dataset
            if (btnData.type == "update") {
                document.querySelector(`#task-item-${btnData.target_item}`).remove();
            }
            const taskList = document.querySelector('.task-list');
            const newTask = document.createElement('div');
            newTask.innerHTML = this.createTodoHTML(result.todo);
            const taskElement = newTask.firstElementChild;

            // ステータスを更新
            this.addTask()

            // アニメーションで追加
            taskElement.style.opacity = '0';
            taskElement.style.transform = 'translateY(20px)';
            taskList.insertBefore(taskElement, taskList.firstChild);
            setTimeout(() => {
                taskElement.style.transition = 'all 0.5s ease';
                taskElement.style.opacity = '1';
                taskElement.style.transform = 'translateY(0)';
            }, 50);

        } catch (error) {
            console.log(error);
            // this.showMessage("❌ エラーが発生しました: " + error.message, "error")
        }

    }

    resetForm() {
        this.titleTarget.value = ""
        this.descriptionTarget.value = ""
        this.dueDateTarget.value = ""
        this.categoryTarget.value = ""
        document.querySelectorAll(".priority-option").forEach((btn) => {
            btn.classList.remove("selected");
        });
        document.querySelector(".priority-option.medium").classList.add("selected");
        this.tagsTarget.value = ""
    }

    createTodoHTML(todo) {
        return `
            <div id="task-item-${todo.id}" class="task-item ${todo.priority == "1" ? "task-low" : todo.priority == "2" ? "task-medium" : "task-high"} ${todo.done ? 'completed' : ''}">
                <div class="task-content">
                    <div class="task-header-item">
                        <h3 class="task-title">${todo.title}</h3>
                        <div class="task-actions">
                            <button class="task-btn complete-btn" data-id="${todo.id}" data-action="click->todo#updateDone">✓</button>
                            <button class="task-btn edit-btn" data-action="click->modal#open" 
                                data-id="${todo.id}" 
                                data-title="${todo.title}"
                                data-description="${todo.description}"
                                data-priority="${todo.priority}"
                                data-due_date="${todo.due_date}"
                                data-category="${todo.category ? todo.category.id : ""}"
                                data-tags="${todo.tags}"
                                >✏️</button>
                            <button class="task-btn delete-btn" data-id="${todo.id}" data-action="click->todo#deleteTask">🗑️</button>
                        </div>
                    </div>
                    <p class="task-description">${todo.description}</p>
                    <div class="task-meta">
                        <span class="task-due-date">📅 ${todo.due_date ? todo.due_date : "期限なし"}</span>
                        <span class="task-category">${todo.category ? todo.category.name : "未選択"}</span>
                    </div>
                </div>
            </div>
        `
    }

    showMessage(message, type) {
        this.messageTarget.textContent = message
        this.messageTarget.className = "message " + type
    }

    async updateDone(event) {
        console.log(event.target);
        const id = event.target.dataset.id
        const completed = event.target.closest(".task-item").classList.contains("completed")

        try {
            const response = await fetch(`/todos/${id}/done`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": document.querySelector("[name=csrf-token]").content
                },
                body: JSON.stringify({ done: !completed })
            })

            if (response.ok) {
                // ステータスを更新
                if (completed) {
                    this.cancelComplete()
                } else {
                    this.complete()
                }

                const taskItem = event.target.closest('.task-item');
                taskItem.classList.toggle('completed');
                event.target.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    event.target.style.transform = 'scale(1)';
                }, 200);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(event) {
        console.log(event.target);
        const id = event.target.dataset.id
        const btn = event.target

        try {
            if (confirm('このタスクを削除してもよろしいですか？')) {
                const response = await fetch(`/todos/${id}/delete`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": document.querySelector("[name=csrf-token]").content
                    },
                    body: JSON.stringify({ delete_flg: true })
                })

                if (response.ok) {
                    const taskItem = btn.closest(".task-item")
                    this.refrectStatsDeleteTask(taskItem.classList.contains("completed")) // ステータスを更新
                    taskItem.classList.remove("completed");
                    taskItem.style.animation = 'fadeOut 0.5s ease forwards';
                    setTimeout(() => {
                        taskItem.remove();
                    }, 500);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}