"use strict";

var StatList = function StatList(props) {
    var statNodes = props.stats.map(function (stat) {
        return React.createElement(
            "div",
            { key: account._id, className: "domo" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "accountDomos" },
                "Domos Created: ",
                stat.domoCreated,
                " "
            ),
            React.createElement(
                "h3",
                { className: "accountAge" },
                " Member Since: ",
                stat.createdDate,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "statList" },
        domoNodes
    );
};

var loadStatsFromServer = function loadStatsFromServer() {
    sendAjax('GET', '/getStats', null, function (data) {
        ReactDOM.render(React.createElement(StatList, { stats: data.stats }), document.querySelector("#stat"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    loadDomosFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
