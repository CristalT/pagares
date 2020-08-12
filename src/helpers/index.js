import { numeroALetras } from './numeroALetras'
import moment from 'moment'
moment.locale('es')
const currency = val => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val)
}

const calcExp = (expMonth, expDay) => {
  const year = expMonth.split(' ')[1]
  const month = moment(expMonth.split(' ')[0], 'MMMM').format('MM')
  const day = expDay
  const initDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')
  return initDate
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

export {
  numeroALetras,
  calcExp,
  currency,
  dateExplode
}
