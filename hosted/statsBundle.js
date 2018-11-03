"use strict";

var StatsList = function StatsList(props) {
    console.log(props);
    var statNodes = props.stats.map(function (stat) {
        return React.createElement(
            "div",
            { key: stat._id, className: "stat" },
            React.createElement(
                "h3",
                { className: "statName" },
                "User: ",
                stat.username,
                " "
            ),
            React.createElement(
                "h3",
                { className: "statAge" },
                " Created At: ",
                stat.createdDate,
                " "
            ),
            React.createElement(
                "h3",
                { className: "statDomosCreated" },
                " Domos Created: ",
                stat.domosCreated,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "statList" },
        statNodes
    );
};

var loadStatsFromServer = function loadStatsFromServer() {
    sendAjax('GET', '/getStats', null, function (data) {
        ReactDOM.render(React.createElement(StatList, { stats: data.stats }), document.querySelector("#stats"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(StatsList, { stats: [] }), document.querySelector("#stats"));

    loadStatsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
