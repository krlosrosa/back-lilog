/**
 * Mapeia operadores do react-querybuilder para os operadores do json-rules-engine.
 * Você pode expandir este mapa conforme necessário.
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
 * Converte recursivamente uma query do formato react-querybuilder para o formato json-rules-engine.
 * @param {object} query A query gerada pelo react-querybuilder.
 * @returns {object} A regra no formato esperado pelo json-rules-engine.
 */
export function convertQueryBuilderToRulesEngine(query) {
  // Se for um grupo de regras (possui um combinator)
  if (query.combinator) {
    const combinator = query.combinator === 'and' ? 'all' : 'any';

    const rules = query.rules.map((rule) => {
      // Chamada recursiva para regras aninhadas ou para converter regras simples
      return convertQueryBuilderToRulesEngine(rule);
    });

    return { [combinator]: rules };
  }

  // Se for uma regra individual (caso base da recursão)
  if (query.field) {
    const operator = operatorMap[query.operator];
    if (!operator) {
      throw new Error(`Operador não mapeado: ${query.operator}`);
    }

    return {
      fact: query.field,
      operator: operator,
      value: query.value,
    };
  }

  throw new Error('Formato de query inválido');
}
