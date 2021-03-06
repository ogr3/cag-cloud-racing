import * as React from 'react'
import { connect } from "react-redux"
import Moment from 'react-moment';
import { BackendEventChannelState } from '../backend-event-channel/backend-event-channel.state'
import { getLeaderboard } from "./leaderboard.actions";
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';
import { AppContextConsumer, IAppContext } from 'src';
import { Animated } from "react-animated-css";
import { BackendEvent } from '../backend-event-channel/event'

export interface LeaderboardStateProps {
  backendEventChannelState: BackendEventChannelState;
  leaderboard: UserResult[];
  onGetLeaderboard: (resp: UserResult[]) => void;
  context: IAppContext;
}

export interface UserResult {
  created: number;
  raceStatus: string;
  startTime: number;
  splitTime: number;
  finishTime: number;
  userName: string;
}

export interface User {
  name: string
}

class Leaderboard extends React.Component<LeaderboardStateProps> {
  
  componentDidMount = () => {
    this.fetchLeaderboard()
  };

  getResultText = (type: string) => {
    switch (type) {
      case 'FINISHED':
        return 'Finished';
      case 'WALKOVER':
        return 'Walkover';
      default:
        return 'Disqualified'
    }
  };

  fetchLeaderboard = () => {
      this.props.context.clientApi.fetchLeaderboard().then((resp: UserResult[]) => {
         this.props.onGetLeaderboard(resp)
      }) 
  }
    
  isNewResult = (backendEvent: BackendEvent): boolean => {
    if (backendEvent.eventType !== 'NEW_RESULT') {
      return false
    }

    const existingResult = this.props.leaderboard.find((x) => {
      return x.created === backendEvent.data.created;
    });

    return !existingResult
  };

  render() {
    if (this.props.backendEventChannelState.lastReceivedEvent) {
      const backendEvent: BackendEvent = this.props.backendEventChannelState.lastReceivedEvent;

      if (this.isNewResult(backendEvent)) {
        this.fetchLeaderboard()
      }
    }

    console.log('leaderboard:', this.props.leaderboard)

    return (
      <div className="container">
      <Animated animationIn="fadeInDownBig" animationOut="fadeOut" isVisible={true}>
        <div style={{  fontSize: 12}}>
          <h1>Leaderboard</h1>
          <div className="row" style={{display: 'unset'}}>
          {this.props.leaderboard.length === 0 && <h2 className="alert alert-dismissible alert-info">No results have been registered yet..</h2>}
          {this.props.leaderboard.length > 0 &&
          <table className="center table table-striped">
            <thead>
            <tr>
              <th className="col-xs-2">Name</th>
              <th className="col-xs-2">Time</th>
              <th className="col-xs-2">Split</th>
              <th className="col-xs-2">Result</th>
            </tr>
            </thead>
            <tbody>
            {this.props.leaderboard.map((userResult: UserResult, index: number) => {
              return (
                <tr key={index}>
                  <td className="col-xs-2">{userResult.userName}</td>
                  <td className="col-xs-2"><Moment format="mm:ss:SSS">{userResult.finishTime - userResult.startTime}</Moment></td>
                  <td className="col-xs-2"><Moment format="mm:ss:SSS">{userResult.splitTime - userResult.startTime}</Moment></td>
                  <td className="col-xs-2">{this.getResultText(userResult.raceStatus)}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
          }
          </div>
        </div>
      </Animated>
      </div>
    )
  }
}

function AppContextWithLeaderboard(state: any) {
  return (
    <AppContextConsumer>
      {clientApi =>
        <Leaderboard context={clientApi} {...state} />
      }
  </AppContextConsumer>
  )
}

function mapStateToProps(state: any) {
  return {
    backendEventChannelState: state.backendEventChannelState,
    leaderboard: state.leaderboardState.leaderboard
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionType<typeof getLeaderboard>>) {
  return {
    onGetLeaderboard: (leaderboard: UserResult[]) => dispatch(getLeaderboard(leaderboard))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContextWithLeaderboard)
