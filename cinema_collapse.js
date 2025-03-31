(function () {
    'use strict';

    console.log('[CinemaHider] загружен');

    /**
     * 1) Силовой способ: раз в 1.5 секунды ищем .cinema--button и удаляем её,
     *    если она внезапно появилась в карточке.
     */
    setInterval(() => {
        const cinemaBtn = document.querySelector('.cinema--button');
        if (cinemaBtn) {
            console.log('[CinemaHider] кнопка Cinema найдена — удаляем');
            cinemaBtn.remove();
        }
    }, 1500);

    /**
     * 2) Добавляем Cinema как новый источник в выпадающий список «Смотреть».
     */
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
            // Этот код повторяет логику плагина Cinema,
            // чтобы запустить нужный компонент
            const id = Lampa.Utils.hash(
                movie.number_of_seasons
                    ? movie.original_name
                    : movie.original_title
            );
            const all = Lampa.Storage.get('clarification_search', '{}');

            // Если в вашей сборке нужно явно регистрировать компонент:
            // Lampa.Component.add('cinema_online', cinema_component);

            // Запускаем плагин Cinema
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

    console.log('[CinemaHider] «Cinema» добавлена как источник и кнопка скрывается');
})();
