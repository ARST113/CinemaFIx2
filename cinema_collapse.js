(function () {
    'use strict';

    console.log('[CinemaHider] загружен');

    let once = false;

    Lampa.Listener.follow('full', function (e) {
        if (e.type !== 'complite') return;

        setTimeout(() => {
            const active = Lampa.Activity.active();
            const render = active.render();

            // Найдём кнопку Cinema по SVG (если нет явного класса)
            const cinemaBtn = render.find('.full-start__button').filter(function () {
                const svg = $(this).find('svg');
                return svg.length && svg.html().includes('M21.837,83.419'); // уникальный кусок Cinema SVG
            });

            if (!cinemaBtn.length) {
                console.log('[CinemaHider] кнопка Cinema не найдена');
                return;
            }

            console.log('[CinemaHider] Cinema найдена, прячем её');

            // Удаляем с экрана
            cinemaBtn.remove();

            if (once) return;
            once = true;

            // Добавляем как источник
            Lampa.Player.addPlugin({
                title: 'Cinema',
                component: 'cinema_online',
                type: 'video',
                onContextMenu: function () {
                    return {
                        name: 'Cinema',
                        description: 'Смотреть через плагин Cinema'
                    };
                },
                onContextLauch: function (movie) {
                    const id = Lampa.Utils.hash(movie.number_of_seasons ? movie.original_name : movie.original_title);
                    const all = Lampa.Storage.get('clarification_search', '{}');

                    Lampa.Component.add('cinema_online');

                    Lampa.Activity.push({
                        url: '',
                        title: Lampa.Lang.translate('title_online'),
                        component: 'cinema_online',
                        search: all[id] ? all[id] : movie.title,
                        search_one: movie.title,
                        search_two: movie.original_title,
                        movie: movie,
                        page: 1,
                        clarification: all[id] ? true : false
                    });
                }
            });

            console.log('[CinemaHider] Cinema добавлена как источник');
        }, 800); // увеличенная задержка
    });
})();
