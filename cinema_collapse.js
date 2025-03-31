(function () {
    'use strict';

    console.log('[CinemaWrapper] плагин загружен');

    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve) => {
            const interval = 50;
            let elapsed = 0;

            const timer = setInterval(() => {
                const el = document.querySelector(selector);
                if (el) {
                    clearInterval(timer);
                    resolve(el);
                } else if ((elapsed += interval) >= timeout) {
                    clearInterval(timer);
                    resolve(null);
                }
            }, interval);
        });
    }

    Lampa.Listener.follow('full', async function (e) {
        if (e.type !== 'complite') return;

        setTimeout(async () => {
            const activity = Lampa.Activity.active();
            const render = activity.render();

            // Ждём кнопку Cinema
            const btn = render.find('.view--online_cinema');
            if (!btn.length) return;

            console.log('[CinemaWrapper] кнопка Cinema найдена, скрываем из основного интерфейса');

            // Удаляем кнопку Cinema из главного экрана
            btn.remove();

            // Добавляем новый источник в список "Смотреть"
            Lampa.Player.addPlugin({
                title: 'Cinema',
                component: 'cinema_online',
                type: 'video',
                onContextMenu: function (object) {
                    return {
                        name: 'Cinema',
                        description: 'Смотреть через плагин Cinema',
                    };
                },
                onContextLauch: function (object) {
                    // Используем те же действия, что и оригинальный Cinema
                    var id = Lampa.Utils.hash(object.number_of_seasons ? object.original_name : object.original_title);
                    var all = Lampa.Storage.get('clarification_search', '{}');

                    Lampa.Component.add('cinema_online'); // обязательно, если компонент ещё не зарегистрирован
                    Lampa.Activity.push({
                        url: '',
                        title: Lampa.Lang.translate('title_online'),
                        component: 'cinema_online',
                        search: all[id] ? all[id] : object.title,
                        search_one: object.title,
                        search_two: object.original_title,
                        movie: object,
                        page: 1,
                        clarification: all[id] ? true : false,
                    });
                },
            });

            console.log('[CinemaWrapper] Cinema добавлена как источник');
        }, 500); // Подстраховка: Cinema может добавляться с задержкой
    });
})();
