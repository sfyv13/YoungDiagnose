// Имитация создания поста на форуме
function submitPost(btn) {
    let titleInput = btn.parentElement.querySelector('input[type="text"]').value;
    
    if (titleInput.trim() === '') {
        alert("Zəhmət olmasa başlıq daxil edin.");
        return;
    }

    let originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Göndərilir...";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    setTimeout(() => {
        alert("Mövzu uğurla yaradıldı! (Simulyasiya)");
        // Очищаем форму
        btn.parentElement.querySelector('input[type="text"]').value = '';
        btn.parentElement.querySelector('textarea').value = '';
        
        btn.innerHTML = originalText;
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
    }, 1500);
}

// Имитация открытия чата (сообщений)
function toggleChat() {
    alert("Şəxsi Mesajlar və Usta Qrupları paneli tezliklə açılacaq.");
}