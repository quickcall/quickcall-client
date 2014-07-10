Making international calls while traveling abroad is painful. Roaming is expensive, SIM card sucks, Skype is cumbersome.

QuickCall lets you make international calls really quick. All you need to do is install this app on your Firefox OS mobile and get wifi access.

## getting started
* ionic:http://ionicframework.com/getting-started/
* phonegap/cordova: http://phonegap.com/blog/2014/04/22/firefox-os-phones-for-phonegap-developers/
* firefox: https://hacks.mozilla.org/2014/03/app-basics-for-firefoxos/

## Techstack
* target platform: firefox OS
* front-end: ionic, phonegap, angular
* back-end: node.js/express, mongoose(TBD),passport (TBD)
* voice/SMS: Plivo API[www.plivo.com]

## backlogs

Refactoring 
- clean up back end
- clean up front end

DB
- know auth id && auth token && phone number && user id && email && recent history 
- local storage as a fallback (recent history)
- settings 

Authentication
- OAuth (google?)
- username
- password hash
- security delegation (credits)

Server
- can receive outbound call POST requests from client (with JSON req.body)
- can send POST request to ask Plivo to trigger a call
- can handle POST request from Plivo and provide an XML doc (tell plivo what to do next)
- can send request with correct auth_id and token so that users’ credit get charged
- can pass the call status to the client (call triggered, calling, call failed, call connected, call ended)
- can deflect requests that are not coming from users of the app (check auth)

Front-end
- can log in
- can sign up
- can change settings (add auth id and auth token)
- changes in settings can persist
- can call a number (POST request to server)
- can see numbers I called recently 
- can get the device phone number of a user
- can see contacts I have on my phone
- can add a new contact of the number I called recently
- can show sensible feedback to users depending on the call status (e.g. loading: call triggered, calling, call failed, call connected, call ended)

UI
- native feeling


Feature
- redirect user to sign up on plivo
- rediect 

