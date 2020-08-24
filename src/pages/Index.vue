<template>
  <q-page padding>
    <q-form
      ref="mainForm"
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
        <div class="col-6">
          <date-input
            label="Fecha de Impresión"
            v-model="formData.currentDate"
            autofocus
            :rules="[val => val && val.length || 'Complete la fecha del día']"
          />
        </div>
        <div class="col-6">
          <date-input
            label="Próximo Vencimiento"
            v-model="formData.expDate"
            :rules="[val => val && val.length || 'Complete la fecha del vencimiento']"
          />
        </div>
        <div class="col-8">
          <q-input
            outlined
            dense
            label="Descripción"
            v-model="formData.product"
            :rules="[val => val && val.length > 4 || 'Detalle el bien que se entrega al firmante']"
          />
        </div>
        <div class="col-4">
          <q-input
            outlined
            dense
            label="Pagadero en"
            v-model="formData.paymentAddress"
            :rules="[val => val && val.length > 4 || 'Ingrese dirección de pagos']"
          />
        </div>
      </div>
      <div class="fieldset-title">Datos del Firmante</div>
      <div class="row q-col-gutter-sm">
        <div class="col-9">
          <q-input
            outlined
            dense
            label="Nombre y Apellido"
            v-model="formData.name"
            :rules="[val => val && val.length >= 4 || 'Ingrese nombre y apellido del firmante']"
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
      </div>
      <div class="fieldset-title">
        Lotes de Pagarés
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-input
            type="number"
            outlined
            dense
            label="Cantidad"
            v-model="amount.quantity"
          />
        </div>
        <div class="col-4">
          <div class="row justify-evenly">
            <q-radio label="Pesos" val="PESO" v-model="amount.currency" />
            <q-radio label="Dólares" val="DOLAR" v-model="amount.currency" />
          </div>
        </div>
        <div class="col-3">
          <q-input
            ref="amountInput"
            type="number"
            outlined
            dense
            label="Importe"
            step="0.01"
            v-model.number="amount.amount"
            @keyup.enter="pushAmount(amount)"
          >
            <template v-slot:prepend>
              <q-icon name="monetization_on" />
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-btn
            unelevated
            color="secondary"
            icon="add"
            class="full-width"
            style="margin-top: 2px"
            @click="pushAmount(amount)"
          />
        </div>
        <div class="col-12">
          <q-markup-table
            flat
            bordered
            v-if="amounts.length"
          >
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Moneda</th>
                <th>Importe</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) of amounts"
                :key="index"
              >
                <td class="text-center">{{item.quantity}}</td>
                <td class="text-center">{{item.currency}}</td>
                <td class="text-center">$ {{item.amount}}</td>
                <td class="text-center">
                  <q-btn
                    icon="delete"
                    color="red"
                    flat
                    dense
                    round
                    @click="amounts.splice(index, 1)"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <div class="row">
        <div class="col-4 offset-4 text-center q-mt-md">
          <q-btn
            icon="print"
            label="Imprimir"
            color="primary"
            unelevated
            @click="submit"
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
      amount: {},
      amounts: [],
      formData: {
        currentDate: '',
        expDate: '',
        name: '',
        document: '',
        address1: '',
        address2: '',
        address3: '',
        phone: '',
        product: ''
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
    pushAmount (amount) {
      if (amount.amount > 0 && amount.currency.length && amount.quantity > 0) {
        this.amounts.push(amount)
        this.amount = {}
        this.$refs.amountInput.focus()
      }
    },
    submit () {
      this.$refs.mainForm.submit()
    },
    onSubmit () {
      if (this.amounts.length) {
        this.formData.amounts = this.amounts
        console.log(this.formData)
        this.printPdf(this.formData)
      } else {
        alert('Especifique importes y cantidad de pagarés')
      }
    },
    onReset () { }
  }
}
</script>
