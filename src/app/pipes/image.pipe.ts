import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Pipe({
  name: 'imagePipe'
})
export class ImagePipe implements PipeTransform {

  transform(imageUrl: string, userType: 'usuario' | 'doctor' | 'hospital'): string {
    // return `Hola Mundo!! ${imageUrl} ${userType}`;

    if (!imageUrl) {
      return `${apiUrl}/uploads/usuario/noimage`;
    } else if (imageUrl.includes('https')) {
      return imageUrl;
    } else if (imageUrl) {
      return `${apiUrl}/uploads/${userType}/${imageUrl}`;
    } else {
      return `${apiUrl}/uploads/usuario/noimage`;
    }
  }

}
