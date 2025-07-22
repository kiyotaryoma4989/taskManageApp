import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["modal","form", "priority"]

    // 画面切り替え
    switchToRegister(e) {
        e.preventDefault();
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
        this.clearErrors();
    }
    switchToLogin(e) {
        e.preventDefault();
        registerCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
        this.clearErrors();
    }
    
    // エラー表示のクリア
    clearErrors() {
        document.querySelectorAll('.auth-error').forEach(error => {
            error.classList.remove('show');
        });
        document.querySelectorAll('.auth-input').forEach(input => {
            input.classList.remove('error');
        });
    }

    // ログイン処理
    create(e) {
        e.preventDefault();

        //TODO バリデーション

        // formを送信
        document.getElementById("registerForm").submit();
    }

}
