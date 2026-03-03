
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Investigation
 * 
 */
export type Investigation = $Result.DefaultSelection<Prisma.$InvestigationPayload>
/**
 * Model Entity
 * 
 */
export type Entity = $Result.DefaultSelection<Prisma.$EntityPayload>
/**
 * Model Evidence
 * 
 */
export type Evidence = $Result.DefaultSelection<Prisma.$EvidencePayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model SearchLog
 * 
 */
export type SearchLog = $Result.DefaultSelection<Prisma.$SearchLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.investigation`: Exposes CRUD operations for the **Investigation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investigations
    * const investigations = await prisma.investigation.findMany()
    * ```
    */
  get investigation(): Prisma.InvestigationDelegate<ExtArgs>;

  /**
   * `prisma.entity`: Exposes CRUD operations for the **Entity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entities
    * const entities = await prisma.entity.findMany()
    * ```
    */
  get entity(): Prisma.EntityDelegate<ExtArgs>;

  /**
   * `prisma.evidence`: Exposes CRUD operations for the **Evidence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evidences
    * const evidences = await prisma.evidence.findMany()
    * ```
    */
  get evidence(): Prisma.EvidenceDelegate<ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs>;

  /**
   * `prisma.searchLog`: Exposes CRUD operations for the **SearchLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchLogs
    * const searchLogs = await prisma.searchLog.findMany()
    * ```
    */
  get searchLog(): Prisma.SearchLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Investigation: 'Investigation',
    Entity: 'Entity',
    Evidence: 'Evidence',
    Report: 'Report',
    SearchLog: 'SearchLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "investigation" | "entity" | "evidence" | "report" | "searchLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Investigation: {
        payload: Prisma.$InvestigationPayload<ExtArgs>
        fields: Prisma.InvestigationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestigationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestigationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          findFirst: {
            args: Prisma.InvestigationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestigationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          findMany: {
            args: Prisma.InvestigationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>[]
          }
          create: {
            args: Prisma.InvestigationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          createMany: {
            args: Prisma.InvestigationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvestigationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>[]
          }
          delete: {
            args: Prisma.InvestigationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          update: {
            args: Prisma.InvestigationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          deleteMany: {
            args: Prisma.InvestigationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestigationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvestigationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          aggregate: {
            args: Prisma.InvestigationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestigation>
          }
          groupBy: {
            args: Prisma.InvestigationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestigationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestigationCountArgs<ExtArgs>
            result: $Utils.Optional<InvestigationCountAggregateOutputType> | number
          }
        }
      }
      Entity: {
        payload: Prisma.$EntityPayload<ExtArgs>
        fields: Prisma.EntityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          findFirst: {
            args: Prisma.EntityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          findMany: {
            args: Prisma.EntityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>[]
          }
          create: {
            args: Prisma.EntityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          createMany: {
            args: Prisma.EntityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>[]
          }
          delete: {
            args: Prisma.EntityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          update: {
            args: Prisma.EntityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          deleteMany: {
            args: Prisma.EntityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EntityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          aggregate: {
            args: Prisma.EntityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntity>
          }
          groupBy: {
            args: Prisma.EntityGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntityGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntityCountArgs<ExtArgs>
            result: $Utils.Optional<EntityCountAggregateOutputType> | number
          }
        }
      }
      Evidence: {
        payload: Prisma.$EvidencePayload<ExtArgs>
        fields: Prisma.EvidenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvidenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvidenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          findFirst: {
            args: Prisma.EvidenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvidenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          findMany: {
            args: Prisma.EvidenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>[]
          }
          create: {
            args: Prisma.EvidenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          createMany: {
            args: Prisma.EvidenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvidenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>[]
          }
          delete: {
            args: Prisma.EvidenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          update: {
            args: Prisma.EvidenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          deleteMany: {
            args: Prisma.EvidenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvidenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvidenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidencePayload>
          }
          aggregate: {
            args: Prisma.EvidenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvidence>
          }
          groupBy: {
            args: Prisma.EvidenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvidenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvidenceCountArgs<ExtArgs>
            result: $Utils.Optional<EvidenceCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      SearchLog: {
        payload: Prisma.$SearchLogPayload<ExtArgs>
        fields: Prisma.SearchLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          findFirst: {
            args: Prisma.SearchLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          findMany: {
            args: Prisma.SearchLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>[]
          }
          create: {
            args: Prisma.SearchLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          createMany: {
            args: Prisma.SearchLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>[]
          }
          delete: {
            args: Prisma.SearchLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          update: {
            args: Prisma.SearchLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          deleteMany: {
            args: Prisma.SearchLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SearchLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          aggregate: {
            args: Prisma.SearchLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchLog>
          }
          groupBy: {
            args: Prisma.SearchLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchLogCountArgs<ExtArgs>
            result: $Utils.Optional<SearchLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    investigations: number
    searchLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigations?: boolean | UserCountOutputTypeCountInvestigationsArgs
    searchLogs?: boolean | UserCountOutputTypeCountSearchLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvestigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestigationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSearchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchLogWhereInput
  }


  /**
   * Count Type InvestigationCountOutputType
   */

  export type InvestigationCountOutputType = {
    entities: number
    evidence: number
    reports: number
    logs: number
  }

  export type InvestigationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entities?: boolean | InvestigationCountOutputTypeCountEntitiesArgs
    evidence?: boolean | InvestigationCountOutputTypeCountEvidenceArgs
    reports?: boolean | InvestigationCountOutputTypeCountReportsArgs
    logs?: boolean | InvestigationCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * InvestigationCountOutputType without action
   */
  export type InvestigationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvestigationCountOutputType
     */
    select?: InvestigationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvestigationCountOutputType without action
   */
  export type InvestigationCountOutputTypeCountEntitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntityWhereInput
  }

  /**
   * InvestigationCountOutputType without action
   */
  export type InvestigationCountOutputTypeCountEvidenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvidenceWhereInput
  }

  /**
   * InvestigationCountOutputType without action
   */
  export type InvestigationCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * InvestigationCountOutputType without action
   */
  export type InvestigationCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: string | null
    stripeCustomerId: string | null
    hasLifetimeAccess: boolean | null
    plan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: string | null
    stripeCustomerId: string | null
    hasLifetimeAccess: boolean | null
    plan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    stripeCustomerId: number
    hasLifetimeAccess: number
    plan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    stripeCustomerId?: true
    hasLifetimeAccess?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    stripeCustomerId?: true
    hasLifetimeAccess?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    stripeCustomerId?: true
    hasLifetimeAccess?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    role: string
    stripeCustomerId: string | null
    hasLifetimeAccess: boolean
    plan: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    stripeCustomerId?: boolean
    hasLifetimeAccess?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigations?: boolean | User$investigationsArgs<ExtArgs>
    searchLogs?: boolean | User$searchLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    stripeCustomerId?: boolean
    hasLifetimeAccess?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    stripeCustomerId?: boolean
    hasLifetimeAccess?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigations?: boolean | User$investigationsArgs<ExtArgs>
    searchLogs?: boolean | User$searchLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      investigations: Prisma.$InvestigationPayload<ExtArgs>[]
      searchLogs: Prisma.$SearchLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: string
      stripeCustomerId: string | null
      hasLifetimeAccess: boolean
      plan: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investigations<T extends User$investigationsArgs<ExtArgs> = {}>(args?: Subset<T, User$investigationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findMany"> | Null>
    searchLogs<T extends User$searchLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$searchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly hasLifetimeAccess: FieldRef<"User", 'Boolean'>
    readonly plan: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.investigations
   */
  export type User$investigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    where?: InvestigationWhereInput
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    cursor?: InvestigationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * User.searchLogs
   */
  export type User$searchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    where?: SearchLogWhereInput
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    cursor?: SearchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Investigation
   */

  export type AggregateInvestigation = {
    _count: InvestigationCountAggregateOutputType | null
    _min: InvestigationMinAggregateOutputType | null
    _max: InvestigationMaxAggregateOutputType | null
  }

  export type InvestigationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subjectName: string | null
    subjectUsername: string | null
    subjectEmail: string | null
    subjectPhone: string | null
    subjectImageUrl: string | null
  }

  export type InvestigationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subjectName: string | null
    subjectUsername: string | null
    subjectEmail: string | null
    subjectPhone: string | null
    subjectImageUrl: string | null
  }

  export type InvestigationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    userId: number
    createdAt: number
    updatedAt: number
    subjectName: number
    subjectUsername: number
    subjectEmail: number
    subjectPhone: number
    subjectImageUrl: number
    _all: number
  }


  export type InvestigationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    subjectName?: true
    subjectUsername?: true
    subjectEmail?: true
    subjectPhone?: true
    subjectImageUrl?: true
  }

  export type InvestigationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    subjectName?: true
    subjectUsername?: true
    subjectEmail?: true
    subjectPhone?: true
    subjectImageUrl?: true
  }

  export type InvestigationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    subjectName?: true
    subjectUsername?: true
    subjectEmail?: true
    subjectPhone?: true
    subjectImageUrl?: true
    _all?: true
  }

  export type InvestigationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investigation to aggregate.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investigations
    **/
    _count?: true | InvestigationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestigationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestigationMaxAggregateInputType
  }

  export type GetInvestigationAggregateType<T extends InvestigationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestigation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestigation[P]>
      : GetScalarType<T[P], AggregateInvestigation[P]>
  }




  export type InvestigationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestigationWhereInput
    orderBy?: InvestigationOrderByWithAggregationInput | InvestigationOrderByWithAggregationInput[]
    by: InvestigationScalarFieldEnum[] | InvestigationScalarFieldEnum
    having?: InvestigationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestigationCountAggregateInputType | true
    _min?: InvestigationMinAggregateInputType
    _max?: InvestigationMaxAggregateInputType
  }

  export type InvestigationGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: string
    userId: string
    createdAt: Date
    updatedAt: Date
    subjectName: string | null
    subjectUsername: string | null
    subjectEmail: string | null
    subjectPhone: string | null
    subjectImageUrl: string | null
    _count: InvestigationCountAggregateOutputType | null
    _min: InvestigationMinAggregateOutputType | null
    _max: InvestigationMaxAggregateOutputType | null
  }

  type GetInvestigationGroupByPayload<T extends InvestigationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestigationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestigationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestigationGroupByOutputType[P]>
            : GetScalarType<T[P], InvestigationGroupByOutputType[P]>
        }
      >
    >


  export type InvestigationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectName?: boolean
    subjectUsername?: boolean
    subjectEmail?: boolean
    subjectPhone?: boolean
    subjectImageUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entities?: boolean | Investigation$entitiesArgs<ExtArgs>
    evidence?: boolean | Investigation$evidenceArgs<ExtArgs>
    reports?: boolean | Investigation$reportsArgs<ExtArgs>
    logs?: boolean | Investigation$logsArgs<ExtArgs>
    _count?: boolean | InvestigationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investigation"]>

  export type InvestigationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectName?: boolean
    subjectUsername?: boolean
    subjectEmail?: boolean
    subjectPhone?: boolean
    subjectImageUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investigation"]>

  export type InvestigationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectName?: boolean
    subjectUsername?: boolean
    subjectEmail?: boolean
    subjectPhone?: boolean
    subjectImageUrl?: boolean
  }

  export type InvestigationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entities?: boolean | Investigation$entitiesArgs<ExtArgs>
    evidence?: boolean | Investigation$evidenceArgs<ExtArgs>
    reports?: boolean | Investigation$reportsArgs<ExtArgs>
    logs?: boolean | Investigation$logsArgs<ExtArgs>
    _count?: boolean | InvestigationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvestigationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InvestigationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investigation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      entities: Prisma.$EntityPayload<ExtArgs>[]
      evidence: Prisma.$EvidencePayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
      logs: Prisma.$SearchLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: string
      userId: string
      createdAt: Date
      updatedAt: Date
      subjectName: string | null
      subjectUsername: string | null
      subjectEmail: string | null
      subjectPhone: string | null
      subjectImageUrl: string | null
    }, ExtArgs["result"]["investigation"]>
    composites: {}
  }

  type InvestigationGetPayload<S extends boolean | null | undefined | InvestigationDefaultArgs> = $Result.GetResult<Prisma.$InvestigationPayload, S>

  type InvestigationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvestigationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvestigationCountAggregateInputType | true
    }

  export interface InvestigationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investigation'], meta: { name: 'Investigation' } }
    /**
     * Find zero or one Investigation that matches the filter.
     * @param {InvestigationFindUniqueArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestigationFindUniqueArgs>(args: SelectSubset<T, InvestigationFindUniqueArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Investigation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvestigationFindUniqueOrThrowArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestigationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestigationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Investigation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindFirstArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestigationFindFirstArgs>(args?: SelectSubset<T, InvestigationFindFirstArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Investigation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindFirstOrThrowArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestigationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestigationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Investigations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investigations
     * const investigations = await prisma.investigation.findMany()
     * 
     * // Get first 10 Investigations
     * const investigations = await prisma.investigation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investigationWithIdOnly = await prisma.investigation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvestigationFindManyArgs>(args?: SelectSubset<T, InvestigationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Investigation.
     * @param {InvestigationCreateArgs} args - Arguments to create a Investigation.
     * @example
     * // Create one Investigation
     * const Investigation = await prisma.investigation.create({
     *   data: {
     *     // ... data to create a Investigation
     *   }
     * })
     * 
     */
    create<T extends InvestigationCreateArgs>(args: SelectSubset<T, InvestigationCreateArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Investigations.
     * @param {InvestigationCreateManyArgs} args - Arguments to create many Investigations.
     * @example
     * // Create many Investigations
     * const investigation = await prisma.investigation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestigationCreateManyArgs>(args?: SelectSubset<T, InvestigationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investigations and returns the data saved in the database.
     * @param {InvestigationCreateManyAndReturnArgs} args - Arguments to create many Investigations.
     * @example
     * // Create many Investigations
     * const investigation = await prisma.investigation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investigations and only return the `id`
     * const investigationWithIdOnly = await prisma.investigation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvestigationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvestigationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Investigation.
     * @param {InvestigationDeleteArgs} args - Arguments to delete one Investigation.
     * @example
     * // Delete one Investigation
     * const Investigation = await prisma.investigation.delete({
     *   where: {
     *     // ... filter to delete one Investigation
     *   }
     * })
     * 
     */
    delete<T extends InvestigationDeleteArgs>(args: SelectSubset<T, InvestigationDeleteArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Investigation.
     * @param {InvestigationUpdateArgs} args - Arguments to update one Investigation.
     * @example
     * // Update one Investigation
     * const investigation = await prisma.investigation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestigationUpdateArgs>(args: SelectSubset<T, InvestigationUpdateArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Investigations.
     * @param {InvestigationDeleteManyArgs} args - Arguments to filter Investigations to delete.
     * @example
     * // Delete a few Investigations
     * const { count } = await prisma.investigation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestigationDeleteManyArgs>(args?: SelectSubset<T, InvestigationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investigations
     * const investigation = await prisma.investigation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestigationUpdateManyArgs>(args: SelectSubset<T, InvestigationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Investigation.
     * @param {InvestigationUpsertArgs} args - Arguments to update or create a Investigation.
     * @example
     * // Update or create a Investigation
     * const investigation = await prisma.investigation.upsert({
     *   create: {
     *     // ... data to create a Investigation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investigation we want to update
     *   }
     * })
     */
    upsert<T extends InvestigationUpsertArgs>(args: SelectSubset<T, InvestigationUpsertArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Investigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationCountArgs} args - Arguments to filter Investigations to count.
     * @example
     * // Count the number of Investigations
     * const count = await prisma.investigation.count({
     *   where: {
     *     // ... the filter for the Investigations we want to count
     *   }
     * })
    **/
    count<T extends InvestigationCountArgs>(
      args?: Subset<T, InvestigationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestigationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvestigationAggregateArgs>(args: Subset<T, InvestigationAggregateArgs>): Prisma.PrismaPromise<GetInvestigationAggregateType<T>>

    /**
     * Group by Investigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvestigationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestigationGroupByArgs['orderBy'] }
        : { orderBy?: InvestigationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvestigationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestigationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investigation model
   */
  readonly fields: InvestigationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investigation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestigationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    entities<T extends Investigation$entitiesArgs<ExtArgs> = {}>(args?: Subset<T, Investigation$entitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany"> | Null>
    evidence<T extends Investigation$evidenceArgs<ExtArgs> = {}>(args?: Subset<T, Investigation$evidenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findMany"> | Null>
    reports<T extends Investigation$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Investigation$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany"> | Null>
    logs<T extends Investigation$logsArgs<ExtArgs> = {}>(args?: Subset<T, Investigation$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Investigation model
   */ 
  interface InvestigationFieldRefs {
    readonly id: FieldRef<"Investigation", 'String'>
    readonly title: FieldRef<"Investigation", 'String'>
    readonly description: FieldRef<"Investigation", 'String'>
    readonly status: FieldRef<"Investigation", 'String'>
    readonly userId: FieldRef<"Investigation", 'String'>
    readonly createdAt: FieldRef<"Investigation", 'DateTime'>
    readonly updatedAt: FieldRef<"Investigation", 'DateTime'>
    readonly subjectName: FieldRef<"Investigation", 'String'>
    readonly subjectUsername: FieldRef<"Investigation", 'String'>
    readonly subjectEmail: FieldRef<"Investigation", 'String'>
    readonly subjectPhone: FieldRef<"Investigation", 'String'>
    readonly subjectImageUrl: FieldRef<"Investigation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Investigation findUnique
   */
  export type InvestigationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation findUniqueOrThrow
   */
  export type InvestigationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation findFirst
   */
  export type InvestigationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investigations.
     */
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation findFirstOrThrow
   */
  export type InvestigationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investigations.
     */
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation findMany
   */
  export type InvestigationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigations to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation create
   */
  export type InvestigationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The data needed to create a Investigation.
     */
    data: XOR<InvestigationCreateInput, InvestigationUncheckedCreateInput>
  }

  /**
   * Investigation createMany
   */
  export type InvestigationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investigations.
     */
    data: InvestigationCreateManyInput | InvestigationCreateManyInput[]
  }

  /**
   * Investigation createManyAndReturn
   */
  export type InvestigationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Investigations.
     */
    data: InvestigationCreateManyInput | InvestigationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investigation update
   */
  export type InvestigationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The data needed to update a Investigation.
     */
    data: XOR<InvestigationUpdateInput, InvestigationUncheckedUpdateInput>
    /**
     * Choose, which Investigation to update.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation updateMany
   */
  export type InvestigationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investigations.
     */
    data: XOR<InvestigationUpdateManyMutationInput, InvestigationUncheckedUpdateManyInput>
    /**
     * Filter which Investigations to update
     */
    where?: InvestigationWhereInput
  }

  /**
   * Investigation upsert
   */
  export type InvestigationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The filter to search for the Investigation to update in case it exists.
     */
    where: InvestigationWhereUniqueInput
    /**
     * In case the Investigation found by the `where` argument doesn't exist, create a new Investigation with this data.
     */
    create: XOR<InvestigationCreateInput, InvestigationUncheckedCreateInput>
    /**
     * In case the Investigation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestigationUpdateInput, InvestigationUncheckedUpdateInput>
  }

  /**
   * Investigation delete
   */
  export type InvestigationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter which Investigation to delete.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation deleteMany
   */
  export type InvestigationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investigations to delete
     */
    where?: InvestigationWhereInput
  }

  /**
   * Investigation.entities
   */
  export type Investigation$entitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    where?: EntityWhereInput
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    cursor?: EntityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Investigation.evidence
   */
  export type Investigation$evidenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    where?: EvidenceWhereInput
    orderBy?: EvidenceOrderByWithRelationInput | EvidenceOrderByWithRelationInput[]
    cursor?: EvidenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvidenceScalarFieldEnum | EvidenceScalarFieldEnum[]
  }

  /**
   * Investigation.reports
   */
  export type Investigation$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Investigation.logs
   */
  export type Investigation$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    where?: SearchLogWhereInput
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    cursor?: SearchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * Investigation without action
   */
  export type InvestigationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
  }


  /**
   * Model Entity
   */

  export type AggregateEntity = {
    _count: EntityCountAggregateOutputType | null
    _avg: EntityAvgAggregateOutputType | null
    _sum: EntitySumAggregateOutputType | null
    _min: EntityMinAggregateOutputType | null
    _max: EntityMaxAggregateOutputType | null
  }

  export type EntityAvgAggregateOutputType = {
    confidence: number | null
  }

  export type EntitySumAggregateOutputType = {
    confidence: number | null
  }

  export type EntityMinAggregateOutputType = {
    id: string | null
    investigationId: string | null
    type: string | null
    value: string | null
    notes: string | null
    confidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntityMaxAggregateOutputType = {
    id: string | null
    investigationId: string | null
    type: string | null
    value: string | null
    notes: string | null
    confidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntityCountAggregateOutputType = {
    id: number
    investigationId: number
    type: number
    value: number
    notes: number
    confidence: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntityAvgAggregateInputType = {
    confidence?: true
  }

  export type EntitySumAggregateInputType = {
    confidence?: true
  }

  export type EntityMinAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    value?: true
    notes?: true
    confidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntityMaxAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    value?: true
    notes?: true
    confidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntityCountAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    value?: true
    notes?: true
    confidence?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entity to aggregate.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entities
    **/
    _count?: true | EntityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntityMaxAggregateInputType
  }

  export type GetEntityAggregateType<T extends EntityAggregateArgs> = {
        [P in keyof T & keyof AggregateEntity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntity[P]>
      : GetScalarType<T[P], AggregateEntity[P]>
  }




  export type EntityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntityWhereInput
    orderBy?: EntityOrderByWithAggregationInput | EntityOrderByWithAggregationInput[]
    by: EntityScalarFieldEnum[] | EntityScalarFieldEnum
    having?: EntityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntityCountAggregateInputType | true
    _avg?: EntityAvgAggregateInputType
    _sum?: EntitySumAggregateInputType
    _min?: EntityMinAggregateInputType
    _max?: EntityMaxAggregateInputType
  }

  export type EntityGroupByOutputType = {
    id: string
    investigationId: string
    type: string
    value: string
    notes: string | null
    confidence: number
    createdAt: Date
    updatedAt: Date
    _count: EntityCountAggregateOutputType | null
    _avg: EntityAvgAggregateOutputType | null
    _sum: EntitySumAggregateOutputType | null
    _min: EntityMinAggregateOutputType | null
    _max: EntityMaxAggregateOutputType | null
  }

  type GetEntityGroupByPayload<T extends EntityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntityGroupByOutputType[P]>
            : GetScalarType<T[P], EntityGroupByOutputType[P]>
        }
      >
    >


  export type EntitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    type?: boolean
    value?: boolean
    notes?: boolean
    confidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entity"]>

  export type EntitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    type?: boolean
    value?: boolean
    notes?: boolean
    confidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entity"]>

  export type EntitySelectScalar = {
    id?: boolean
    investigationId?: boolean
    type?: boolean
    value?: boolean
    notes?: boolean
    confidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EntityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }
  export type EntityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }

  export type $EntityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entity"
    objects: {
      investigation: Prisma.$InvestigationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      investigationId: string
      type: string
      value: string
      notes: string | null
      confidence: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["entity"]>
    composites: {}
  }

  type EntityGetPayload<S extends boolean | null | undefined | EntityDefaultArgs> = $Result.GetResult<Prisma.$EntityPayload, S>

  type EntityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EntityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EntityCountAggregateInputType | true
    }

  export interface EntityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entity'], meta: { name: 'Entity' } }
    /**
     * Find zero or one Entity that matches the filter.
     * @param {EntityFindUniqueArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityFindUniqueArgs>(args: SelectSubset<T, EntityFindUniqueArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Entity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EntityFindUniqueOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityFindUniqueOrThrowArgs>(args: SelectSubset<T, EntityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Entity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityFindFirstArgs>(args?: SelectSubset<T, EntityFindFirstArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Entity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityFindFirstOrThrowArgs>(args?: SelectSubset<T, EntityFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Entities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entities
     * const entities = await prisma.entity.findMany()
     * 
     * // Get first 10 Entities
     * const entities = await prisma.entity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entityWithIdOnly = await prisma.entity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntityFindManyArgs>(args?: SelectSubset<T, EntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Entity.
     * @param {EntityCreateArgs} args - Arguments to create a Entity.
     * @example
     * // Create one Entity
     * const Entity = await prisma.entity.create({
     *   data: {
     *     // ... data to create a Entity
     *   }
     * })
     * 
     */
    create<T extends EntityCreateArgs>(args: SelectSubset<T, EntityCreateArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Entities.
     * @param {EntityCreateManyArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntityCreateManyArgs>(args?: SelectSubset<T, EntityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entities and returns the data saved in the database.
     * @param {EntityCreateManyAndReturnArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entities and only return the `id`
     * const entityWithIdOnly = await prisma.entity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntityCreateManyAndReturnArgs>(args?: SelectSubset<T, EntityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Entity.
     * @param {EntityDeleteArgs} args - Arguments to delete one Entity.
     * @example
     * // Delete one Entity
     * const Entity = await prisma.entity.delete({
     *   where: {
     *     // ... filter to delete one Entity
     *   }
     * })
     * 
     */
    delete<T extends EntityDeleteArgs>(args: SelectSubset<T, EntityDeleteArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Entity.
     * @param {EntityUpdateArgs} args - Arguments to update one Entity.
     * @example
     * // Update one Entity
     * const entity = await prisma.entity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntityUpdateArgs>(args: SelectSubset<T, EntityUpdateArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Entities.
     * @param {EntityDeleteManyArgs} args - Arguments to filter Entities to delete.
     * @example
     * // Delete a few Entities
     * const { count } = await prisma.entity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntityDeleteManyArgs>(args?: SelectSubset<T, EntityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entities
     * const entity = await prisma.entity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntityUpdateManyArgs>(args: SelectSubset<T, EntityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Entity.
     * @param {EntityUpsertArgs} args - Arguments to update or create a Entity.
     * @example
     * // Update or create a Entity
     * const entity = await prisma.entity.upsert({
     *   create: {
     *     // ... data to create a Entity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entity we want to update
     *   }
     * })
     */
    upsert<T extends EntityUpsertArgs>(args: SelectSubset<T, EntityUpsertArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityCountArgs} args - Arguments to filter Entities to count.
     * @example
     * // Count the number of Entities
     * const count = await prisma.entity.count({
     *   where: {
     *     // ... the filter for the Entities we want to count
     *   }
     * })
    **/
    count<T extends EntityCountArgs>(
      args?: Subset<T, EntityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntityAggregateArgs>(args: Subset<T, EntityAggregateArgs>): Prisma.PrismaPromise<GetEntityAggregateType<T>>

    /**
     * Group by Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntityGroupByArgs['orderBy'] }
        : { orderBy?: EntityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entity model
   */
  readonly fields: EntityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investigation<T extends InvestigationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvestigationDefaultArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Entity model
   */ 
  interface EntityFieldRefs {
    readonly id: FieldRef<"Entity", 'String'>
    readonly investigationId: FieldRef<"Entity", 'String'>
    readonly type: FieldRef<"Entity", 'String'>
    readonly value: FieldRef<"Entity", 'String'>
    readonly notes: FieldRef<"Entity", 'String'>
    readonly confidence: FieldRef<"Entity", 'Int'>
    readonly createdAt: FieldRef<"Entity", 'DateTime'>
    readonly updatedAt: FieldRef<"Entity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entity findUnique
   */
  export type EntityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity findUniqueOrThrow
   */
  export type EntityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity findFirst
   */
  export type EntityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entities.
     */
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity findFirstOrThrow
   */
  export type EntityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entities.
     */
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity findMany
   */
  export type EntityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entities to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity create
   */
  export type EntityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The data needed to create a Entity.
     */
    data: XOR<EntityCreateInput, EntityUncheckedCreateInput>
  }

  /**
   * Entity createMany
   */
  export type EntityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entities.
     */
    data: EntityCreateManyInput | EntityCreateManyInput[]
  }

  /**
   * Entity createManyAndReturn
   */
  export type EntityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Entities.
     */
    data: EntityCreateManyInput | EntityCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entity update
   */
  export type EntityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The data needed to update a Entity.
     */
    data: XOR<EntityUpdateInput, EntityUncheckedUpdateInput>
    /**
     * Choose, which Entity to update.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity updateMany
   */
  export type EntityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entities.
     */
    data: XOR<EntityUpdateManyMutationInput, EntityUncheckedUpdateManyInput>
    /**
     * Filter which Entities to update
     */
    where?: EntityWhereInput
  }

  /**
   * Entity upsert
   */
  export type EntityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The filter to search for the Entity to update in case it exists.
     */
    where: EntityWhereUniqueInput
    /**
     * In case the Entity found by the `where` argument doesn't exist, create a new Entity with this data.
     */
    create: XOR<EntityCreateInput, EntityUncheckedCreateInput>
    /**
     * In case the Entity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntityUpdateInput, EntityUncheckedUpdateInput>
  }

  /**
   * Entity delete
   */
  export type EntityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter which Entity to delete.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity deleteMany
   */
  export type EntityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entities to delete
     */
    where?: EntityWhereInput
  }

  /**
   * Entity without action
   */
  export type EntityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
  }


  /**
   * Model Evidence
   */

  export type AggregateEvidence = {
    _count: EvidenceCountAggregateOutputType | null
    _min: EvidenceMinAggregateOutputType | null
    _max: EvidenceMaxAggregateOutputType | null
  }

  export type EvidenceMinAggregateOutputType = {
    id: string | null
    investigationId: string | null
    type: string | null
    title: string | null
    content: string | null
    sourceUrl: string | null
    tags: string | null
    notes: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvidenceMaxAggregateOutputType = {
    id: string | null
    investigationId: string | null
    type: string | null
    title: string | null
    content: string | null
    sourceUrl: string | null
    tags: string | null
    notes: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvidenceCountAggregateOutputType = {
    id: number
    investigationId: number
    type: number
    title: number
    content: number
    sourceUrl: number
    tags: number
    notes: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EvidenceMinAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    title?: true
    content?: true
    sourceUrl?: true
    tags?: true
    notes?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvidenceMaxAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    title?: true
    content?: true
    sourceUrl?: true
    tags?: true
    notes?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvidenceCountAggregateInputType = {
    id?: true
    investigationId?: true
    type?: true
    title?: true
    content?: true
    sourceUrl?: true
    tags?: true
    notes?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EvidenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evidence to aggregate.
     */
    where?: EvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evidences to fetch.
     */
    orderBy?: EvidenceOrderByWithRelationInput | EvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evidences
    **/
    _count?: true | EvidenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvidenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvidenceMaxAggregateInputType
  }

  export type GetEvidenceAggregateType<T extends EvidenceAggregateArgs> = {
        [P in keyof T & keyof AggregateEvidence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvidence[P]>
      : GetScalarType<T[P], AggregateEvidence[P]>
  }




  export type EvidenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvidenceWhereInput
    orderBy?: EvidenceOrderByWithAggregationInput | EvidenceOrderByWithAggregationInput[]
    by: EvidenceScalarFieldEnum[] | EvidenceScalarFieldEnum
    having?: EvidenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvidenceCountAggregateInputType | true
    _min?: EvidenceMinAggregateInputType
    _max?: EvidenceMaxAggregateInputType
  }

  export type EvidenceGroupByOutputType = {
    id: string
    investigationId: string
    type: string
    title: string
    content: string
    sourceUrl: string | null
    tags: string
    notes: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: EvidenceCountAggregateOutputType | null
    _min: EvidenceMinAggregateOutputType | null
    _max: EvidenceMaxAggregateOutputType | null
  }

  type GetEvidenceGroupByPayload<T extends EvidenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvidenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvidenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvidenceGroupByOutputType[P]>
            : GetScalarType<T[P], EvidenceGroupByOutputType[P]>
        }
      >
    >


  export type EvidenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    sourceUrl?: boolean
    tags?: boolean
    notes?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evidence"]>

  export type EvidenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    sourceUrl?: boolean
    tags?: boolean
    notes?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evidence"]>

  export type EvidenceSelectScalar = {
    id?: boolean
    investigationId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    sourceUrl?: boolean
    tags?: boolean
    notes?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EvidenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }
  export type EvidenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }

  export type $EvidencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evidence"
    objects: {
      investigation: Prisma.$InvestigationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      investigationId: string
      type: string
      title: string
      content: string
      sourceUrl: string | null
      tags: string
      notes: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["evidence"]>
    composites: {}
  }

  type EvidenceGetPayload<S extends boolean | null | undefined | EvidenceDefaultArgs> = $Result.GetResult<Prisma.$EvidencePayload, S>

  type EvidenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EvidenceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EvidenceCountAggregateInputType | true
    }

  export interface EvidenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evidence'], meta: { name: 'Evidence' } }
    /**
     * Find zero or one Evidence that matches the filter.
     * @param {EvidenceFindUniqueArgs} args - Arguments to find a Evidence
     * @example
     * // Get one Evidence
     * const evidence = await prisma.evidence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvidenceFindUniqueArgs>(args: SelectSubset<T, EvidenceFindUniqueArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Evidence that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EvidenceFindUniqueOrThrowArgs} args - Arguments to find a Evidence
     * @example
     * // Get one Evidence
     * const evidence = await prisma.evidence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvidenceFindUniqueOrThrowArgs>(args: SelectSubset<T, EvidenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Evidence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFindFirstArgs} args - Arguments to find a Evidence
     * @example
     * // Get one Evidence
     * const evidence = await prisma.evidence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvidenceFindFirstArgs>(args?: SelectSubset<T, EvidenceFindFirstArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Evidence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFindFirstOrThrowArgs} args - Arguments to find a Evidence
     * @example
     * // Get one Evidence
     * const evidence = await prisma.evidence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvidenceFindFirstOrThrowArgs>(args?: SelectSubset<T, EvidenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Evidences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evidences
     * const evidences = await prisma.evidence.findMany()
     * 
     * // Get first 10 Evidences
     * const evidences = await prisma.evidence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evidenceWithIdOnly = await prisma.evidence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvidenceFindManyArgs>(args?: SelectSubset<T, EvidenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Evidence.
     * @param {EvidenceCreateArgs} args - Arguments to create a Evidence.
     * @example
     * // Create one Evidence
     * const Evidence = await prisma.evidence.create({
     *   data: {
     *     // ... data to create a Evidence
     *   }
     * })
     * 
     */
    create<T extends EvidenceCreateArgs>(args: SelectSubset<T, EvidenceCreateArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Evidences.
     * @param {EvidenceCreateManyArgs} args - Arguments to create many Evidences.
     * @example
     * // Create many Evidences
     * const evidence = await prisma.evidence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvidenceCreateManyArgs>(args?: SelectSubset<T, EvidenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Evidences and returns the data saved in the database.
     * @param {EvidenceCreateManyAndReturnArgs} args - Arguments to create many Evidences.
     * @example
     * // Create many Evidences
     * const evidence = await prisma.evidence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Evidences and only return the `id`
     * const evidenceWithIdOnly = await prisma.evidence.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvidenceCreateManyAndReturnArgs>(args?: SelectSubset<T, EvidenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Evidence.
     * @param {EvidenceDeleteArgs} args - Arguments to delete one Evidence.
     * @example
     * // Delete one Evidence
     * const Evidence = await prisma.evidence.delete({
     *   where: {
     *     // ... filter to delete one Evidence
     *   }
     * })
     * 
     */
    delete<T extends EvidenceDeleteArgs>(args: SelectSubset<T, EvidenceDeleteArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Evidence.
     * @param {EvidenceUpdateArgs} args - Arguments to update one Evidence.
     * @example
     * // Update one Evidence
     * const evidence = await prisma.evidence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvidenceUpdateArgs>(args: SelectSubset<T, EvidenceUpdateArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Evidences.
     * @param {EvidenceDeleteManyArgs} args - Arguments to filter Evidences to delete.
     * @example
     * // Delete a few Evidences
     * const { count } = await prisma.evidence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvidenceDeleteManyArgs>(args?: SelectSubset<T, EvidenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evidences
     * const evidence = await prisma.evidence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvidenceUpdateManyArgs>(args: SelectSubset<T, EvidenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Evidence.
     * @param {EvidenceUpsertArgs} args - Arguments to update or create a Evidence.
     * @example
     * // Update or create a Evidence
     * const evidence = await prisma.evidence.upsert({
     *   create: {
     *     // ... data to create a Evidence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evidence we want to update
     *   }
     * })
     */
    upsert<T extends EvidenceUpsertArgs>(args: SelectSubset<T, EvidenceUpsertArgs<ExtArgs>>): Prisma__EvidenceClient<$Result.GetResult<Prisma.$EvidencePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Evidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceCountArgs} args - Arguments to filter Evidences to count.
     * @example
     * // Count the number of Evidences
     * const count = await prisma.evidence.count({
     *   where: {
     *     // ... the filter for the Evidences we want to count
     *   }
     * })
    **/
    count<T extends EvidenceCountArgs>(
      args?: Subset<T, EvidenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvidenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvidenceAggregateArgs>(args: Subset<T, EvidenceAggregateArgs>): Prisma.PrismaPromise<GetEvidenceAggregateType<T>>

    /**
     * Group by Evidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvidenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvidenceGroupByArgs['orderBy'] }
        : { orderBy?: EvidenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvidenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvidenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evidence model
   */
  readonly fields: EvidenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evidence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvidenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investigation<T extends InvestigationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvestigationDefaultArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evidence model
   */ 
  interface EvidenceFieldRefs {
    readonly id: FieldRef<"Evidence", 'String'>
    readonly investigationId: FieldRef<"Evidence", 'String'>
    readonly type: FieldRef<"Evidence", 'String'>
    readonly title: FieldRef<"Evidence", 'String'>
    readonly content: FieldRef<"Evidence", 'String'>
    readonly sourceUrl: FieldRef<"Evidence", 'String'>
    readonly tags: FieldRef<"Evidence", 'String'>
    readonly notes: FieldRef<"Evidence", 'String'>
    readonly isVerified: FieldRef<"Evidence", 'Boolean'>
    readonly createdAt: FieldRef<"Evidence", 'DateTime'>
    readonly updatedAt: FieldRef<"Evidence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Evidence findUnique
   */
  export type EvidenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter, which Evidence to fetch.
     */
    where: EvidenceWhereUniqueInput
  }

  /**
   * Evidence findUniqueOrThrow
   */
  export type EvidenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter, which Evidence to fetch.
     */
    where: EvidenceWhereUniqueInput
  }

  /**
   * Evidence findFirst
   */
  export type EvidenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter, which Evidence to fetch.
     */
    where?: EvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evidences to fetch.
     */
    orderBy?: EvidenceOrderByWithRelationInput | EvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evidences.
     */
    cursor?: EvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evidences.
     */
    distinct?: EvidenceScalarFieldEnum | EvidenceScalarFieldEnum[]
  }

  /**
   * Evidence findFirstOrThrow
   */
  export type EvidenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter, which Evidence to fetch.
     */
    where?: EvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evidences to fetch.
     */
    orderBy?: EvidenceOrderByWithRelationInput | EvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evidences.
     */
    cursor?: EvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evidences.
     */
    distinct?: EvidenceScalarFieldEnum | EvidenceScalarFieldEnum[]
  }

  /**
   * Evidence findMany
   */
  export type EvidenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter, which Evidences to fetch.
     */
    where?: EvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evidences to fetch.
     */
    orderBy?: EvidenceOrderByWithRelationInput | EvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evidences.
     */
    cursor?: EvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evidences.
     */
    skip?: number
    distinct?: EvidenceScalarFieldEnum | EvidenceScalarFieldEnum[]
  }

  /**
   * Evidence create
   */
  export type EvidenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Evidence.
     */
    data: XOR<EvidenceCreateInput, EvidenceUncheckedCreateInput>
  }

  /**
   * Evidence createMany
   */
  export type EvidenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evidences.
     */
    data: EvidenceCreateManyInput | EvidenceCreateManyInput[]
  }

  /**
   * Evidence createManyAndReturn
   */
  export type EvidenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Evidences.
     */
    data: EvidenceCreateManyInput | EvidenceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Evidence update
   */
  export type EvidenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Evidence.
     */
    data: XOR<EvidenceUpdateInput, EvidenceUncheckedUpdateInput>
    /**
     * Choose, which Evidence to update.
     */
    where: EvidenceWhereUniqueInput
  }

  /**
   * Evidence updateMany
   */
  export type EvidenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evidences.
     */
    data: XOR<EvidenceUpdateManyMutationInput, EvidenceUncheckedUpdateManyInput>
    /**
     * Filter which Evidences to update
     */
    where?: EvidenceWhereInput
  }

  /**
   * Evidence upsert
   */
  export type EvidenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Evidence to update in case it exists.
     */
    where: EvidenceWhereUniqueInput
    /**
     * In case the Evidence found by the `where` argument doesn't exist, create a new Evidence with this data.
     */
    create: XOR<EvidenceCreateInput, EvidenceUncheckedCreateInput>
    /**
     * In case the Evidence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvidenceUpdateInput, EvidenceUncheckedUpdateInput>
  }

  /**
   * Evidence delete
   */
  export type EvidenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
    /**
     * Filter which Evidence to delete.
     */
    where: EvidenceWhereUniqueInput
  }

  /**
   * Evidence deleteMany
   */
  export type EvidenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evidences to delete
     */
    where?: EvidenceWhereInput
  }

  /**
   * Evidence without action
   */
  export type EvidenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evidence
     */
    select?: EvidenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    investigationId: string | null
    title: string | null
    content: string | null
    format: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    investigationId: string | null
    title: string | null
    content: string | null
    format: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    investigationId: number
    title: number
    content: number
    format: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    investigationId?: true
    title?: true
    content?: true
    format?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    investigationId?: true
    title?: true
    content?: true
    format?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    investigationId?: true
    title?: true
    content?: true
    format?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    investigationId: string
    title: string
    content: string
    format: string
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    title?: boolean
    content?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    title?: boolean
    content?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    investigationId?: boolean
    title?: boolean
    content?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investigation?: boolean | InvestigationDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      investigation: Prisma.$InvestigationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      investigationId: string
      title: string
      content: string
      format: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investigation<T extends InvestigationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvestigationDefaultArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */ 
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly investigationId: FieldRef<"Report", 'String'>
    readonly title: FieldRef<"Report", 'String'>
    readonly content: FieldRef<"Report", 'String'>
    readonly format: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model SearchLog
   */

  export type AggregateSearchLog = {
    _count: SearchLogCountAggregateOutputType | null
    _avg: SearchLogAvgAggregateOutputType | null
    _sum: SearchLogSumAggregateOutputType | null
    _min: SearchLogMinAggregateOutputType | null
    _max: SearchLogMaxAggregateOutputType | null
  }

  export type SearchLogAvgAggregateOutputType = {
    resultCount: number | null
  }

  export type SearchLogSumAggregateOutputType = {
    resultCount: number | null
  }

  export type SearchLogMinAggregateOutputType = {
    id: string | null
    investigationId: string | null
    userId: string | null
    connectorType: string | null
    query: string | null
    resultCount: number | null
    createdAt: Date | null
  }

  export type SearchLogMaxAggregateOutputType = {
    id: string | null
    investigationId: string | null
    userId: string | null
    connectorType: string | null
    query: string | null
    resultCount: number | null
    createdAt: Date | null
  }

  export type SearchLogCountAggregateOutputType = {
    id: number
    investigationId: number
    userId: number
    connectorType: number
    query: number
    resultCount: number
    createdAt: number
    _all: number
  }


  export type SearchLogAvgAggregateInputType = {
    resultCount?: true
  }

  export type SearchLogSumAggregateInputType = {
    resultCount?: true
  }

  export type SearchLogMinAggregateInputType = {
    id?: true
    investigationId?: true
    userId?: true
    connectorType?: true
    query?: true
    resultCount?: true
    createdAt?: true
  }

  export type SearchLogMaxAggregateInputType = {
    id?: true
    investigationId?: true
    userId?: true
    connectorType?: true
    query?: true
    resultCount?: true
    createdAt?: true
  }

  export type SearchLogCountAggregateInputType = {
    id?: true
    investigationId?: true
    userId?: true
    connectorType?: true
    query?: true
    resultCount?: true
    createdAt?: true
    _all?: true
  }

  export type SearchLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchLog to aggregate.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchLogs
    **/
    _count?: true | SearchLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchLogMaxAggregateInputType
  }

  export type GetSearchLogAggregateType<T extends SearchLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchLog[P]>
      : GetScalarType<T[P], AggregateSearchLog[P]>
  }




  export type SearchLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchLogWhereInput
    orderBy?: SearchLogOrderByWithAggregationInput | SearchLogOrderByWithAggregationInput[]
    by: SearchLogScalarFieldEnum[] | SearchLogScalarFieldEnum
    having?: SearchLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchLogCountAggregateInputType | true
    _avg?: SearchLogAvgAggregateInputType
    _sum?: SearchLogSumAggregateInputType
    _min?: SearchLogMinAggregateInputType
    _max?: SearchLogMaxAggregateInputType
  }

  export type SearchLogGroupByOutputType = {
    id: string
    investigationId: string | null
    userId: string
    connectorType: string
    query: string
    resultCount: number
    createdAt: Date
    _count: SearchLogCountAggregateOutputType | null
    _avg: SearchLogAvgAggregateOutputType | null
    _sum: SearchLogSumAggregateOutputType | null
    _min: SearchLogMinAggregateOutputType | null
    _max: SearchLogMaxAggregateOutputType | null
  }

  type GetSearchLogGroupByPayload<T extends SearchLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchLogGroupByOutputType[P]>
            : GetScalarType<T[P], SearchLogGroupByOutputType[P]>
        }
      >
    >


  export type SearchLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    userId?: boolean
    connectorType?: boolean
    query?: boolean
    resultCount?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    investigation?: boolean | SearchLog$investigationArgs<ExtArgs>
  }, ExtArgs["result"]["searchLog"]>

  export type SearchLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    investigationId?: boolean
    userId?: boolean
    connectorType?: boolean
    query?: boolean
    resultCount?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    investigation?: boolean | SearchLog$investigationArgs<ExtArgs>
  }, ExtArgs["result"]["searchLog"]>

  export type SearchLogSelectScalar = {
    id?: boolean
    investigationId?: boolean
    userId?: boolean
    connectorType?: boolean
    query?: boolean
    resultCount?: boolean
    createdAt?: boolean
  }

  export type SearchLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    investigation?: boolean | SearchLog$investigationArgs<ExtArgs>
  }
  export type SearchLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    investigation?: boolean | SearchLog$investigationArgs<ExtArgs>
  }

  export type $SearchLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      investigation: Prisma.$InvestigationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      investigationId: string | null
      userId: string
      connectorType: string
      query: string
      resultCount: number
      createdAt: Date
    }, ExtArgs["result"]["searchLog"]>
    composites: {}
  }

  type SearchLogGetPayload<S extends boolean | null | undefined | SearchLogDefaultArgs> = $Result.GetResult<Prisma.$SearchLogPayload, S>

  type SearchLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SearchLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SearchLogCountAggregateInputType | true
    }

  export interface SearchLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchLog'], meta: { name: 'SearchLog' } }
    /**
     * Find zero or one SearchLog that matches the filter.
     * @param {SearchLogFindUniqueArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchLogFindUniqueArgs>(args: SelectSubset<T, SearchLogFindUniqueArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SearchLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SearchLogFindUniqueOrThrowArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SearchLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindFirstArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchLogFindFirstArgs>(args?: SelectSubset<T, SearchLogFindFirstArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SearchLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindFirstOrThrowArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SearchLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchLogs
     * const searchLogs = await prisma.searchLog.findMany()
     * 
     * // Get first 10 SearchLogs
     * const searchLogs = await prisma.searchLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchLogWithIdOnly = await prisma.searchLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchLogFindManyArgs>(args?: SelectSubset<T, SearchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SearchLog.
     * @param {SearchLogCreateArgs} args - Arguments to create a SearchLog.
     * @example
     * // Create one SearchLog
     * const SearchLog = await prisma.searchLog.create({
     *   data: {
     *     // ... data to create a SearchLog
     *   }
     * })
     * 
     */
    create<T extends SearchLogCreateArgs>(args: SelectSubset<T, SearchLogCreateArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SearchLogs.
     * @param {SearchLogCreateManyArgs} args - Arguments to create many SearchLogs.
     * @example
     * // Create many SearchLogs
     * const searchLog = await prisma.searchLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchLogCreateManyArgs>(args?: SelectSubset<T, SearchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchLogs and returns the data saved in the database.
     * @param {SearchLogCreateManyAndReturnArgs} args - Arguments to create many SearchLogs.
     * @example
     * // Create many SearchLogs
     * const searchLog = await prisma.searchLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchLogs and only return the `id`
     * const searchLogWithIdOnly = await prisma.searchLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SearchLog.
     * @param {SearchLogDeleteArgs} args - Arguments to delete one SearchLog.
     * @example
     * // Delete one SearchLog
     * const SearchLog = await prisma.searchLog.delete({
     *   where: {
     *     // ... filter to delete one SearchLog
     *   }
     * })
     * 
     */
    delete<T extends SearchLogDeleteArgs>(args: SelectSubset<T, SearchLogDeleteArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SearchLog.
     * @param {SearchLogUpdateArgs} args - Arguments to update one SearchLog.
     * @example
     * // Update one SearchLog
     * const searchLog = await prisma.searchLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchLogUpdateArgs>(args: SelectSubset<T, SearchLogUpdateArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SearchLogs.
     * @param {SearchLogDeleteManyArgs} args - Arguments to filter SearchLogs to delete.
     * @example
     * // Delete a few SearchLogs
     * const { count } = await prisma.searchLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchLogDeleteManyArgs>(args?: SelectSubset<T, SearchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchLogs
     * const searchLog = await prisma.searchLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchLogUpdateManyArgs>(args: SelectSubset<T, SearchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SearchLog.
     * @param {SearchLogUpsertArgs} args - Arguments to update or create a SearchLog.
     * @example
     * // Update or create a SearchLog
     * const searchLog = await prisma.searchLog.upsert({
     *   create: {
     *     // ... data to create a SearchLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchLog we want to update
     *   }
     * })
     */
    upsert<T extends SearchLogUpsertArgs>(args: SelectSubset<T, SearchLogUpsertArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogCountArgs} args - Arguments to filter SearchLogs to count.
     * @example
     * // Count the number of SearchLogs
     * const count = await prisma.searchLog.count({
     *   where: {
     *     // ... the filter for the SearchLogs we want to count
     *   }
     * })
    **/
    count<T extends SearchLogCountArgs>(
      args?: Subset<T, SearchLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchLogAggregateArgs>(args: Subset<T, SearchLogAggregateArgs>): Prisma.PrismaPromise<GetSearchLogAggregateType<T>>

    /**
     * Group by SearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchLogGroupByArgs['orderBy'] }
        : { orderBy?: SearchLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchLog model
   */
  readonly fields: SearchLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    investigation<T extends SearchLog$investigationArgs<ExtArgs> = {}>(args?: Subset<T, SearchLog$investigationArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SearchLog model
   */ 
  interface SearchLogFieldRefs {
    readonly id: FieldRef<"SearchLog", 'String'>
    readonly investigationId: FieldRef<"SearchLog", 'String'>
    readonly userId: FieldRef<"SearchLog", 'String'>
    readonly connectorType: FieldRef<"SearchLog", 'String'>
    readonly query: FieldRef<"SearchLog", 'String'>
    readonly resultCount: FieldRef<"SearchLog", 'Int'>
    readonly createdAt: FieldRef<"SearchLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchLog findUnique
   */
  export type SearchLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog findUniqueOrThrow
   */
  export type SearchLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog findFirst
   */
  export type SearchLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchLogs.
     */
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog findFirstOrThrow
   */
  export type SearchLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchLogs.
     */
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog findMany
   */
  export type SearchLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter, which SearchLogs to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog create
   */
  export type SearchLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SearchLog.
     */
    data: XOR<SearchLogCreateInput, SearchLogUncheckedCreateInput>
  }

  /**
   * SearchLog createMany
   */
  export type SearchLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchLogs.
     */
    data: SearchLogCreateManyInput | SearchLogCreateManyInput[]
  }

  /**
   * SearchLog createManyAndReturn
   */
  export type SearchLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SearchLogs.
     */
    data: SearchLogCreateManyInput | SearchLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SearchLog update
   */
  export type SearchLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SearchLog.
     */
    data: XOR<SearchLogUpdateInput, SearchLogUncheckedUpdateInput>
    /**
     * Choose, which SearchLog to update.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog updateMany
   */
  export type SearchLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchLogs.
     */
    data: XOR<SearchLogUpdateManyMutationInput, SearchLogUncheckedUpdateManyInput>
    /**
     * Filter which SearchLogs to update
     */
    where?: SearchLogWhereInput
  }

  /**
   * SearchLog upsert
   */
  export type SearchLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SearchLog to update in case it exists.
     */
    where: SearchLogWhereUniqueInput
    /**
     * In case the SearchLog found by the `where` argument doesn't exist, create a new SearchLog with this data.
     */
    create: XOR<SearchLogCreateInput, SearchLogUncheckedCreateInput>
    /**
     * In case the SearchLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchLogUpdateInput, SearchLogUncheckedUpdateInput>
  }

  /**
   * SearchLog delete
   */
  export type SearchLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
    /**
     * Filter which SearchLog to delete.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog deleteMany
   */
  export type SearchLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchLogs to delete
     */
    where?: SearchLogWhereInput
  }

  /**
   * SearchLog.investigation
   */
  export type SearchLog$investigationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    where?: InvestigationWhereInput
  }

  /**
   * SearchLog without action
   */
  export type SearchLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    stripeCustomerId: 'stripeCustomerId',
    hasLifetimeAccess: 'hasLifetimeAccess',
    plan: 'plan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InvestigationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    subjectName: 'subjectName',
    subjectUsername: 'subjectUsername',
    subjectEmail: 'subjectEmail',
    subjectPhone: 'subjectPhone',
    subjectImageUrl: 'subjectImageUrl'
  };

  export type InvestigationScalarFieldEnum = (typeof InvestigationScalarFieldEnum)[keyof typeof InvestigationScalarFieldEnum]


  export const EntityScalarFieldEnum: {
    id: 'id',
    investigationId: 'investigationId',
    type: 'type',
    value: 'value',
    notes: 'notes',
    confidence: 'confidence',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntityScalarFieldEnum = (typeof EntityScalarFieldEnum)[keyof typeof EntityScalarFieldEnum]


  export const EvidenceScalarFieldEnum: {
    id: 'id',
    investigationId: 'investigationId',
    type: 'type',
    title: 'title',
    content: 'content',
    sourceUrl: 'sourceUrl',
    tags: 'tags',
    notes: 'notes',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EvidenceScalarFieldEnum = (typeof EvidenceScalarFieldEnum)[keyof typeof EvidenceScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    investigationId: 'investigationId',
    title: 'title',
    content: 'content',
    format: 'format',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SearchLogScalarFieldEnum: {
    id: 'id',
    investigationId: 'investigationId',
    userId: 'userId',
    connectorType: 'connectorType',
    query: 'query',
    resultCount: 'resultCount',
    createdAt: 'createdAt'
  };

  export type SearchLogScalarFieldEnum = (typeof SearchLogScalarFieldEnum)[keyof typeof SearchLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    hasLifetimeAccess?: BoolFilter<"User"> | boolean
    plan?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    investigations?: InvestigationListRelationFilter
    searchLogs?: SearchLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    hasLifetimeAccess?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    investigations?: InvestigationOrderByRelationAggregateInput
    searchLogs?: SearchLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    stripeCustomerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: StringFilter<"User"> | string
    hasLifetimeAccess?: BoolFilter<"User"> | boolean
    plan?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    investigations?: InvestigationListRelationFilter
    searchLogs?: SearchLogListRelationFilter
  }, "id" | "email" | "stripeCustomerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    hasLifetimeAccess?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasLifetimeAccess?: BoolWithAggregatesFilter<"User"> | boolean
    plan?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type InvestigationWhereInput = {
    AND?: InvestigationWhereInput | InvestigationWhereInput[]
    OR?: InvestigationWhereInput[]
    NOT?: InvestigationWhereInput | InvestigationWhereInput[]
    id?: StringFilter<"Investigation"> | string
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
    status?: StringFilter<"Investigation"> | string
    userId?: StringFilter<"Investigation"> | string
    createdAt?: DateTimeFilter<"Investigation"> | Date | string
    updatedAt?: DateTimeFilter<"Investigation"> | Date | string
    subjectName?: StringNullableFilter<"Investigation"> | string | null
    subjectUsername?: StringNullableFilter<"Investigation"> | string | null
    subjectEmail?: StringNullableFilter<"Investigation"> | string | null
    subjectPhone?: StringNullableFilter<"Investigation"> | string | null
    subjectImageUrl?: StringNullableFilter<"Investigation"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    entities?: EntityListRelationFilter
    evidence?: EvidenceListRelationFilter
    reports?: ReportListRelationFilter
    logs?: SearchLogListRelationFilter
  }

  export type InvestigationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectName?: SortOrderInput | SortOrder
    subjectUsername?: SortOrderInput | SortOrder
    subjectEmail?: SortOrderInput | SortOrder
    subjectPhone?: SortOrderInput | SortOrder
    subjectImageUrl?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    entities?: EntityOrderByRelationAggregateInput
    evidence?: EvidenceOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    logs?: SearchLogOrderByRelationAggregateInput
  }

  export type InvestigationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvestigationWhereInput | InvestigationWhereInput[]
    OR?: InvestigationWhereInput[]
    NOT?: InvestigationWhereInput | InvestigationWhereInput[]
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
    status?: StringFilter<"Investigation"> | string
    userId?: StringFilter<"Investigation"> | string
    createdAt?: DateTimeFilter<"Investigation"> | Date | string
    updatedAt?: DateTimeFilter<"Investigation"> | Date | string
    subjectName?: StringNullableFilter<"Investigation"> | string | null
    subjectUsername?: StringNullableFilter<"Investigation"> | string | null
    subjectEmail?: StringNullableFilter<"Investigation"> | string | null
    subjectPhone?: StringNullableFilter<"Investigation"> | string | null
    subjectImageUrl?: StringNullableFilter<"Investigation"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    entities?: EntityListRelationFilter
    evidence?: EvidenceListRelationFilter
    reports?: ReportListRelationFilter
    logs?: SearchLogListRelationFilter
  }, "id">

  export type InvestigationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectName?: SortOrderInput | SortOrder
    subjectUsername?: SortOrderInput | SortOrder
    subjectEmail?: SortOrderInput | SortOrder
    subjectPhone?: SortOrderInput | SortOrder
    subjectImageUrl?: SortOrderInput | SortOrder
    _count?: InvestigationCountOrderByAggregateInput
    _max?: InvestigationMaxOrderByAggregateInput
    _min?: InvestigationMinOrderByAggregateInput
  }

  export type InvestigationScalarWhereWithAggregatesInput = {
    AND?: InvestigationScalarWhereWithAggregatesInput | InvestigationScalarWhereWithAggregatesInput[]
    OR?: InvestigationScalarWhereWithAggregatesInput[]
    NOT?: InvestigationScalarWhereWithAggregatesInput | InvestigationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Investigation"> | string
    title?: StringWithAggregatesFilter<"Investigation"> | string
    description?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
    status?: StringWithAggregatesFilter<"Investigation"> | string
    userId?: StringWithAggregatesFilter<"Investigation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Investigation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Investigation"> | Date | string
    subjectName?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
    subjectUsername?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
    subjectEmail?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
    subjectPhone?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
    subjectImageUrl?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
  }

  export type EntityWhereInput = {
    AND?: EntityWhereInput | EntityWhereInput[]
    OR?: EntityWhereInput[]
    NOT?: EntityWhereInput | EntityWhereInput[]
    id?: StringFilter<"Entity"> | string
    investigationId?: StringFilter<"Entity"> | string
    type?: StringFilter<"Entity"> | string
    value?: StringFilter<"Entity"> | string
    notes?: StringNullableFilter<"Entity"> | string | null
    confidence?: IntFilter<"Entity"> | number
    createdAt?: DateTimeFilter<"Entity"> | Date | string
    updatedAt?: DateTimeFilter<"Entity"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }

  export type EntityOrderByWithRelationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    value?: SortOrder
    notes?: SortOrderInput | SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    investigation?: InvestigationOrderByWithRelationInput
  }

  export type EntityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntityWhereInput | EntityWhereInput[]
    OR?: EntityWhereInput[]
    NOT?: EntityWhereInput | EntityWhereInput[]
    investigationId?: StringFilter<"Entity"> | string
    type?: StringFilter<"Entity"> | string
    value?: StringFilter<"Entity"> | string
    notes?: StringNullableFilter<"Entity"> | string | null
    confidence?: IntFilter<"Entity"> | number
    createdAt?: DateTimeFilter<"Entity"> | Date | string
    updatedAt?: DateTimeFilter<"Entity"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }, "id">

  export type EntityOrderByWithAggregationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    value?: SortOrder
    notes?: SortOrderInput | SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntityCountOrderByAggregateInput
    _avg?: EntityAvgOrderByAggregateInput
    _max?: EntityMaxOrderByAggregateInput
    _min?: EntityMinOrderByAggregateInput
    _sum?: EntitySumOrderByAggregateInput
  }

  export type EntityScalarWhereWithAggregatesInput = {
    AND?: EntityScalarWhereWithAggregatesInput | EntityScalarWhereWithAggregatesInput[]
    OR?: EntityScalarWhereWithAggregatesInput[]
    NOT?: EntityScalarWhereWithAggregatesInput | EntityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entity"> | string
    investigationId?: StringWithAggregatesFilter<"Entity"> | string
    type?: StringWithAggregatesFilter<"Entity"> | string
    value?: StringWithAggregatesFilter<"Entity"> | string
    notes?: StringNullableWithAggregatesFilter<"Entity"> | string | null
    confidence?: IntWithAggregatesFilter<"Entity"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Entity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Entity"> | Date | string
  }

  export type EvidenceWhereInput = {
    AND?: EvidenceWhereInput | EvidenceWhereInput[]
    OR?: EvidenceWhereInput[]
    NOT?: EvidenceWhereInput | EvidenceWhereInput[]
    id?: StringFilter<"Evidence"> | string
    investigationId?: StringFilter<"Evidence"> | string
    type?: StringFilter<"Evidence"> | string
    title?: StringFilter<"Evidence"> | string
    content?: StringFilter<"Evidence"> | string
    sourceUrl?: StringNullableFilter<"Evidence"> | string | null
    tags?: StringFilter<"Evidence"> | string
    notes?: StringNullableFilter<"Evidence"> | string | null
    isVerified?: BoolFilter<"Evidence"> | boolean
    createdAt?: DateTimeFilter<"Evidence"> | Date | string
    updatedAt?: DateTimeFilter<"Evidence"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }

  export type EvidenceOrderByWithRelationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    tags?: SortOrder
    notes?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    investigation?: InvestigationOrderByWithRelationInput
  }

  export type EvidenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvidenceWhereInput | EvidenceWhereInput[]
    OR?: EvidenceWhereInput[]
    NOT?: EvidenceWhereInput | EvidenceWhereInput[]
    investigationId?: StringFilter<"Evidence"> | string
    type?: StringFilter<"Evidence"> | string
    title?: StringFilter<"Evidence"> | string
    content?: StringFilter<"Evidence"> | string
    sourceUrl?: StringNullableFilter<"Evidence"> | string | null
    tags?: StringFilter<"Evidence"> | string
    notes?: StringNullableFilter<"Evidence"> | string | null
    isVerified?: BoolFilter<"Evidence"> | boolean
    createdAt?: DateTimeFilter<"Evidence"> | Date | string
    updatedAt?: DateTimeFilter<"Evidence"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }, "id">

  export type EvidenceOrderByWithAggregationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    tags?: SortOrder
    notes?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EvidenceCountOrderByAggregateInput
    _max?: EvidenceMaxOrderByAggregateInput
    _min?: EvidenceMinOrderByAggregateInput
  }

  export type EvidenceScalarWhereWithAggregatesInput = {
    AND?: EvidenceScalarWhereWithAggregatesInput | EvidenceScalarWhereWithAggregatesInput[]
    OR?: EvidenceScalarWhereWithAggregatesInput[]
    NOT?: EvidenceScalarWhereWithAggregatesInput | EvidenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Evidence"> | string
    investigationId?: StringWithAggregatesFilter<"Evidence"> | string
    type?: StringWithAggregatesFilter<"Evidence"> | string
    title?: StringWithAggregatesFilter<"Evidence"> | string
    content?: StringWithAggregatesFilter<"Evidence"> | string
    sourceUrl?: StringNullableWithAggregatesFilter<"Evidence"> | string | null
    tags?: StringWithAggregatesFilter<"Evidence"> | string
    notes?: StringNullableWithAggregatesFilter<"Evidence"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Evidence"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Evidence"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Evidence"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    investigationId?: StringFilter<"Report"> | string
    title?: StringFilter<"Report"> | string
    content?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    investigation?: InvestigationOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    investigationId?: StringFilter<"Report"> | string
    title?: StringFilter<"Report"> | string
    content?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    investigation?: XOR<InvestigationRelationFilter, InvestigationWhereInput>
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    investigationId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    investigationId?: StringWithAggregatesFilter<"Report"> | string
    title?: StringWithAggregatesFilter<"Report"> | string
    content?: StringWithAggregatesFilter<"Report"> | string
    format?: StringWithAggregatesFilter<"Report"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type SearchLogWhereInput = {
    AND?: SearchLogWhereInput | SearchLogWhereInput[]
    OR?: SearchLogWhereInput[]
    NOT?: SearchLogWhereInput | SearchLogWhereInput[]
    id?: StringFilter<"SearchLog"> | string
    investigationId?: StringNullableFilter<"SearchLog"> | string | null
    userId?: StringFilter<"SearchLog"> | string
    connectorType?: StringFilter<"SearchLog"> | string
    query?: StringFilter<"SearchLog"> | string
    resultCount?: IntFilter<"SearchLog"> | number
    createdAt?: DateTimeFilter<"SearchLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    investigation?: XOR<InvestigationNullableRelationFilter, InvestigationWhereInput> | null
  }

  export type SearchLogOrderByWithRelationInput = {
    id?: SortOrder
    investigationId?: SortOrderInput | SortOrder
    userId?: SortOrder
    connectorType?: SortOrder
    query?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    investigation?: InvestigationOrderByWithRelationInput
  }

  export type SearchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SearchLogWhereInput | SearchLogWhereInput[]
    OR?: SearchLogWhereInput[]
    NOT?: SearchLogWhereInput | SearchLogWhereInput[]
    investigationId?: StringNullableFilter<"SearchLog"> | string | null
    userId?: StringFilter<"SearchLog"> | string
    connectorType?: StringFilter<"SearchLog"> | string
    query?: StringFilter<"SearchLog"> | string
    resultCount?: IntFilter<"SearchLog"> | number
    createdAt?: DateTimeFilter<"SearchLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    investigation?: XOR<InvestigationNullableRelationFilter, InvestigationWhereInput> | null
  }, "id">

  export type SearchLogOrderByWithAggregationInput = {
    id?: SortOrder
    investigationId?: SortOrderInput | SortOrder
    userId?: SortOrder
    connectorType?: SortOrder
    query?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
    _count?: SearchLogCountOrderByAggregateInput
    _avg?: SearchLogAvgOrderByAggregateInput
    _max?: SearchLogMaxOrderByAggregateInput
    _min?: SearchLogMinOrderByAggregateInput
    _sum?: SearchLogSumOrderByAggregateInput
  }

  export type SearchLogScalarWhereWithAggregatesInput = {
    AND?: SearchLogScalarWhereWithAggregatesInput | SearchLogScalarWhereWithAggregatesInput[]
    OR?: SearchLogScalarWhereWithAggregatesInput[]
    NOT?: SearchLogScalarWhereWithAggregatesInput | SearchLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchLog"> | string
    investigationId?: StringNullableWithAggregatesFilter<"SearchLog"> | string | null
    userId?: StringWithAggregatesFilter<"SearchLog"> | string
    connectorType?: StringWithAggregatesFilter<"SearchLog"> | string
    query?: StringWithAggregatesFilter<"SearchLog"> | string
    resultCount?: IntWithAggregatesFilter<"SearchLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SearchLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    investigations?: InvestigationCreateNestedManyWithoutUserInput
    searchLogs?: SearchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    investigations?: InvestigationUncheckedCreateNestedManyWithoutUserInput
    searchLogs?: SearchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigations?: InvestigationUpdateManyWithoutUserNestedInput
    searchLogs?: SearchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigations?: InvestigationUncheckedUpdateManyWithoutUserNestedInput
    searchLogs?: SearchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestigationCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    user: UserCreateNestedOneWithoutInvestigationsInput
    entities?: EntityCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceCreateNestedManyWithoutInvestigationInput
    reports?: ReportCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityUncheckedCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceUncheckedCreateNestedManyWithoutInvestigationInput
    reports?: ReportUncheckedCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutInvestigationsNestedInput
    entities?: EntityUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUncheckedUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
  }

  export type InvestigationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EntityCreateInput = {
    id?: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    investigation: InvestigationCreateNestedOneWithoutEntitiesInput
  }

  export type EntityUncheckedCreateInput = {
    id?: string
    investigationId: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigation?: InvestigationUpdateOneRequiredWithoutEntitiesNestedInput
  }

  export type EntityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityCreateManyInput = {
    id?: string
    investigationId: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceCreateInput = {
    id?: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    investigation: InvestigationCreateNestedOneWithoutEvidenceInput
  }

  export type EvidenceUncheckedCreateInput = {
    id?: string
    investigationId: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigation?: InvestigationUpdateOneRequiredWithoutEvidenceNestedInput
  }

  export type EvidenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceCreateManyInput = {
    id?: string
    investigationId: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    investigation: InvestigationCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    investigationId: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigation?: InvestigationUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: string
    investigationId: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogCreateInput = {
    id?: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSearchLogsInput
    investigation?: InvestigationCreateNestedOneWithoutLogsInput
  }

  export type SearchLogUncheckedCreateInput = {
    id?: string
    investigationId?: string | null
    userId: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type SearchLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchLogsNestedInput
    investigation?: InvestigationUpdateOneWithoutLogsNestedInput
  }

  export type SearchLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogCreateManyInput = {
    id?: string
    investigationId?: string | null
    userId: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type SearchLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InvestigationListRelationFilter = {
    every?: InvestigationWhereInput
    some?: InvestigationWhereInput
    none?: InvestigationWhereInput
  }

  export type SearchLogListRelationFilter = {
    every?: SearchLogWhereInput
    some?: SearchLogWhereInput
    none?: SearchLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvestigationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SearchLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    stripeCustomerId?: SortOrder
    hasLifetimeAccess?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    stripeCustomerId?: SortOrder
    hasLifetimeAccess?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    stripeCustomerId?: SortOrder
    hasLifetimeAccess?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EntityListRelationFilter = {
    every?: EntityWhereInput
    some?: EntityWhereInput
    none?: EntityWhereInput
  }

  export type EvidenceListRelationFilter = {
    every?: EvidenceWhereInput
    some?: EvidenceWhereInput
    none?: EvidenceWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type EntityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvidenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvestigationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectName?: SortOrder
    subjectUsername?: SortOrder
    subjectEmail?: SortOrder
    subjectPhone?: SortOrder
    subjectImageUrl?: SortOrder
  }

  export type InvestigationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectName?: SortOrder
    subjectUsername?: SortOrder
    subjectEmail?: SortOrder
    subjectPhone?: SortOrder
    subjectImageUrl?: SortOrder
  }

  export type InvestigationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectName?: SortOrder
    subjectUsername?: SortOrder
    subjectEmail?: SortOrder
    subjectPhone?: SortOrder
    subjectImageUrl?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InvestigationRelationFilter = {
    is?: InvestigationWhereInput
    isNot?: InvestigationWhereInput
  }

  export type EntityCountOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    value?: SortOrder
    notes?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntityAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EntityMaxOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    value?: SortOrder
    notes?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntityMinOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    value?: SortOrder
    notes?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntitySumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EvidenceCountOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    sourceUrl?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvidenceMaxOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    sourceUrl?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvidenceMinOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    sourceUrl?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestigationNullableRelationFilter = {
    is?: InvestigationWhereInput | null
    isNot?: InvestigationWhereInput | null
  }

  export type SearchLogCountOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    userId?: SortOrder
    connectorType?: SortOrder
    query?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogAvgOrderByAggregateInput = {
    resultCount?: SortOrder
  }

  export type SearchLogMaxOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    userId?: SortOrder
    connectorType?: SortOrder
    query?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogMinOrderByAggregateInput = {
    id?: SortOrder
    investigationId?: SortOrder
    userId?: SortOrder
    connectorType?: SortOrder
    query?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogSumOrderByAggregateInput = {
    resultCount?: SortOrder
  }

  export type InvestigationCreateNestedManyWithoutUserInput = {
    create?: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput> | InvestigationCreateWithoutUserInput[] | InvestigationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutUserInput | InvestigationCreateOrConnectWithoutUserInput[]
    createMany?: InvestigationCreateManyUserInputEnvelope
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
  }

  export type SearchLogCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput> | SearchLogCreateWithoutUserInput[] | SearchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutUserInput | SearchLogCreateOrConnectWithoutUserInput[]
    createMany?: SearchLogCreateManyUserInputEnvelope
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
  }

  export type InvestigationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput> | InvestigationCreateWithoutUserInput[] | InvestigationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutUserInput | InvestigationCreateOrConnectWithoutUserInput[]
    createMany?: InvestigationCreateManyUserInputEnvelope
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
  }

  export type SearchLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput> | SearchLogCreateWithoutUserInput[] | SearchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutUserInput | SearchLogCreateOrConnectWithoutUserInput[]
    createMany?: SearchLogCreateManyUserInputEnvelope
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InvestigationUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput> | InvestigationCreateWithoutUserInput[] | InvestigationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutUserInput | InvestigationCreateOrConnectWithoutUserInput[]
    upsert?: InvestigationUpsertWithWhereUniqueWithoutUserInput | InvestigationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvestigationCreateManyUserInputEnvelope
    set?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    disconnect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    delete?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    update?: InvestigationUpdateWithWhereUniqueWithoutUserInput | InvestigationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvestigationUpdateManyWithWhereWithoutUserInput | InvestigationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
  }

  export type SearchLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput> | SearchLogCreateWithoutUserInput[] | SearchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutUserInput | SearchLogCreateOrConnectWithoutUserInput[]
    upsert?: SearchLogUpsertWithWhereUniqueWithoutUserInput | SearchLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchLogCreateManyUserInputEnvelope
    set?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    disconnect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    delete?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    update?: SearchLogUpdateWithWhereUniqueWithoutUserInput | SearchLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchLogUpdateManyWithWhereWithoutUserInput | SearchLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
  }

  export type InvestigationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput> | InvestigationCreateWithoutUserInput[] | InvestigationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutUserInput | InvestigationCreateOrConnectWithoutUserInput[]
    upsert?: InvestigationUpsertWithWhereUniqueWithoutUserInput | InvestigationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvestigationCreateManyUserInputEnvelope
    set?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    disconnect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    delete?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    update?: InvestigationUpdateWithWhereUniqueWithoutUserInput | InvestigationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvestigationUpdateManyWithWhereWithoutUserInput | InvestigationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
  }

  export type SearchLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput> | SearchLogCreateWithoutUserInput[] | SearchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutUserInput | SearchLogCreateOrConnectWithoutUserInput[]
    upsert?: SearchLogUpsertWithWhereUniqueWithoutUserInput | SearchLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchLogCreateManyUserInputEnvelope
    set?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    disconnect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    delete?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    update?: SearchLogUpdateWithWhereUniqueWithoutUserInput | SearchLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchLogUpdateManyWithWhereWithoutUserInput | SearchLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInvestigationsInput = {
    create?: XOR<UserCreateWithoutInvestigationsInput, UserUncheckedCreateWithoutInvestigationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvestigationsInput
    connect?: UserWhereUniqueInput
  }

  export type EntityCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput> | EntityCreateWithoutInvestigationInput[] | EntityUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EntityCreateOrConnectWithoutInvestigationInput | EntityCreateOrConnectWithoutInvestigationInput[]
    createMany?: EntityCreateManyInvestigationInputEnvelope
    connect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
  }

  export type EvidenceCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput> | EvidenceCreateWithoutInvestigationInput[] | EvidenceUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EvidenceCreateOrConnectWithoutInvestigationInput | EvidenceCreateOrConnectWithoutInvestigationInput[]
    createMany?: EvidenceCreateManyInvestigationInputEnvelope
    connect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput> | ReportCreateWithoutInvestigationInput[] | ReportUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutInvestigationInput | ReportCreateOrConnectWithoutInvestigationInput[]
    createMany?: ReportCreateManyInvestigationInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type SearchLogCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput> | SearchLogCreateWithoutInvestigationInput[] | SearchLogUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutInvestigationInput | SearchLogCreateOrConnectWithoutInvestigationInput[]
    createMany?: SearchLogCreateManyInvestigationInputEnvelope
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
  }

  export type EntityUncheckedCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput> | EntityCreateWithoutInvestigationInput[] | EntityUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EntityCreateOrConnectWithoutInvestigationInput | EntityCreateOrConnectWithoutInvestigationInput[]
    createMany?: EntityCreateManyInvestigationInputEnvelope
    connect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
  }

  export type EvidenceUncheckedCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput> | EvidenceCreateWithoutInvestigationInput[] | EvidenceUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EvidenceCreateOrConnectWithoutInvestigationInput | EvidenceCreateOrConnectWithoutInvestigationInput[]
    createMany?: EvidenceCreateManyInvestigationInputEnvelope
    connect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput> | ReportCreateWithoutInvestigationInput[] | ReportUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutInvestigationInput | ReportCreateOrConnectWithoutInvestigationInput[]
    createMany?: ReportCreateManyInvestigationInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type SearchLogUncheckedCreateNestedManyWithoutInvestigationInput = {
    create?: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput> | SearchLogCreateWithoutInvestigationInput[] | SearchLogUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutInvestigationInput | SearchLogCreateOrConnectWithoutInvestigationInput[]
    createMany?: SearchLogCreateManyInvestigationInputEnvelope
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutInvestigationsNestedInput = {
    create?: XOR<UserCreateWithoutInvestigationsInput, UserUncheckedCreateWithoutInvestigationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvestigationsInput
    upsert?: UserUpsertWithoutInvestigationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvestigationsInput, UserUpdateWithoutInvestigationsInput>, UserUncheckedUpdateWithoutInvestigationsInput>
  }

  export type EntityUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput> | EntityCreateWithoutInvestigationInput[] | EntityUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EntityCreateOrConnectWithoutInvestigationInput | EntityCreateOrConnectWithoutInvestigationInput[]
    upsert?: EntityUpsertWithWhereUniqueWithoutInvestigationInput | EntityUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: EntityCreateManyInvestigationInputEnvelope
    set?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    disconnect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    delete?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    connect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    update?: EntityUpdateWithWhereUniqueWithoutInvestigationInput | EntityUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: EntityUpdateManyWithWhereWithoutInvestigationInput | EntityUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: EntityScalarWhereInput | EntityScalarWhereInput[]
  }

  export type EvidenceUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput> | EvidenceCreateWithoutInvestigationInput[] | EvidenceUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EvidenceCreateOrConnectWithoutInvestigationInput | EvidenceCreateOrConnectWithoutInvestigationInput[]
    upsert?: EvidenceUpsertWithWhereUniqueWithoutInvestigationInput | EvidenceUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: EvidenceCreateManyInvestigationInputEnvelope
    set?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    disconnect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    delete?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    connect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    update?: EvidenceUpdateWithWhereUniqueWithoutInvestigationInput | EvidenceUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: EvidenceUpdateManyWithWhereWithoutInvestigationInput | EvidenceUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: EvidenceScalarWhereInput | EvidenceScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput> | ReportCreateWithoutInvestigationInput[] | ReportUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutInvestigationInput | ReportCreateOrConnectWithoutInvestigationInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutInvestigationInput | ReportUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: ReportCreateManyInvestigationInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutInvestigationInput | ReportUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutInvestigationInput | ReportUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type SearchLogUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput> | SearchLogCreateWithoutInvestigationInput[] | SearchLogUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutInvestigationInput | SearchLogCreateOrConnectWithoutInvestigationInput[]
    upsert?: SearchLogUpsertWithWhereUniqueWithoutInvestigationInput | SearchLogUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: SearchLogCreateManyInvestigationInputEnvelope
    set?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    disconnect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    delete?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    update?: SearchLogUpdateWithWhereUniqueWithoutInvestigationInput | SearchLogUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: SearchLogUpdateManyWithWhereWithoutInvestigationInput | SearchLogUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
  }

  export type EntityUncheckedUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput> | EntityCreateWithoutInvestigationInput[] | EntityUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EntityCreateOrConnectWithoutInvestigationInput | EntityCreateOrConnectWithoutInvestigationInput[]
    upsert?: EntityUpsertWithWhereUniqueWithoutInvestigationInput | EntityUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: EntityCreateManyInvestigationInputEnvelope
    set?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    disconnect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    delete?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    connect?: EntityWhereUniqueInput | EntityWhereUniqueInput[]
    update?: EntityUpdateWithWhereUniqueWithoutInvestigationInput | EntityUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: EntityUpdateManyWithWhereWithoutInvestigationInput | EntityUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: EntityScalarWhereInput | EntityScalarWhereInput[]
  }

  export type EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput> | EvidenceCreateWithoutInvestigationInput[] | EvidenceUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: EvidenceCreateOrConnectWithoutInvestigationInput | EvidenceCreateOrConnectWithoutInvestigationInput[]
    upsert?: EvidenceUpsertWithWhereUniqueWithoutInvestigationInput | EvidenceUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: EvidenceCreateManyInvestigationInputEnvelope
    set?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    disconnect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    delete?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    connect?: EvidenceWhereUniqueInput | EvidenceWhereUniqueInput[]
    update?: EvidenceUpdateWithWhereUniqueWithoutInvestigationInput | EvidenceUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: EvidenceUpdateManyWithWhereWithoutInvestigationInput | EvidenceUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: EvidenceScalarWhereInput | EvidenceScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput> | ReportCreateWithoutInvestigationInput[] | ReportUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutInvestigationInput | ReportCreateOrConnectWithoutInvestigationInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutInvestigationInput | ReportUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: ReportCreateManyInvestigationInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutInvestigationInput | ReportUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutInvestigationInput | ReportUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput = {
    create?: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput> | SearchLogCreateWithoutInvestigationInput[] | SearchLogUncheckedCreateWithoutInvestigationInput[]
    connectOrCreate?: SearchLogCreateOrConnectWithoutInvestigationInput | SearchLogCreateOrConnectWithoutInvestigationInput[]
    upsert?: SearchLogUpsertWithWhereUniqueWithoutInvestigationInput | SearchLogUpsertWithWhereUniqueWithoutInvestigationInput[]
    createMany?: SearchLogCreateManyInvestigationInputEnvelope
    set?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    disconnect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    delete?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    connect?: SearchLogWhereUniqueInput | SearchLogWhereUniqueInput[]
    update?: SearchLogUpdateWithWhereUniqueWithoutInvestigationInput | SearchLogUpdateWithWhereUniqueWithoutInvestigationInput[]
    updateMany?: SearchLogUpdateManyWithWhereWithoutInvestigationInput | SearchLogUpdateManyWithWhereWithoutInvestigationInput[]
    deleteMany?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
  }

  export type InvestigationCreateNestedOneWithoutEntitiesInput = {
    create?: XOR<InvestigationCreateWithoutEntitiesInput, InvestigationUncheckedCreateWithoutEntitiesInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutEntitiesInput
    connect?: InvestigationWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvestigationUpdateOneRequiredWithoutEntitiesNestedInput = {
    create?: XOR<InvestigationCreateWithoutEntitiesInput, InvestigationUncheckedCreateWithoutEntitiesInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutEntitiesInput
    upsert?: InvestigationUpsertWithoutEntitiesInput
    connect?: InvestigationWhereUniqueInput
    update?: XOR<XOR<InvestigationUpdateToOneWithWhereWithoutEntitiesInput, InvestigationUpdateWithoutEntitiesInput>, InvestigationUncheckedUpdateWithoutEntitiesInput>
  }

  export type InvestigationCreateNestedOneWithoutEvidenceInput = {
    create?: XOR<InvestigationCreateWithoutEvidenceInput, InvestigationUncheckedCreateWithoutEvidenceInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutEvidenceInput
    connect?: InvestigationWhereUniqueInput
  }

  export type InvestigationUpdateOneRequiredWithoutEvidenceNestedInput = {
    create?: XOR<InvestigationCreateWithoutEvidenceInput, InvestigationUncheckedCreateWithoutEvidenceInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutEvidenceInput
    upsert?: InvestigationUpsertWithoutEvidenceInput
    connect?: InvestigationWhereUniqueInput
    update?: XOR<XOR<InvestigationUpdateToOneWithWhereWithoutEvidenceInput, InvestigationUpdateWithoutEvidenceInput>, InvestigationUncheckedUpdateWithoutEvidenceInput>
  }

  export type InvestigationCreateNestedOneWithoutReportsInput = {
    create?: XOR<InvestigationCreateWithoutReportsInput, InvestigationUncheckedCreateWithoutReportsInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutReportsInput
    connect?: InvestigationWhereUniqueInput
  }

  export type InvestigationUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<InvestigationCreateWithoutReportsInput, InvestigationUncheckedCreateWithoutReportsInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutReportsInput
    upsert?: InvestigationUpsertWithoutReportsInput
    connect?: InvestigationWhereUniqueInput
    update?: XOR<XOR<InvestigationUpdateToOneWithWhereWithoutReportsInput, InvestigationUpdateWithoutReportsInput>, InvestigationUncheckedUpdateWithoutReportsInput>
  }

  export type UserCreateNestedOneWithoutSearchLogsInput = {
    create?: XOR<UserCreateWithoutSearchLogsInput, UserUncheckedCreateWithoutSearchLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchLogsInput
    connect?: UserWhereUniqueInput
  }

  export type InvestigationCreateNestedOneWithoutLogsInput = {
    create?: XOR<InvestigationCreateWithoutLogsInput, InvestigationUncheckedCreateWithoutLogsInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutLogsInput
    connect?: InvestigationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSearchLogsNestedInput = {
    create?: XOR<UserCreateWithoutSearchLogsInput, UserUncheckedCreateWithoutSearchLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchLogsInput
    upsert?: UserUpsertWithoutSearchLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSearchLogsInput, UserUpdateWithoutSearchLogsInput>, UserUncheckedUpdateWithoutSearchLogsInput>
  }

  export type InvestigationUpdateOneWithoutLogsNestedInput = {
    create?: XOR<InvestigationCreateWithoutLogsInput, InvestigationUncheckedCreateWithoutLogsInput>
    connectOrCreate?: InvestigationCreateOrConnectWithoutLogsInput
    upsert?: InvestigationUpsertWithoutLogsInput
    disconnect?: InvestigationWhereInput | boolean
    delete?: InvestigationWhereInput | boolean
    connect?: InvestigationWhereUniqueInput
    update?: XOR<XOR<InvestigationUpdateToOneWithWhereWithoutLogsInput, InvestigationUpdateWithoutLogsInput>, InvestigationUncheckedUpdateWithoutLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type InvestigationCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceCreateNestedManyWithoutInvestigationInput
    reports?: ReportCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityUncheckedCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceUncheckedCreateNestedManyWithoutInvestigationInput
    reports?: ReportUncheckedCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationCreateOrConnectWithoutUserInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput>
  }

  export type InvestigationCreateManyUserInputEnvelope = {
    data: InvestigationCreateManyUserInput | InvestigationCreateManyUserInput[]
  }

  export type SearchLogCreateWithoutUserInput = {
    id?: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
    investigation?: InvestigationCreateNestedOneWithoutLogsInput
  }

  export type SearchLogUncheckedCreateWithoutUserInput = {
    id?: string
    investigationId?: string | null
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type SearchLogCreateOrConnectWithoutUserInput = {
    where: SearchLogWhereUniqueInput
    create: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput>
  }

  export type SearchLogCreateManyUserInputEnvelope = {
    data: SearchLogCreateManyUserInput | SearchLogCreateManyUserInput[]
  }

  export type InvestigationUpsertWithWhereUniqueWithoutUserInput = {
    where: InvestigationWhereUniqueInput
    update: XOR<InvestigationUpdateWithoutUserInput, InvestigationUncheckedUpdateWithoutUserInput>
    create: XOR<InvestigationCreateWithoutUserInput, InvestigationUncheckedCreateWithoutUserInput>
  }

  export type InvestigationUpdateWithWhereUniqueWithoutUserInput = {
    where: InvestigationWhereUniqueInput
    data: XOR<InvestigationUpdateWithoutUserInput, InvestigationUncheckedUpdateWithoutUserInput>
  }

  export type InvestigationUpdateManyWithWhereWithoutUserInput = {
    where: InvestigationScalarWhereInput
    data: XOR<InvestigationUpdateManyMutationInput, InvestigationUncheckedUpdateManyWithoutUserInput>
  }

  export type InvestigationScalarWhereInput = {
    AND?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
    OR?: InvestigationScalarWhereInput[]
    NOT?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
    id?: StringFilter<"Investigation"> | string
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
    status?: StringFilter<"Investigation"> | string
    userId?: StringFilter<"Investigation"> | string
    createdAt?: DateTimeFilter<"Investigation"> | Date | string
    updatedAt?: DateTimeFilter<"Investigation"> | Date | string
    subjectName?: StringNullableFilter<"Investigation"> | string | null
    subjectUsername?: StringNullableFilter<"Investigation"> | string | null
    subjectEmail?: StringNullableFilter<"Investigation"> | string | null
    subjectPhone?: StringNullableFilter<"Investigation"> | string | null
    subjectImageUrl?: StringNullableFilter<"Investigation"> | string | null
  }

  export type SearchLogUpsertWithWhereUniqueWithoutUserInput = {
    where: SearchLogWhereUniqueInput
    update: XOR<SearchLogUpdateWithoutUserInput, SearchLogUncheckedUpdateWithoutUserInput>
    create: XOR<SearchLogCreateWithoutUserInput, SearchLogUncheckedCreateWithoutUserInput>
  }

  export type SearchLogUpdateWithWhereUniqueWithoutUserInput = {
    where: SearchLogWhereUniqueInput
    data: XOR<SearchLogUpdateWithoutUserInput, SearchLogUncheckedUpdateWithoutUserInput>
  }

  export type SearchLogUpdateManyWithWhereWithoutUserInput = {
    where: SearchLogScalarWhereInput
    data: XOR<SearchLogUpdateManyMutationInput, SearchLogUncheckedUpdateManyWithoutUserInput>
  }

  export type SearchLogScalarWhereInput = {
    AND?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
    OR?: SearchLogScalarWhereInput[]
    NOT?: SearchLogScalarWhereInput | SearchLogScalarWhereInput[]
    id?: StringFilter<"SearchLog"> | string
    investigationId?: StringNullableFilter<"SearchLog"> | string | null
    userId?: StringFilter<"SearchLog"> | string
    connectorType?: StringFilter<"SearchLog"> | string
    query?: StringFilter<"SearchLog"> | string
    resultCount?: IntFilter<"SearchLog"> | number
    createdAt?: DateTimeFilter<"SearchLog"> | Date | string
  }

  export type UserCreateWithoutInvestigationsInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    searchLogs?: SearchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvestigationsInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    searchLogs?: SearchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvestigationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvestigationsInput, UserUncheckedCreateWithoutInvestigationsInput>
  }

  export type EntityCreateWithoutInvestigationInput = {
    id?: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityUncheckedCreateWithoutInvestigationInput = {
    id?: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityCreateOrConnectWithoutInvestigationInput = {
    where: EntityWhereUniqueInput
    create: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput>
  }

  export type EntityCreateManyInvestigationInputEnvelope = {
    data: EntityCreateManyInvestigationInput | EntityCreateManyInvestigationInput[]
  }

  export type EvidenceCreateWithoutInvestigationInput = {
    id?: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceUncheckedCreateWithoutInvestigationInput = {
    id?: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceCreateOrConnectWithoutInvestigationInput = {
    where: EvidenceWhereUniqueInput
    create: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput>
  }

  export type EvidenceCreateManyInvestigationInputEnvelope = {
    data: EvidenceCreateManyInvestigationInput | EvidenceCreateManyInvestigationInput[]
  }

  export type ReportCreateWithoutInvestigationInput = {
    id?: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUncheckedCreateWithoutInvestigationInput = {
    id?: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutInvestigationInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput>
  }

  export type ReportCreateManyInvestigationInputEnvelope = {
    data: ReportCreateManyInvestigationInput | ReportCreateManyInvestigationInput[]
  }

  export type SearchLogCreateWithoutInvestigationInput = {
    id?: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSearchLogsInput
  }

  export type SearchLogUncheckedCreateWithoutInvestigationInput = {
    id?: string
    userId: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type SearchLogCreateOrConnectWithoutInvestigationInput = {
    where: SearchLogWhereUniqueInput
    create: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput>
  }

  export type SearchLogCreateManyInvestigationInputEnvelope = {
    data: SearchLogCreateManyInvestigationInput | SearchLogCreateManyInvestigationInput[]
  }

  export type UserUpsertWithoutInvestigationsInput = {
    update: XOR<UserUpdateWithoutInvestigationsInput, UserUncheckedUpdateWithoutInvestigationsInput>
    create: XOR<UserCreateWithoutInvestigationsInput, UserUncheckedCreateWithoutInvestigationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvestigationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvestigationsInput, UserUncheckedUpdateWithoutInvestigationsInput>
  }

  export type UserUpdateWithoutInvestigationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    searchLogs?: SearchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvestigationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    searchLogs?: SearchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EntityUpsertWithWhereUniqueWithoutInvestigationInput = {
    where: EntityWhereUniqueInput
    update: XOR<EntityUpdateWithoutInvestigationInput, EntityUncheckedUpdateWithoutInvestigationInput>
    create: XOR<EntityCreateWithoutInvestigationInput, EntityUncheckedCreateWithoutInvestigationInput>
  }

  export type EntityUpdateWithWhereUniqueWithoutInvestigationInput = {
    where: EntityWhereUniqueInput
    data: XOR<EntityUpdateWithoutInvestigationInput, EntityUncheckedUpdateWithoutInvestigationInput>
  }

  export type EntityUpdateManyWithWhereWithoutInvestigationInput = {
    where: EntityScalarWhereInput
    data: XOR<EntityUpdateManyMutationInput, EntityUncheckedUpdateManyWithoutInvestigationInput>
  }

  export type EntityScalarWhereInput = {
    AND?: EntityScalarWhereInput | EntityScalarWhereInput[]
    OR?: EntityScalarWhereInput[]
    NOT?: EntityScalarWhereInput | EntityScalarWhereInput[]
    id?: StringFilter<"Entity"> | string
    investigationId?: StringFilter<"Entity"> | string
    type?: StringFilter<"Entity"> | string
    value?: StringFilter<"Entity"> | string
    notes?: StringNullableFilter<"Entity"> | string | null
    confidence?: IntFilter<"Entity"> | number
    createdAt?: DateTimeFilter<"Entity"> | Date | string
    updatedAt?: DateTimeFilter<"Entity"> | Date | string
  }

  export type EvidenceUpsertWithWhereUniqueWithoutInvestigationInput = {
    where: EvidenceWhereUniqueInput
    update: XOR<EvidenceUpdateWithoutInvestigationInput, EvidenceUncheckedUpdateWithoutInvestigationInput>
    create: XOR<EvidenceCreateWithoutInvestigationInput, EvidenceUncheckedCreateWithoutInvestigationInput>
  }

  export type EvidenceUpdateWithWhereUniqueWithoutInvestigationInput = {
    where: EvidenceWhereUniqueInput
    data: XOR<EvidenceUpdateWithoutInvestigationInput, EvidenceUncheckedUpdateWithoutInvestigationInput>
  }

  export type EvidenceUpdateManyWithWhereWithoutInvestigationInput = {
    where: EvidenceScalarWhereInput
    data: XOR<EvidenceUpdateManyMutationInput, EvidenceUncheckedUpdateManyWithoutInvestigationInput>
  }

  export type EvidenceScalarWhereInput = {
    AND?: EvidenceScalarWhereInput | EvidenceScalarWhereInput[]
    OR?: EvidenceScalarWhereInput[]
    NOT?: EvidenceScalarWhereInput | EvidenceScalarWhereInput[]
    id?: StringFilter<"Evidence"> | string
    investigationId?: StringFilter<"Evidence"> | string
    type?: StringFilter<"Evidence"> | string
    title?: StringFilter<"Evidence"> | string
    content?: StringFilter<"Evidence"> | string
    sourceUrl?: StringNullableFilter<"Evidence"> | string | null
    tags?: StringFilter<"Evidence"> | string
    notes?: StringNullableFilter<"Evidence"> | string | null
    isVerified?: BoolFilter<"Evidence"> | boolean
    createdAt?: DateTimeFilter<"Evidence"> | Date | string
    updatedAt?: DateTimeFilter<"Evidence"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutInvestigationInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutInvestigationInput, ReportUncheckedUpdateWithoutInvestigationInput>
    create: XOR<ReportCreateWithoutInvestigationInput, ReportUncheckedCreateWithoutInvestigationInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutInvestigationInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutInvestigationInput, ReportUncheckedUpdateWithoutInvestigationInput>
  }

  export type ReportUpdateManyWithWhereWithoutInvestigationInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutInvestigationInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    investigationId?: StringFilter<"Report"> | string
    title?: StringFilter<"Report"> | string
    content?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type SearchLogUpsertWithWhereUniqueWithoutInvestigationInput = {
    where: SearchLogWhereUniqueInput
    update: XOR<SearchLogUpdateWithoutInvestigationInput, SearchLogUncheckedUpdateWithoutInvestigationInput>
    create: XOR<SearchLogCreateWithoutInvestigationInput, SearchLogUncheckedCreateWithoutInvestigationInput>
  }

  export type SearchLogUpdateWithWhereUniqueWithoutInvestigationInput = {
    where: SearchLogWhereUniqueInput
    data: XOR<SearchLogUpdateWithoutInvestigationInput, SearchLogUncheckedUpdateWithoutInvestigationInput>
  }

  export type SearchLogUpdateManyWithWhereWithoutInvestigationInput = {
    where: SearchLogScalarWhereInput
    data: XOR<SearchLogUpdateManyMutationInput, SearchLogUncheckedUpdateManyWithoutInvestigationInput>
  }

  export type InvestigationCreateWithoutEntitiesInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    user: UserCreateNestedOneWithoutInvestigationsInput
    evidence?: EvidenceCreateNestedManyWithoutInvestigationInput
    reports?: ReportCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateWithoutEntitiesInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    evidence?: EvidenceUncheckedCreateNestedManyWithoutInvestigationInput
    reports?: ReportUncheckedCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationCreateOrConnectWithoutEntitiesInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutEntitiesInput, InvestigationUncheckedCreateWithoutEntitiesInput>
  }

  export type InvestigationUpsertWithoutEntitiesInput = {
    update: XOR<InvestigationUpdateWithoutEntitiesInput, InvestigationUncheckedUpdateWithoutEntitiesInput>
    create: XOR<InvestigationCreateWithoutEntitiesInput, InvestigationUncheckedCreateWithoutEntitiesInput>
    where?: InvestigationWhereInput
  }

  export type InvestigationUpdateToOneWithWhereWithoutEntitiesInput = {
    where?: InvestigationWhereInput
    data: XOR<InvestigationUpdateWithoutEntitiesInput, InvestigationUncheckedUpdateWithoutEntitiesInput>
  }

  export type InvestigationUpdateWithoutEntitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutInvestigationsNestedInput
    evidence?: EvidenceUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateWithoutEntitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationCreateWithoutEvidenceInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    user: UserCreateNestedOneWithoutInvestigationsInput
    entities?: EntityCreateNestedManyWithoutInvestigationInput
    reports?: ReportCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateWithoutEvidenceInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityUncheckedCreateNestedManyWithoutInvestigationInput
    reports?: ReportUncheckedCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationCreateOrConnectWithoutEvidenceInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutEvidenceInput, InvestigationUncheckedCreateWithoutEvidenceInput>
  }

  export type InvestigationUpsertWithoutEvidenceInput = {
    update: XOR<InvestigationUpdateWithoutEvidenceInput, InvestigationUncheckedUpdateWithoutEvidenceInput>
    create: XOR<InvestigationCreateWithoutEvidenceInput, InvestigationUncheckedCreateWithoutEvidenceInput>
    where?: InvestigationWhereInput
  }

  export type InvestigationUpdateToOneWithWhereWithoutEvidenceInput = {
    where?: InvestigationWhereInput
    data: XOR<InvestigationUpdateWithoutEvidenceInput, InvestigationUncheckedUpdateWithoutEvidenceInput>
  }

  export type InvestigationUpdateWithoutEvidenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutInvestigationsNestedInput
    entities?: EntityUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateWithoutEvidenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUncheckedUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationCreateWithoutReportsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    user: UserCreateNestedOneWithoutInvestigationsInput
    entities?: EntityCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateWithoutReportsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityUncheckedCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceUncheckedCreateNestedManyWithoutInvestigationInput
    logs?: SearchLogUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationCreateOrConnectWithoutReportsInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutReportsInput, InvestigationUncheckedCreateWithoutReportsInput>
  }

  export type InvestigationUpsertWithoutReportsInput = {
    update: XOR<InvestigationUpdateWithoutReportsInput, InvestigationUncheckedUpdateWithoutReportsInput>
    create: XOR<InvestigationCreateWithoutReportsInput, InvestigationUncheckedCreateWithoutReportsInput>
    where?: InvestigationWhereInput
  }

  export type InvestigationUpdateToOneWithWhereWithoutReportsInput = {
    where?: InvestigationWhereInput
    data: XOR<InvestigationUpdateWithoutReportsInput, InvestigationUncheckedUpdateWithoutReportsInput>
  }

  export type InvestigationUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutInvestigationsNestedInput
    entities?: EntityUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUncheckedUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type UserCreateWithoutSearchLogsInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    investigations?: InvestigationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSearchLogsInput = {
    id?: string
    email: string
    role?: string
    stripeCustomerId?: string | null
    hasLifetimeAccess?: boolean
    plan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    investigations?: InvestigationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSearchLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSearchLogsInput, UserUncheckedCreateWithoutSearchLogsInput>
  }

  export type InvestigationCreateWithoutLogsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    user: UserCreateNestedOneWithoutInvestigationsInput
    entities?: EntityCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceCreateNestedManyWithoutInvestigationInput
    reports?: ReportCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationUncheckedCreateWithoutLogsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
    entities?: EntityUncheckedCreateNestedManyWithoutInvestigationInput
    evidence?: EvidenceUncheckedCreateNestedManyWithoutInvestigationInput
    reports?: ReportUncheckedCreateNestedManyWithoutInvestigationInput
  }

  export type InvestigationCreateOrConnectWithoutLogsInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutLogsInput, InvestigationUncheckedCreateWithoutLogsInput>
  }

  export type UserUpsertWithoutSearchLogsInput = {
    update: XOR<UserUpdateWithoutSearchLogsInput, UserUncheckedUpdateWithoutSearchLogsInput>
    create: XOR<UserCreateWithoutSearchLogsInput, UserUncheckedCreateWithoutSearchLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSearchLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSearchLogsInput, UserUncheckedUpdateWithoutSearchLogsInput>
  }

  export type UserUpdateWithoutSearchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigations?: InvestigationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSearchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasLifetimeAccess?: BoolFieldUpdateOperationsInput | boolean
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigations?: InvestigationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InvestigationUpsertWithoutLogsInput = {
    update: XOR<InvestigationUpdateWithoutLogsInput, InvestigationUncheckedUpdateWithoutLogsInput>
    create: XOR<InvestigationCreateWithoutLogsInput, InvestigationUncheckedCreateWithoutLogsInput>
    where?: InvestigationWhereInput
  }

  export type InvestigationUpdateToOneWithWhereWithoutLogsInput = {
    where?: InvestigationWhereInput
    data: XOR<InvestigationUpdateWithoutLogsInput, InvestigationUncheckedUpdateWithoutLogsInput>
  }

  export type InvestigationUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutInvestigationsNestedInput
    entities?: EntityUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUncheckedUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectName?: string | null
    subjectUsername?: string | null
    subjectEmail?: string | null
    subjectPhone?: string | null
    subjectImageUrl?: string | null
  }

  export type SearchLogCreateManyUserInput = {
    id?: string
    investigationId?: string | null
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type InvestigationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: EntityUncheckedUpdateManyWithoutInvestigationNestedInput
    evidence?: EvidenceUncheckedUpdateManyWithoutInvestigationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutInvestigationNestedInput
    logs?: SearchLogUncheckedUpdateManyWithoutInvestigationNestedInput
  }

  export type InvestigationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectName?: NullableStringFieldUpdateOperationsInput | string | null
    subjectUsername?: NullableStringFieldUpdateOperationsInput | string | null
    subjectEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subjectImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SearchLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investigation?: InvestigationUpdateOneWithoutLogsNestedInput
  }

  export type SearchLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: NullableStringFieldUpdateOperationsInput | string | null
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    investigationId?: NullableStringFieldUpdateOperationsInput | string | null
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityCreateManyInvestigationInput = {
    id?: string
    type: string
    value: string
    notes?: string | null
    confidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceCreateManyInvestigationInput = {
    id?: string
    type?: string
    title: string
    content: string
    sourceUrl?: string | null
    tags?: string
    notes?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateManyInvestigationInput = {
    id?: string
    title: string
    content: string
    format?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchLogCreateManyInvestigationInput = {
    id?: string
    userId: string
    connectorType: string
    query: string
    resultCount?: number
    createdAt?: Date | string
  }

  export type EntityUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityUncheckedUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityUncheckedUpdateManyWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceUncheckedUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceUncheckedUpdateManyWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchLogsNestedInput
  }

  export type SearchLogUncheckedUpdateWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUncheckedUpdateManyWithoutInvestigationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectorType?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    resultCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvestigationCountOutputTypeDefaultArgs instead
     */
    export type InvestigationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvestigationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvestigationDefaultArgs instead
     */
    export type InvestigationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvestigationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EntityDefaultArgs instead
     */
    export type EntityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EntityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EvidenceDefaultArgs instead
     */
    export type EvidenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EvidenceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportDefaultArgs instead
     */
    export type ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SearchLogDefaultArgs instead
     */
    export type SearchLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SearchLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}