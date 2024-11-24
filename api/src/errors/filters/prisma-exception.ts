import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const mapDomain = {
      'product': 'Produto',
      'supplier': 'Fornecedor',
      'category': 'Categoria',
      'user': 'Usuário'
    }
    switch(exception.code){
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,  
          message: `Conflito: ${exception.meta?.target} já existe.`,
          timestamp: new Date().toISOString(),
          path: request.url
        });
        break;
      case 'P2025':
        let message = "Registro não encontrado.";
        if(exception.message)
          message = `${mapDomain[exception.message.split(' ')[1].toLowerCase()]} não econtrado.`;
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,  
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
    }
  }
}
