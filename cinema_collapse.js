(function () {
    'use strict';

    // Плагин будет пытаться добавить collapse() к источнику Cinema каждую секунду.
    const INTERVAL = setInterval(() => {
        // Получаем массив источников
        const sources = Lampa.Activity.sources || [];
        for (let i = 0; i < sources.length; i++) {
            const src = sources[i];
            // Проверяем, что имя источника содержит "cinema" (без учета регистра)
            // и что метод collapse ещё не определён
            if (src.name && src.name.toLowerCase() === 'cinema' && typeof src.collapse !== 'function') {
                // Добавляем метод collapse()
                src.collapse = function () {
                    return {
                        title: 'Cinema',
                        description: 'Источник от Cinema',
                        sort: 1 // можно менять порядок отображения сворачиваемых источников
                    };
                };

                console.log('[CinemaCollapseFix] collapse() добавлен для источника Cinema');
                clearInterval(INTERVAL);
                break;
            }
        }
    }, 1000);
})();
