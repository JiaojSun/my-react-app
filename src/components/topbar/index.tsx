import * as React from 'react';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import './index.css';

export default class TopBar extends React.Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item>注销</Menu.Item>
            </Menu>
        );
        
        return (
            <div className="xcontent-topbar">
                <div className="xcontent-topbar-content"/>
                <div className="xcontent-topbar-right">
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>L</Avatar>
                    <Dropdown overlay={menu}>
                        <a style={{ color: '#cccccc' }} className="ant-dropdown-link">
                            Larry Wang <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
