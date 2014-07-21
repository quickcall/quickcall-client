#QuickCall

QuickCall is the first mobile app on the Firefox Marketplace that allows internet based voice-calling (VoIP) on the Firefox Operating System.

For more about our project goals see our [PRESS-RELEASE.md](PRESS-RELEASE.md).

## Table of Contents

1. [Requirement](#requirement)
2. [Getting Started](#getting-started)
3. [Development](#development)
4. [Additional Resources](#additional-resources)
5. [Contributing](#contributing)


## Requirement

Read this README thoroughly if you want to save time.


## Getting Started
### List of the client-side dependencies
As this app was built using Ionic framework, it came with lots of libraries that are not necessarily useful for this project. Most of them were cleaned up but you might want to be reminded that this app currently uses the following only.

- Angular
- Angular-Animate
- Angular-Sanitize
- Ionic
- ngCordova
- ngFx
- lodash

### Installing Dependencies

From within the root directory:

```sh
npm install -g bower
npm install
bower install
```

### Plivo
This app uses the [Plivo API](http://plivo.com/) to make the voice calls. You will need Plivo's AuthID and Token to start using and testing this app. Sign up at Plivo (you'll get the Free Trial account with free credit for tests) and retrieve the authId and authToken from the [dashboard](https://manage.plivo.com/dashboard/).

### Firefox OS
Check [this](https://hacks.mozilla.org/2014/03/app-basics-for-firefoxos) out. Don't worry about building for a new platform you've never dealt with: it's almost* like a web app building for a mobile platform. Watch the vidoes. Everything will become clear.

## Development
### Tips
If you're overwhelmed by too many files and folders, just remember that the following folders are the absolute minimum you need to interact with to further develop this project.

#### Client
```sh
├── bower.json
├── package.json
├── platforms
└── www
```

#### Server
The server-side code is in a separate repo. Check it out: [server](https://github.com/quickcall/quickcall-server). But remember the following is all you need to modify to deploy the server via Heroku.

```sh
├── Procfile
├── node_modules
├── package.json
├── server.js
└── utility
```

### Testing
You can test this mobile app using Chrome's Developer Console as you would do for typical web apps.

To run the client app locally, run `ionic server` from the root directory. Pull up the Chrome, press esc and click on 'Emulation' to test on your target device. Also you can do the same thing on Firefox Browser if you want to test the app against the Firefox OS specifically.

You can also run the test on the Firefox OS simulator. For that, check out [this video](https://www.youtube.com/watch?v=wiROpnExj-A)




## Additional Resources
- [STYLE-GUIDE.md](STYLE-GUIDE.md) for style guidelines.
- [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
