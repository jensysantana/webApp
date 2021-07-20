<script>
	import { sideBarRightStoreInit } from './../../stores/side-bar-right/sideBarRight';
	// const asideBar = $sideBarRightStoreInit;
	$: {
		function reportWindowsSize() {
			console.log('***********1111111*********************');
			console.log(window.innerHeight);
			console.log(window.innerWidth);
			console.log('*************222222222222222*******************');
			console.log('------------------');
			console.log(window.screen.availWidth);
			console.log(window.screen.width);
			console.log(window.screen.availHeight);
			console.log(window.screen.height);
			console.log(window.screen.colorDepth);
			console.log(window.screen.orientation);
			console.log(window.screen.pixelDepth);
			console.log('------------------');
		}

		// window.onresize = reportWindowsSize;
	}
</script>

<li class="nav-item dropdown">
	<a class="nav-link" data-toggle="dropdown" href={'#'}>
		<i class="far fa-comments" />
		<span class="badge badge-danger navbar-badge">3</span>
	</a>
	<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
		<a href={'#'}>
			<!-- Message Start -->
			<div class="media">
				<img
					src="/assets/img/user1-128x128.jpg"
					alt="User Avatar"
					class="img-size-50 mr-3 img-circle"
				/>
				<div class="media-body">
					<h3 class="dropdown-item-title">
						Brad Diesel
						<span class="float-right text-sm text-danger"><i class="fas fa-star" /></span>
					</h3>
					<p class="text-sm">Call me whenever you can...</p>
					<p class="text-sm text-muted">
						<i class="far fa-clock mr-1" /> 4 Hours Ago
					</p>
				</div>
			</div>
			<!-- Message End -->
		</a>
		<div class="dropdown-divider" />
		<a class="dropdown-item" href={'#'}>
			<!-- Message Start -->
			<div class="media">
				<img
					src="/assets/img/user8-128x128.jpg"
					alt="User Avatar"
					class="img-size-50 img-circle mr-3"
				/>
				<div class="media-body">
					<h3 class="dropdown-item-title">
						John Pierce
						<span class="float-right text-sm text-muted"><i class="fas fa-star" /></span>
					</h3>
					<p class="text-sm">I got your message bro</p>
					<p class="text-sm text-muted">
						<i class="far fa-clock mr-1" /> 4 Hours Ago
					</p>
				</div>
			</div>
			<!-- Message End -->
		</a>
		<div class="dropdown-divider" />
		<a class="dropdown-item" href={'#'}>
			<!-- Message Start -->
			<div class="media">
				<img
					src="/assets/img/user3-128x128.jpg"
					alt="User Avatar"
					class="img-size-50 img-circle mr-3"
				/>
				<div class="media-body">
					<h3 class="dropdown-item-title">
						Nora Silvester
						<span class="float-right text-sm text-warning"><i class="fas fa-star" /></span>
					</h3>
					<p class="text-sm">The subject goes here</p>
					<p class="text-sm text-muted">
						<i class="far fa-clock mr-1" /> 4 Hours Ago
					</p>
				</div>
			</div>
			<!-- Message End -->
		</a>
		<div class="dropdown-divider" />
		<a
			href={'#'}
			class="dropdown-item dropdown-footer"
			type="button"
			data-toggle="modal----"
			data-target="#modal-xl---"
			on:click={(e) => {
				e.preventDefault();
				let myModal = document.querySelector('.mymodal');
				myModal.style.display = 'initial';
				// window.initAppSV();
				sideBarRightStoreInit.setOpenWith('Chat');

				// const actualWith = myModal.offsetWidth;
				// myModal.style.visibility = "initial";
				// console.log(
				//     "actualWithHHHHHHHHHHHHHHHHHHHHHHH: ",
				//     actualWith,
				// );
				// myModal.style.width = actualWith - 300;

				// setTimeout(() => {
				//     // myModal.style.width = 300;
				// }, 2000);
			}}>See All Messages</a
		>
		<!-- <a
           href={'#'} 
            class="dropdown-item dropdown-footer"
            data-widget="control-sidebar"
            data-slide="true"
            role="button"
            on:click={(e) => {
                e.preventDefault();
                sideBarRightStoreInit.setOpenWith("Chat");
            }}>See All Messages</a
        > -->
	</div>
</li>

<style>
</style>
