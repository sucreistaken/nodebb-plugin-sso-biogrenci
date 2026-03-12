<div class="acp-page-container">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading"><i class="fa fa-graduation-cap"></i> bi'öğrenci Fırsatlar</div>
			<div class="panel-body">
				<div class="alert alert-info">
					<i class="fa fa-info-circle"></i> Bu plugin bi'öğrenci partner API'sinden öğrenci fırsatlarını çeker ve forumda gösterir.
					Fırsatlar sayfası: <a href="/firsat" target="_blank"><strong>/firsat</strong></a>
				</div>

				<form id="biogrenci-settings">
					<div class="form-group">
						<label for="clientId">Client ID</label>
						<input type="text" id="clientId" name="clientId" data-key="clientId" class="form-control" placeholder="Partner Client ID">
					</div>
					<div class="form-group">
						<label for="clientSecret">Client Secret</label>
						<input type="password" id="clientSecret" name="clientSecret" data-key="clientSecret" class="form-control" placeholder="Partner Client Secret">
					</div>
				</form>
			</div>
		</div>

		<button class="btn btn-primary" id="save">
			<i class="fa fa-save"></i> Kaydet
		</button>
	</div>
</div>
