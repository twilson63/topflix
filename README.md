# TopFlix

### Tutorial Setup

* Install NodeJS https://nodejs.org
* `git clone https://github.com/twilson63/topflix.git`
* open console and run:

``` sh
cd topflix
npm install
npm run dev
```
Or use glitch

https://glitch.com/edit/#!/topflix?path=README.md:1:0
---

Top flix is a react/redux tutorial that gives developers a way to practice building react/redux applications, this tutorial will go through the basics:

* Why
* JSX
* what is a component
* presentational components
* container components
* higher order components
* lifecycle events
* routing
* redux store
* reducers
* actions and action creators
* redux thunk and fetch
* testing with tape and enzyme

## Summary

There are many ways to build react applications, in this tutorial we are not focused on all the ways or a single way, as much as trying to help you build a mental model of the component model architecture and how it is different than that of a model/view/controller architecture that works so well on the server. The component model architecture with unidirectional flow is an architecture that divides its concerns into

* view components
* events/actions/side effects
* state/store/model

The view component in this case react does not separate out the declarative presentation and the logic to render that presentation in to templates, it uses a transpile step which takes JSX an xml like structure and transforms it into javascript function calls that when called render or return Virtual Dom Node components, that can be applied to the react render engine. This process creates a powerful abstraction between the DOM and your application view layer. This abstraction essentially turns javascript is to a powerful template engine enabling you leverage all the features in javascript to generate your presentation look and feel in a very declarative way. No `ejs`, `haml` or `handlebars`. You simply write javascript.

## Why?

### Why was react created?

### Why is React a good choice?

The focus on declarative simple to read syntax combined with the lowest barrier of friction to create components.

### Why should you learn react?

* It will make you better at JavaScript
* It will change the way you think about application development


## JSX

Creating a React Component is simply invoking a function, the result of that function must return a component. In JavaScript there are several ways to define and call functions, this is just another one.

``` js
<h1>Hello World</h1>
```

becomes

``` js
React.createElement('h1', null, 'Hello World')
```

Using the JSX syntax it becomes pretty easy to create composable function calls that are easy to read for the developer.

``` js
<div>
  <ul>
    <li>1</li>
    <li>2</li>
  </ul>
</div>
```

The above is much easier to read that then following:

``` js
let h = React.createElement

h('div', null,
  h('ul', null, [
    h('li', null, '1'),
    h('li', null, '2')
  ])
)
```

> Some people may argue, but the React community overall has embraced the JSX syntax and it has spread beyond React. It actually creates a nice declarative structure to think about composition and the composition of functions.

### Presentational and Container Components

Before we talk about the difference between presentational and container components we must first understand how data is passed to a component and how actions are passed out of a component.

> Data Down and Actions Up

Data Down and Actions Up is a common phrase, but a presentational component is a component that takes data in and pushes or invokes actions up. They do not connect with the store or produce side effects.

The way data is passed into a presentational component is through `props` these look like html attributes, but they are more like arguments in a function call.

``` js
<h1 id="beep" className="boop">Hello World</h1>
```

You can imagine that there is a function called `h1` and it has an argument options ball, in that argument options ball, there is three nodes:

id, className, children

might look something like this:

```
function h1 ({id, className, children}) {
  console.log(id) // beep
  console.log(className) // boop
  console.log(children) // Hello World

  return virtualDOMNode
}
```

So we can use props to get data down to the the component, how do we get actions up? We can pass all kinds of values down as props, (numbers, strings, booleans, arrays, objects, and functions)

> functions are values in javascript

So to get actions up, we actually pass a function as a prop that can be invoked by the child component when they handle an event.

``` js
<button id="foo" onClick={e => console.log('you clicked me')}>Click Me</button>
```

In this example we are passing a function to the button component as the `onClick` prop, so when a user clicks on this button, the button component will
invoke the function being passed in. You will see better examples of this in the tutorial, but the gist is, inorder to get actions to bubble up from the child components the functions must be passed down via props.

So Presentational components are components that do not know any specifics about the application, other than they data they are passed and the actions they are passed via props.

### Container Components

Container components on the other hand are higher order components that connect presentational compoenents to state and actions. These components commonly connect to a data store to pass data down and process actions from children components. You will see more examples of container components, but here is a redux list container component for widgets.

``` js
import List from './component'
import { connect } from 'react-redux'

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(List)

function mapStateToProps (state) {
  return {
    widgets: state.widgets,
    sort: state.widgetSortBy
  }
}

function mapActionsToProps (dispatch) {
  return {
    sortWidget: function (field) {
      dispatch({type: 'SORT_WIDGET', payload: field})
    }
  }
}
```

This container component passes the state and action as props to the List Component, so the list component does not have to worry about how to get access to the data or to send the sort request to the store.

### Higher Order Components

The container component is called an Higher Order Component or HOC. This means that the component, is basically a function that may take one or more arguments to return a function that accepts a component as the input and then will return a component as the output.

``` js
function hoc (a,b) {
  return function (Component) {
    return <Component a={a} b={b} />
  }
}
```

This hoc takes two arguments, a and b, then returns a function that takes a component as an argument and returns a component as output. Higher Order components can be used to add data and state to presentational components as well as manage lifecycle events for presentational components.

### LifeCycle Events

A React Component is commonly called a state machine, because it is comprised of lifecycle hooks that can allow the developer to perform certain processes at certain times in the component lifecycle.

* componentWillMount
* componentDidMount
* componentWillUnmount
* shouldComponentUpdate

These lifecycle events are available and should only be used when needed.

### Routing

Routing does not come out of the box with react, it is left to userland to implement routing, by far the most popular router is ReactRouter, the current version of react router is 4 and it is focused on the declarative nature of react itself, so it lends itself to be the core implementation detail of the app component.

``` js

import React from 'react'
import Home from './pages/home'
import Show from './pages/show'

import { BrowserRouter, Route } from 'react-router-dom'

export default () => {
 return (
   <BrowserRouter>
     <div>
       <Route exact path="/" component={Home} />
       <Route path="/:id" component={Show} />
     </div>
    </BrowserRouter>
  )
}
```

Using ReactRouter to define routes involves specifying the type of router you are using, in this example we are using a html5 push state router, and we are using the Route Component to define the path and the component to mount based on that path.

### Redux Store

Every application needs to manage state, and state management is hard, the basic solutions can become a tangled mess, they start simple and straight forward, but don't have the flexibility to deal with the complexity that occurs over time. The advanced solutions may present more boilerplate up front, and may not seem like the right solution in the beginning but as the project grows over time, and the team grows the forced separation of concerns becomes testable and managable and refactorable without a significant effort, because the foundation was presented in the beginning. In software architecture it can be hard which solution in the spectrum should be the solution for your application, the time to build the more advanced solution will be a cost to get something out the door, but the basic solution could lead to unforseen barriers that require re-architecture for the app to move forward.

For the most part, I think the basic solution of state with React using the internal component state is a very good simple solution and lends itself well to transition to a more advanced solution in the future.

Redux implements the flux architecture which moves the state management of the application outside the components themselves into stores, in the case of Redux it is one store, this store uses reducers and immutability to control the change management of state and when state is modified it generates a notification via a subscription, so that all functions that subscribe to the notification will know when the redux state store has changed. This solution works really well with react, since react renders a component tree if you will and can subscribe to the redux store at the app route level, then when state changes it can smartly re-render all the components with the new state. This architecture makes it very easy to implement logging, undo, redo, and time travel debugging. It is also worth mentioning that some people call this the Elm Architecture, but it is much older that the elm language, and it is very much a functional approach to managing ui. The gist is that there there are a lot more interactions that need to be managed on the front end of the application, that just getting and setting data. In order to provide a great user experience, you must provide all kinds of little presentation tweaks and well described error messages. Redux gives you the flexibility to create highly detailed user experiences in an explicit trackable way.

The other method redux provides is the dispatch method, this is how your submit actions to the redux store, actions are objects that contain a type and payload attribute. The type is the name of the action and the payload is the data the action may need to update state.

``` js
store.dispatch({type: 'SET_DATA', payload: [1,2,3]})
```

It is important to note that redux expects the dispatch to send it an object with a type and payload. But there a a feature in redux called middleware that enables developers to modify the the dispatch method before it hits the store reducer process. We will talk about that later, for now you can think that the dispatch method must take an object with type and payload.

### Reducers

Reducers is a strange term, but you may be familiar with a reduce method, the reduce method takes a collection and iterates through each item in the collection calling a reducer function, the reducer function takes an accumulator and a value. In redux the reducer is the same, but the accumulator is the current state and the value is the action object. The goal of the reduce function is to return a single value, which turns out to be the new state to be  notified to all subscribers. It is also important to note that reducers must be pure functions, which means that they always return a value and they have no side effects.

Since reducers all have the same properties is is very easy to compose reducers together, so when a dispatch comes into the redux store, the store can call all the reducers is a composable way to derive on single new state.

To summarize, the redux store has the following methods:

* subscribe - enables external functions to get notified when the store state changes.
* dispatch - enables code outside the store to send actions to the store to modify the state, this is the only way state can be modified.
* getState() - returns the current state of the redux store

And when creating the store, you pass in the reducer functions that will be used to modify state. Lastly, when you create the store you can pass in an optional applyMiddleware function that can inject transform functions that can enable you to store snapshots of the state when changed, or do some logging in a single point, or submit metrics to a service, or enable asynchronous functions that derive into a action object.

#### Example of a Redux Store

``` js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import app from './reducers/app'
import widgets from './reducers/widgets'

const store = createStore(
  combineReducers({
    app,
    widgets
  }),
  applyMiddleware(thunk)
)

export default store
```

### Example of a reducer

```
import { SET_TITLE } from '../constants'

export default (state={title: ''}, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { title: action.payload }
    default:
      return state
  }
}
```

This reducer is a simple reducer that returns a new title if the the action was the type 'SET_TITLE', otherwise it will just return the current state.

## action creators

Otfen times, you have to make a call to server and it needs to be asynchronous, loading data, or send data to a server, etc.

It is pretty easy to do this with redux thunk as middleware. A thunk will take a function and inject with the dispatch method and the getState method, then the function can do its async code and return and action when the async code come back via a promise or callback.

Here is an action creator using the new async/await code.

``` js
export default async (dispatch, getState) => {
  const widgets = await fetch(url).then(res = res.json())
  dispatch({type: 'SET_WIDGETS', payload: widgets})
}
```

## What about testing?

The great part about this architecture is that it is very easy to unit test each piece.

### Testing Reducers

``` js
import test from 'tape'
import appReducer from './reducers/app'

test('set title', t => {
  t.plan(1)
  const result = appReducer({title: ''}, { type: 'SET_TITLE', payload: 'Beep'})
  t.equals(result.title, 'Beep')
})

```

### Testing Components

``` js
import test from 'tape'
import { shallow } from 'enzyme'
import Component from './component'

test('component should render title', t => {
  t.plan(1)
  const wrapper = shallow(<Component title="Beep" />)
  t.equals(wrapper.text(), "Beep")
})
```

### Testing ActionCreators

``` js
import test from 'tape'
import rewire from 'rewire'
import widgets from './actions'

const fetch = rewire('isomorphic-fetch')

fetch.__set__({
  then: fn => fn([1,2,3])
})

test('get widgets and dispatch action', t => {
  t.plan(1)
  function dispatch(action) {
    t.deepEquals({type: 'SET_WIDGETS', payload: [1,2,3]}, action)
  }
  widgets(dispatch)

})
```

---

Tutorial

## Step 1 - List Movies (pages/index.js)

We are going to use a map function to list all the movies we have in our state.
We are mapping our state to a prop called movies, when our component get called
we can access this prop by using the `props.movies` variable. To render the list
of movies, we will use a `List` Component as our wrapper and we will use a `ListItem`
component for each movie item. Using the `{}` curley braces we can create an expression.

We will use the map function to transform the state list of movies from a list of
objects into a list of `ListItems`

``` js
<List className="avenir">
  {map(m => <ListItem key={m.id}>{m.title}</ListItem>, props.movies)}
</List>
```

## Step 2 - Search Form (pages/search.js)

Now that we have our movies listing, we need to create a search form, on the
Search Page.

``` js
<form className="pa4">
  <TextField
    name="Search"
    helpTxt="Enter a name of a movie and press ENTER"
  />
  <Button>Search</Button>
</form>
```

Now that we have our search template, we need to turn the TextField into a controlled
component. A controlled component is where we connect the component to our state by
using the `value` prop and the `onChange` prop.

```
<TextField
  value={props.query}
  onChange={props.handleChange}
  name="Search"
  helpTxt="Enter a name of a movie and press ENTER"
/>
```

Now that we added our value and onChange event we should be able to use the
React Dev Tools to see it properly set the state of the query prop.

## Step 3 - Submitting our form (pages/search.js)

Now that we have all the data we need to make our movie search request, we need
to submit it.

```
<form className="pa4" onSubmit={props.search}>
  ...
</form>
```

When a button in a from is clicked the form's onSubmit event is fired, we can
handle this event using the onSubmit prop of the form component. We will assign
it to our props.search action, you can see the logic in the `mapActionsToProps`
function defined at the bottom of the search.js file.

## Step 4 - Showing the Search Results

Now that we have our search working, we need to show the results, just like
we handled the list of movies, we want to render a list of movie results.

This time we will list them using a Card Component.

```js
{map(m => <Card key={m.id} {...m} />, props.results)}
```

## Step 5 - Handling the selection of a movie

Now that we have the search results, when the movie is selected we need to add
it to our main list, then navigate back to our list page.

``` js
{map(m => <Card onClick={props.add(m, props.history)} key={m.id} {...m} />, props.results)}
````

Congrats, you have finished the react tutorial! 
