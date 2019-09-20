import * as React from 'react';

export default class View3D extends React.Component {
    render() {
        return (
            <div
                className="xcontent-view3d"
                style={{
                    textAlign: 'center',
                    lineHeight: '100%',
                    fontSize: '30px',
                    background: '#ccc'
                }}
            >
                3D view
            </div>
        );
    }
}
