import React, { useState } from 'react';
import { Button, InputNumber, Select, Row, Col, Tabs, Checkbox, Tooltip, Icon } from 'antd';
import { useCheckbox, useSelect } from '@/utils/useHooks';
import { calculate } from '@/utils/cal';
import styles from './index.less';

const { Option } = Select;
const { TabPane } = Tabs;

export function renderInputRow(title, props) {
  return (
    <tr>
      <th>{title}</th>
      <td>
        <InputNumber {...props} />
      </td>
    </tr>
  );
}

export default function() {
  const researchCount = useSelect(4);
  const warehouseCount = useSelect(1);
  const gasCount = useSelect(0);
  const liquidCount = useSelect(0);
  const creatureCount = useSelect(0);

  const type = useSelect('oil');
  const oxygen = useSelect('solid');

  const distance = useSelect(30000);
  const waste = useCheckbox(false);
  const oxygenBug = useCheckbox(true);

  const [result, setResult] = useState(null);

  const isSteam = type.value === 'steam';

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={10}>
          <table className={styles.table}>
            <tbody>
              {/* ===================== 搜刮 ===================== */}
              {/* 研究仓 */}
              {renderInputRow('研究仓数量', researchCount)}

              {/* 货仓 */}
              {renderInputRow('货仓数量', warehouseCount)}

              {/* 气仓 */}
              {renderInputRow('液体仓数量', gasCount)}

              {/* 液体仓 */}
              {renderInputRow('液体仓数量', liquidCount)}

              {/* 生物仓 */}
              {renderInputRow('生物仓数量', creatureCount)}

              {/* ===================== 引擎 ===================== */}
              <tr className={styles.line}>
                <td colSpan={2} />
              </tr>

              {/* 引擎类型 */}
              <tr>
                <th>引擎类型</th>
                <td>
                  <Select {...type}>
                    <Option value="steam">蒸汽</Option>
                    <Option value="oil">石油</Option>
                    <Option value="hydrogen">氢气</Option>
                  </Select>
                </td>
              </tr>

              {/* 氧化剂类型 */}
              {!isSteam && (
                <tr>
                  <th>氧化剂</th>
                  <td>
                    <Select {...oxygen}>
                      <Option value="solid">氧石</Option>
                      <Option value="liquid">液氧</Option>
                    </Select>
                  </td>
                </tr>
              )}

              {/* 飞行距离 */}
              {renderInputRow('飞行距离', distance)}

              {/* 允许浪费 */}
              <tr>
                <th />
                <td>
                <Tooltip
                  overlayClassName={styles.tooltip}
                  placement="topLeft"
                  title="例如同时存在 “3 个燃料舱，0 个助推器” 和 “3 个燃料舱，1 个助推器” 都可行时，保留这两个结果。"
                >
                  <Checkbox {...waste}>
                    允许组件浪费
                  </Checkbox>
                </Tooltip>
                </td>
              </tr>

              {/* 氧化剂 bug */}
              <tr>
                <th />
                <td>
                <Tooltip
                  overlayClassName={styles.tooltip}
                  placement="topLeft"
                  title="游戏中，小人总是尝试装满氧化剂而无视上限设置。勾选后以满氧化剂计算。"
                >
                  <Checkbox {...oxygenBug}>
                  氧石 bug
                  </Checkbox>
                </Tooltip>
                </td>
              </tr>

              <tr>
                <td colSpan={2}>
                  <Button type="primary" icon="laptop" onClick={() => {
                    const newResult = calculate({
                      type: type.value,
                      distance: distance.value,
                      allowWaste: waste.checked,
                      oxygenType: oxygen.value,
                      oxygenBug: oxygenBug.checked,

                      research: researchCount.value,
                      warehouse: warehouseCount.value,
                      gas: gasCount.value,
                      liquid: liquidCount.value,
                      creature: creatureCount.value,
                    });

                    setResult(newResult);
                  }}>
                    计算需求
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col xs={24} sm={12} md={14}>
          <div className={styles.result}>
            {result && (
              result.length ? (
                <Tabs tabBarGutter={8}>
                  {result.map((solution, index) => (
                    <TabPane tab={`方案 ${index + 1}`} key={index}>
                      <div>
                        {solution.fuelCount ? <p>燃料舱 {solution.fuelCount} 个</p> : ''}
                        {solution.oxygenCount ? <p>氧气舱 {solution.oxygenCount} 个</p> : ''}
                        {solution.booster ? <p>助推器 {solution.booster} 个</p> : ''}
                        <p>燃料 {solution.capacity} 千克</p>

                        <h4>统计：</h4>
                        <p>重量 {solution.weight} 千克</p>
                        <p>理想距离 {solution.mergedDistance} 千米</p>
                        <p>惩罚距离 {solution.punish} 千米</p>
                        <p>实际距离 {solution.finalDistance} 千米</p>
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              ) : (
                <h1>
                  <Icon type="frown" /> 没有可行的方案
                </h1>
              )
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
