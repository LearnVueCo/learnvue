<script setup lang="ts">
import { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { name } from '../inputs'

const schema: FormKitSchemaDefinition = [
  name,
  {
    $formkit: 'text',

    type: 'text',
    label: 'Age',
    validation: 'required|max:27',
    validationMessages: {
      required: 'Age is required',
      max: 'no boomers'
    }
  },
  {
    $cmp: 'FormKit',
    props: {
      validation: 'required|min:2',
      type: 'checkbox',
      name: 'actions',
      label: 'I have...',
      options: ['Liked', 'Commented', 'Subscribed']
    }
  }
]
</script>

<template>
  <FormKitSchema :schema="schema" />
</template>
