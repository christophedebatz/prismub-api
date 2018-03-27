export default interface CommitsRequestDto {

  repository:string,
  owner:string,
  page:number,
  ref?:string,

};
