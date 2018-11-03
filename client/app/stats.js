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

const loadDomosFromServer = () => {
    sendAjax('GET', '/getStats', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#stats")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <StatsList domos={[]} />, document.querySelector("#domos")
    );
    
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