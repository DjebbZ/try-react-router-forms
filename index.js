var React = require("react"),
    Router = require("react-router"),
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="app">Home</Link></li>
                        <li><Link to="users">Users</Link></li>
                    </ul>
                </nav>

                <RouteHandler users={this.props.users} />
            </div>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <h1>HOME</h1>
        )
    }
});

var ListUsers = React.createClass({
    render: function() {
        return (
            <div>
                <h1>ListUsers</h1>
                <RouteHandler users={this.props.users} />
            </div>
        )
    }
});

var Users = React.createClass({
    render: function() {
        var users = this.props.users.map(function(user, i) {
            return <p key={i}><Link to="user" params={{userId: i}}>{user.name}</Link></p>
        }.bind(this));
        return (
            <div>{users}</div>
        )
    }
});

var User = React.createClass({
    mixins: [Router.State],

    render: function() {
        var user = this.props.users[this.getParams().userId];

        return (
            <p>Profile of {user.name}</p>
        );
    }
})

var PageNotFound = React.createClass({
    render: function() {
        return (
            <h1>PageNotFound</h1>
        )
    }
})

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home} />
        <Route path="users" name="users" handler={ListUsers}>
            <DefaultRoute handler={Users} />
            <Route path=":userId" name="user" handler={User} />
        </Route>
        <NotFoundRoute handler={PageNotFound} />
    </Route>
);

var users = [{
    name: "Jean",
}, {
    name: "Toto"
}];

Router.run(routes, function(Handler) {
    React.render(<Handler users={users} />, document.getElementById('form'))
})