'use strict';

const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');

const LOG_PREFIX = '[biogrenci]';
const PARTNER_API = 'https://biogrenci.com/api/partner';

const plugin = {};

function getSettings() {
	return new Promise((resolve, reject) => {
		meta.settings.get('biogrenci', (err, settings) => {
			if (err) return reject(err);
			resolve(settings || {});
		});
	});
}

plugin.init = async function (params) {
	const { router, middleware } = params;
	winston.info(`${LOG_PREFIX} Initializing...`);

	// Firsat page
	router.get('/firsat', middleware.buildHeader, renderFirsatlar);
	router.get('/api/firsat', renderFirsatlar);

	// API proxy: fetch opportunities
	router.get('/api/biogrenci/firsat', async (req, res) => {
		try {
			const data = await fetchOpportunities(req.query);
			res.json(data);
		} catch (err) {
			winston.error(`${LOG_PREFIX} Error: %s`, err.message);
			res.status(500).json({ error: err.message });
		}
	});

	// Admin page
	router.get('/admin/plugins/biogrenci', middleware.admin.buildHeader, renderAdmin);
	router.get('/api/admin/plugins/biogrenci', renderAdmin);

	winston.info(`${LOG_PREFIX} Ready — /firsat`);
};

async function renderFirsatlar(req, res) {
	res.render('biogrenci-firsatlar', { title: 'Öğrenci Fırsatları' });
}

async function renderAdmin(req, res) {
	res.render('admin/plugins/biogrenci', { title: "bi'öğrenci Fırsatlar" });
}

async function fetchOpportunities(query) {
	const settings = await getSettings();
	const clientId = settings.clientId;

	if (!clientId) {
		throw new Error('Client ID ayarlanmamış. Admin panelden ayarlayın.');
	}

	const params = new URLSearchParams();
	if (query.category_id) params.set('category_id', query.category_id);
	if (query.brand_id) params.set('brand_id', query.brand_id);
	if (query.type) params.set('type', query.type);
	if (query.search) params.set('search', query.search);
	if (query.sort) params.set('sort', query.sort || 'featured');
	params.set('page', query.page || 1);
	params.set('per_page', query.per_page || 20);

	const url = `${PARTNER_API}/opportunities?${params.toString()}`;

	const headers = {
		'Accept': 'application/json',
		'X-Client-Id': clientId,
	};

	if (settings.clientSecret) {
		headers['X-Client-Secret'] = settings.clientSecret;
	}

	const response = await fetch(url, { headers });

	if (!response.ok) {
		throw new Error(`Partner API: ${response.status}`);
	}

	return response.json();
}

plugin.addAdminNavigation = async function (header) {
	header.plugins.push({
		route: '/plugins/biogrenci',
		icon: 'fa-graduation-cap',
		name: "bi'öğrenci Fırsatlar",
	});
	return header;
};

module.exports = plugin;
