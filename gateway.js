function changeLanguage() {
    console.log("Language changed");
}

function openSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.style.display = 'flex';
}

function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.style.display = 'none';
}

function savePassword() {
    alert("Şifrə uğurla yeniləndi!");
    closeSettings();
}
