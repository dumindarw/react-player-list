import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import ball from '../images/ball.png'

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: ['Sanga', 'Murali', 'Sanath', 'Mahanama'],
            msg: ''
        }

        this.onAddPlayer = this.onAddPlayer.bind(this);
        this.onRemovePlayer = this.onRemovePlayer.bind(this);
        this.onClearSquad = this.onClearSquad.bind(this);
    }

    onAddPlayer(e) {
        e.preventDefault();

        const { playerList } = this.state;
        const newPlayer = this.newPlayer.value;

        const isPlayerIncluded = this.state.playerList.includes(newPlayer);

        if (!isPlayerIncluded) {
            newPlayer !== '' && this.setState({
                playerList: [...playerList, newPlayer],
                msg: ''
            })
        } else {
            this.setState({
                msg: 'Player already in the squad'
            })
        }

        this.addForm.reset();
        this.newPlayer.focus();
    }

    onRemovePlayer(e, playerToRemove) {
        e.preventDefault();

        const newPlayers = this.state.playerList.filter(player => {
            return player !== playerToRemove
        })

        this.setState({
            playerList: [...newPlayers]
        })

        if (newPlayers.length === 0) {
            this.setState({
                msg: 'No players in the squad.'
            });
        }

    }

    onClearSquad(){

        this.setState({
            playerList: [],
            msg: 'No players in the squad.'
        })

    }

    render() {
        const { playerList, msg } = this.state;
        return (<div className="container">

            <div className="row">&nbsp;</div>

            <div className="row">
                <div className="col-xs-6 col-md-4"></div>
                <div className="col-xs-6 col-md-4" align="center">
                    <img src={ball} width={100} height={100} />
                </div>
                <div className="col-xs-6 col-md-4"></div>
            </div>

            <div className="row">&nbsp;</div>

            <div className="row">
                <div className="col-xs-6 col-md-4"></div>
                <div className="col-xs-6 col-md-4" align="center">

                    <form className="form-inline" onSubmit={(e) => { this.onAddPlayer(e) }}
                        ref={input => this.addForm = input}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name" ref={(input) => {
                                this.newPlayer = input;
                            }} />
                        </div>
                        &nbsp;<button type="submit" className="btn btn-primary" >
                            Add Player</button>
                    </form>

                </div>
                <div className="col-xs-6 col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-xs-6 col-md-4"></div>
                <div className="col-xs-6 col-md-4">
                    {
                        playerList.length > 0 &&

                        <table className="table table-bordered table-hover">
                            <caption></caption>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Player</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    playerList.map((elem) => {
                                        return (<tr key={elem}>
                                            <th scope="row">1</th>
                                            <td>{elem}</td>
                                            <td align="right"><button type="submit" className="btn btn-default"
                                                onClick={e => this.onRemovePlayer(e, elem)}>Remove</button></td>
                                        </tr>);
                                    }
                                    )}
                            </tbody>
                            <tfoot>
                                <tr align="right">
                                    <td colSpan={3}><button type="submit" className="btn btn-danger"
                                                onClick={e => this.onClearSquad()}>Clear</button>
                                        </td>
                                </tr>
                            </tfoot>
                        </table>
                    }
                    {
                        (msg !== '' || playerList.length === 0) &&
                        <div> &nbsp;<div className="alert alert-danger" role="alert">{msg}</div></div>
                    }

                </div>
                <div className="col-xs-6 col-md-4"></div>
            </div>


        </div>);
    }

}


/*Paragraph.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
}*/
