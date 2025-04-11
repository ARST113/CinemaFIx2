(function() {
  "use strict";

  // Определяем базовые параметры: сервер и адрес лампы
  var Defined = {
    server: "http://185.87.48.42:2627/",  // адрес сервера для приёма отчётов
    lampUrl: "bylampa.online"            // адрес вашей лампы
  };

  // Функция отправки информации о адресе лампы на сервер
  function sendLampAddress() {
    var request = new Lampa.Reguest();
    // Формируем URL запроса — здесь предполагается, что сервер ожидает GET-запрос на endpoint 'report'
    var url = Defined.server + "report";
    var query = "lamp=" + encodeURIComponent(Defined.lampUrl) + "&timestamp=" + Date.now();
    request.native(url + "?" + query, function(response) {
      console.log("Информация о лампе отправлена на сервер:", response);
    }, function(error) {
      console.error("Ошибка отправки информации о лампе на сервер:", error);
    }, false, { dataType: "text" });
  }

  // Отправляем информацию сразу при запуске плагина
  sendLampAddress();

  // Если требуется, можно добавить функциональность плагина в виде компонента.
  // В данном примере компонент здесь выступает как заглушка.
  function pluginReportComponent() {
    // Здесь можно добавить дополнительную логику работы плагина,
    // если необходимо показывать интерфейс или обрабатывать события.
    console.log("Плагин report_plugin загружен. Информация о лампе уже отправлена.");
  }

  // Регистрируем плагин в системе Lampa с именем "report_plugin"
  Lampa.Component.add("report_plugin", pluginReportComponent);
})();
