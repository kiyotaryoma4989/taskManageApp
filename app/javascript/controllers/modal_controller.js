import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["modal"]

    open() {
        this.modalTarget.classList.remove("hidden")
        document.body.style.overflowY = 'hidden';
    }

    close() {
        this.modalTarget.classList.add("hidden")
        document.body.style.overflowY = 'auto';
    }

    // モーダルを開く
    openModal() {
        taskModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // フォームをリセット
        taskForm.reset();
        document.getElementById('taskPriority').value = 'medium';
        document.querySelectorAll('.priority-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector('.priority-option.medium').classList.add('selected');
    }

    // モーダルを閉じる
    closeModal() {
        taskModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}
