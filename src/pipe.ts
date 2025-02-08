import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    if (value.length === 8) {
      return value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    return value;
  }
}

@Pipe({
  name: 'CPF',
})
export class CPFPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value && value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }
    return 'error';
  }
}

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      value = value.replace(/\D/g, '');
      if (value.length === 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  }
}

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const duration = value.match(/PT(\d+H)?(\d+M)?/);
    if (!duration) {
      return '0h 0m';
    }
    const hours = duration[1] ? duration[1].replace('H', '') : '0';
    const minutes = duration[2] ? duration[2].replace('M', '') : '0';
    return `${hours}h ${minutes}m`;
  }
}

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }
}

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    if (value.length === 14) {
      return (
        value.substring(0, 2) +
        '.' +
        value.substring(2, 5) +
        '.' +
        value.substring(5, 8) +
        '/' +
        value.substring(8, 12) +
        '-' +
        value.substring(12, 14)
      );
    }
    return value;
  }
}
