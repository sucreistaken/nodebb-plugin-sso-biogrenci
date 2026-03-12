<!-- IMPORT partials/breadcrumbs.tpl -->

<div id="biogrenci-firsatlar" class="bio-premium">
	<!-- Aurora Background Animation -->
	<div class="bio-aurora">
		<div class="bio-aurora-orb bio-orb-1"></div>
		<div class="bio-aurora-orb bio-orb-2"></div>
		<div class="bio-aurora-orb bio-orb-3"></div>
	</div>

	<div class="bio-hero">
		<div class="bio-hero-inner">
			<div class="bio-badge-premium">
				<i class="fa fa-gem"></i> bi'öğrenci Premium
			</div>
			<h1>Öğrenci Fırsatları</h1>
			<p>Öğrencilere özel inanılmaz indirim ve kampanyaları keşfedin.</p>
		</div>
	</div>

	<div class="bio-controls-wrapper">
		<div class="bio-controls">
			<div class="bio-search">
				<i class="fa fa-search"></i>
				<input type="text" id="bio-search" placeholder="Marka veya fırsat ara...">
				<div class="bio-search-ring"></div>
			</div>
			
			<div class="bio-filters" id="bio-filters">
				<button class="bio-chip active" data-type="">Hepsi</button>
				<button class="bio-chip" data-type="kupon"><i class="fa fa-ticket"></i> Kuponlar</button>
				<button class="bio-chip" data-type="qr"><i class="fa fa-qrcode"></i> QR Kod</button>
				<button class="bio-chip" data-type="affiliate"><i class="fa fa-external-link"></i> Linkler</button>
			</div>

			<div class="bio-sort">
				<i class="fa fa-sort-amount-desc bio-sort-icon"></i>
				<select id="bio-sort">
					<option value="featured">Öne Çıkanlar</option>
					<option value="popular">En Popüler</option>
					<option value="newest">En Yeni</option>
					<option value="alphabetical">A-Z</option>
				</select>
			</div>
		</div>
	</div>

	<div id="bio-grid" class="bio-grid">
		<!-- JavaScript will inject skeletons or cards here -->
	</div>

	<div id="bio-pager" class="bio-pager" style="display:none;">
		<button id="bio-prev" class="bio-pager-btn" disabled><i class="fa fa-arrow-left"></i></button>
		<div class="bio-page-bubble">
			<span id="bio-page-info">1 / 1</span>
		</div>
		<button id="bio-next" class="bio-pager-btn"><i class="fa fa-arrow-right"></i></button>
	</div>
</div>
