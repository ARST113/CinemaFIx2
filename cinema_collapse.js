(function () {
    'use strict';

    console.log('[CinemaDomHack] плагин загружен');

    // 1) Силовой способ: каждые 1.5 сек удаляем кнопку Cinema, если она появляется на главном экране
    setInterval(() => {
        const btn = document.querySelector('.cinema--button');
        if (btn) {
            console.log('[CinemaDomHack] кнопка Cinema найдена — удаляем');
            btn.remove();
        }
    }, 1500);

    // 2) Отслеживаем появление меню «Источник» и вставляем туда пункт «Cinema»
    const observer = new MutationObserver(mutations => {
        // Проверяем, появился ли блок выбора источника
        const selectbox = document.querySelector('.selectbox .select__body');
        if (selectbox) {
            // Ищем, нет ли уже там нашего пункта
            if (!selectbox.querySelector('.selector[data-cinema="true"]')) {
                console.log('[CinemaDomHack] добавляем пункт Cinema в список источников');

                // Создаём DOM-элемент пункта
                const item = document.createElement('div');
                item.classList.add('selector');
                item.setAttribute('data-cinema', 'true');
                // Примерная структура, чтобы выглядеть как прочие пункты
                item.innerHTML = `
                    <div class="select__icon">
                        <svg width="24" height="24" viewBox="0 0 392.697 392.697">
                            <path fill="currentColor" d="M21.837,83.419l36.496,16.678L227.72,19.886c1.229-0.592,2.002-1.846,1.98-3.209..."/>
                        </svg>
                    </div>
                    <div class="select__name">Cinema</div>
                `;

                // При выборе пункта — закрываем меню и запускаем «Cinema»
                item.addEventListener('hover:enter', () => {
                    // Закрываем всплывающее окно
                    Lampa.Select.hide();

                    // Получаем данные о фильме/сериале
                    const activity = Lampa.Activity.active();
                    const movie = activity?.object?.movie || {};

                    // Аналог кода из плагина Cinema
                    const id = Lampa.Utils.hash(
                        movie.number_of_seasons ? movie.original_name : movie.original_title
                    );
                    const all = Lampa.Storage.get('clarification_search', '{}');

                    // Запускаем компонент cinema_online
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
                });

                // Добавляем пункт в конец списка
                selectbox.appendChild(item);
            }
        }
    });

    // Следим за изменениями во всём документе (другого «хука» нет)
    observer.observe(document.body, { childList: true, subtree: true });

})();
