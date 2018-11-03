const StatList = function(props) {
    const statNodes = props.stats.map(function(stat) {
        return (
            <div key={account._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="accountDomos">Domos Created: {stat.domoCreated} </h3>
                <h3 className="accountAge"> Member Since: {stat.createdDate} </h3>
            </div>
        );
    });
    
    return (
        <div className="statList">
            {domoNodes}
        </div>
    );
};

const loadStatsFromServer = () => {
    sendAjax('GET', '/getStats', null, (data) => {
        ReactDOM.render(
            <StatList stats={data.stats} />, document.querySelector("#stat")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    
    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );
    
    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});