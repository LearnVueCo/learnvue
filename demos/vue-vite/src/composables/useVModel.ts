// oversimplified version of VueUse useVModel
export function useVModel(props, key, emit) {
  return computed({
    get: () => props[key],
    set: (newValue) => emit(`update:${key}`, newValue)
  })
}

