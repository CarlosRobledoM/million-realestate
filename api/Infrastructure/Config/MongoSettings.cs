namespace Infrastructure.Config;
public class MongoSettings
{
    public string connectionString { get; set; } = "mongodb://localhost:27017";
    public string database { get; set; } = "realestate";
    public string propertiesCollection { get; set; } = "properties";
    public string imagesCollection { get; set; } = "propertyImages";
}
