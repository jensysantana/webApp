<script>
	// import { query, graphql } from '$houdini';
	import FormComponent from '../../../components/form/FormComponent.svelte';
	import { langAppPageContent, langsArr } from '../../../stores/langs/langStore';
	import { setLangErrorMessage } from '../../../libs/setLangErrorMessage';
	import ErrorMessage from './../../../components/error-message/ErrorMessage.svelte';

	// import { userAuthStore } from "./../../stores/user-auth-store/userAuthStore.js";
	// if ($userAuthStore) {
	//     // navigate("/");
	// }
	// import { authApi } from '../../services/api-auth';
	// document
	// 	.getElementById('mainBody')
	// 	.classList.remove(['login-page', 'register-page', 'lockscreen']);
	// document.getElementById('mainBody').classList.add('register-page');

	import {
		DataFormater
		// UrlOperations
	} from '../../../libs/helper-classes';
	import AllRoutes from '../../../libs/AllRoutes';
	import {
		fnameValidation,
		lnameValidation,
		emailValidation,
		passwordValidation,
		cPasswordValidation
	} from '../../../validations/fields/fields';
	import Alert from '../../../components/alerts/Alert.svelte';

	import { getStores } from '$app/stores';
	import { CookiesHelper } from '../../../libs/helper-classes';
	getStores().session.subscribe((store) => {
		const cookieshelper = new CookiesHelper();
		langsArr.setFieldsLang({
			fields: [
				{
					keyx: 'globalLang',
					select: [
						'gEmail',
						'gPassword',
						'gCPassword',
						'gPhone',
						'gPhoneCode',
						'gName',
						'gLname',
						'gNewPassword'
					]
				},

				{
					keyx: 'msgInfo',
					select: ['sorryNotCompReq']
				},
				{
					keyx: 'sorryMessages'
				},
				{
					keyx: 'buttonNames',
					select: [
						'logIn',
						'btnNext',
						'bthRegNAcc',
						'bthIForgPass',
						'bthSingInFace',
						'regist',
						'bthSingInGoog'
					]
				},
				{
					keyx: 'messages'
				},
				{
					keyx: 'assistance'
				},
				{
					keyx: 'authFormsValidations',
					select: ['emailNotExists']
				},
				{
					keyx: 'authFormsPageText',
					select: [
						'regTitle1of2',
						'regTitle2of2',
						'h2AccVerify',
						'logH2Acc',
						'logSubTitle',
						'logRemMe',
						'h2AccAssist',
						'regSubTitle',
						'regHaveAnAcc',
						'h2AccReg',
						'checkYEmail'
					]
				}
			],
			uaidLang: cookieshelper.getCookie('ULANG', store),
			replacer: true
		});
	});

	let globalLang;
	$: {
		// console.log('---------$langAppPageContent---------');
		// console.log($langAppPageContent);
		// console.log('---------$langAppPageContent---------');
		globalLang = {
			...$langAppPageContent
		};
	}
	//==============================
	// Start create event
	//==============================

	let submitted = false;
	// let isValid;
	let frontFields = {
		fname: 'jens',
		lname: 'santan',
		email: 'jensysantana@gmail.co',
		password: 'Jashly326',
		cpassword: 'Jashly326'
	};

	const validatorFields = {
		fname: fnameValidation(),
		lname: lnameValidation(),
		email: emailValidation({
			server: true,
			typeReq: 'singUp',
			message: globalLang?.emailNotExists || ''
		}),
		password: passwordValidation(),
		cpassword: cPasswordValidation()
	};
	// const Schema = yup.object().shape(validatorFields);

	let errorFields = [];
	let ctrlAlertShow = {
		show: false,
		// strongText: "Account registration assistance",
		strongText: globalLang?.h2AccReg || '',
		// text: `Sorry we cannot complete your request.`,
		text: globalLang?.sorryNotCompReq || '',
		color: 'alert-info',
		closer: false
	};

	function alertClose() {
		//setAlert close or open
		ctrlAlertShow.show = !ctrlAlertShow.show;
		ctrlAlertShow = ctrlAlertShow;
	}
	// const { data } = query(graphql`
	// 	query info {
	// 		info
	// 	}
	// `);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { errFields, isValidForm } = e.detail;
		submitted = true;
		// signUpStore.signUp(fields);
		// load the items
		// console.log(data);
		// data.subscribe((dak) => {
		// 	console.log('---------dak-.svelte--------');
		// 	console.log(dak);
		// 	console.log('---------dak-.svelte--------');
		// });
		//close the alert if is open
		// ctrlAlertShow = {
		// 	...ctrlAlertShow,
		// 	show: false
		// };

		if (isValidForm) {
			/*
			try {
				//send request to api
				const respDb = await authApi.signUp(frontFields);
				const {
					// status,
					data: {
						response: { name, message }
					}
				} = respDb;
				//get name type response
				switch (name) {
					case 'success':
						const pack = {
							showIcon: true,
							headerIconClass: '',
							headerText: globalLang?.checkYEmail,
							headerClass: '',
							message: `${message}`,
							messageClass: '',
							// redirect: UrlOperations.redirectURL(AllRoutes.getPageRoute('signin')),
							buttonText: 'Sing In',
							bgButtonText: 'bg-dark',
							data: {
								email: frontFields.email,
								isVerifyEmail: true
							}
						};
						//encode to base64 and navigate to feedback
						const fbu = btoa(JSON.stringify(pack));
						// UrlOperations.redirectURL(`${AllRoutes.getPageRoute('acc-sfb')}/${fbu}`);
						break;

					default:
						// set default error to show in alert
						ctrlAlertShow = {
							...ctrlAlertShow,
							text: message || globalLang?.sorryNotCompReq,
							show: true,
							color: 'alert-warning'
						};
						break;
				}
			} catch (error) {
				if (error?.response) {
					const {
						data: {
							response: { fields, name, message }
						}
					} = error.response;
					//get the error name type

					switch (name) {
						case 'TemporaryUnable':
							if (1) {
								return false;
							}
							break;
						case 'ValidationError':
							let newFields = {};
							//if error come from fields of form sent
							if (fields && Object.keys(fields).length > 0) {
								newFields = DataFormater.transFormErrorToYupMessage(fields, [
									{ keyx: 'fname' },
									{ keyx: 'lname' },
									{ keyx: 'email' },
									{ keyx: 'password' },
									{ keyx: 'cpassword' }
								]);
								errorFields = [...newFields];
								return true;
							}
							//set default errror to alert
							ctrlAlertShow = {
								...ctrlAlertShow,
								text: message || globalLang?.sorryNotCompReq,
								// "Sorry, we cannot process your request, try again.",
								show: true,
								color: 'alert-danger'
							};
							if (1) {
								return true;
							}

							break;

						default:
							//set default errror to alert
							ctrlAlertShow = {
								...ctrlAlertShow,
								text: message || globalLang?.sorryNotCompReq,
								// "Sorry, we cannot process your request, try again.",
								show: true,
								color: 'alert-danger'
							};
							if (1) {
								return true;
							}
							break;
					}
				} else {
					// set a default error if type error is deferent then errors come from db error.response
					ctrlAlertShow = {
						...ctrlAlertShow,
						text: globalLang?.sorryNotCompReq,
						// "Sorry, we cannot process your request, try again.",
						show: true,
						color: 'alert-danger'
					};
					return true;
				}
			}

			*/
		}
		errorFields = errFields;
	};

	function handleChange(e) {
		// delete errors from array form fileds errors
		const { name, value } = e.target;
		errorFields = errorFields.filter((err) => err.path !== name);
	}
</script>

<!-- <div class="register-page"> -->

<div class="register-box">
	{#if ctrlAlertShow.show}
		<Alert
			propes={ctrlAlertShow}
			on:click={(e) => {
				e.preventDefault();
				alertClose();
			}}
		/>
	{/if}

	<div class="register-logo">
		<!-- <a href="/"><b>My</b>Trucks</a> -->
		<a
			href="/"
			on:click={(e) => {
				e.preventDefault();
				// UrlOperations.redirectURL('/');
			}}
		>
			<b>{globalLang?.regTitle1of2 || ''}</b>{globalLang?.regTitle2of2 || ''}
		</a>
	</div>
	<!-- {$signUpStore} -->
	<div class="card">
		<div class="card-body register-card-body">
			<!-- <p class="login-box-msg">Register a new membership</p> -->
			<p class="login-box-msg">{globalLang?.regSubTitle || ''}</p>
			<!-- on:submit={handleSubmit} -->
			<FormComponent
				initialFields={frontFields}
				fieldsRules={validatorFields}
				execFront={false}
				on:submited={handleSubmit}
				class="form-sign-up"
			>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						placeholder={globalLang?.gName || ''}
						bind:value={frontFields.fname}
						on:change={handleChange}
						name="fname"
					/>
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-user" />
						</div>
					</div>
				</div>
				<ErrorMessage name="fname" {errorFields} />
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						placeholder={globalLang?.gLname || ''}
						bind:value={frontFields.lname}
						on:change={handleChange}
						name="lname"
					/>
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-user" />
						</div>
					</div>
				</div>
				<ErrorMessage name="lname" {errorFields} />
				<div class="input-group mb-3">
					<input
						type="email"
						class="form-control"
						placeholder={globalLang?.gEmail || ''}
						bind:value={frontFields.email}
						on:change={handleChange}
						name="email"
					/>
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-envelope" />
						</div>
					</div>
				</div>
				<ErrorMessage name="email" {errorFields} />
				<div class="input-group mb-3">
					<input
						type="password"
						class="form-control"
						placeholder={globalLang?.gPassword || ''}
						bind:value={frontFields.password}
						on:change={handleChange}
						name="password"
					/>
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-lock" />
						</div>
					</div>
				</div>
				<ErrorMessage name="password" {errorFields} />
				<div class="input-group mb-3">
					<!-- placeholder="Retype password" -->
					<input
						type="password"
						class="form-control"
						placeholder={globalLang?.gCPassword || ''}
						bind:value={frontFields.cpassword}
						on:change={handleChange}
						name="cpassword"
					/>
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-lock" />
						</div>
					</div>
				</div>
				<ErrorMessage name="cpassword" {errorFields} />
				<div class="row">
					<div class="col-8">
						<div class="icheck-primary">
							<!-- <input
                                type="checkbox"
                                id="agreeTerms"
                                name="terms"
                                value="agree"
                                
                            /> -->
							<!-- <label for="agreeTerms">
                                By create an account, you acknowledge you have read and agree to our 
                                <a href={'#'}>User agreement terms of use and privacy policy.</a>
                            </label> -->

							<p class="small">
								By create an account, you acknowledge you have read and agree to our <a
									href={'#'}
									class="text-primary"
									on:click={(e) => {
										e.preventDefault();
										// UrlOperations.redirectURL("/");
									}}
								>
									User agreement terms of use and privacy policy.
								</a>
							</p>
						</div>
					</div>
					<!-- /.col -->
					<div class="col-4">
						<button class="btn btn-primary btn-block" type="submit"
							>{globalLang?.regist || 'Next'}</button
						>
					</div>
					<!-- /.col -->
				</div>
			</FormComponent>
			<!-- <form
                on:submit|preventDefault={handleSubmit}
                on:change={async (e) => {
                    console.log(e);
                    let { name, value } = e;
                    console.log(name, value);
                    await runValidations();
                }}
            /> -->

			<div class="social-auth-links text-center">
				<p>- OR -</p>
				<a href={'#'} class="btn btn-block btn-primary">
					<i class="fab fa-facebook mr-2" />
					Sign up using Facebook
				</a>
				<a href={'#'} class="btn btn-block btn-danger">
					<i class="fab fa-google-plus mr-2" />
					Sign up using Google+
				</a>
			</div>

			<!-- href={AllRoutes.getPageRoute('signin')} -->
			<a
				href={'#'}
				class="text-center"
				on:click={(e) => {
					e.preventDefault();
					console.log(555);
					// UrlOperations.redirectURL();
					AllRoutes.getPageRoute('signin');
				}}>{globalLang?.regHaveAnAcc || ''}</a
			>
			<!--I already have a membership</a -->
		</div>
		<!-- /.form-box -->
	</div>
	<!-- /.card -->
</div>
<!-- /.register-box -->

<!-- </div> -->
<style>
	@media (min-width: 577px) {
		.register-box {
			/* margin: 0.5rem auto; */
			width: 390px;
		}
	}
</style>
