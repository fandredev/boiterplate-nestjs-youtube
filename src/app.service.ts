import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface ResponseDogsAPI {
  message: string;
  status: string;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  async getDogs() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ResponseDogsAPI>('https://dog.ceo/api/breeds/image/random')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);

            throw `Um error aconteceu: ${error.response.data}`;
          }),
        ),
    );

    return data;
  }
}
