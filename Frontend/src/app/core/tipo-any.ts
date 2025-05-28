import { Observer } from 'rxjs';

export const observatorAny: Observer<any> = {
  next(res) {
    if (res) {
      console.info('Response:', res);
      if (res.status === 200) {
        alert('Operación exitosa');
      } else if (res.status === 406) {
        alert('Contraseña Incorrecta');
      } else if (res.status === 409) {
        alert('El usuario no se encuentra registrado');
      }
    } else {
      console.warn('No response received');
    }
  },
  error(err) {
    if (err) {
      console.error('Error:', err);
    }
  },
  complete() {},
};
