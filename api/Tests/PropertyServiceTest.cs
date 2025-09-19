using NUnit.Framework;
using Application.Services;
using Application.DTOs;
using Application.Interfaces;

namespace Tests;

class FakeRepo : IPropertyRepository
{
    public Task<PropertyDto?> GetByIdAsync(string idProperty)
    {
        var item = new PropertyDto { idProperty = "PR-1", idOwner = "OWN-1", name = "A", addressProperty = "X", priceProperty = 1, imageUrl = "u" };
        return Task.FromResult<PropertyDto?>(item);
    }
    public Task<(IReadOnlyList<PropertyDto> items, long total)> SearchAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize)
    {
        var list = new List<PropertyDto> { new PropertyDto { idProperty = "PR-1", idOwner = "OWN-1", name = "A", addressProperty = "X", priceProperty = 1, imageUrl = "u" } };
        return Task.FromResult<(IReadOnlyList<PropertyDto>, long)>(((IReadOnlyList<PropertyDto>)list.AsReadOnly(), 1L));
    }
}

public class PropertyServiceTests
{
    [Test]
    public async Task returns_list()
    {
        var svc = new PropertyService(new FakeRepo());
        var r = await svc.SearchAsync(null, null, null, null, 1, 10);
        Assert.That(r.total, Is.EqualTo(1));
        Assert.That(r.items[0].name, Is.EqualTo("A"));
    }
}
