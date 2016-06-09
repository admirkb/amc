import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// export const genericCollection = "customersGeneric";
export let genericCollection = "";
export let GenericCollection = null;
export class DynamicProperties {

    static __ctor = (() => {
        /* do static constructor stuff :) */
    })();

    // private static _genericCollectionString: string = genericCollection;
    public static get getGenericCollectionString(): string {
        return genericCollection;
    }
    public static set setGenericCollectionString(genericCollectionString: string) {
        genericCollection = genericCollectionString;
        // GenericCollection.remove({});
        // GenericCollection = new Mongo.Collection(genericCollection);
    }

    // private static _genericCollectionMongo: any = GenericCollection;
    public static get getGenericCollectionMongo(): any {
        return GenericCollection;
    }
    public static set setMongoDynamicCollection(genericCollectionMongo: any) {
        GenericCollection = genericCollectionMongo;
    }
}

DynamicProperties.setGenericCollectionString ="genericcollection2"
DynamicProperties.setMongoDynamicCollection =  new Mongo.Collection(DynamicProperties.getGenericCollectionString);

console.log("1111111111111111111111 - genericcollection2");
console.log(DynamicProperties.getGenericCollectionString);
console.log(DynamicProperties.getGenericCollectionMongo);
console.log("1111111111111111111111 - genericcollection2");

DynamicProperties.setGenericCollectionString ="genericcollection"
DynamicProperties.setMongoDynamicCollection =  new Mongo.Collection(DynamicProperties.getGenericCollectionString);

console.log("22222222222222222222222 - genericcollection");
console.log(DynamicProperties.getGenericCollectionString);
console.log(DynamicProperties.getGenericCollectionMongo);
console.log("22222222222222222222222 - genericcollection");

