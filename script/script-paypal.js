login_to_paypal();

function login_to_paypal(){
  paypal.use( ['login'], function (login) {
    login.render ({
      "appid":"AWa4VwatxatUYn7Fv2s3DL8yDE26jOEWKFdbQH_Pm4cSRSMQOzXRmudHGrilfhBtjiRAAQHAsjPL1uSP",
      "authend": "sandbox",
      "scopes":"openid",
      "containerid":"paypal-login-button",
      "responseType":"code",
      "locale":"en-us",
      "buttonType":"LWP",
      "buttonShape":"rectangle",
      "buttonSize":"lg",
      "fullPage":"false",
      "nonce":13862, //random number - redirects to the parent browser
      "returnurl":"nativexo://paypalpay"
      //"returnurl":"https://github.com/bwiitanen26/bwiitanen26.github.io"
    });
  });
}