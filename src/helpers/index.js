import { numeroALetras } from './numeroALetras'
import moment from 'moment'
moment.locale('es')
const currency = val => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val)
}

const dateExplode = (date) => {
  const strDay = moment(date, 'DD-MM-YYYY').format('DD')
  const strMonth = moment(date, 'DD-MM-YYYY').format('MMMM')
  const strYear = moment(date, 'DD-MM-YYYY').format('YYYY')

  return {
    day: strDay,
    month: strMonth,
    year: strYear
  }
}

const getCurrencyStyle = (value) => {
  if (value.toLowerCase().indexOf('dolar') > -1) {
    return 'U$S'
  }
  return '$'
}

export {
  numeroALetras,
  currency,
  dateExplode,
  getCurrencyStyle
}
