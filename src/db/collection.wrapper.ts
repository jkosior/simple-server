export class CollectionWrapper<T, V> {
  constructor(
    readonly objectsCollection: { [key: string]: T | V },
    readonly objectsIndexes: string[],
  ) {}

  findAll() {
    return this.objectsCollection;
  }

  findOne(param: string): T {
    const index = this.findIndex(param);

    if (index === -1) {
      return null;
    }

    return this.objectsCollection[param] as T;
  }

  findOneByParam(param: any, paramValue) {
    const found = Object.values(this.objectsCollection).find(
      object => object[param] === paramValue,
    );

    return found;
  }

  create(object: V) {
    const randomId: string = this.generateRandomString();
    const objectToSave = { id: randomId, ...object };
    this.objectsCollection[randomId] = objectToSave;
    this.objectsIndexes.push(randomId);
    return objectToSave;
  }

  update(param: string, object: V): T {
    let found = this.findOne(param);
    if (!found) {
      return null;
    }

    found = {
      ...found,
      ...object,
    };

    this.objectsCollection[param] = found;
    return found as T;
  }

  delete(param: string): boolean {
    const index = this.findIndex(param);

    if (index === -1) {
      return false;
    }
    this.objectsIndexes.splice(index, 1);
    delete this.objectsCollection[param];
    return true;
  }

  private generateRandomString(): string {
    return Math.random()
      .toString(36)
      .substring(7);
  }

  private findIndex(param: string): number {
    return this.objectsIndexes.indexOf(param);
  }
}
