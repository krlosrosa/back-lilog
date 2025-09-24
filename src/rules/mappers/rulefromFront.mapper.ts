/**
 * Mapeia operadores do react-querybuilder para os operadores do json-rules-engine.
 */
const operatorMap = {
  '=': 'equal',
  '!=': 'notEqual',
  '<': 'lessThan',
  '<=': 'lessThanInclusive',
  '>': 'greaterThan',
  '>=': 'greaterThanInclusive',
  contains: 'contains',
  beginsWith: 'startsWith',
  endsWith: 'endsWith',
  in: 'in',
  notIn: 'notIn',
};

/**
 * Inverte o mapa de operadores para a conversão reversa.
 * Transforma { rqbOp: jreOp } em { jreOp: rqbOp }.
 * Isso é feito programaticamente para garantir consistência.
 */
const reverseOperatorMap = Object.entries(operatorMap).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {},
);

/*
O reverseOperatorMap resultante será:
{
  equal: '=',
  notEqual: '!=',
  lessThan: '<',
  lessThanInclusive: '<=',
  greaterThan: '>',
  greaterThanInclusive: '>=',
  contains: 'contains',
  startsWith: 'beginsWith',
  endsWith: 'endsWith',
  in: 'in',
  notIn: 'notIn'
}
*/

/**
 * Converte recursivamente uma regra do formato json-rules-engine para o formato react-querybuilder.
 * @param {object} rule A regra no formato esperado pelo json-rules-engine.
 * @returns {object} A query no formato esperado pelo react-querybuilder.
 */
export function convertRulesEngineToQueryBuilder(rule) {
  // Se for um grupo de regras (possui 'all' ou 'any')
  if (rule.all || rule.any) {
    const combinator = rule.all ? 'and' : 'or';
    const subRules = rule.all || rule.any;

    // Chamada recursiva para converter cada regra dentro do grupo
    const rules = subRules.map((subRule) => {
      return convertRulesEngineToQueryBuilder(subRule);
    });

    return {
      combinator: combinator,
      rules: rules,
    };
  }

  // Se for uma regra individual (caso base da recursão)
  if (rule.fact) {
    const operator = reverseOperatorMap[rule.operator];
    if (!operator) {
      throw new Error(
        `Operador do json-rules-engine não mapeado: ${rule.operator}`,
      );
    }

    return {
      field: rule.fact,
      operator: operator,
      value: rule.value,
    };
  }

  throw new Error('Formato de regra do json-rules-engine inválido');
}
