(function () {
    'use strict';

    // Функция для логирования всех источников (для отладки)
    function logSources() {
        const sources = Lampa.Activity.sources || [];
        console.log('[CinemaCollapseFix] Список источников:');
        sources.forEach((src, index) => {
            console.log(index, src.name);
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
                // Если имя источника содержит "cinema" (любым регистром)
                // и collapse еще не определен, то добавляем его
                if (src.name && src.name.toLowerCase().indexOf('cinema') !== -1 && typeof src.collapse !== 'function') {
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
    }, 2000);
})();
