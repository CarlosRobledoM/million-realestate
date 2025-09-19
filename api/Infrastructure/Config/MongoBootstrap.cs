using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using Domain.Entities;

namespace Infrastructure.Config;
public static class MongoBootstrap
{
    private static bool initialized;

    public static void Configure(MongoSettings settings)
    {
        if (initialized) return;

        var pack = new ConventionPack { new IgnoreExtraElementsConvention(true) };
        ConventionRegistry.Register("ignore_extra", pack, _ => true);

        if (!BsonClassMap.IsClassMapRegistered(typeof(Property)))
            BsonClassMap.RegisterClassMap<Property>(cm => cm.AutoMap());
        if (!BsonClassMap.IsClassMapRegistered(typeof(Owner)))
            BsonClassMap.RegisterClassMap<Owner>(cm => cm.AutoMap());
        if (!BsonClassMap.IsClassMapRegistered(typeof(PropertyImage)))
            BsonClassMap.RegisterClassMap<PropertyImage>(cm => cm.AutoMap());
        if (!BsonClassMap.IsClassMapRegistered(typeof(PropertyTrace)))
            BsonClassMap.RegisterClassMap<PropertyTrace>(cm => cm.AutoMap());

        var client = new MongoClient(settings.connectionString);
        var db = client.GetDatabase(settings.database);

        var properties = db.GetCollection<Property>(settings.propertiesCollection);
        var images = db.GetCollection<PropertyImage>(settings.imagesCollection);

        properties.Indexes.CreateMany(new[]
        {
            new CreateIndexModel<Property>(Builders<Property>.IndexKeys.Ascending(x => x.name)),
            new CreateIndexModel<Property>(Builders<Property>.IndexKeys.Ascending(x => x.addressProperty)),
            new CreateIndexModel<Property>(Builders<Property>.IndexKeys.Ascending(x => x.priceProperty))
        });

        images.Indexes.CreateOne(
            new CreateIndexModel<PropertyImage>(
                Builders<PropertyImage>.IndexKeys.Ascending(x => x.idProperty).Ascending(x => x.enabled)));

        initialized = true;
    }
}
