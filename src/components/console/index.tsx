import * as React from 'react';
import './index.css';

export default class Console extends React.Component {
    state = {
        msg: ''
    };

    info(msg: string = '') {
        this.setState({
            msg
        });
    }

    render() {
        return (
            <div className="xcontent-console">
                <code>{this.state.msg}</code>
            </div>
        );
    }
}
