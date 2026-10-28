interface Contract {
  baseUrl: {
    API?: string;
  }
}

export const Environment: Contract = {
  baseUrl: {
    API: process.env.NEXT_PUBLIC_API_URL
  }
}