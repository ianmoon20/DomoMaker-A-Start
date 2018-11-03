const StatList = function(props) {
    const statNodes = props.stats.map(function(domo) {
        return (
            <div key={stat._id} className="stat">
                <h3 className="statUsername">Name: {stat.username} </h3>
                <h3 className="statDomos"> Domos Created: {stats.domosCreated} </h3>
                <h3 className="statCreation"> Member Since: {stats.createdDate} </h3>
            </div>
        );
    });
    
    return (
        <div className="StatList">
            {statNodes}
        </div>
    );
};

const loadStatsFromServer = () => {
    sendAjax('GET', '/getStats', null, (data) => {
        ReactDOM.render(
            <StatList stat={data.stats} />, document.querySelector("#stats")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <StatList stats={[]} />, document.querySelector("#stats")
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