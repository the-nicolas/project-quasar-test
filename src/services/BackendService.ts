import { api } from 'boot/axios';
import { IBookModel } from './IBookModel';

export class BackendService {
  validateISBN(isbn: string): boolean {
    const numericStr = isbn.replace(/\D/g, '');

    if (numericStr.length != 13) {
      return false;
    }

    const numerics: number[] = [];
    let checkDigit = 0;

    for (let i = 0; i < numericStr.length; i++) {
      numerics[i] = parseInt(numericStr[i], 10);

      if (i + 1 >= numericStr.length) {
        continue;
      }

      if (i % 2 == 0) {
        checkDigit += numerics[i] * 1;
      } else {
        checkDigit += numerics[i] * 3;
      }
    }

    checkDigit = (10 - (checkDigit % 10)) % 10;

    if (checkDigit != numerics[12]) {
      return false;
    }

    return true;
  }

  mapBookResponse(raw: IBookModel) {
    const data = <IBookModel>{
      ...raw,
      valid: true,
      publishDate: raw.publish_date,
      publishPlaces: raw.publish_places,
      numberPages: raw.number_of_pages,
    };

    return data;
  }

  async search(isbn: string) {
    let data = <IBookModel>{ valid: false };

    await api
      .get(`/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
      .then((response) => {
        const res = Object.entries(response.data).shift() || [];
        //console.log('RES', res.slice(1, 2));
        const raw = <IBookModel>res[1];
        console.log('RAW', raw);
        data = this.mapBookResponse(raw);
        console.log('DATA', data);
      })
      .catch(() => {
        //
      });

    return data;
  }
}
