import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["title", "description", "dueDate", "category", "priority", "tags"]

    async submit(event) {
        event.preventDefault()

        const title = this.titleTarget.value.trim()
        const description = this.descriptionTarget.value
        const dueDate = this.dueDateTarget.value
        const category = this.categoryTarget.value
        const priority = this.priorityTarget.value
        const tags = this.tagsTarget.value

        if (title === "") {
        alert("タイトルを入力してください")
        return
        }

        try {
            const response = await fetch("/todos", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                todo: {
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    category: category,
                    priority: priority,
                    tags: tags
                }
                })
            })

            // if (!response.ok) throw new Error("登録に失敗しました")

            const result = await response.json()
            // this.showMessage("✅ 登録成功！ユーザーID: " + result.user.userId, "success")

            this.titleTarget.value = ""
            this.descriptionTarget.value = ""
            this.dueDateTarget.value = ""
            this.categoryTarget.value = ""
            document.querySelectorAll(".priority-option").forEach((btn) => {
                btn.classList.remove("selected");
            });
            document.querySelector(".priority-option.medium").classList.add("selected");
            this.tagsTarget.value = ""

            document.getElementById("taskModal").classList.add("hidden")
            document.body.style.overflowY = 'auto';
        } catch (error) {
            console.log(error);
            // this.showMessage("❌ エラーが発生しました: " + error.message, "error")
        }
        
    }

    showMessage(message, type) {
        this.messageTarget.textContent = message
        this.messageTarget.className = "message " + type
    }

    selectPriority(event) {
        this.priorityTarget.value = event.currentTarget.dataset.todo
        const buttons = this.element.querySelectorAll("button")
        buttons.forEach((btn) => btn.classList.remove("selected"))
        event.currentTarget.classList.add("selected");
    }

    toggle(event) {
        const id = event.target.dataset.id
        const checked = event.target.checked

        fetch(`/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document.querySelector("[name=csrf-token]").content
            },
            body: JSON.stringify({ todo: { done: checked } })
        })
    }
}