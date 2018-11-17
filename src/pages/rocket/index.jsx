import React, { useState } from 'react';
import { Button, InputNumber, Select } from 'antd';
import { useInput, useSelect } from '@/utils/useHooks';
import styles from './index.less';

const { Option } = Select;

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
  const researchCount = useSelect(0);
  const warehouseCount = useSelect(0);
  const liquidCount = useSelect(0);
  const creatureCount = useSelect(0);

  const type = useSelect('steam');
  const oxygen = useSelect('solid');
  const fuelCount = useSelect(1);

  const distance = useSelect(1000);

  const isSteam = type.value === 'steam';

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {/* ===================== 搜刮 ===================== */}
          {/* 研究仓 */}
          {renderInputRow('研究仓数量', researchCount)}

          {/* 货仓 */}
          {renderInputRow('货仓数量', warehouseCount)}

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

          {/* 燃料舱室 */}
          {!isSteam && renderInputRow('燃料舱数量', fuelCount)}

          {/* 飞行距离 */}
          {renderInputRow('飞行距离', distance)}

          <tr>
            <td colSpan={2}>
              <Button type="primary" icon="laptop">
                计算需求
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
