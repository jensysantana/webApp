<script>
	let ctrlFormShow = false;
	import FormComponent from '../../../components/form/FormComponent.svelte';
	import { langAppPageContent, langsArr } from '../../../stores/langs/langStore';
	import { setLangErrorMessage } from '../../../libs/setLangErrorMessage';
	import { emailValidation } from '../../../validations/fields/fields';
	import ErrorMessage from './../../../components/error-message/ErrorMessage.svelte';
	// console.log('---------document.location---------');
	// console.log(document.location);
	// console.log('---------document.location---------');
	// import { UrlOperations } from '../../../libs/helper-classes';
	// import { authWrapperFeedBack } from "../../helpers/wrappers/auth-wrapper-feed-back";
	// import AllRoutes from "../../routes/AllRoutes";
	// import { userAuthStore } from "./../../stores/user-auth-store/userAuthStore.js";
	// import { APP_CONFIG } from "../../config/config";
	// import ErrorMessage from "../../components/error-message/ErrorMessage.svelte";
	// import Alert from "./../../components/alerts/Alert.svelte";
	// import {
	//     emailValidation,
	//     // passwordValidation,
	// } from "../../validations/fields/authValidations";
	// import { authApi } from "../../services/api-auth";
	// document
	//     .getElementById("mainBody")
	//     .classList.remove(["login-page", "register-page", "lockscreen"]);
	// document.getElementById("mainBody").classList.add("login-page");

	// onMount(() => {
	//     if ($userAuthStore) {
	//         // navigate("/");
	//     }
	// });

	// App login page Language
	langsArr.setFieldsLang([
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
			select: ['logIn', 'btnNext', 'bthRegNAcc', 'bthIForgPass', 'bthSingInFace', 'bthSingInGoog']
		},
		{
			keyx: 'messages'
		},
		{
			keyx: 'assistance'
		},
		{
			keyx: 'authFormsValidations'
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
				'h2AccAssist'
			]
		}
	]);

	let globalLang;
	$: {
		// const {

		// } = $langAppPageContent;

		globalLang = {
			...$langAppPageContent
		};
	}

	// console.log('$langAppPageContent: ', $langAppPageContent);

	//==============================
	// Start create event
	//==============================

	// let submittedEmail = false;
	// let submitted = false;
	// let ctrlFormShow = false;
	// // let isValid;
	let frontFields = {
		password: 'Jashly326'
	};

	let frontFieldEmail = {
		email: 'jensysantana@gmail.co'
	};
	// // let frontFields = {
	// //     email: "",
	// //     password: "",
	// // };

	const validatorFieldEmail = {
		// email: {}
		email: emailValidation({
			server: false,
			typeReq: 'singIn',
			message: setLangErrorMessage({
				document: 'authFormsValidations',
				id: 'emailNotExists',
				defaultMessage: ''
			})
		})
	};

	const validatorFieldPassword = {
		// email: {...validatorFieldEmail},
		// password: passwordValidation(),
		password: ''
	};

	let errorFields = [];
	// let ctrlAlertShow = {
	//     show: false,
	//     // strongText: "Account registration assistance",
	//     strongText: logH2Acc,
	//     // text: `Sorry we cannot complete your request.`,
	//     text: sorryNotCompReq,
	//     color: "alert-info",
	//     closer: false,
	// };

	// function alertClose() {
	//     //setAlert close or open
	//     ctrlAlertShow.show = !ctrlAlertShow.show;
	//     ctrlAlertShow = ctrlAlertShow;
	// }

	async function handleSubmitEmail(e) {
		e.preventDefault();
		const { errFields, isValidForm } = e.detail;
		console.log('isValidForm: ', isValidForm);
		console.log('errFields: ', errFields);

		// submittedEmail = true;
		// // signUpStore.signUp(fields);

		// //close the alert if is open
		// ctrlAlertShow = {
		//     ...ctrlAlertShow,
		//     show: false,
		// };

		// if (isValidForm) {
		//     ctrlFormShow = true;
		//     errorFields = [];
		//     return true;
		// }
		errorFields = errFields;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { errFields, isValidForm } = e.detail;
		// submitted = true;
		// // signUpStore.signUp(fields);

		// //close the alert if is open
		// ctrlAlertShow = {
		//     ...ctrlAlertShow,
		//     show: false,
		// };
		// if (isValidForm) {
		//     const respDb = await authWrapperFeedBack(
		//         () => authApi.signIn({ ...frontFields, ...frontFieldEmail }),
		//         {
		//             localFields: [{ keyx: "email" }, { keyx: "password" }],
		//             pack: {
		//                 headerText: h2AccVerify,
		//                 redirect: AllRoutes.getPageRoute("signin"),
		//             },
		//             ctrlAlertShowObj: {
		//                 ...ctrlAlertShow,
		//             },
		//             defaultErrorType: "alert",
		//             showErrorsInFront: false,
		//             PageRoute: AllRoutes.getPageRoute("acc-sfb"),
		//         }
		//     );

		//     const { errors, errorType, data, status } = respDb;

		//     if (!errorType && status) {
		//         errorFields = [];
		//         const {
		//             response: { name, message },
		//         } = data;

		//         //successfuly
		//         // navigate to select bussines authorized home panel
		//         return;
		//     }
		//     if (errorType === "fields") {
		//         errorFields = errors;
		//         return;
		//     }
		//     if (errorType === "alert") {
		//         ctrlAlertShow = {
		//             ...respDb.ctrlAlertShow,
		//         };
		//         return;
		//     }
		//     return true;
		// }
		// errorFields = errFields;
	};

	// function handleChange(e) {
	//     // delete errors from array form fileds errors
	//     const { name, value } = e.target;
	//     errorFields = errorFields.filter((err) => err.path !== name);
	// }

	// async function iForgotMyPassword(e) {
	//     //get user data like phone if exists
	//     // UrlOperations.redirectURL("/recovery-feedback");
	//     //request-new-password
	//     e.preventDefault();
	//     console.log(555);
	//     const pack = {
	//         showIcon: false,
	//         headerIconClass: "",
	//         headerText: h2AccAssist,
	//         headerClass: "",
	//         message: null,
	//         messageClass: "",
	//         buttonText: logIn,
	//         // data: {
	//         //     // email: frontFields.email,
	//         //     isVerifyEmail: true,
	//         // },
	//     };

	//     try {
	//         const respDb = await authApi.accGetPhoneFromEmail({
	//             email: frontFieldEmail.email,
	//         });
	//         console.log("respDb SSSSSSSSSSSS: ", respDb);
	//         const {
	//             data: {
	//                 response: { name, message, userData },
	//             },
	//             status,
	//         } = respDb;

	//         if (userData) {
	//             console.log("userData: ", userData);
	//             const { email, phone } = userData;

	//             const fbu = btoa(
	//                 JSON.stringify({
	//                     message,
	//                     email: frontFieldEmail.email,
	//                     phone: phone,
	//                     isVerifyEmail: false,
	//                 })
	//             );

	//             UrlOperations.redirectURL(
	//                 `${AllRoutes.getPageRoute("recoveryfeed")}/${fbu}`
	//             );
	//         }
	//     } catch (error) {
	//         console.log("error: ", error);
	//         console.log("error: ", error.response);

	//         const {
	//             data: {
	//                 response: { name, message: msgD },
	//             },
	//             status,
	//         } = error.response;
	//         switch (name) {
	//             case "ValidationFeedBackError":
	//                 pack.message = msgD;
	//                 pack.showIcon = false;
	//                 //encode to base64 and navigate to feedback
	//                 const fbu = btoa(JSON.stringify(pack));
	//                 UrlOperations.redirectURL(
	//                     `${AllRoutes.getPageRoute("accvalidfeed")}/${fbu}`
	//                 );
	//                 break;

	//             default:
	//                 break;
	//         }
	//     }
	// }
</script>

<!-- <div class="login-page"> -->
<div class="login-box">
	<!-- {#if ctrlAlertShow.show}
        <Alert
            propes={ctrlAlertShow}
            on:click={(e) => {
                e.preventDefault();
                alertClose();
            }}
        />
    {/if} -->
	<div class="login-logo">
		<!-- <a
            to="/"
            on:click={(e) => {
                e.preventDefault();
                UrlOperations.redirectURL("/");
            }}
        >
            <b>{regTitle1of2}</b>{regTitle2of2}
        </a> -->
	</div>
	<!-- /.login-logo -->
	<div class="card">
		<div class="card-body login-card-body">
			<!-- <p class="login-box-msg">{logSubTitle}</p> -->

			{#if ctrlFormShow}
				<FormComponent
					class="form-sign-up"
					initialFields={frontFields}
					fieldsRules={validatorFieldPassword}
					on:submited={handleSubmit}
				>
					<!-- <div class="input-group mb-3">
                        <input
                            type="password"
                            class="form-control"
                            placeholder={gPassword}
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
                    <ErrorMessage name="password" {errorFields} />-->
					<div class="row">
						<div class="col-12">
							<button type="submit" class="btn btn-primary btn-block">{globalLang?.logIn}</button>
						</div>
					</div>
				</FormComponent>
			{:else}
				<!-- sing in form email -->

				<FormComponent
					class="form-sign-up"
					initialFields={frontFieldEmail}
					fieldsRules={validatorFieldEmail}
					execFront={false}
					on:submited={handleSubmitEmail}
				>
					<div class="input-group mb-3">
						<input
							type="email"
							class="form-control"
							placeholder={globalLang?.gEmail}
							bind:value={frontFieldEmail.email}
							name="email"
						/>
						<div class="input-group-append">
							<div class="input-group-text">
								<span class="fas fa-envelope" />
							</div>
						</div>
					</div>
					<ErrorMessage name="email" {errorFields} />
					<div class="row">
						{#if !ctrlFormShow}
							<div class="col-7">
								<div class="icheck-primary">
									<input type="checkbox" id="remember" />
									<label for="remember"> {globalLang?.logRemMe} </label>
								</div>
							</div>
							<div class="col-5">
								<button type="submit" class="btn btn-primary btn-block"
									>{globalLang?.btnNext}</button
								>
							</div>
						{:else}
							<div class="col-12">
								<button type="submit" class="btn btn-primary btn-block"
									>{globalLang?.btnNext}</button
								>
							</div>
						{/if}
					</div>
				</FormComponent>
			{/if}

			<!-- <div class="social-auth-links text-center mb-3">
                {#if !ctrlFormShow}
                    <p>- OR -</p>
                    <a href="#" class="btn btn-block btn-primary">
                        <i class="fab fa-facebook mr-2" />
                        {bthSingInFace}
                    </a>
                    <a href="#" class="btn btn-block btn-danger">
                        <i class="fab fa-google-plus mr-2" />
                        {bthSingInGoog}
                    </a>
                {/if}
            </div>

            {#if !ctrlFormShow}
                <p class="mb-0">
                    <a
                        href={AllRoutes.getPageRoute("signup")}
                        class="text-center"
                        on:click={(e) => {
                            e.preventDefault();
                            console.log(555);
                            UrlOperations.redirectURL(
                                AllRoutes.getPageRoute("signup")
                            );
                        }}>{bthRegNAcc}</a
                    >
                </p>
            {:else}
                <p class="mb-1">
                    <a href="#" on:click={iForgotMyPassword}>{bthIForgPass}</a>
                </p>
            {/if} -->
		</div>
	</div>
</div>

<style>
	@media (min-width: 577px) {
		.login-box {
			/* margin: 0.5rem auto; */
			width: 390px;
		}
	}
</style>
