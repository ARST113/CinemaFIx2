// Упрощенная версия для загрузки внешнего скрипта
const checkStorage = setInterval(() => {
    if(typeof Lampa !== 'undefined') {
        clearInterval(checkStorage);
        
        // Устанавливаем ID как 'lampa'
        Lampa.Storage.set('lampac_unic_id', 'lampa');
        
        // Загрузка внешнего скрипта
        Lampa.Utils.putScriptAsync(
            ['http://185.87.48.42:2627/online.js'], 
            () => {
                console.log('Скрипт успешно загружен');
            }
        );
    }
}, 200);
