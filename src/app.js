// import es6-promise for older browsers + fetch polyfill
// https://github.com/github/fetch
//import './ItemSchema'
// import 'es6-promise'
// import 'whatwg-fetch'
import angular from 'angular'
import 'angular-animate'
import 'angular-aria'
import 'angular-material'
// if (self.fetch && typeof Promise !== "undefined") {
//   console.log('native fetch api supported')
// } else {
//
// }


angular.module( 'li-app', [ 'ngMaterial' ] )
  .config(($mdIconProvider, $mdThemingProvider) => {

    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('green');
  })
  .controller('AppController', AppController);

angular
  .element( document )
  .ready( function() {
    angular
      .module('starter-app-bootstrap', [ 'li-app' ])
      .run(()=>{
        console.log('Application initialized')
      });

    let body = document.getElementsByTagName("body")[0]
    angular.bootstrap( body, [ 'starter-app-bootstrap' ])
  });


function AppController($scope, $http, $mdDialog) { 
  $scope.db = {}
  $scope.fetch = () => {
    $http.get('https://jsonplaceholder.typicode.com/photos')
      .success((response) => {
        const counter = 25
        for (let inc = 0; inc < counter; inc++) {
          // localStorage.setItem((inc + 1), "No description yet added.")
          $scope.db[inc] = response[inc]
        }
      })
      // was going to use .fetch() w/react then went angular
      // fetch().then((res) => {
      //   console.log('Response from Fetch acquired')
      //   //console.log(res.json()) if you read the `res` obj more than once ya get err
      //   return res.json()
      // }).then((data) => {
      //   console.log(data)
      //   // handle component load
      // }).catch((err) => {
      //   console.log('Error from Fetch:')
      //   console.log(err)
      // })    
  };

  $scope.showDetail = (ev, photo) => {
    //console.log(ev)
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'popup.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        item: photo
      },
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  };
  $scope.fetch()  
};

function DialogController($scope, $mdDialog, item) {
  $scope.item = item
  $scope.description = localStorage.getItem(item['id'])

  console.log($scope)
  $scope.hide = () => {
    $mdDialog.hide()
  };
  $scope.save = (desc) => { 
    $scope.description = desc
    //console.log($scope.description)
    localStorage.setItem($scope.item['id'], desc)
    //console.log(localStorage.getItem($scope.item['id']))
    $mdDialog.hide()
  };
};


// uncomment for some pulp fiction in your console
// console.log('QQOQOQQQQQQQQQQQQQQQQQQQQQQQMQQQQO^^!!^^^^!^!^^^!!^!^^!^^!!^!^^^!^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^!^6OOOOOOQOO6OO6O66OOOO6O6OOOOO6OQOOOO6)');
// console.log('QQQQQQQQQMQQMQMQMQMQMQMQMQMQMQMQMO^^^!!6O666O66OO6I6III||I||!!!!^^^^^!!!^!!^!^^!^!^!^!^^^^!^^^^!!OQOOOOQOOOOOOO66I6I^^  .I6OOQOQOQOQOO)');
// console.log('QQQQQQMQMQMQMQMQMQMQMQMQMQMQMQMQMQ!^!!!I|OO6666666666I66III66I6I6I||O6I666O66OOOOOOQOOOO6I|^!!^^^QQOOQQQOOOOOO6              .OQQQQQQQ)');
// console.log('QMQQMQMQMMQMQQMQMQMQMMQMQMQMQMQMQQ!^!!!|!6I|!|||!||||!|!||!|||I|I^!^!III6I6I666I6II6IIIIIII|^!^!^OQQQQQQQOQO6.           !  .  QQOQQQO)');
// console.log('QMQMQMQMQMMQMQMQMQQMQMQMMQMQMQMQMQ!!!!!!|O6||!!!||!!|!!!!!^!^!!.         ^^^^!^^^^!^^^!!!II!!^!!!QQQQQQQQOO^        ..I!.Q6Q6^. MQQQQO)');
// console.log('QMQMQMQMQMQMQMQMQMQMQMQMQMQMQMQMQM!!!!!!!O6|||!!!!|!!!^!^^^^^^    !^  !I   ^^^.^^^.^^^^^^II!!!!!!QQQQQQQQO     . ^^OQQQMQMQMQMQO.6QQQQ)');
// console.log('QMQMQMMQMQMQMQMQMQMQMQMQMQMQMQMQMQ!|!!!^^6O||!|!|!|!!!!!^!^^^ ^| 6QOOQQQQMQMMQ.^.^..^^^^^|I.^!!^!QQQQQQOQ.   ..!QMMQMQQMQMQMQMQMM^QQQQ)');
// console.log('QMQQMMQQMQMQMQMQMQMQMQMQMQMQMQMQMQ|!!||^!IOI||!|!!|!!!!!^^^!O|   .!.     IMQQMO....^..^.^!I.^!!!!QQQQMQQQ.  !QOQQMQMQMQMMQMQMQMQMQ6MQQ)');
// console.log('QMMQMQMQMQMQMQMQMQMQMQMQQMQMQMQMQM|!|!|^^IO6||||||!!|!!!!!^QMQ          .!QQQMQI ........!|.^!!!|MQQQMQMO  |6OQMQMQMQMQMMQQMQMQMMQQQQQ)');
// console.log('MQMQMMQMQMQMQMQMQMQMQMQMQMQMQMQMQQ|!||!^^|OII||||I|!|!|!!^OMQM          ..MQQMQM.. . ....!|.^!!!|QMQMQQQQ^!OMQMQMQMQ6MQMMQMQMQQMQQQOQQ)');
// console.log('MQMQMQMQMQMQMQMQMQMQMQMQMQMQMQMMQM|||||^^|O6II|||II||!||!.OQQO  ..  |O^!I..MQMMQ.. . ...^!!.^!!!IMQMQMQMQQ^|MQQMQMM^^QQMQMQMQMOQMQOQMQ)');
// console.log('MQMQMQMQMQMQMQMQMQMQMQMQMQMQMQMQMQI|II|.^|QO6III|I|II|||^. OQO.6^.. ...^ ..OQ|QMQ  . ....!! !!!!6MQMQMQMQMQMQQMQ.MQ!....OQQMIOMQMQQMQM)');
// console.log('MQMQMQMQMQMQMQMQMQMQMQMQMQMMQMQMQQI||I|.^|Q66III|||I|!|!^...MO  .  ..     .|MIMQ|. . ....|^.!!!!6QMQMMQMQMQQM..^.6^^...^IOQMQMQMQQMMQM)');
// console.log('MQMQMQMQMQMQMQMQMQMQMQMQMQMQQMQMMQ6|II|^!IQ6I|II|I|I|||!!. ^MQ^.. ..I.  ..^!MQMQ. . .. ..6!^!!!!6MQMQMQMMQMQQ QOM!|Q^.!|Q6MQ6OQMQMQQMQ)');
// console.log('QMQMQMQMQMQMQMQMQMQMQMMQMQMQMQMQQM6III|^!IQOIIII|||||||!!^ .QQ.. . ... ..^^|MQMQ. . . ...6||!!!!OMMQMQMQMQQMQMQMMQ.|I!|IQQMO|6QIMMQMQM)');
// console.log('MQMQMQMQMQMQMQMQMQMQMQMQQMMQMQMQMQ6I6II^!IQ6IIII|||||!|!^. .IMM^^.^...^.^^|QQMQMQ  . . ..6!|!!!!QMMQMQMQMQMQMQMQQQQMO6QMMQQ!!6|I |QMQM)');
// console.log('QQMQMMQQMQMQMMQMQMQMQQMMQQMQMMQQMQ6II6I!^IQ66|I||!^.^.^^..^ ^QMQ|^....^^!MMQMQMQM.  . . .I^!|!!!QQMQMQQMQMQMQMQQMQQQQ6IMOII!!|.  OMOQM)');
// console.log('MQMQMQMQMQMMQMQQMQMMQMQMQMQMQMQMQM6I6I6|!QQQ6OO^   . .  .^...OQ. M^I|^IQMQMMMQQMM.. . . .|^^!!!!QMQMQMQMQMQMQQMQMQQQQMQQI!^.    .OMQO.)');
// console.log('QMMMMQQ6.    ^ MQQMQMQMQMQMQMQMQMQOIII|||QMQMQ  .   ...||6MOIOOQ  ^OQQOQQQ!!QQMMQ^.^^.^^^I^!!!!!QMQMQQO^.....^^.^^|Q ^. O.       MMQMO)');
// console.log('          |!!!   QMQMQMQQMQMQMQMQMO6I6I^I|^.     .  !|QQMQMMQQMQ     .!. ..^ .QMQMO!|I6666|!^!!!MQM|^.....^^!.!I^^I|| .6QI       QMQMM)');
// console.log('  .      .6Q6|!  .MQQMQMMQMQMQMQMQ6||^. ..^   .O!I^^QMQMQMQQMOQMO    IQM. ..|QQMQMQMMQQO^....^^!QMQM.I^Q^IQMMO!....^   QO       OQMQMQ)');
// console.log('  |QM^6QQQ^!!Q.MOO. . MMMMQMM6.       . .^^QQMMQ6O|MQMQQMQMQMQMQOQM   .^Q.. .  .MMQMQMQMQMQM6...^^QQI.QMMO6QMQMI|!!|IQ  MQQ       MMQMQM)');
// console.log('MQMQM.6Q6Q^QQMQ||II|   .   .I6QQQI|...! |IMMMQQMQMQMQMQMQMQMQMQMQ^.. O^.   |I.MMQMQMQMQMQMQI...^MQO!|I!QMMQMQMQMQQMQ.|MMQ      6QMQMQQ)');
// console.log('QMQMQQI  |QMQQO^MO|||..| !Q.!.  .QMMQMIQQOQQMMQMQMQMQMQQMQMM|. .   ^OQQQQO!.6IQQMQMQMQMQMQQM... ..^..!MMMQMQMQMQQMMQ QQMQ      MQMQMQM)');
// console.log('MQMQMQMM |6I6IOO6Q||I||IQ..Q!MQMQQQMQMQMQMQMMQMQMQMQMQMQMQMQQIQQQQMQQQMQ6Q||M.  .MQMMMQM . .... ..^MQMQQMQMQMQMQMQMM.MQMO     ^QMQMQQM)');
// console.log('QMQMQMQM  !|I6IO6^II6|!|Q..^MQMQMQMQMQMQMQMQMQMQQMQMQMQMQMQM|OMQM6MMQMQMMM6QMQQMQI . . ........!MQ|QQMQMQMQMQMQMMQQ6OMQMI    .MMQMQMQM)');
// console.log('MQQMQMQM6 .O66I||^6|6IIQM..IQMQMQMQMQMMQQMQMMQQMMQMQMQMQMQMQQMQMQ!!6M.6QOQMQMQMQMM..^|.^^^!..!^!OIQMQMQMQMQMQMQQMQM.MQMQ^     QMQMMQMQ)');


