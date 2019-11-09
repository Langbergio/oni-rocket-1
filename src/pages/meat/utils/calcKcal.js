// 1000g = 1,600 kcal

const COOKER_MULTIPLE_MEAT = 4000 / 3200;
const COOKER_MULTIPLE_FISH = 1600 / 1000;

const KCAL_MEAT = {
  树鼠: 1600,
  哈奇: 3200,
  飞鱼: 1600,
  老鼠: 16000,
};

const KCAL_FISH = {
  鱼: 1000,
};

const ANIMALS_KCAL = {};
function fillAnimalKcal(meats, multiple) {
  Object.keys(meats).forEach(name => {
    const providesKcal = meats[name] * multiple;
    ANIMALS_KCAL[name] = providesKcal;
  });
}
fillAnimalKcal(KCAL_MEAT, COOKER_MULTIPLE_MEAT);
fillAnimalKcal(KCAL_FISH, COOKER_MULTIPLE_FISH);

export const animals = Object.keys(ANIMALS_KCAL);

export default ({ kcal, cycle, count, hunger, ...animalCounts }) => {
  const planConsume = ((count - hunger) * 1000 + hunger * 1500) * cycle;
  let providesMeatKcal = 0; // 动物提供的肉卡
  let missingMeatKcal = kcal; // 需要的肉卡
  const restKcal = kcal - planConsume;

  // 计算剩余不足的肉卡
  Object.keys(ANIMALS_KCAL).forEach(name => {
    providesMeatKcal += ANIMALS_KCAL[name] * animalCounts[name];
    missingMeatKcal -= ANIMALS_KCAL[name] * animalCounts[name];
  });

  // 提示可能需要的小动物数量
  const meat = {};
  Object.keys(ANIMALS_KCAL).forEach(name => {
    meat[name] = Math.ceil(missingMeatKcal / ANIMALS_KCAL[name]);
  });

  return {
    planConsume,
    providesMeatKcal,
    missingMeatKcal,
    restKcal,
    meat,
  };
};
