import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  async updatePhoto(
    file: File,
    userType: 'usuario'|'doctor'|'hospital',
    id: string
  ) {
    try {
      const url = `${apiUrl}/uploads/${userType}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }


    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
