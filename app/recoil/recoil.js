import { atom } from 'recoil';

export const selectedProductState = atom({
  key: 'selectedProduct',
  default: null,
});
