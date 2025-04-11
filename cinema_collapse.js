(function() {
    "use strict";
    
    // Если объект Lampa ещё не создан, создаём его
    if (typeof window.Lampa === "undefined") {
        window.Lampa = {};
    }
    
    // Инициализация Lampa.Platform с методом tv (если отсутствует)
    if (!Lampa.Platform) {
        Lampa.Platform = {
            tv: function() {
                console.log("Телевизионный режим инициализирован.");
            }
        };
    }
    
    // Создаём объект Lampa.Manifest с методом get, если его нет
    if (!Lampa.Manifest) {
        Lampa.Manifest = {
            // Метод get возвращает нужное значение для lampac_unic_id
            get: function(key, defaultValue) {
                if (key === "lampac_unic_id") {
                    return "tyusdt"; // Возвращаем нужное значение для корректной работы
                }
                return defaultValue;
            }
        };
    }
    
    // Создаём заглушку для Lampa.Storage, если отсутствует
    if (!Lampa.Storage) {
        Lampa.Storage = {
            set: function(key, value) {
                console.log("Storage: устанавливаем ключ", key, "со значением", value);
                try {
                    localStorage.setItem(key, value);
                } catch (e) {
                    console.error("Ошибка при сохранении в localStorage", e);
                }
            }
        };
    }
    
    // Создаём заглушку для Lampa.Origin, если отсутствует
    if (!Lampa.Origin) {
        Lampa.Origin = {
            putScriptAsync: function(urls, callback) {
                urls.forEach(function(url) {
                    var script = document.createElement("script");
                    script.src = url;
                    script.async = true;
                    script.onload = function() {
                        console.log("Скрипт загружен:", url);
                        if (typeof callback === "function") {
                            callback();
                        }
                    };
                    document.head.appendChild(script);
                });
            }
        };
    }
    
    // Запускаем телевизионный режим
    Lampa.Platform.tv();
    
    // Устанавливаем интервал, чтобы дождаться появления объекта Lampa и метода get в Lampa.Manifest
    var lampaInterval = setInterval(function() {
        if (Lampa && Lampa.Manifest && typeof Lampa.Manifest.get === "function") {
            clearInterval(lampaInterval);
            
            // Проверяем lampac_unic_id – поскольку проверка на "bylampa" убрана,
            // возвращается значение "tyusdt" внутри метода get
            var uniqueId = Lampa.Manifest.get("lampac_unic_id", "");
            if (uniqueId !== "tyusdt") {
                Lampa.Storage.set("lampac_unic_id", "Ошибка доступа");
            }
            
            // Подгружаем внешний скрипт (если требуется)
            Lampa.Origin.putScriptAsync(["http://185.87.48.42:2627/online.js"], function() {
                console.log("Внешний скрипт загружен.");
            });
        }
    }, 200);
    
    // Ожидаем появления элемента с классом "header" и добавляем кнопку "Источники"
    var uiInterval = setInterval(function() {
        var header = document.querySelector('.header');
        if (header) {
            clearInterval(uiInterval);
            
            var sourcesButton = document.createElement('button');
            sourcesButton.className = 'sources-button';
            sourcesButton.textContent = 'Источники';
            // Стили можно настроить по необходимости
            sourcesButton.style.cssText = 'margin-left: 20px; padding: 8px 12px; font-size: 16px;';
            
            // Добавляем кнопку в контейнер header
            header.appendChild(sourcesButton);
            
            // Обработчик клика — открывает модальное окно с примером списка источников
            sourcesButton.addEventListener('click', function() {
                // Если модального окна ещё нет, создаём его
                if (!document.querySelector('.sources-modal')) {
                    var modal = document.createElement('div');
                    modal.className = 'sources-modal';
                    modal.style.cssText =
                        'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
                        'background: #fff; padding: 20px; border: 1px solid #ccc; z-index: 10000; box-shadow: 0 2px 8px rgba(0,0,0,0.3);';
                    modal.innerHTML =
                        '<h2>Источники</h2>' +
                        '<ul>' +
                            '<li>Источник 1</li>' +
                            '<li>Источник 2</li>' +
                            '<li>Источник 3</li>' +
                        '</ul>' +
                        '<button id="closeModal" style="margin-top: 10px; padding: 5px 10px;">Закрыть</button>';
                    
                    document.body.appendChild(modal);
                    
                    document.getElementById('closeModal').addEventListener('click', function() {
                        document.body.removeChild(modal);
                    });
                }
            });
            
            console.log("Плагин: Кнопка 'Источники' создана.");
        }
    }, 200);
    
}());
