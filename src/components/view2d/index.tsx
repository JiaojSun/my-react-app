import * as React from 'react';

export default class View2D extends React.Component {
    render() {
        return (
            <div
                className="xcontent-view2d"
                style={{
                    textAlign: 'center',
                    lineHeight: '100%',
                    fontSize: '30px',
                    background: '#aaa'
                }}
            >
                2D view
            </div>
        );
    }
}
