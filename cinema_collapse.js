
(function() {
    'use strict';
    
    // Sets the platform to TV mode
    Lampa.Platform.tv();
    
    // This is the main interval function that waits for Lampa to be defined
    var checkInterval = setInterval(function() {
        if (typeof Lampa !== 'undefined') {
            clearInterval(checkInterval);
            
            // Убираем проверку на origin
            // Оригинальная проверка была:
            // if (Lampa.Manifest.origin !== 'bylampa') {
            //     Lampa.Noty.show('Ошибка доступа');
            //     return;
            // }
            
            // Теперь код всегда будет выполняться независимо от origin
            
            // Устанавливаем значение в хранилище
            var storedValue = Lampa.Storage.get('lampac_unic_id', '');
            if (storedValue !== 'tyusdt') {
                Lampa.Storage.set('lampac_unic_id', 'tyusdt');
            }
            
            // Загружаем внешний скрипт
            Lampa.Utils.putScriptAsync(['http://185.87.48.42:2627/online.js'], function() {});
        }
    }, 200);
})();
