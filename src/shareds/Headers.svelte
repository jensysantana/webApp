<script>
	import MessagesDropDownMenu from './messages-dropdown-menu/MessagesDropDownMenu.svelte';
	import Languages from '../components/languages/Languages.svelte';
	import AllRoutes from '../libs/AllRoutes';
	import NotificationsDropDownMenu from './notifications-drop-down-menu/NotificationsDropDownMenu.svelte';
	import { goto } from '$app/navigation';
</script>

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
	<!-- Left navbar links -->
	<ul class="navbar-nav">
		<li class="nav-item">
			<a class="nav-link" href={'#'} data-widget="pushmenu" role="button"
				><i class="fas fa-bars" /></a
			>
		</li>
		<li class="nav-item d-none d-sm-inline-block">
			<a href="index3.html" class="nav-link">Home</a>
		</li>
		<li class="nav-item d-none d-sm-inline-block">
			<a class="nav-link" href={'#'}>Contact</a>
		</li>
	</ul>

	<!-- Right navbar links -->
	<ul class="navbar-nav ml-auto">
		<!-- Navbar Search -->
		<li class="nav-item">
			<a class="nav-link" href={'#'} data-widget="navbar-search" role="button">
				<i class="fas fa-search" />
			</a>
			<div class="navbar-search-block">
				<form class="form-inline">
					<div class="input-group input-group-sm">
						<input
							class="form-control form-control-navbar"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<div class="input-group-append">
							<button class="btn btn-navbar" type="submit">
								<i class="fas fa-search" />
							</button>
							<button class="btn btn-navbar" type="button" data-widget="navbar-search">
								<i class="fas fa-times" />
							</button>
						</div>
					</div>
				</form>
			</div>
		</li>

		<!-- Messages Dropdown Menu -->
		<MessagesDropDownMenu />
		<!-- Notifications Dropdown Menu -->
		<NotificationsDropDownMenu />
		<!-- FUll Screen -->
		<li class="nav-item">
			<a class="nav-link" href={'#'} data-widget="fullscreen" role="button">
				<i class="fas fa-expand-arrows-alt" />
			</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href={'#'} data-widget="control-sidebar" data-slide="true" role="button">
				<i class="fas fa-th-large" />
			</a>
		</li>

		<!-- Language Dropdown Menu -->
		<Languages />
	</ul>

	<ul class="navbar-nav">
		<li class="nav-item d-none d-sm-inline-block">
			<a
				class="nav-link"
				href={'#'}
				on:click={(e) => {
					e.preventDefault();
					console.log(555);
					goto(AllRoutes.getPageRoute('signin'));
				}}>Sign In</a
			>
		</li>
		<li class="nav-item d-none d-sm-inline-block">
			<a
				class="nav-link"
				href={'#'}
				on:click={(e) => {
					e.preventDefault();
					console.log(555);
					goto(AllRoutes.getPageRoute('signup'));
				}}>Sign Up</a
			>
		</li>
		<li class="nav-item d-none d-sm-inline-block">
			<a
				class="nav-link"
				href={'#'}
				on:click={(e) => {
					e.preventDefault();
					console.log(555);
					goto(AllRoutes.getPageRoute('signout'));
				}}>Sign Out</a
			>
		</li>
	</ul>
</nav>

<!-- /.navbar -->
<style>
	/* .dropdown-menu {
		padding: 0;
	} */
</style>
