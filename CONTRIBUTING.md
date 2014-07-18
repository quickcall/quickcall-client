#Contributing

##General Workflow

1. Fork the repository
1. Cut a branch from the dev branch (tip: your forked repo never directly interact with the master branch)
  - Name your branch, i.e fix-login-view 
  - git remote add upstream https://github.com/quickcall/quickcall-client.git
  - Make changes on your branch
  - git add your changes
  - git commit your changes
  - git pull --rebase upstream dev
  -fix any potential merge conflicts
  - git push origin 'your branch's name'
1. Submit a pull request to the quickcall-client dev branch on Github
1. Your pull request will be reviewed by a maintainer.
  - Follow our style guide to make sure your changes fall in line with our code.
  - Make sure to follow our commit format to increase the likelihood your code is merged in.
1. Once the code is reviewed, if it is of quality, we will merge it into our branch.
