/**
 * 按state名称获取mutation函数名
 *
 * @param {String} stateName 状态字段名
 */
export const getMutionsKey = stateName => {
  console.log(stateName);
  return `set${stateName[0].toUpperCase()}${stateName.substring(1)}`;
};

/**
 * 初始化mutations
 * 添加默认函数
 *
 * @param {Object} state 状态对象
 */
export const initMutations = state => {
  let mutations = {};
	
  Object.keys(state).map(s => {
    mutations[getMutionsKey(s)] = function(state, val) {
      state[s] = val;
    };
  });
  return mutations;
};
