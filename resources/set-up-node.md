## Mac OS X

You _can_ use the NodeJS installer from the Node website. However, installing Node using `nvm` has a lot of benefits including various security benefits.

#### Install `nvm`
You need to have Xcode **or** the [Command Line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/) installed to provide a C++ compiler. Then, grab and run the install script:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash

(This downloads the `install.sh` file and then pipes it to `bash` to be executed.)

#### Use it to install node
Now you can take advantage of the [power of `nvm`](https://github.com/creationix/nvm/blob/master/README.markdown#usage) to rock multiple versions of Node and hop around between them:
```sh
nvm install v6
nvm install 0.12
nvm use v6
node --version # prints 6.3.0
nvm use 0.12
node --version # prints 0.12.15
nvm ls # prints all the versions you have installed.
```

## Windows
Use the installer on the [NodeJS Site](https://nodejs.org/en/download/) since `nvm` is not officially maintained for windows.
