const handleDomo = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'}, 350);
    
    if($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });
    
    return false;
};

const StatsList = function(props) {
    console.log(props);
    const statNodes = props.stats.map(function(stat) {
        return (
            <div key={stat._id} className="stat">
                <h3 className="statName">User: {stat.username} </h3>
                <h3 className="statAge"> Created At: {stat.createdDate} </h3>
                <h3 className="statDomosCreated"> Domos Created: {stat.domosCreated} </h3>
            </div>
        );
    });
    
    return (
        <div className="statList">
            {statNodes}
        </div>
    );
};

const loadStatsFromServer = () => {
    sendAjax('GET', '/getStats', null, (data) => {
        ReactDOM.render(
            <StatList stats={data.stats} />, document.querySelector("#stats")
        );
    });
};

const DomoForm = (props) => {
    return (
        <form id="domoForm" onSubmit={handleDomo} name="domoForm" action="/maker" method="POST" className="domoForm">
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet</h3>
            </div>
        );
    }
    
    const domoNodes = props.domos.map(function(domo) {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
            </div>
        );
    });
    
    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    
    ReactDOM.render(
        <StatsList stats={[]} />, document.querySelector("#stats")
    );
    
    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );
    
    loadDomosFromServer();
    loadStatsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});