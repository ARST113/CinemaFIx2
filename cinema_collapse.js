(function() {
    'use strict';

    // Инициализация платформы
    Lampa.Platform.tv();

    // Анти-Debug: Переопределяем методы консоли, чтобы предотвратить вывод сообщений
    (function() {
        var dummy = function() {};
        var methods = ["log", "warn", "info", "error", "exception", "table", "trace"];
        for (var i = 0; i < methods.length; i++) {
            if (console[methods[i]]) {
                console[methods[i]] = dummy;
            }
        }
    })();

    // Ожидание загрузки объекта Lampa
    var intervalId = setInterval(function() {
        if (typeof Lampa !== "undefined") {
            clearInterval(intervalId);

            // Отменяем проверку источника загрузки
            // if (Lampa.Manifest.origin !== "bylampa") {
            //     Lampa.Noty.show("Ошибка доступа");
            //     return;
            // } else {
            var uid = Lampa.Storage.get("lampac_unic_id", '');
            if (uid !== "tyusdt") {
                Lampa.Storage.set("lampac_unic_id", "tyusdt");
            }
            Lampa.Utils.putScriptAsync(["http://185.87.48.42:2627/online.js"], function() {});
            // }
        }
    }, 200);
})();
