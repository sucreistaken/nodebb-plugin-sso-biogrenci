'use strict';

define('forum/biogrenci-firsatlar', [], function () {
	var Page = {};
	var state = { page: 1, type: '', sort: 'featured', search: '' };
	var timer = null;

	Page.init = function () {
		load();

		$(document).on('click', '.bio-chip', function () {
			$('.bio-chip').removeClass('active');
			$(this).addClass('active');
			state.type = $(this).attr('data-type');
			state.page = 1;
			load();
		});

		$('#bio-sort').on('change', function () {
			state.sort = $(this).val();
			state.page = 1;
			load();
		});

		$('#bio-search').on('input', function () {
			clearTimeout(timer);
			var v = $(this).val();
			timer = setTimeout(function () {
				state.search = v;
				state.page = 1;
				load();
			}, 350);
		}).on('keydown', function (e) {
			if (e.key === 'Escape') {
				$(this).val('');
				state.search = '';
				state.page = 1;
				load();
			}
		});

		$('#bio-prev').on('click', function () {
			if (state.page > 1) { state.page--; load(); }
		});
		$('#bio-next').on('click', function () {
			state.page++; load();
		});
	};

	function load() {
		var skeletons = Array(9).fill(
			'<div class="bio-skeleton-card">' +
			'<div class="bio-shimmer bio-skel-img"></div>' +
			'<div class="bio-skel-body">' +
			'<div class="bio-shimmer bio-skel-brand"></div>' +
			'<div class="bio-shimmer bio-skel-title"></div>' +
			'<div class="bio-shimmer bio-skel-desc"></div>' +
			'<div class="bio-shimmer bio-skel-btn"></div>' +
			'</div>' +
			'</div>'
		).join('');
		$('#bio-grid').html(skeletons);

		var p = new URLSearchParams({ page: state.page, per_page: 20, sort: state.sort });
		if (state.type) p.set('type', state.type);
		if (state.search) p.set('search', state.search);

		fetch(config.relative_path + '/api/biogrenci/firsat?' + p.toString())
			.then(function (r) { return r.json(); })
			.then(function (res) {
				if (res.error) { empty(res.error); return; }

				var d = res.data || res;
				var items = d.opportunities || d.data || d;
				if (!Array.isArray(items)) items = [];
				var meta = d.meta || res.meta || {};

				if (!items.length) { empty(); return; }
				render(items);
				pager(meta);
			})
			.catch(function (e) { empty(e.message); });
	}

	function empty(msg) {
		$('#bio-grid').html(
			'<div class="bio-state bio-empty">' +
			'<i class="fa fa-' + (msg ? 'exclamation-circle' : 'gift') + '"></i>' +
			'<h3>' + (msg ? 'Bir sorun oluştu' : 'Fırsat bulunamadı') + '</h3>' +
			'<p>' + (msg || 'Farklı filtreler deneyin') + '</p>' +
			'</div>'
		);
		$('#bio-pager').hide();
	}

	function days(end) {
		if (!end) return null;
		var d = Math.ceil((new Date(end) - new Date()) / 864e5);
		return d > 0 ? d : null;
	}

	function render(items) {
		$('#bio-grid').html(items.map(function (it) {
			var brand = it.brand ? it.brand.name : (it.brand_name || '');
			var typ = it.type === 'kupon' ? 'Kupon' : it.type === 'qr' ? 'QR' : 'Link';
			var icon = it.type === 'kupon' ? 'ticket' : it.type === 'qr' ? 'qrcode' : 'external-link';
			var left = days(it.end_date);
			var btn = it.button_text || 'Fırsata Git';
			var url = 'https://biogrenci.com/firsat/' + it.slug;

			return '<a href="' + url + '" target="_blank" rel="noopener" class="bio-card' + (it.is_featured ? ' featured' : '') + '">' +
				'<div class="bio-card-img">' +
				(it.image ? '<img src="' + it.image + '" alt="' + brand + '" loading="lazy">' : '<div class="bio-card-ph"><i class="fa fa-gift"></i></div>') +
				'<span class="bio-tag bio-tag-' + it.type + '"><i class="fa fa-' + icon + '"></i> ' + typ + '</span>' +
				(it.is_featured ? '<span class="bio-star"><i class="fa fa-star"></i></span>' : '') +
				(left ? '<span class="bio-timer"><i class="fa fa-clock-o"></i> ' + (left <= 3 ? 'Son ' + left + ' gün!' : left + ' gün') + '</span>' : '') +
				'</div>' +
				'<div class="bio-card-body">' +
				(brand ? '<span class="bio-brand">' + brand + '</span>' : '') +
				'<h3>' + it.title + '</h3>' +
				(it.description ? '<p>' + it.description + '</p>' : '') +
				'<span class="bio-cta">' + btn + ' <i class="fa fa-arrow-right"></i></span>' +
				'</div>' +
				'</a>';
		}).join(''));
	}

	function pager(meta) {
		var t = meta.total || 0;
		if (t <= 20) { $('#bio-pager').hide(); return; }
		$('#bio-pager').show();
		var tp = Math.ceil(t / 20);
		$('#bio-page-info').text(state.page + ' / ' + tp);
		$('#bio-prev').prop('disabled', state.page <= 1);
		$('#bio-next').prop('disabled', state.page >= tp);
	}

	return Page;
});
