using Application.Services;
using Application.Interfaces;
using Infrastructure.Config;
using Infrastructure.Repositories;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddDefaultPolicy(b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var mongoSettings = new MongoSettings
{
    connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING") ?? "mongodb://localhost:27017",
    database = Environment.GetEnvironmentVariable("MONGO_DATABASE") ?? "realestate",
    propertiesCollection = Environment.GetEnvironmentVariable("MONGO_PROPERTIES_COLLECTION") ?? "properties",
    imagesCollection = Environment.GetEnvironmentVariable("MONGO_IMAGES_COLLECTION") ?? "propertyImages"
};
MongoBootstrap.Configure(mongoSettings);
builder.Services.AddSingleton(mongoSettings);
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<PropertyService>();

var app = builder.Build();
app.UseCors();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/properties", async (
    Application.Services.PropertyService svc,
    string? name,
    string? address,
    string? minPrice,
    string? maxPrice,
    int page = 1,
    int pageSize = 20
    ) =>
{
    static decimal? ParseNullableDecimal(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return null;
        if (string.Equals(s, "NaN", StringComparison.OrdinalIgnoreCase)) return null;
        return decimal.TryParse(s, NumberStyles.Number, CultureInfo.InvariantCulture, out var v) ? v : (decimal?)null;
    }

    var min = ParseNullableDecimal(minPrice);
    var max = ParseNullableDecimal(maxPrice);

    if (page <= 0) page = 1;
    if (pageSize <= 0 || pageSize > 100) pageSize = 20;

    var r = await svc.SearchAsync(name, address, min, max, page, pageSize);
    return Results.Ok(new { items = r.items, total = r.total, page, pageSize });
})
.WithName("listProperties")
.WithOpenApi();


app.MapGet("/api/properties/{idProperty}", async (string idProperty, PropertyService svc) =>
{
    var r = await svc.GetAsync(idProperty);
    if (r == null) return Results.NotFound();
    return Results.Ok(r);
}).WithName("getProperty").WithOpenApi();

app.Run();
