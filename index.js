// ==========================================================
// 1. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ МЕНЮ СЛЕВА
// ==========================================================
const menuItems = document.querySelectorAll('#menu-list li');
const sections = document.querySelectorAll('.content-section');

if (menuItems && sections) {
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active-section'));
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });
}

// ==========================================================
// 2. İNTELEKTUAL DİAQNOSTİKA (ГЛАВНЫЙ ЭКРАН)
// ==========================================================
function connectVCI(type) {
    const loader = document.getElementById('connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text'; 
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Zəhmət olmasa cihazın qoşulduğundan əmin olun.</small>`;
    }, 2500);
}

function connectOffline() {
    let historyMenu = document.querySelector('[data-target="section-history"]');
    if (historyMenu) historyMenu.click();
}

// ==========================================================
// 3. LOKAL DİAQNOSTİKA: ПОИСК И ПОДКЛЮЧЕНИЕ
// ==========================================================
function filterBrands() {
    let searchInput = document.getElementById('brand-search');
    if (!searchInput) return;
    let filter = searchInput.value.toLowerCase();
    let items = document.querySelectorAll('.brand-item');
    
    items.forEach(item => {
        let text = item.querySelector('span').innerText.toLowerCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

function selectBrand(element) {
    let items = document.querySelectorAll('.brand-item');
    items.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    
    let btn = document.getElementById('start-local-diag');
    if (btn) btn.classList.remove('disabled');

    let placeholder = document.getElementById('local-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    let panel = document.getElementById('local-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    let loader = document.getElementById('local-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.className = 'loader-text';
        loader.innerHTML = '';
    }
}

function connectLocalVCI(type) {
    const loader = document.getElementById('local-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Zəhmət olmasa cihazın qoşulduğundan əmin olun.</small>`;
    }, 2500);
}

// ==========================================================
// 4. MULTI SOFTLAR: ПОИСК, ФИЛЬТРЫ И СКАЧИВАНИЕ
// ==========================================================
function filterSoftware() {
    let input = document.getElementById('soft-search');
    if(!input) return;
    let val = input.value.toLowerCase();
    let cards = document.querySelectorAll('#section-multi .software-card'); 
    
    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        let desc = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(val) || desc.includes(val)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function filterCategory(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    let cards = document.querySelectorAll('#section-multi .software-card');
    
    cards.forEach(card => {
        let cardCategories = card.getAttribute('data-category');
        if (!cardCategories) return;
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function startDownload(btn) {
    if (btn.classList.contains('downloading')) return;

    btn.classList.add('downloading');
    btn.innerHTML = '⏳ Yüklənir... (0%)';
    
    let progress = 0;
    let interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            btn.innerHTML = '✅ Yükləndi (Quraşdırın)';
            btn.style.background = '#059669'; 
        } else {
            btn.innerHTML = `⏳ Yüklənir... (${progress}%)`;
        }
    }, 600);
}

// ==========================================================
// 5. SIFIRLAMA (СБРОСЫ): ВЫБОР И ПОДКЛЮЧЕНИЕ
// ==========================================================
function selectReset(element, resetName) {
    let items = document.querySelectorAll('.reset-list-item');
    items.forEach(item => item.classList.remove('selected'));
    
    element.classList.add('selected');

    let titleEl = document.getElementById('selected-reset-name');
    if (titleEl) titleEl.innerText = resetName;
    
    let placeholder = document.getElementById('reset-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    let panel = document.getElementById('reset-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    let loader = document.getElementById('reset-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.innerHTML = '';
        loader.className = 'loader-text';
    }
}

function connectResetVCI(type) {
    const loader = document.getElementById('reset-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Zəhmət olmasa cihazın qoşulduğundan əmin olun.</small>`;
    }, 2500);
}

// ==========================================================
// 6. ADAS KALİBRASİYASI: ВЫБОР И ПОДКЛЮЧЕНИЕ
// ==========================================================
function selectAdas(element, adasName) {
    let items = document.querySelectorAll('#section-adas .reset-list-item');
    items.forEach(item => item.classList.remove('selected'));
    
    element.classList.add('selected');

    let titleEl = document.getElementById('selected-adas-name');
    if (titleEl) titleEl.innerText = adasName;
    
    let placeholder = document.getElementById('adas-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    let panel = document.getElementById('adas-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    let loader = document.getElementById('adas-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.innerHTML = '';
        loader.className = 'loader-text';
    }
}

function connectAdasVCI(type) {
    const loader = document.getElementById('adas-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Zəhmət olmasa cihazın qoşulduğundan əmin olun.</small>`;
    }, 2500);
}

// ==========================================================
// 7. IMMO (AÇARLAR): ВЫБОР И ПОДКЛЮЧЕНИЕ
// ==========================================================
function selectImmo(element, immoName) {
    let items = document.querySelectorAll('#section-immo .reset-list-item');
    items.forEach(item => item.classList.remove('selected'));
    
    element.classList.add('selected');

    let titleEl = document.getElementById('selected-immo-name');
    if (titleEl) titleEl.innerText = immoName;
    
    let placeholder = document.getElementById('immo-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    let panel = document.getElementById('immo-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    let loader = document.getElementById('immo-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.innerHTML = '';
        loader.className = 'loader-text';
    }
}

function connectImmoVCI(type) {
    const loader = document.getElementById('immo-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Təhlükəsizlik blokuna qoşulmaq üçün bağlantını yoxlayın.</small>`;
    }, 2500);
}

// ==========================================================
// 8. TPMS (TƏKƏR TƏZYİQİ): ВЫБОР И ПОДКЛЮЧЕНИЕ
// ==========================================================
function selectTpms(element, tpmsName) {
    let items = document.querySelectorAll('#section-tpms .reset-list-item');
    items.forEach(item => item.classList.remove('selected'));
    
    element.classList.add('selected');

    let titleEl = document.getElementById('selected-tpms-name');
    if (titleEl) titleEl.innerText = tpmsName;
    
    let placeholder = document.getElementById('tpms-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    let panel = document.getElementById('tpms-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    let loader = document.getElementById('tpms-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.innerHTML = '';
        loader.className = 'loader-text';
    }
}

function connectTpmsVCI(type) {
    const loader = document.getElementById('tpms-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">TPMS sensorları ilə əlaqə qurmaq üçün cihazı yoxlayın.</small>`;
    }, 2500);
}

// ==========================================================
// 9. ПРИНЯТИЕ ХЭША (ЭТО ДОЛЖНО БЫТЬ В САМОМ КОНЦЕ)
// ==========================================================
// ==========================================================
// 10. STANDART DIAQNOSTIKA (OBD-II): ВЫБОР И ПОДКЛЮЧЕНИЕ
// ==========================================================
function selectObd(element, obdName) {
    // Убираем выделение со всех пунктов OBD
    let items = document.querySelectorAll('#section-obd .reset-list-item');
    items.forEach(item => item.classList.remove('selected'));
    
    // Выделяем нажатый
    element.classList.add('selected');

    // Меняем заголовок справа
    let titleEl = document.getElementById('selected-obd-name');
    if (titleEl) titleEl.innerText = obdName;
    
    // Прячем серый текст с лампочкой
    let placeholder = document.getElementById('obd-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    
    // Показываем панель подключения
    let panel = document.getElementById('obd-connection-panel');
    if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.5s ease';
    }

    // Сбрасываем старую ошибку
    let loader = document.getElementById('obd-connection-loader');
    if (loader) {
        loader.style.display = 'none';
        loader.innerHTML = '';
        loader.className = 'loader-text';
    }
}

function connectObdVCI(type) {
    const loader = document.getElementById('obd-connection-loader');
    if (!loader) return;

    loader.style.display = 'block';
    loader.className = 'loader-text'; 
    loader.innerHTML = `${type} axtarılır... Lütfən gözləyin.`;

    setTimeout(() => {
        loader.className = 'error-text';
        loader.innerHTML = `❌ Diqqət: VNCI adaptor tapılmadı! <br><small style="color:#9ca3af;">Mühərrik blokuna (ECU) qoşulmaq üçün bağlantını yoxlayın.</small>`;
    }, 2500);
}
// ==========================================================
// 11. AI DIAQNOSTIKA MƏLUMATLARI (ЧАТ С ИИ)
// ==========================================================

// Функция отправки быстрого запроса из левого меню
function sendQuickAi(text) {
    let input = document.getElementById('ai-input');
    if (input) {
        input.value = text;
        sendAiMessage();
    }
}

// Отправка по нажатию Enter
function handleAiEnter(event) {
    if (event.key === "Enter") {
        sendAiMessage();
    }
}

// Основная функция чата
function sendAiMessage() {
    let input = document.getElementById('ai-input');
    let chatBox = document.getElementById('ai-chat-box');
    let text = input.value.trim();
    
    if (!text || !chatBox) return;

    // 1. Показываем сообщение пользователя (справа)
    chatBox.innerHTML += `<div class="ai-msg user">${text}</div>`;
    input.value = ''; // Очищаем поле
    chatBox.scrollTop = chatBox.scrollHeight; // Прокручиваем чат вниз

    // 2. Имитация "ИИ печатает..."
    let typingId = 'typing-' + Date.now();
    chatBox.innerHTML += `<div class="ai-msg bot" id="${typingId}">
        <strong style="color: #10b981;">YANG AI analiz edir...</strong> ⏳
    </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Через 2 секунды выдаем "Умный" ответ ИИ
    setTimeout(() => {
        let typingElement = document.getElementById(typingId);
        if (typingElement) typingElement.remove();

        // Генерируем красивый ответ
        let aiResponse = `
            <strong style="color: #60a5fa;">DTC / Simptom Analizi Tamamlandı:</strong><br><br>
            Axtarışınız: <i>"${text}"</i><br><br>
            ✅ <b>Ehtimal olunan səbəblər:</b><br>
            1. Sensorun çirklənməsi və ya sıradan çıxması.<br>
            2. Elektrik naqillərində (qısa qapanma/qırıq) problem.<br>
            3. ECU (Mühərrik beyni) adaptasiya xətası.<br><br>
            🔧 <b>Tövsiyə olunan addımlar:</b> İlk növbədə canlı verilənləri (Live Data) yoxlayın və naqilləri multimetr ilə test edin.
        `;

        chatBox.innerHTML += `<div class="ai-msg bot">${aiResponse}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Прокрутка вниз
    }, 2000); // ИИ "думает" 2 секунды
}
// ==========================================================
// 12. SİSTEM YENİLƏMƏLƏRİ: ПРОЦЕСС СКАЧИВАНИЯ
// ==========================================================
function startUpdate(btn) {
    // Защита от двойного клика
    if (btn.classList.contains('downloading') || btn.classList.contains('installing') || btn.classList.contains('done')) return;
    
    // 1. Начинаем скачивание (Проценты)
    btn.classList.add('downloading');
    btn.innerHTML = '⏳ 0%';
    
    let progress = 0;
    let downloadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5; // Случайный шаг от 5 до 20
        if (progress >= 100) {
            progress = 100;
            clearInterval(downloadInterval);
            
            // 2. Начинаем установку
            btn.classList.remove('downloading');
            btn.classList.add('installing');
            btn.innerHTML = '⚙️ Quraşdırılır...';
            
            // 3. Завершаем успешно
            setTimeout(() => {
                btn.classList.remove('installing');
                btn.classList.add('done');
                btn.innerHTML = '✅ Yeniləndi';
            }, 3000); // Процесс установки 3 секунды

        } else {
            btn.innerHTML = `⏳ Yüklənir: ${progress}%`;
        }
    }, 400); // Обновление каждые 0.4 секунды
}

// Кнопка "Проверить обновления" на сервере
function checkAllUpdates() {
    let btn = document.getElementById('btn-check-updates');
    if (!btn) return;
    
    let originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Server yoxlanılır...";
    btn.style.pointerEvents = "none";
    
    setTimeout(() => {
        btn.innerHTML = "✅ Ən son versiyadasınız";
        btn.style.background = "#10b981";
        btn.style.borderColor = "#10b981";
        
        setTimeout(() => { 
            btn.innerHTML = originalText;
            btn.style.background = "transparent";
            btn.style.borderColor = "#3b82f6";
            btn.style.pointerEvents = "auto";
        }, 3000);
    }, 2000);
}
// ==========================================================
// 13. AVTOMOBİL ƏHATƏSİ: ПОИСК И ФИЛЬТРЫ ПО РЕГИОНАМ
// ==========================================================
function filterCoverage() {
    let input = document.getElementById('coverage-search');
    if(!input) return;
    let val = input.value.toLowerCase();
    let cards = document.querySelectorAll('#section-coverage .coverage-card'); 
    
    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(val)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function filterCoverageRegion(region, btnElement) {
    // Выделяем активную кнопку фильтра
    let container = btnElement.closest('.software-filters');
    container.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    let cards = document.querySelectorAll('#section-coverage .coverage-card');
    
    cards.forEach(card => {
        let cardRegion = card.getAttribute('data-region');
        if (region === 'all' || cardRegion === region) {
            card.style.display = "flex";
            card.style.animation = "fadeIn 0.4s ease";
        } else {
            card.style.display = "none";
        }
    });
    
    // Очищаем поле поиска при переключении региона
    let search = document.getElementById('coverage-search');
    if (search) search.value = '';
}
// ==========================================================
// 14. TARİXÇƏ (ИСТОРИЯ): ПОИСК И СКАЧИВАНИЕ ОТЧЕТОВ
// ==========================================================
function filterHistory() {
    let input = document.getElementById('history-search');
    if(!input) return;
    let val = input.value.toLowerCase();
    let cards = document.querySelectorAll('#history-list .history-card'); 
    
    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        let vinText = card.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(val) || vinText.includes(val)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function downloadReport(btn) {
    if (btn.classList.contains('loading')) return;
    
    let originalText = btn.innerHTML;
    btn.classList.add('loading');
    btn.innerHTML = '⏳ Yüklənir...';
    
    setTimeout(() => {
        btn.classList.remove('loading');
        btn.innerHTML = '✅ Yükləndi';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'transparent';
            btn.style.borderColor = '#4b5563';
        }, 3000);
    }, 1500);
}
window.onload = function() {
    const hash = window.location.hash; 
    if (hash === '#forum') {
        let forumMenu = document.querySelector('[data-target="section-forum"]');
        if (forumMenu) forumMenu.click();
    } else {
        let scanMenu = document.querySelector('[data-target="section-scan"]');
        if (scanMenu) scanMenu.click();
    }
};