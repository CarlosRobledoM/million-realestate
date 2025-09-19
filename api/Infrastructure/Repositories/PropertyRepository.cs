using MongoDB.Driver;
using Application.Interfaces;
using Application.DTOs;
using Infrastructure.Config;
using Domain.Entities;
namespace Infrastructure.Repositories;
public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> properties;
    private readonly IMongoCollection<PropertyImage> images;
    public PropertyRepository(MongoSettings settings)
    {
        var client = new MongoClient(settings.connectionString);
        var db = client.GetDatabase(settings.database);
        properties = db.GetCollection<Property>(settings.propertiesCollection);
        images = db.GetCollection<PropertyImage>(settings.imagesCollection);
    }
    public async Task<(IReadOnlyList<PropertyDto> items, long total)> SearchAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize)
    {
        var filter = Builders<Property>.Filter.Empty;
        if (!string.IsNullOrWhiteSpace(name)) filter &= Builders<Property>.Filter.Regex(x => x.name, new MongoDB.Bson.BsonRegularExpression(name, "i"));
        if (!string.IsNullOrWhiteSpace(address)) filter &= Builders<Property>.Filter.Regex(x => x.addressProperty, new MongoDB.Bson.BsonRegularExpression(address, "i"));
        if (minPrice.HasValue) filter &= Builders<Property>.Filter.Gte(x => x.priceProperty, minPrice.Value);
        if (maxPrice.HasValue) filter &= Builders<Property>.Filter.Lte(x => x.priceProperty, maxPrice.Value);
        var total = await properties.CountDocumentsAsync(filter);
        var list = await properties.Find(filter).Skip((page - 1) * pageSize).Limit(pageSize).ToListAsync();
        var ids = list.Select(x => x.idProperty).ToList();
        var imgs = await images.Find(x => ids.Contains(x.idProperty) && x.enabled).ToListAsync();
        var map = imgs.GroupBy(x => x.idProperty).ToDictionary(g => g.Key, g => g.First().file);
        var items = list.Select(x => new PropertyDto
        {
            idProperty = x.idProperty,
            idOwner = x.idOwner,
            name = x.name,
            addressProperty = x.addressProperty,
            priceProperty = x.priceProperty,
            imageUrl = map.ContainsKey(x.idProperty) ? map[x.idProperty] : ""
        }).ToList();
        return (items, total);
    }
    public async Task<PropertyDto?> GetByIdAsync(string idProperty)
    {
        var prop = await properties.Find(x => x.idProperty == idProperty).FirstOrDefaultAsync();
        if (prop == null) return null;
        var img = await images.Find(x => x.idProperty == idProperty && x.enabled).FirstOrDefaultAsync();
        return new PropertyDto
        {
            idProperty = prop.idProperty,
            idOwner = prop.idOwner,
            name = prop.name,
            addressProperty = prop.addressProperty,
            priceProperty = prop.priceProperty,
            imageUrl = img != null ? img.file : ""
        };
    }
}
