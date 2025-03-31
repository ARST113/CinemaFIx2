(function () {
    'use strict';

    console.log('[FixCinemaPosition] Загружен');

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            setTimeout(() => {
                try {
                    const activity = e.object.activity.render();
                    const cinemaButton = activity.find('.cinema--button');
                    const target = activity.find('.full-start-new__buttons');

                    if (cinemaButton.length && target.length) {
                        target.prepend(cinemaButton); // перемещаем первым
                        console.log('[FixCinemaPosition] Кнопка перемещена внутрь .full-start-new__buttons');
                    } else {
                        console.warn('[FixCinemaPosition] Контейнер или кнопка не найдены');
                    }
                } catch (err) {
                    console.error('[FixCinemaPosition] Ошибка при перемещении кнопки:', err);
                }
            }, 300); // дать Lampa время вставить кнопку
        }
    });
})();
