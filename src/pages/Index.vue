<template>
  <q-page padding>
    <q-form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="fieldset-title">
        Datos del Pagaré
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <date-input
            label="Fecha de Impresión"
            v-model="formData.currentDate"
            autofocus
            :rules="[val => val && val.length || 'Complete la fecha del día']"
          />
        </div>
        <div class="col-4">
          <q-select
            outlined
            dense
            label="Día vencimiento"
            :options="[5, 10, 15, 20, 25]"
            v-model="formData.expDay"
            :rules="[val => val || 'Elija el día para cada vencimiento']"
          />
        </div>
        <div class="col-4">
          <q-select
            outlined
            dense
            label="Mes próximo vto."
            :options="monthsOptions"
            v-model="formData.expMonth"
            :rules="[val => val !== null && val !== '' || 'Elija el mes del primer pagaré']"
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            dense
            label="Descripción del Bien entregado"
            v-model="formData.product"
            :rules="[val => val && val.length > 4 || 'Detalle el bien que se entrega al firmante']"
          />
        </div>
        <div class="col-4">
          <q-input

            type="number"
            outlined
            dense
            label="Importe"
            step="0.01"
            v-model.number="formData.amount"
            :rules="[val => val > 0 || 'Ingrese monto de cada pagaré']"
          >
            <template v-slot:prepend>
              <q-icon name="monetization_on" />
            </template>
          </q-input>
        </div>
        <div class="col-4">
          <q-select
            outlined
            dense
            label="Moneda"
            :options="['DOLAR', 'PESO']"
            v-model="formData.currency"
            :rules="[val => val && val !== null && val !== '' || 'Elija el tipo de moneda']"
          />
        </div>
        <div class="col-4">
          <q-select
            outlined
            dense
            label="Cantidad"
            :options="[1, 3, 6, 12, 18, 24, 36, 48]"
            v-model="formData.quantity"
            :rules="[val => val || 'Seleccione cuántos pagarés desea imprimir']"
          />
        </div>
      </div>
      <div class="fieldset-title">Datos del Firmante</div>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-input
            outlined
            dense
            label="Apellido"
            v-model="formData.lastName"
            :rules="[val => val && val.length >= 4 || 'Ingrese el nombre del firmante']"
          />
        </div>
        <div class="col-5">
          <q-input
            outlined
            dense
            label="Nombre"
            v-model="formData.firstName"
            :rules="[val => val && val.length >= 4 || 'Ingrese el apellido del firmante']"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            dense
            label="DNI"
            v-model="formData.document"
            :rules="[val => val && val.length > 6 || 'Ingrese el DNI o CUIT del firmante']"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            dense
            label="Domicilio"
            v-model="formData.address1"
            :rules="[val => val && val.length >= 4 || 'Ingrese domicilio del firmante']"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            dense
            label="Localidad"
            v-model="formData.address2"
            :rules="[val => val && val.length >= 4 || 'Ingrese el localidad del firmante']"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            dense
            label="Provincia"
            v-model="formData.address3"
            :rules="[val => val && val.length >= 4 || 'Ingrese el provincia del firmante']"
          />
        </div>
        <div class="col-3">
          <q-input
            type="tel"
            outlined
            dense
            label="Teléfono"
            v-model="formData.phone"
            :rules="[val => val && val.length > 5 || 'Ingrese monto de cada pagaré']"
          />
        </div>

        <div class="col-4 offset-4 text-center q-mt-md">
          <q-btn
            type="submit"
            icon="print"
            label="Imprimir"
            color="primary"
            unelevated
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import moment from 'moment'
moment.locale('es')
import { mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    DateInput: () => import('src/components/DateInput.vue')
  },
  data () {
    return {
      formData: {
        currentDate: '',
        expDay: '',
        expMonth: '',
        firstName: '',
        lastName: '',
        document: '',
        address1: '',
        address2: '',
        address3: '',
        phone: '',
        product: '',
        amount: '',
        currency: '',
        quantity: ''
      }
    }
  },
  computed: {
    monthsOptions () {
      let current = moment()
      const options = []
      for (let i = 0; i < 5; i++) {
        current = current.add(1, 'month')
        options.push(current.format('MMMM YYYY').toUpperCase())
      }
      return options
    }
  },
  methods: {
    ...mapActions('pdf', ['printPdf']),
    onSubmit () {
      this.printPdf(this.formData)
    },
    onReset () { }
  }
}
</script>
