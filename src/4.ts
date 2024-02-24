class Key {
  private signature: number = Math.random();

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  public door: boolean = false;
  public tenants: Person[] = [];

  constructor(public key: Key) {}
  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Tenant came in.");
    }
  }
  public abstract openDoor(homeKey: Key): void;
}

class MyHouse extends House {
  public openDoor(homeKey: Key): void {
    if (homeKey.getSignature() === this.key.getSignature()) {
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

house.openDoor(person.getKey());

house.comeIn(person);

export {};
