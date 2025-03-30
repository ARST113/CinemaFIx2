
Lampa.Platform.tv();

(function () {
    'use strict';

    console.log('[CinemaCollapse] Плагин сворачивания Cinema загружен');

    function startCinemaCollapse() {
        try {
            // Следим за событием полной отрисовки карточки
            Lampa.Listener.follow('full', function(e) {
                if (e.type === 'complite') {
                    setTimeout(function() {
                        // Находим кнопку Cinema (предполагается, что она имеет класс .cinema)
                        var cinemaElement = $('.full-start__button.cinema');
                        if (cinemaElement.length && !cinemaElement.parent().hasClass('card-external__body')) {
                            // Создаем обертку аккордеона
                            var collapseWrapper = $('<div class="card-external"></div>');
                            var collapseHeader = $('<div class="card-external__title">Cinema</div>');
                            var collapseBody = $('<div class="card-external__body"></div>');

                            // Собираем структуру: заголовок и тело
                            collapseWrapper.append(collapseHeader).append(collapseBody);

                            // Перемещаем кнопку Cinema внутрь тела
                            cinemaElement.appendTo(collapseBody);

                            // Добавляем обертку в общий контейнер кнопок (например, в .full-start-new__buttons)
                            $('.full-start-new__buttons').append(collapseWrapper);

                            // Устанавливаем обработчик клика на заголовок для сворачивания/разворачивания
                            collapseHeader.on('click', function() {
                                $(this).toggleClass('open');
                                collapseBody.slideToggle(200);
                            });
                            
                            console.log('[CinemaCollapse] Элемент Cinema обернут в collapse-контейнер');
                        }
                    }, 400); // задержка для уверенности, что интерфейс отрисован
                }
            });
        } catch (err) {
            console.error('[CinemaCollapse] Ошибка инициализации плагина:', err);
        }
    }

    startCinemaCollapse();
})();
