import * as React from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Typography } from 'antd';
import calcKcal, { animals } from './utils/calcKcal';

const { Item, useForm } = Form;
const { Text } = Typography;

const Meat = () => {
  const [form] = useForm();
  const [statistic, setStatistic] = React.useState(null);

  const onFinish = values => {
    console.log(values);
    const cal = calcKcal(values);
    console.log(cal);
    setStatistic(cal);
  };

  const initialValues = {
    kcal: 0,
    cycle: 100,
    count: 3,
    hunger: 0,
  };

  animals.forEach(name => {
    initialValues[name] = 0;
  });

  return (
    <Card title="肉食主义">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={9}>
          <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
            <Item label="已消耗卡路里" name="kcal">
              <InputNumber style={{ width: '100%' }} />
            </Item>

            <Item label="剩余周期" name="cycle">
              <InputNumber style={{ width: '100%' }} />
            </Item>

            <Row gutter={16}>
              <Col span={12}>
                <Item label="总小人数" name="count">
                  <InputNumber style={{ width: '100%' }} />
                </Item>
              </Col>
              <Col span={12}>
                <Item label="其中大胃小人数" name="hunger">
                  <InputNumber style={{ width: '100%' }} />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {animals.map(name => (
                <Col key={name} span={12}>
                  <Item label={name} name={name}>
                    <InputNumber style={{ width: '100%' }} />
                  </Item>
                </Col>
              ))}
            </Row>

            <Item>
              <Button type="primary" htmlType="submit">
                计算
              </Button>
            </Item>
          </Form>
        </Col>
        {statistic && (
          <Col xs={24} sm={12} md={15}>
            <ul>
              <li>
                小人可消耗 {statistic.planConsume} 千卡
                {statistic.restKcal > 0 && (
                  <ul>
                    <li>
                      剩余 <Text type="danger">{statistic.restKcal} 千卡</Text>
                      不能在剩余周期内消耗掉
                    </li>
                  </ul>
                )}
              </li>

              <li>
                现有小动物可提供 {statistic.providesMeatKcal} 千卡
                {statistic.missingMeatKcal > 0 && (
                  <ul>
                    <li>
                      尚有 <Text type="danger">{statistic.missingMeatKcal} 千卡</Text>空缺
                    </li>
                  </ul>
                )}
              </li>

              <li>
                需要单一物种：
                <ul>
                  {Object.keys(statistic.meat).map(name => (
                    <li key={name}>
                      {name}: {statistic.meat[name]} 只
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default Meat;
