import axios from 'axios';
import api from './api';
import viaCepApi from './viaCepApi';

interface ApiResponse {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export default async function getNewCep(cep: string): Promise<ApiResponse|undefined> {
  try {
    const response = await api.get<ApiResponse>(`consulta/${cep}`);
    return response.data;
  } catch (erro) {
    if (axios.isAxiosError(erro)) {
      if (!(erro.response?.data === {
        error: 'Cep not found',
      })) {
        // fail safe to cep api
        // if cant get from server
        try {
          const response = await viaCepApi.get<ApiResponse>(`${cep}/json`);
          response.data.cep.replace('-', '');
          return response.data;
        } catch (err) {
          return undefined;
        }
      }
    }
    return undefined;
  }
}
