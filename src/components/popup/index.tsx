import * as React from 'react';
import './index.css';
import { Input, Select, Form, Button } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

export type AvailableType = 'string' | 'number' | 'boolean';
export type AvailableInputType = 'typing' | 'select' | 'selectTyping'
    | 'multiSelect' | 'multiSelectTyping';
export type AvailableValueType = string | number | string[] | number[] | boolean;
export type AvailableValidateType = 'javascript' | 'regex';

export interface Parameter {
    id: string;
    type: AvailableType;
    chName?: string;
    default?: string;
    unit?: string;
    hint?: string;
    inputType?: {
        type: AvailableInputType,
        data?: string
    };
    validate?: {
        type: AvailableValidateType,
        statement: string,
        errorMsg?: string
    }[];
}

export interface QueryParameter {
    parameters: Parameter[];
}

export interface QueryAnswer {
    [k: string]: AvailableValueType;
}

export interface Props {
    parameter: QueryParameter;
}
export interface VailFlag {
    Input1?: boolean;
    Input2?: boolean;
    Input3?: boolean;
    Input4?: boolean;
    Input5?: boolean;
    Input6?: boolean;
    Input7?: boolean;
}
export interface VailMsg {
    Input1?: string;
    Input2?: string;
    Input3?: string;
    Input4?: string;
    Input5?: string;
    Input6?: string;
    Input7?: string;
}
export interface State {
    vailResult: VailFlag;
    vailErrMsg: VailMsg;
    Input1?: string;
    Input2?: string;
    Input3?: string;
    Input4?: string;
    Input5?: string;
    Input6?: string;
    Input7?: string;
}

export default class Popup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log('constructor--------------------------------');
        console.log(this.props);
        this.state = Object.assign({}, this.dealState());
        /* console.log('constructor--------------------------------');
        console.log(this.state); */
    }
    dealPrimitive() {
        let temp = {};
        this.props.parameter.parameters.map(item => {
            const defaultValue = item.default ? item.default : '';
            temp[item.id] = defaultValue;
        });
        return temp;
    }
    dealState() {
        let vailTemp = { vailResult: {} };
        let vailMsgTemp = { vailErrMsg: {} };
        let temp = {};
        this.props.parameter.parameters.map(item => {
            const defaultValue = item.default ? this.dealInput(item.default, 1) : '';
            temp[item.id] = defaultValue;
            vailTemp.vailResult[item.id] = false;
            vailMsgTemp.vailErrMsg[item.id] = '';
        });
        let stateTemp = Object.assign(vailMsgTemp, vailTemp, temp);
        return stateTemp;
    }
    // 计算表达式的值
    evil(fn: string) {
        var Fn = Function;  // 一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)();
    }
    // 专门处理${Input}
    dealInput(stateMent: string, flag: number) {
        let copyTemp: {};
        if (flag === 1) {
            copyTemp = Object.assign({}, this.dealPrimitive());
        }
        // 提取到stateMent有哪些input
        let reg = /[^\{\)]+(?=\})/g;
        let res = stateMent.match(reg) ? stateMent.match(reg) : undefined; // ["input1"]
        let NewData;
        if (res) {
            const setData = new Set(res); // 得到input的set形式 Set(1) {"Input1"}
            let setValue = Array.from(setData);
            // let setValue = [...setData];//转成['input1','input2']这种形式
            // 将stateMent的$ { } 都去掉
            let newStateMent = stateMent.replace(/\$/g, '').replace(/\{/g, '').replace(/\}/g, '');
            // 遍历setValue
            setValue.forEach((itemId) => {
                // 根据id取到对应的值
                let targetValue;
                if (flag === 1) {
                    targetValue = copyTemp[itemId];
                } else if (flag === 2) {
                    targetValue = this.state[itemId];
                }
                // 将input换成对应的数
                newStateMent = newStateMent.replace(new RegExp(itemId, 'g'), targetValue);
            });
            NewData = this.evil(newStateMent);
        } else {
            // NewData = stateMent;
            NewData = this.evil(stateMent);
        }
        return NewData;
    }
    // 更新DOM(即更新state)
    updateDOM(item: string, setValue: string[], stateMentValue: string) {
        let newStateMent = stateMentValue.replace(/\$/g, '').replace(/\{/g, '').replace(/\}/g, '');
        // 遍历setValue
        setValue.forEach((itemId) => {
            // 根据id取到对应的值
            let targetValue = this.state[itemId];
            // 将input换成对应的数
            newStateMent = newStateMent.replace(new RegExp(itemId, 'g'), targetValue);

        });
        let NewData = this.evil(newStateMent);
        let tempObj = {};
        tempObj[item] = NewData;
        return tempObj;
    }
    handleChange = (idValue: string, event: Event) => {
        let newState = {};
        newState[idValue] = (event.target as HTMLInputElement).value ?
            this.evil((event.target as HTMLInputElement).value) :
            '0';
        this.setState(newState, () => {
            this.props.parameter.parameters.map((param, index) => {
                let copyTemp = Object.assign({}, this.dealPrimitive());
                // 提取到stateMent有哪些input
                let reg = /[^\{\)]+(?=\})/g;
                let stateMent: string = copyTemp[param.id];
                let res = stateMent.match(reg) ? stateMent.match(reg) : undefined; // ["input1"]
                if (res && (param.id !== idValue)) {
                    const setData = new Set(res); // 得到input的set形式 Set(1) {"Input1"}
                    let setValue = Array.from(setData);
                    if (setValue.indexOf(idValue) !== -1) {
                        this.setState(this.updateDOM(param.id, setValue, stateMent), () => {
                            this.valiForm();
                        });
                    }
                } else {
                    this.valiForm();
                }
            });
        });
    }
    handleSTChange = (idValue: string, value: string) => {
        let newState = {};
        newState[idValue] = value;
        this.setState(newState, () => {
            this.props.parameter.parameters.map((param, index) => {
                let copyTemp = Object.assign({}, this.dealPrimitive());
                // 提取到stateMent有哪些input
                let reg = /[^\{\)]+(?=\})/g;
                let stateMent: string = copyTemp[param.id];
                let res = stateMent.match(reg) ? stateMent.match(reg) : undefined; // ["input1"]
                if (res && (param.id !== idValue)) {
                    const setData = new Set(res); // 得到input的set形式 Set(1) {"Input1"}
                    let setValue = Array.from(setData);
                    if (setValue.indexOf(idValue) !== -1) {
                        this.setState(this.updateDOM(param.id, setValue, stateMent), () => {
                            this.valiForm();
                        });
                    }
                } else {
                    this.valiForm();
                }
            });
        });
    }
    submitFun() {
        this.valiForm();
        let vailResTemp = this.state.vailResult;
        for (let key in vailResTemp) {
            if (vailResTemp.hasOwnProperty(key)) {
                if (vailResTemp[key]) {
                    return false;
                }
            }
        }
        alert('打印数据');
        let stateValue = {};
        for (let k in this.state) {
            if (this.state.hasOwnProperty(k)) {
                if (k === 'vailErrMsg' || k === 'vailResult') {
                    continue;
                } else {
                    stateValue[k] = this.state[k];
                }
            }
        }
        console.log(stateValue);
        return true;
    }
    valiForm() {
        const parameterData = this.props.parameter.parameters;
        for (let key in parameterData) {
            if (parameterData.hasOwnProperty(key)) {
                let item = parameterData[key];
                let vailItem = item.validate;
                if (vailItem !== undefined) {
                    for (let k in vailItem) {
                        if (vailItem.hasOwnProperty(k)) {
                            let vails = vailItem[k];
                            if (!this.dealInput(vails.statement, 2)) {
                                let vailResTemp = this.state.vailResult;
                                let vailErrTemp = this.state.vailErrMsg;
                                vailResTemp[item.id] = true;
                                vailErrTemp[item.id] = vails.errorMsg;
                                this.setState({ vailResult: vailResTemp }, () => console.log('...'));
                                this.setState({ vailErrMsg: vailErrTemp }, () => console.log('...'));
                                // return false;
                                break;
                            } else {
                                let vailResTemp = this.state.vailResult;
                                let vailErrTemp = this.state.vailErrMsg;
                                vailResTemp[item.id] = false;
                                vailErrTemp[item.id] = '';
                                this.setState({ vailResult: vailResTemp }, () => console.log('...'));
                                this.setState({ vailErrMsg: vailErrTemp }, () => console.log('...'));
                            }
                        }
                    }
                }
            }
        }
    }
    switchItem(item: string, data: string | undefined, id: string, type: string) {
        switch (item) {
            case 'typing':
                return (<Input value={this.state[id]} type={type} onChange={this.handleChange.bind(this, id)} />);
            case 'select':
                return (
                    < Select 
                        value={this.state[id]} 
                        onChange={this.handleSTChange.bind(this, id)}
                    >
                        {
                            (data as string).slice(1, -1).split(',').map((option, index) => {
                                option = this.dealInput(option, 2);
                                return (<Option key={index} value={option}>{option}</Option>);
                            })
                        }
                    </Select >
                );
            case 'selectTyping':
                return (
                    < Select
                        mode="combobox"
                        value={this.state[id]}
                        onChange={this.handleSTChange.bind(this, id)}
                    >
                        {
                            (data as string).slice(1, -1).split(',').map((option, index) => {
                                option = this.dealInput(option, 2);
                                return (<Option key={index} value={option}>{option}</Option>);
                            })
                        }
                    </Select >
                );
            default:
                return <Input />;
        }
    }
    // 给state添加值
    componentWillUpdate() {
        console.log('组件-------------');
        let temp = {};
        this.props.parameter.parameters.map(item => {
            const defaultValue = item.default ? this.dealInput(item.default, 1) : '';
            temp[item.id] = defaultValue;
            this.setState(temp, () => console.log(this.state));
        });
        /* console.log('组件-------------');
        console.log(this.state); */
    }
    render() {
        /* console.log('render---state-----------------');
        console.log(this.state); */
        // formItem css 样式
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div
                className="xcontent-popup"
                style={{
                    textAlign: 'center',
                    lineHeight: '100%',
                    fontSize: '30px',
                    background: '#bbb'
                }}
            >
                <Form>
                    {
                        this.props.parameter.parameters.map((param, index) => {
                            console.log('DOM--------------');
                            console.log('this.state-------------------');
                            console.log(this.state);
                            const typeFrameInput = param.inputType;
                            const idFrame = param.id;
                            const typeFrame = typeFrameInput ? typeFrameInput.type : '';
                            const dataFrame = typeFrameInput ? typeFrameInput.data : '';
                            const pValue = param.chName;
                            const typeValue = param.type === 'string' ? 'text' : param.type;
                            return (
                                <FormItem
                                    className="popup-frame"
                                    key={index}
                                    {...formItemLayout}
                                    hasFeedback={true}
                                    label={pValue}
                                    validateStatus={this.state.vailResult[idFrame] ? 'error' : undefined}
                                    help={this.state.vailErrMsg[idFrame] ? this.state.vailErrMsg[idFrame] : ''}
                                >
                                    {this.switchItem(typeFrame, dataFrame, idFrame, typeValue)}
                                    {param.unit ?
                                        <em className="unit">
                                            {param.unit}
                                        </em>
                                        :
                                        ''
                                    }
                                    {!this.state.vailResult[idFrame] ?
                                        <span className="remind">
                                            * {param.hint}
                                        </span>
                                        :
                                        ''
                                    }
                                </FormItem>
                            );
                        })
                    }
                </Form>
                <Button type="primary" onClick={this.submitFun.bind(this, '')}>确定</Button>
            </div>
        );
    }
}
