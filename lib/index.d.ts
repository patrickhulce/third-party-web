export interface IEntity {
  name: string
  homepage: string
  categories: string[]
  domains: string[]
}

export declare const entities: IEntity[]
export declare function getRootDomain(url: string): string
export declare function getEntity(url: string): IEntity | undefined
