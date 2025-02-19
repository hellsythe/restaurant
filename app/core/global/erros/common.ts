export class NotFoundError extends Error {
   constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
   }
}

export class RepositoryError extends Error {
   constructor(message: string) {
      super(message);
      this.name = 'RepositoryError';
   }
}