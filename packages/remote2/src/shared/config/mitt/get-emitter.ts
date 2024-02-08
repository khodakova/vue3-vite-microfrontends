import { inject, ref } from 'vue';
import { Emitter } from 'mitt';
import { EmitterEvents } from './mitt';

const emitter = ref<Emitter<EmitterEvents>>();

export const getEmitter = () => {
  if (!emitter.value) {
    emitter.value = inject<Emitter<EmitterEvents>>('mitt') as Emitter<EmitterEvents>;
  }
  return emitter.value;
};
