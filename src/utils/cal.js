const MAX_BOOSTER = 10;
const MAX_CAPACITY = 20000;

const WEIGHTS = {
  steam: 2000,
  oil: 200,
  hydrogen: 500,
  booster: 1000, // 200 + 400 + 400

  oxygen: 100,
  fuel: 100,

  research: 200,
  warehouse: 2000,
  gas: 1000,
  liquid: 1000,
  creature: 2000,

  command: 200,
  person: 30,
};

const EFFECTS = {
  steam: 20, // *20, Max: 900
  oil: 40, // Max: 900
  hydrogen: 60, // Max: 900
  booster: 12000, // 400 + 400
};

const CAPACITIES = {
  steam: 900,
  fuel: 900,
  oxygen: 2700,
};

const LIQUID_OXYGEN = 1.33;

// function getPunish(weight) {
//   if (weight < 4000) {
//     return weight;
//   }

//   return 1.18362 * (weight ** 3.2) / 100000000;
// }

function getPunish(weight) {
  return Math.ceil(
    Math.max(weight, (weight / 300) ** 3.2)
  );
}

export function calculate({
  type, distance: limitDistance, oxygenType, allowWaste, oxygenBug,
  ...counts
}) {
  console.clear();

  const effect = EFFECTS[type];
  console.log('效率：', effect);

  // ================ 计算基本重量 ================
  let basicWeight = WEIGHTS.command;

  Object.keys(counts).forEach(key => {
    const w = WEIGHTS[key] || 0;
    if (w === 0) console.warn('没有重量数据：', key);
    basicWeight += w * counts[key];
  });
  console.log('基本重量：', basicWeight);

  // ================ 计算常量公式 ================
  if (type === 'steam') {
    // 蒸汽只能用一个
    basicWeight += WEIGHTS.steam;

    for (let boosterCount = 0; boosterCount <= MAX_BOOSTER; boosterCount += 1) {
      const boosterWeight = basicWeight + WEIGHTS.booster * boosterCount;
      const boosterDistance = EFFECTS.booster * boosterCount;

      // 蒸汽
      for (let i = 0; i <= CAPACITIES.steam ; i += 1) {
        const mergedWeight = boosterWeight + i;
        const mergedDistance = boosterDistance + EFFECTS.steam * i;

        const punish = getPunish(mergedWeight);
        const finalDistance = mergedDistance - punish;

        if (limitDistance <= finalDistance) {
          return [{
            capacity: i,
            booster: boosterCount,

            weight: mergedWeight,
            mergedDistance,
            punish,
            finalDistance,
          }];
        }
      }
    }
  } else {
    const effect = EFFECTS[type];
    const solutionList = [];

    basicWeight += WEIGHTS[type];

    // 其他引擎哦
    for (let boosterCount = 0; boosterCount <= MAX_BOOSTER; boosterCount += 1) {
      const boosterWeight = basicWeight + WEIGHTS.booster * boosterCount;
      const boosterDistance = EFFECTS.booster * boosterCount;

      for (let i = 0; i < MAX_CAPACITY; i += 1) {
        const fuelCount = Math.ceil(i / CAPACITIES.fuel);
        const oxygenCount = Math.ceil(i / CAPACITIES.oxygen);

        const statistic = {};

        let mergedWeight = boosterWeight
          + WEIGHTS.fuel * fuelCount      // 燃料罐重量
          + WEIGHTS.oxygen * oxygenCount  // 氧气罐重量
        ;
        statistic.dryWeight = mergedWeight;

        let wetWeight = i;                // 燃料重量
        if (oxygenBug) {
          wetWeight += CAPACITIES.oxygen * oxygenCount;
        } else {
          wetWeight +=  i; // 氧气罐重量 + 氧石
        }
        statistic.wetWeight = wetWeight;

        mergedWeight += wetWeight;

        const mergedDistance = Math.floor(
          boosterDistance + effect * i * (oxygenType === 'liquid' ? LIQUID_OXYGEN : 1)
        );

        const punish = getPunish(mergedWeight);
        const finalDistance = mergedDistance - punish;

        if (limitDistance <= finalDistance) {
          solutionList.push({
            ...statistic,
            capacity: i,
            booster: boosterCount,
            fuelCount,
            oxygenCount,

            weight: mergedWeight,
            mergedDistance,
            punish,
            finalDistance,
          });

          break;
        }
      }
    }

    // 去重
    if (allowWaste) return solutionList;

    return solutionList.reduce((list, solution) => {
      if (list.some(s => s.fuelCount === solution.fuelCount)) return list;
      return [...list, solution];
    }, []);
  }

  return [];
}