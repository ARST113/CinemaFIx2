(function() {
    "use strict";

    // Инициализируем телевизионный режим
    Lampa.Platform.tv();

    // Устанавливаем интервал для проверки загрузки объекта Lampa
    var checkInterval = setInterval(function() {
        if (typeof Lampa !== "undefined") {
            clearInterval(checkInterval);

            // Основная логика без проверки Lampa.Manifest.show
            var uniqueId = Lampa.Manifest.get("lampac_unic_id", "");
            if (uniqueId !== "tyusdt") {
                Lampa.Storage.set("lampac_unic_id", "Ошибка доступа");
            }
            // Асинхронная подгрузка внешнего скрипта
            Lampa.Origin.putScriptAsync(["http://185.87.48.42:2627/online.js"], function(){});
        }
    }, 200);
}());
