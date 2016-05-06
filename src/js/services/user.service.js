export default class User {
  constructor(JWT, AppConstants, $http, $state) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;

    this.current = null;

  }

// Attempt to authenticate by registering or logging in
  attemptAuth(type, credentials) {
   let route = (type === 'login') ?'/login' : '';
   return this._$http({
     url: this._AppConstants.api + '/users' + route,
     method: 'POST',
     data: {
       user: credentials
     }
   }).then(
     // On success...
     (res) => {
       this._JWT.save(res.data.user.token);
       this.current = res.data.user;

       return res;
     }
   );
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this.$_state.$current, null, { reload: true });
  }

}
