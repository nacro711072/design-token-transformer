import * as changeCase from 'change-case'

export default name => changeCase.camelCase(name, { transform: changeCase.camelCaseTransformMerge })
