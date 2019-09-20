import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
import './index.css';

export interface EditorProps {
    onChange?: (code: string) => void;
}

export default class Editor extends React.Component<EditorProps, {}> {

    render() {
        return (
            <div className="xcontent-editor">
                <CodeMirror
                    className="xcontent-editor-codemirror"
                    onChange={this.props.onChange}
                    options={{
                        lineNumbers: true,
                        mode: 'yaml'
                    }}
                />
            </div>
        );
    }
}
