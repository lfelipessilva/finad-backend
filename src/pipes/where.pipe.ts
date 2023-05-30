// @ts-nocheck
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { WHERE_PIPE_FORMAT } from '../errors/errors.constants';
import { parseObjectLiteral } from '../helpers/parse-object-literal';
import { isStringObject } from 'util/types';
/** Convert a string like "id: 12, b: 'Anand'" to { id: 12, name: "Anand" } */

function isDate(value) {
  return isNaN(value) && !isNaN(Date.parse(value))
}

function isNumeric(value) {
  if (value === '' || value === null) {
    return false
  }
  return !isNaN(Number(value))
}

function isString(value) {
  return typeof value === 'string' ? true : false
}
@Injectable()
export class WherePipe implements PipeTransform {
  transform(value: string): Record<string, any> | undefined {
    if (value == null) return undefined;
    try {
      const rules = parseObjectLiteral(value);
      const items: Record<string, any> = {};
      rules.forEach((rule) => {
        const ruleKey = rule[0];
        let ruleValue: string | number | undefined = rule[1];

        // if (!!ruleValue?.length) {
        //   const type = ruleValue?.split('(')[0]
        //   const value = ruleValue?.match(/\((.*)\)/)?.pop();
        //   const data: Record<string, any> = {}

        //   if (isDate(value)) {
        //     ruleValue = new Date(value ?? 0).toISOString();
        //   } else if (isNumeric(value)) {
        //     ruleValue = Number(value)
        //   } else if (isString(value)) {
        //     ruleValue = value?.replace(/'/g, '')
        //     console.log({ value, replaced: value?.replace(/'/g, '') });
        //   }

        //   if (type === 'like') {
        //     data['contains'] = ruleValue
        //   } else if (type === 'equal') {
        //     data['equals'] = ruleValue
        //   } else if (type === 'end') {
        //     data['lte'] = ruleValue
        //   } else if (type === 'start') {
        //     data['gte'] = ruleValue
        //   }

        //   items[ruleKey] = { ...items[ruleKey], ...data }
        // }

        if(ruleValue)
        if (ruleValue.includes('int('))
          ruleValue = parseInt(/\(([^)]+)\)/.exec(ruleValue)[1]);
        else if (
          ruleValue.includes('date(') ||
          ruleValue.includes('datetime(')
        )
          ruleValue = new Date(
            /\(([^)]+)\)/.exec(ruleValue)[1],
          ).toISOString();
        else if (ruleValue.includes('float('))
          ruleValue = parseFloat(/\(([^)]+)\)/.exec(ruleValue)[1]);
        else if (ruleValue.includes('string('))
          ruleValue = /\(([^)]+)\)/.exec(ruleValue)[1];
        else if (
          ruleValue.includes('boolean(') ||
          ruleValue.includes('bool(')
        )
          ruleValue = /\(([^)]+)\)/.exec(ruleValue)[1] === 'true';
        [
          'lt',
          'lte',
          'gt',
          'gte',
          'equals',
          'not',
          'contains',
          'startsWith',
          'endsWith',
          'every',
          'some',
          'none',
        ].forEach((val) => {
          if (rule[1].startsWith(`${val}:`)) {
            const data: Record<string, any> = {};
            data[val] = ruleValue.replace(`${val} `, '')
            if (data[val].includes(':') && !data[val].endsWith(':')) {
              const record: Record<string, any> = {};
              record[data[val].split(':')[0].trim()] = data[val]
                .split(':')[1]
                .trim();
              data[val] = record;
            }
            items[ruleKey] = data;
          }
        });
        if (ruleValue != null && ruleValue !== '')
          items[ruleKey] = items[ruleKey] || ruleValue;
      });
      return items;
    } catch (error) {
      throw new BadRequestException(WHERE_PIPE_FORMAT);
    }
  }
}
