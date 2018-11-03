const StatsList = function(props) {
    const date = `${props.stats.createdDate.getFullYear()} ${props.stats.createdDate.getMonth()} ${props.stats.createdDate.getDate()} ${props.stats.createdDate.getHours()}:${props.stats.createdDate.getMinutes()}`;
    return (
        <div className="statList">
            <div key={props.stats._id} className="stat">
                <h3 className="statName">User: {props.stats.username} </h3>
                <h3 className="statAge"> Member Since: {date} </h3>
            </div>
        </div>
    );
};

const loadStatsFromServer = () => {
    sendAjax('GET', '/getStats', null, (data) => {
        console.log(data);
        ReactDOM.render(
            <StatsList stats={data.stats} />, document.querySelector("#stats")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <StatsList stats={[]} />, document.querySelector("#stats")
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