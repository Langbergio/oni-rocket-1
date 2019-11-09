import React from 'react';
import { Layout, Menu, Card } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

document.title = '缺氧计算器';

const PAGES = {
  '#/rocket': '火箭',
  '#/meat': '肉食主义',
};

export default class Home extends React.Component {
  render() {
    const { children } = this.props;
    const { hash } = window.location;

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={[hash]} style={{ lineHeight: '64px' }}>
            {Object.keys(PAGES).map(path => (
              <Menu.Item key={path}>
                <a href={path}>{PAGES[path]}</a>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content>
          <div className={styles.content}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Template By{' '}
          <a href="https://ant.design/" target="_blank">
            Ant Design
          </a>
        </Footer>
      </Layout>
    );
  }
}
