(function () {
    'use strict';

    console.log('[CinemaSource] плагин загружен');

    // 1) Силовой способ: каждые 1.5 сек удаляем кнопку Cinema, если она появляется на главном экране.
    setInterval(function() {
        const btn = document.querySelector('.cinema--button');
        if (btn) {
            console.log('[CinemaSource] кнопка Cinema найдена — удаляем');
            btn.remove();
        }
    }, 1500);

    // 2) Регистрируем источник Cinema через Lampa.Manifest.sources, если он ещё не добавлен.
    if (!Lampa.Manifest.sources.some(src => src.id === 'cinema_online')) {
        Lampa.Manifest.sources.push({
            type: 'video',             // тип источника
            id: 'cinema_online',       // уникальный идентификатор
            name: 'Cinema',            // название, которое будет отображаться в меню "Смотреть"
            onSelect: function(movie) {  // вызывается, когда пользователь выбирает этот источник
                console.log('[CinemaSource] onSelect для Cinema вызван');
                const id = Lampa.Utils.hash(
                    movie.number_of_seasons ? movie.original_name : movie.original_title
                );
                const all = Lampa.Storage.get('clarification_search', '{}');

                Lampa.Activity.push({
                    url: '',
                    title: Lampa.Lang.translate('title_online'),
                    component: 'cinema_online',
                    search: all[id] ? all[id] : movie.title,
                    search_one: movie.title,
                    search_two: movie.original_title,
                    movie: movie,
                    page: 1,
                    clarification: !!all[id]
                });
            }
        });
        console.log('[CinemaSource] Источник Cinema добавлен в Lampa.Manifest.sources');
    } else {
        console.log('[CinemaSource] Источник Cinema уже зарегистрирован');
    }
})();
