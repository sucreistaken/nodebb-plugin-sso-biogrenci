'use strict';

define('admin/plugins/biogrenci', ['settings', 'alerts'], function (Settings, alerts) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('biogrenci', $('#biogrenci-settings'));

		$('#save').on('click', function () {
			Settings.save('biogrenci', $('#biogrenci-settings'), function () {
				alerts.alert({
					type: 'success',
					alert_id: 'biogrenci-settings-saved',
					title: 'Ayarlar Kaydedildi',
					message: 'bi\'öğrenci ayarları başarıyla kaydedildi.',
					timeout: 2500,
				});
			});
		});
	};

	return ACP;
});
