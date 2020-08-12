<template>
  <q-input
    dense
    outlined
    clearable
    mask="XX-XX-XXXX"
    hint="DD-MM-AAAA"
    :autofocus="autofocus"
    :label="label"
    :value="mutValue"
    :rules="rules"
    @input="updateModel"
  >
    <template v-slot:prepend>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :value="value"
            mask="DD-MM-YYYY"
            @input="updateModel"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    rules: Array,
    autofocus: Boolean
  },
  data () {
    return {
      mutValue: this.value
    }
  },
  methods: {
    updateModel (val) {
      this.$refs.qDateProxy.hide()
      this.mutValue = val
      this.$emit('input', val)
    }
  }
}
</script>
