class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }
  public getSignature(): number {
    const { signature } = this;
    return signature;
  }
}

class Person {
  private key: Key;
  constructor(key: Key) {
    this.key = key;
  }

  public getKey(): number {
    return this.key.getSignature();
  }
}

abstract class House {
  public door: boolean;
  public key: Key;
  public tenants: Person[] = [];

  constructor(homeKey: Key) {
    this.door = false;
    this.key = homeKey;
  }
  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Tenant came in.");
    }
  }
  public abstract openDoor(homeKey: number): void;
}

class MyHouse extends House {
  public openDoor(homeKey: number): void {
    if (homeKey === this.key.getSignature()) {
      this.door = true;
      console.log("Welcome home");
      return;
    }
    console.log("Sorry. The key doesn't fit.");
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(7);
house.openDoor(person.getKey());

house.comeIn(person);

export {};
