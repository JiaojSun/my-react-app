import * as React from 'react';
import { Layout } from 'antd';
import * as jsyaml from 'js-yaml';
import TopBar from './components/topbar';
import Catalog from './components/catalog';
import View3D from './components/view3d';
import View2D from './components/view2d';
import Popup, { QueryParameter } from './components/popup';
import Console from './components/console';
import Editor from './components/editor';
import './app.css';

const { Header, Sider, Content } = Layout;

export interface AppState {
    popupParameter: QueryParameter;
}

let parameterData: QueryParameter = {
    parameters: [{
        'chName': '中文名',
        'id': 'Input1',
        'type': 'number',
        'default': '3.0',
        'unit': '厘米',
        'hint': '请填写0到100的数字',
        'inputType': {
            'type': 'typing',
        },
        'validate': [{
            'type': 'javascript',
            'statement': '${Input1} % 3 === 0',
            'errorMsg': 'input1不是3的倍数'
        }, {
            'type': 'javascript',
            'statement': '${Input1} > 0 && ${Input1} < 100',
            'errorMsg': '数字没有在0~100之间'
        }]
    }, {
        'chName': '中文名',
        'id': 'Input2',
        'type': 'number',
        'default': '${Input1} + 2',
        'inputType': {
            'type': 'select',
            'data': '[${Input1} + 1, ${Input1} + 2]',
        },
        'validate': [{
            'type': 'javascript',
            'statement': '${Input2} > ${Input1} && ${Input2} < 20',
            'errorMsg': '数字没有在0~20之间'
        }]
    }, {
        'chName': '中文名',
        'id': 'Input3',
        'type': 'number',
        'default': '${Input1} + 10',
        'inputType': {
            'type': 'select',
            'data': '[${Input1} + 10, ${Input1} + 20]',
        },
        'validate': [{
            'type': 'javascript',
            'statement': '${Input3} > ${Input1} && ${Input3} < 100',
            'errorMsg': '数字没有在0~100之间'
        }]
    }, {
        'chName': '中文名',
        'id': 'Input4',
        'type': 'number',
        'default': '200.0',
        'unit': '厘米',
        'hint': '请填写0到100的数字',
        'inputType': {
            'type': 'typing', 
        },
        'validate': [{
            'type': 'javascript',
            'statement': '${Input4} > 0 && ${Input4} < 1000',
            'errorMsg': '数字没有在0~1000之间'
        }]
    }, {
        'chName': '中文名',
        'id': 'Input5',
        'type': 'string',
        'default': '"测试2"',
        'inputType': {
            'type': 'selectTyping',
            'data': '["测试1", "测试2", "测试3"]',
        },
        'validate': [{
            'type': 'javascript',
            'statement': '"${Input5}".includes("测试")',
            'errorMsg': '没有包含测试两个字'
        }]
    }, {
        'chName': '中文名',
        'id': 'Input6',
        'type': 'string',
        'default': '"测试2"',
        'inputType': {
            'type': 'selectTyping',
            'data': '["测试1", "测试2", "测试3"]',
        },
        'validate': [{
            'type': 'javascript',
            'statement': '"${Input6}".includes("测试")',
            'errorMsg': '没有包含测试两个字'
        }]
    }]
};

export default class App extends React.Component<{}, AppState> {
    state = {
        popupParameter: {
            parameters: []
        }
    };

    private console: Console;

    render() {
        setTimeout(() => this.setState({popupParameter: parameterData}), 2e3);

        return (
            <Layout className="xcontent-root">
                <Header style={{ height: 48, lineHeight: '48px' }}>
                    <TopBar/>
                </Header>
                <Layout>
                    <Sider
                        className="xcontent-catalog-sider"
                        width={240}
                        collapsible={true}
                        collapsedWidth={0}
                        breakpoint="xl"
                    >
                        <Catalog />
                    </Sider>
                    <Content className="xcontent-content">
                        <Layout>
                            <View3D />
                            <View2D />
                        </Layout>
                        <Layout>
                            <Popup parameter={this.state.popupParameter} />
                            <Console ref={(console: Console) => this.console = console} />
                        </Layout>
                    </Content>
                    <Sider
                        className="xcontent-editor-sider"
                        width={640}
                        collapsible={true}
                        collapsedWidth={24}
                        defaultCollapsed={true}
                        reverseArrow={true}
                    >
                        <Editor onChange={code => this.parseCode(code)}/>
                    </Sider>
                </Layout>
            </Layout>
        );
    }

    parseCode(code: string = '') {
        this.console.info(); // clear the console
        try {
            const template = jsyaml.load(code);
            console.log(template);
        } catch (e) {
            if (e.name === 'YAMLException') {
                this.console.info(`${e.name}: ${e.message}`);
            }
        }
    }
}
