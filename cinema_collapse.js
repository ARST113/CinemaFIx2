(function () {
    'use strict';

    // Функция для логирования всех источников (для отладки)
    function logSources() {
        const sources = Lampa.Activity.sources || [];
        console.log('[CinemaCollapseFix] Список источников:', sources.length);
        sources.forEach((src, index) => {
            console.log(index, src ? src.name : 'нет поля name');
        });
    }

    // Интервал для проверки источников каждые 2 секунды
    const INTERVAL = setInterval(() => {
        const sources = Lampa.Activity.sources || [];
        if (sources.length) {
            // Логируем источники для отладки
            logSources();

            for (let i = 0; i < sources.length; i++) {
                const src = sources[i];
                // Проверяем, что src существует и src.name - строка
                if (src && typeof src.name === 'string') {
                    const lowerName = src.name.toLowerCase();
                    // Если имя источника содержит "cinema"
                    if (lowerName.includes('cinema') && typeof src.collapse !== 'function') {
                        src.collapse = function () {
                            return {
                                title: 'Cinema',
                                description: 'Источник от Cinema',
                                sort: 1
                            };
                        };
                        console.log('[CinemaCollapseFix] collapse() добавлен для источника:', src.name);
                        clearInterval(INTERVAL);
                        break;
                    }
                }
            }
        }
    }, 2000);
})();
