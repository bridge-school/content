## Useful Libraries

### How to install?

```sh
npm install library_name --save
npm i --save lib_name lib_name2 lib_name3
```
--save adds it to package.json file

* create-react-up
```sh
create-react-app app_name
```
info: https://github.com/facebookincubator/create-react-app

* react-router
info: https://github.com/ReactTraining/react-router

* shallow
info: http://airbnb.io/enzyme/docs/api/shallow.html

* chai
info: http://chaijs.com/api/bdd/

* sinon

* material ui
info: http://www.material-ui.com/#/

* atomic design
info: http://bradfrost.com/blog/post/atomic-web-design/

## React Tips

* Redux
https://egghead.io/courses/getting-started-with-redux
https://rangle-io.gitbooks.io/react-training/content/book/redux/

* clone element to pass props to `this.props.children`
```
<div>
    {React.cloneElement(this.props.children, { loggedIn: this.state.loggedIn })}
</div>
```

* Declare state changes separately from the component classes
https://twitter.com/dan_abramov/status/824308413559668744

* testing with react
https://rangle-io.gitbooks.io/react-training/content/book/testing/setup.html



## Other Tools

1. React Dev Tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
2. Allow Control Allow Origin (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)