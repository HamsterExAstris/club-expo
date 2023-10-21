type Pagination = {
    lastPage: boolean;
    limit: number;
    skip: number;
  };

export default interface IPaged {
  pagination: Pagination
};