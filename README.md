Making international calls while traveling abroad is painful. Roaming is expensive, SIM card sucks, Skype is cumbersome.

QuickCall lets you make international calls really quick. All you need to do is install this app on your Firefox OS mobile and get wifi access.

what this can do now
- users can make outbound calls over IP
- Express API server that's interacting with Plivo is running
- Client Angular app is working

Techstack
- target platform: firefox OS
- front-end: ionic, phonegap, angular
- back-end: node.js/express, mongoose(TBD),passport (TBD)
- voice/SMS: Plivo API[www.plivo.com]

- API server that interacts deployed via Heroku (planning to )
Backlogs

0. todos
- set the expectation: everyone states their expectations and goals for this project to get on the same page.
- bumpy road caution: chaotic work env. due to FF being a new platform, but will be a super duper confidence boost.
- product architecture
- decide on the git branching strategy.
- share contacts, collaboration(trello)
- mid check-in every 2-3days: deliverables/expectations/feedback
- REFACTOR!! (currently turn this spaghetti into something sensible and any developers can jump in to code)


1. technical specs
- UI
- auth (Passport) + Oauth?
- DB (Mongoose)
- native device API (Contacts)
- payment (Stripe API)
- deployment (heroku -> azure)

2. functional specs
- login (should store phone number)
- signup
- access contacts list, add a new contact
- show recent calls
- can access data offline (recent calls)


3. fancy things that we will wait to implement until we sort out fundamental UX/functionality problems.
- outbound sms
- voice recording
- add credit (payment)
