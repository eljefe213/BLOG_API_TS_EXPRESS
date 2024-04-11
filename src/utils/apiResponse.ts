export function apiResponse(data: any, message: string = '', status: boolean = true) {
    return {
      status,
      message,
      data
    };
  }